package rodolphe.demo.services.search;

import io.vertigo.dynamo.database.data.Movie;
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

import rodolphe.demo.dao.movies.MovieDAO;
import rodolphe.demo.domain.movies.MovieIndex;

public final class MovieSearchLoader implements SearchLoader<Movie, MovieIndex> {

	private static final int SEARCH_CHUNK_SIZE = 5;
	private final SearchIndexDefinition indexDefinition;
	@Inject
	private MovieDAO movieDAO;

	@Inject
	public MovieSearchLoader(final SearchManager searchManager) {
		indexDefinition = searchManager.findIndexDefinitionBySubject(Movie.class);
	}

	/** {@inheritDoc} */
	@Override
	public List<SearchIndex<Movie, MovieIndex>> loadData(final List<URI<Movie>> uris) {

		return Collections.emptyList(); //TODO
	}

	/** {@inheritDoc} */
	@Override
	public Iterable<SearchChunk<Movie>> chunk(final Class<Movie> subjectClass) {
		return new Iterable<SearchChunk<Movie>>() {

			private final Iterator<SearchChunk<Movie>> iterator = new Iterator<SearchChunk<Movie>>() {

				private SearchChunk<Movie> current = null;

				@Override
				public boolean hasNext() {
					return hasNextChunk(subjectClass, current);
				}

				@Override
				public SearchChunk<Movie> next() {
					final SearchChunk<Movie> next = nextChunk(subjectClass, current);
					current = next;
					return current;
				}

				@Override
				public void remove() {
					throw new UnsupportedOperationException("This list is unmodifiable");
				}
			};

			@Override
			public Iterator<SearchChunk<Movie>> iterator() {
				return iterator;
			}
		};
	}

	private SearchChunk<Movie> nextChunk(final Class<Movie> subjectClass, final SearchChunk<Movie> previousChunck) {
		Long lastId = -1L;
		if (previousChunck != null) {
			final List<URI<Movie>> previousUris = previousChunck.getAllURIs();
			Assertion
			.checkState(
					!previousUris.isEmpty(),
					"No more SearchChunk for DtSubject {0}, ensure you use Iterable pattern or call hasNext before next",
					subjectClass.getSimpleName());
			lastId = (Long) previousUris.get(previousUris.size() - 1).getId();
		}
		final List<URI<Movie>> uris = new ArrayList<>(SEARCH_CHUNK_SIZE);
		// call loader service
		//TODO
		return new SearchChunkImpl<>(uris);
	}

	private boolean hasNextChunk(final Class<Movie> subjectClass, final SearchChunk<Movie> previousChunck) {
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
