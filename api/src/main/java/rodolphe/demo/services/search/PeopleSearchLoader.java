package rodolphe.demo.services.search;

import io.vertigo.dynamo.domain.model.DtSubject;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.search.SearchManager;
import io.vertigo.dynamo.search.metamodel.SearchChunk;
import io.vertigo.dynamo.search.metamodel.SearchIndexDefinition;
import io.vertigo.dynamo.search.metamodel.SearchLoader;
import io.vertigo.dynamo.search.model.SearchIndex;
import io.vertigo.lang.Assertion;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.dao.people.PeopleDAO;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleIndex;

public final class PeopleSearchLoader implements SearchLoader<People, PeopleIndex> {

	private static final int SEARCH_CHUNK_SIZE = 5;
	private final SearchIndexDefinition indexDefinition;
	@Inject
	private PeopleDAO movieDAO;

	@Inject
	public PeopleSearchLoader(final SearchManager searchManager) {
		indexDefinition = searchManager.findIndexDefinitionBySubject(People.class);
	}

	/** {@inheritDoc} */
	@Override
	public List<SearchIndex<People, PeopleIndex>> loadData(final List<URI<People>> uris) {

		return Collections.emptyList(); //TODO
	}

	/** {@inheritDoc} */
	@Override
	public Iterable<SearchChunk<People>> chunk(final Class<People> subjectClass) {
		return new Iterable<SearchChunk<People>>() {

			private final Iterator<SearchChunk<People>> iterator = new Iterator<SearchChunk<People>>() {

				private SearchChunk<People> current = null;

				@Override
				public boolean hasNext() {
					return hasNextChunk(subjectClass, current);
				}

				@Override
				public SearchChunk<People> next() {
					final SearchChunk<People> next = nextChunk(subjectClass, current);
					current = next;
					return current;
				}

				@Override
				public void remove() {
					throw new UnsupportedOperationException("This list is unmodifiable");
				}
			};

			@Override
			public Iterator<SearchChunk<People>> iterator() {
				return iterator;
			}
		};
	}

	private SearchChunk<People> nextChunk(final Class<People> subjectClass, final SearchChunk<People> previousChunck) {
		Long lastId = -1L;
		if (previousChunck != null) {
			final List<URI<People>> previousUris = previousChunck.getAllURIs();
			Assertion
					.checkState(
							!previousUris.isEmpty(),
							"No more SearchChunk for DtSubject {0}, ensure you use Iterable pattern or call hasNext before next",
							subjectClass.getSimpleName());
			lastId = (Long) previousUris.get(previousUris.size() - 1).getId();
		}
		final List<URI<People>> uris = new ArrayList<>(SEARCH_CHUNK_SIZE);
		// call loader service
		//TODO
		return new SearchChunkImpl<>(uris);
	}

	private boolean hasNextChunk(final Class<People> subjectClass, final SearchChunk<People> previousChunck) {
		// il y a une suite, si on a pas commencé, ou s'il y avait des résultats la dernière fois.
		return previousChunck == null || !previousChunck.getAllURIs().isEmpty();
	}

	public static class SearchChunkImpl<S extends DtSubject> implements SearchChunk<S> {

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
