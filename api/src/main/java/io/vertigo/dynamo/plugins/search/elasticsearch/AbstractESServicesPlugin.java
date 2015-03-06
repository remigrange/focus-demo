/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.dynamo.plugins.search.elasticsearch;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.resource.ResourceManager;
import io.vertigo.core.Home;
import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.model.FacetedQuery;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.metamodel.DtProperty;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.impl.search.SearchServicesPlugin;
import io.vertigo.dynamo.search.IndexFieldNameResolver;
import io.vertigo.dynamo.search.metamodel.IndexDefinition;
import io.vertigo.dynamo.search.model.Index;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.lang.Activeable;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Option;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.log4j.Logger;
import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.admin.indices.mapping.put.PutMappingRequestBuilder;
import org.elasticsearch.action.admin.indices.mapping.put.PutMappingResponse;
import org.elasticsearch.action.admin.indices.optimize.OptimizeRequest;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.IndicesAdminClient;
import org.elasticsearch.cluster.metadata.MappingMetaData;
import org.elasticsearch.common.collect.ImmutableOpenMap;
import org.elasticsearch.common.hppc.cursors.ObjectObjectCursor;
import org.elasticsearch.common.settings.ImmutableSettings;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import org.elasticsearch.node.Node;

/**
 * Gestion de la connexion au serveur Solr de manière transactionnel.
 *
 * @author dchallas
 */
public abstract class AbstractESServicesPlugin implements SearchServicesPlugin, Activeable {

	private static final IndexFieldNameResolver DEFAULT_INDEX_FIELD_NAME_RESOLVER = new IndexFieldNameResolver(
			Collections.<String, String> emptyMap());
	private static final Logger LOGGER = Logger.getLogger(AbstractESServicesPlugin.class);
	private final ESDocumentCodec elasticDocumentCodec;
	private Node node;
	private Client esClient;
	private final Map<String, IndexFieldNameResolver> indexFieldNameResolvers;
	private final int rowsPerQuery;
	private final Set<String> cores;
	private final URL configFile;
	private final boolean correctIndex;

	/**
	 * Constructeur.
	 *
	 * @param cores Nom des noyeaux ES
	 * @param rowsPerQuery Nombre de lignes
	 * @param codecManager Manager de codec
	 * @param configFile Fichier de configuration des indexs
	 * @param resourceManager Manager des resources
	 */
	protected AbstractESServicesPlugin(final String cores, final int rowsPerQuery, final Option<String> configFile,
			final CodecManager codecManager, final ResourceManager resourceManager, final boolean correctIndex) {
		Assertion.checkArgNotEmpty(cores);
		Assertion.checkNotNull(codecManager);
		// -----
		this.rowsPerQuery = rowsPerQuery;
		elasticDocumentCodec = new ESDocumentCodec(codecManager);
		indexFieldNameResolvers = new HashMap<>();
		// ------
		this.cores = new HashSet<>(Arrays.asList(cores.split(",")));
		if (configFile.isDefined()) {
			this.configFile = resourceManager.resolve(configFile.get());
		} else {
			this.configFile = null;
		}
		this.correctIndex = correctIndex;
	}

	/** {@inheritDoc} */
	@Override
	public final void start() {
		// Init ElasticSearch Node
		node = createNode();
		node.start();
		esClient = node.client();
		final Settings settings;
		if (configFile == null) {
			settings = null;
		} else {
			settings = ImmutableSettings.settingsBuilder().loadFromUrl(configFile).build();
		}
		for (final String core : cores) {
			final String indexName = core.toLowerCase().trim();
			waitForYellowStatus(); // must wait yellow status to be sure prepareExists works fine (instead of returning
			// false on a already exist index)
			try {
				if (!esClient.admin().indices().prepareExists(indexName).get().isExists()) {
					if (configFile == null) {
						esClient.admin().indices().prepareCreate(indexName).get();
					} else {
						esClient.admin().indices().prepareCreate(indexName).setSettings(settings).get();
					}
				} else {
					// vérification des index
					checkSettings(indexName, settings);
				}
			} catch (final ElasticsearchException e) {
				throw new RuntimeException("Error on index " + indexName, e);
			}
		}
		// Init typeMapping IndexDefinition <-> Conf ElasticSearch
		for (final IndexDefinition indexDefinition : Home.getDefinitionSpace().getAll(IndexDefinition.class)) {
			updateTypeMapping(indexDefinition);
			logMappings(indexDefinition);
		}
		waitForYellowStatus();
	}

	private void checkSettings(final String indexName, final Settings settings) {
		if (settings == null) {
			return;
		}
		final Settings currents = esClient.admin().indices().prepareGetIndex().addIndices(indexName).get()
				.getSettings().get(indexName);
		boolean update = false;
		final Map<String, String> map = settings.getAsMap();
		for (final Entry<String, String> setting : map.entrySet()) {
			final String current = currents.get(setting.getKey());
			if (current == null) {
				update = true;
				break;
			}
			final String wished = setting.getValue();
			if (!current.equals(wished)) {
				update = true;
				LOGGER.warn(setting.getKey() + " courant " + current + " souhaité " + wished);
				break;
			}
		}
		if (update) {
			// Il y a des différences. On met à jour si on peut
			if (correctIndex) {
				// On supprimme et on recrée
				esClient.admin().indices().prepareDelete(indexName).get();
				esClient.admin().indices().prepareCreate(indexName).setSettings(settings).get();
			} else {
				// Maj impossible. On arrête de traitement
				throw new ElasticsearchException("setting incorrect. courant " + currents.toDelimitedString(';')
						+ " souhaité " + settings.toDelimitedString(';'));
			}
		}
	}

	private void logMappings(final IndexDefinition indexDefinition) {
		final IndicesAdminClient indicesAdmin = esClient.admin().indices();
		// logger.warn("Index " + indexName + " CurrentMapping:");
		final ImmutableOpenMap<String, ImmutableOpenMap<String, MappingMetaData>> indexMappings = indicesAdmin
				.prepareGetMappings(indexDefinition.getName().toLowerCase()).get().getMappings();
		for (final ObjectObjectCursor<String, ImmutableOpenMap<String, MappingMetaData>> indexMapping : indexMappings) {
			LOGGER.info("Index " + indexMapping.key + " CurrentMapping:");
			for (final ObjectObjectCursor<String, MappingMetaData> dtoMapping : indexMapping.value) {
				LOGGER.info(dtoMapping.key + " -> " + dtoMapping.value.source());
			}
		}
	}

	/**
	 * @return ElasticSearch node.
	 */
	protected abstract Node createNode();

	/** {@inheritDoc} */
	@Override
	public final void stop() {
		node.close();
	}

	/** {@inheritDoc} */
	@Override
	public final void registerIndexFieldNameResolver(final IndexDefinition indexDefinition,
			final IndexFieldNameResolver indexFieldNameResolver) {
		Assertion.checkNotNull(indexDefinition);
		Assertion.checkNotNull(indexFieldNameResolver);
		// -----
		indexFieldNameResolvers.put(indexDefinition.getName(), indexFieldNameResolver);
		updateTypeMapping(indexDefinition);
		logMappings(indexDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public final <I extends DtObject, R extends DtObject> void putAll(final IndexDefinition indexDefinition,
			final Collection<Index<I, R>> indexCollection) {
		Assertion.checkNotNull(indexCollection);
		// -----
		final ESStatement<I, R> statement = createElasticStatement(indexDefinition);
		statement.putAll(indexCollection);
	}

	/** {@inheritDoc} */
	@Override
	public final <I extends DtObject, R extends DtObject> void put(final IndexDefinition indexDefinition,
			final Index<I, R> index) {
		// On vérifie la cohérence des données SO et SOD.
		Assertion.checkNotNull(indexDefinition);
		Assertion.checkNotNull(index);
		Assertion.checkArgument(indexDefinition.equals(index.getDefinition()), "les Définitions ne sont pas conformes");
		// -----
		final ESStatement<I, R> statement = createElasticStatement(indexDefinition);
		statement.put(index);
	}

	/** {@inheritDoc} */
	@Override
	public final void remove(final IndexDefinition indexDefinition, final URI uri) {
		Assertion.checkNotNull(uri);
		Assertion.checkNotNull(indexDefinition);
		// -----
		createElasticStatement(indexDefinition).remove(indexDefinition, uri);
		markToOptimize(indexDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public final <R extends DtObject> FacetedQueryResult<R, SearchQuery> loadList(final SearchQuery searchQuery,
			final FacetedQuery facetedQuery) {
		Assertion.checkNotNull(searchQuery);
		Assertion.checkNotNull(facetedQuery);
		// -----
		final ESStatement<DtObject, R> statement = createElasticStatement(searchQuery.getIndexDefinition());
		return statement.loadList(searchQuery, facetedQuery, rowsPerQuery);
	}

	/** {@inheritDoc} */
	@Override
	public final long count(final IndexDefinition indexDefinition) {
		Assertion.checkNotNull(indexDefinition);
		// -----
		return createElasticStatement(indexDefinition).count();
	}

	/** {@inheritDoc} */
	@Override
	public final void remove(final IndexDefinition indexDefinition, final ListFilter listFilter) {
		Assertion.checkNotNull(indexDefinition);
		Assertion.checkNotNull(listFilter);
		// -----
		createElasticStatement(indexDefinition).remove(indexDefinition, listFilter);
		markToOptimize(indexDefinition);
	}

	/**
	 * Fournit l' IndexFieldNameResolver d'un index.
	 *
	 * @param indexDefinition IndexDefinition de l'index
	 * @return IndexFieldNameResolver associé à l'index
	 */
	protected final IndexFieldNameResolver obtainIndexFieldNameResolver(final IndexDefinition indexDefinition) {
		Assertion.checkNotNull(indexDefinition);
		// -----
		final IndexFieldNameResolver indexFieldNameResolver = indexFieldNameResolvers.get(indexDefinition.getName());
		return indexFieldNameResolver != null ? indexFieldNameResolver : DEFAULT_INDEX_FIELD_NAME_RESOLVER;
	}

	private <I extends DtObject, R extends DtObject> ESStatement<I, R> createElasticStatement(
			final IndexDefinition indexDefinition) {
		Assertion.checkNotNull(indexDefinition);
		Assertion.checkArgument(cores.contains(indexDefinition.getName()),
				"Index {0} hasn't been registered (Registered indexes: {2}).", indexDefinition.getName(), cores);
		// -----
		return new ESStatement<>(elasticDocumentCodec, indexDefinition.getName().toLowerCase(), esClient,
				obtainIndexFieldNameResolver(indexDefinition));
	}

	/**
	 * Update template definition of this type.
	 *
	 * @param indexDefinition Index concerné
	 */
	private void updateTypeMapping(final IndexDefinition indexDefinition) {
		Assertion.checkNotNull(indexDefinition);
		// -----
		final IndexFieldNameResolver indexFieldNameResolver = obtainIndexFieldNameResolver(indexDefinition);
		try (final XContentBuilder typeMapping = XContentFactory.jsonBuilder()) {
			typeMapping.startObject().startObject("properties").startObject(ESDocumentCodec.FULL_RESULT)
			.field("type", "binary").endObject();
			/* 3 : Les champs du dto index */
			final DtDefinition indexDtDefinition = indexDefinition.getIndexDtDefinition();
			for (final DtField dtField : indexDtDefinition.getFields()) {
				final String indexType = resolveIndexType(dtField.getDomain());
				// final String fieldType = dtField.getDomain().getProperties().getValue(DtProperty.INDEX_TYPE);
				// final String indexType = "{" + resolveIndexType(dtField.getDomain()) + "}";
				// typeMapping.rawField(dtField.getName(), indexType.getBytes("utf8"));
				if (indexType != null) {
					typeMapping.startObject(indexFieldNameResolver.obtainIndexFieldName(dtField));
					typeMapping.field("type", "string").field("analyzer", indexType); // par convention l'indextype du
					// domain => l'analyzer de
					// l'index
					typeMapping.endObject();
				}
			}
			typeMapping.endObject().endObject(); // end properties
			//
			final IndicesAdminClient indicesAdmin = esClient.admin().indices();
			final PutMappingResponse putMappingResponse = new PutMappingRequestBuilder(indicesAdmin)
			.setIndices(indexDefinition.getName().toLowerCase())
			.setType(indexDefinition.getIndexDtDefinition().getName()).setSource(typeMapping).get();
			putMappingResponse.isAcknowledged();
		} catch (final IOException e) {
			throw new RuntimeException("Serveur ElasticSearch indisponible", e);
		}
	}

	private String resolveIndexType(final Domain domain) {
		// On peut préciser pour chaque domaine le type d'indexation
		final String fieldType = domain.getProperties().getValue(DtProperty.INDEX_TYPE);
		// Calcul automatique par default.
		switch (domain.getDataType()) {
		case Boolean: // native
		case Date: // native
		case Double: // native
		case Integer: // native
		case Long: // native
			break;
		case String:
		case BigDecimal:
			if (fieldType == null) {
				throw new IllegalArgumentException("## Précisez la valeur \"indexType\" dans le domain [" + domain
						+ "].");
			}
			break;
		case DataStream: // IllegalArgumentException
		case DtObject: // IllegalArgumentException
		case DtList: // IllegalArgumentException
		default: // IllegalArgumentException
			throw new IllegalArgumentException("Type de donnée non pris en charge pour l'indexation [" + domain
					+ "].");
		}
		return fieldType;
	}

	private void markToOptimize(final IndexDefinition indexDefinition) {
		esClient.admin().indices()
		.optimize(new OptimizeRequest(indexDefinition.getName().toLowerCase()).flush(true).maxNumSegments(32)); // 32
		// files
		// :
		// empirique
	}

	private void waitForYellowStatus() {
		esClient.admin().cluster().prepareHealth().setWaitForYellowStatus().execute().actionGet();
	}
}
