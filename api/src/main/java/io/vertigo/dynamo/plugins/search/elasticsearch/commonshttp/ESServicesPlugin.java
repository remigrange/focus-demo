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
package io.vertigo.dynamo.plugins.search.elasticsearch.commonshttp;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.dynamo.plugins.search.elasticsearch.AbstractESServicesPlugin;
import io.vertigo.lang.Assertion;

import javax.inject.Inject;
import javax.inject.Named;

import org.elasticsearch.common.settings.ImmutableSettings;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.node.Node;
import org.elasticsearch.node.NodeBuilder;

/**
 * Gestion de la connexion au serveur elasticSearch en mode HTTP.
 *
 * @author npiedeloup
 */
public final class ESServicesPlugin extends AbstractESServicesPlugin {

	/** url du serveur elasticSearch. */
	private final String[] serversNames;
	/** cluster à rejoindre. */
	private final String clusterName;

	/**
	 * Constructeur.
	 *
	 * @param serversNamesStr URL du serveur ElasticSearch avec le port de communication de cluster (9300 en général)
	 * @param cores Liste des indexes
	 * @param rowsPerQuery Liste des indexes
	 * @param codecManager Manager des codecs
	 * @param clusterName : nom du cluster à rejoindre
	 */
	@Inject
	public ESServicesPlugin(@Named("servers.names") final String serversNamesStr, @Named("cores") final String cores,
			@Named("rowsPerQuery") final int rowsPerQuery, final CodecManager codecManager,
			@Named("cluster.name") final String clusterName) {
		super(cores, rowsPerQuery, codecManager);
		Assertion.checkArgNotEmpty(serversNamesStr,
				"Il faut définir les urls des serveurs ElasticSearch (ex : host1:3889,host2:3889). Séparateur : ','");
		Assertion.checkArgument(!serversNamesStr.contains(";"),
				"Il faut définir les urls des serveurs ElasticSearch (ex : host1:3889,host2:3889). Séparateur : ','");
		Assertion.checkArgNotEmpty(clusterName, "Cluster's name must be defined");
		Assertion.checkArgument(!"elasticsearch".equals(clusterName), "You have to define a cluster name different from the default one");
		// ---------------------------------------------------------------------
		serversNames = serversNamesStr.split(",");
		this.clusterName = clusterName;
	}

	/** {@inheritDoc} */
	@Override
	protected Node createNode() {
		return new NodeBuilder()
		.settings(buildNodeSettings())
		.client(true)
		.build();
	}

	private Settings buildNodeSettings() {
		// Build settings
		return ImmutableSettings.settingsBuilder().put("node.name", "es-embedded-node-" + System.currentTimeMillis())
				.put("node.data", false)
				.put("node.master", false)
				// .put("discovery.zen.fd.ping_timeout", "30s")
				// .put("discovery.zen.minimum_master_nodes", 2)
				.put("discovery.zen.ping.multicast.enabled", false)
				.putArray("discovery.zen.ping.unicast.hosts", serversNames)
				.put("cluster.name", clusterName)
				// .put("index.store.type", "memory")
				// .put("index.store.fs.memory.enabled", "true")
				// .put("gateway.type", "none")
				.build();
	}
}
