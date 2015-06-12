package rodolphe.demo.services.search;

import io.vertigo.core.Home;
import io.vertigo.core.spaces.definiton.Definition;
import io.vertigo.core.spaces.definiton.DefinitionUtil;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.search.metamodel.SearchChunk;
import io.vertigo.dynamo.search.metamodel.SearchLoader;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.metamodel.TaskDefinitionBuilder;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.task.model.TaskResult;
import io.vertigo.dynamox.task.TaskEngineSelect;
import io.vertigo.lang.Assertion;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;

public abstract class DefaultSearchLoader<P extends Serializable, S extends KeyConcept, I extends DtObject> implements SearchLoader<S, I> {
	private static final String DOMAIN_PREFIX = DefinitionUtil.getPrefix(Domain.class);
	private static final char SEPARATOR = Definition.SEPARATOR;
	private static final int SEARCH_CHUNK_SIZE = 5;
	private final TaskManager taskManager;

	@Inject
	public DefaultSearchLoader(final TaskManager taskManager) {
		Assertion.checkNotNull(taskManager);
		//-----
		this.taskManager = taskManager;

	}

	/** {@inheritDoc} */
	@Override
	public Iterable<SearchChunk<S>> chunk(final Class<S> keyConceptClass) {
		return new Iterable<SearchChunk<S>>() {

			private final Iterator<SearchChunk<S>> iterator = new Iterator<SearchChunk<S>>() {

				private SearchChunk<S> current = null;

				@Override
				public boolean hasNext() {
					return hasNextChunk(keyConceptClass, current);
				}

				@Override
				public SearchChunk<S> next() {
					final SearchChunk<S> next = nextChunk(keyConceptClass, current);
					current = next;
					return current;
				}

				@Override
				public void remove() {
					throw new UnsupportedOperationException("This list is unmodifiable");
				}
			};

			@Override
			public Iterator<SearchChunk<S>> iterator() {
				return iterator;
			}
		};
	}

	private SearchChunk<S> nextChunk(final Class<S> keyConceptClass, final SearchChunk<S> previousChunck) {
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(keyConceptClass);
		P lastId = getLowestIdValue(dtDefinition);
		if (previousChunck != null) {
			final List<URI<S>> previousUris = previousChunck.getAllURIs();
			Assertion
			.checkState(
					!previousUris.isEmpty(),
					"No more SearchChunk for KeyConcept {0}, ensure you use Iterable pattern or call hasNext before next",
					keyConceptClass.getSimpleName());
			lastId = (P) previousUris.get(previousUris.size() - 1).getId();
		}
		// call loader service
		final List<URI<S>> uris = loadNextURI(lastId, dtDefinition);
		return new SearchChunkImpl<>(uris);
	}

	private List<URI<S>> loadNextURI(final P lastId, final DtDefinition dtDefinition) {
		final String tableName = getTableName(dtDefinition);
		final String taskName = "TK_SELECT_" + tableName + "_NEXT_SEARCH_CHUNK";
		final DtField pk = dtDefinition.getIdField().get();
		final String pkFieldName = pk.getName();
		final StringBuilder request = new StringBuilder()
		.append(" select " + pkFieldName + " from ")
		.append(tableName)
		.append(" where ").append(pkFieldName).append(" > #").append(pkFieldName).append('#')
		.append(" order by " + pkFieldName + " ASC")
		.append(" limit " + SEARCH_CHUNK_SIZE); //Attention : non compatible avec toutes les bases

		final TaskDefinition taskDefinition = new TaskDefinitionBuilder(taskName)
		.withEngine(TaskEngineSelect.class)
		.withRequest(request.toString())
		.withInAttribute(pkFieldName, pk.getDomain(), true)
		//IN, obligatoire
		.withOutAttribute("dtc", Home.getDefinitionSpace().resolve(DOMAIN_PREFIX + SEPARATOR + dtDefinition.getName() + "_DTC", Domain.class), true)//obligatoire
		.build();

		final Task task = new TaskBuilder(taskDefinition)
		.withValue(pkFieldName, lastId)
		.build();
		final TaskResult taskResult = process(task);
		final DtList<S> resultDtc = getDtList(taskResult);
		final List<URI<S>> uris = new ArrayList<>(SEARCH_CHUNK_SIZE);
		for (final S dto : resultDtc) {
			uris.add(new URI(dtDefinition, DtObjectUtil.getId(dto)));
		}
		return uris;
	}

	/**
	 * Exécution d'une tache de façon synchrone.
	 * @param task Tache à executer.
	 * @return TaskResult de la tache
	 */
	protected final TaskResult process(final Task task) {
		return taskManager.execute(task);
	}

	private static <D extends DtObject> DtList<D> getDtList(final TaskResult taskResult) {
		return taskResult.getValue("dtc");
	}

	private P getLowestIdValue(final DtDefinition dtDefinition) {
		final DtField pkField = dtDefinition.getIdField().get();
		final DataType pkDataType = pkField.getDomain().getDataType();
		P pkValue;
		switch (pkDataType) {
			case Integer:
				pkValue = (P) Integer.valueOf(-1);
				break;
			case Long:
				pkValue = (P) Long.valueOf(-1);
				break;
			case String:
				pkValue = (P) "";
				break;
			case BigDecimal:
			case DataStream:
			case Boolean:
			case Double:
			case Date:
			case DtList:
			case DtObject:
			default:
				throw new IllegalArgumentException("Type's PK " + pkDataType.name() + " of " + dtDefinition.getClassSimpleName() + " is not supported, prefer int, long or String PK.");

		}
		return pkValue;
	}

	private boolean hasNextChunk(final Class<S> keyConceptClass, final SearchChunk<S> previousChunck) {
		// il y a une suite, si on a pas commencé, ou s'il y avait des résultats la dernière fois.
		return previousChunck == null || !previousChunck.getAllURIs().isEmpty();
	}

	/**
	 * Nom de la table en fonction de la définition du DT mappé.
	 *
	 * @param dtDefinition Définition du DT mappé
	 * @return Nom de la table
	 */
	protected static final String getTableName(final DtDefinition dtDefinition) {
		return dtDefinition.getLocalName();
	}

	public static class SearchChunkImpl<S extends KeyConcept> implements SearchChunk<S> {

		private final List<URI<S>> uris;

		/**
		 * @param uris Liste des uris du chunk
		 */
		public SearchChunkImpl(final List<URI<S>> uris) {
			Assertion.checkNotNull(uris);
			// ----
			this.uris = Collections.unmodifiableList(uris); // pas de clone pour l'instant
		}

		/** {@inheritDoc} */
		@Override
		public List<URI<S>> getAllURIs() {
			return uris;
		}
	}
}
