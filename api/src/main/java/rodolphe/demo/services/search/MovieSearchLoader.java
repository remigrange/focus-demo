package rodolphe.demo.services.search;

import io.vertigo.dynamo.database.data.Movie;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.search.SearchManager;
import io.vertigo.dynamo.search.metamodel.SearchIndexDefinition;
import io.vertigo.dynamo.search.model.SearchIndex;
import io.vertigo.dynamo.task.TaskManager;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.dao.movies.MoviesPAO;
import rodolphe.demo.domain.common.Dummy;
import rodolphe.demo.domain.movies.MovieIndex;

public final class MovieSearchLoader extends DefaultSearchLoader<Long, Movie, MovieIndex> {

	@Inject
	private MoviesPAO moviesPAO;
	private final SearchIndexDefinition indexDefinition;

	/**
	 * Construct an instance of MovieSearchLoader.
	 * @param taskManager TaskManager
	 */
	@Inject
	public MovieSearchLoader(final SearchManager searchManager, final TaskManager taskManager) {
		super(taskManager);
		indexDefinition = searchManager.findIndexDefinitionByKeyConcept(Movie.class);
	}

	/** {@inheritDoc} */
	@Override
	public List<SearchIndex<Movie, MovieIndex>> loadData(final List<URI<Movie>> uris) {
		final DtList<Dummy> movieIds = new DtList<>(Dummy.class);
		for (final URI<Movie> uri : uris) {
			final Dummy dummy = new Dummy();
			dummy.setDummyLong((Long) uri.getId());
			movieIds.add(dummy);
		}
		final DtList<MovieIndex> movieIndexes = moviesPAO.getMovieIndex(movieIds);
		final List<SearchIndex<Movie, MovieIndex>> movieSearchIndexes = new ArrayList<>(uris.size());
		for (final MovieIndex movieIndex : movieIndexes) {
			movieSearchIndexes.add(SearchIndex.createIndex(indexDefinition, new URI(indexDefinition.getIndexDtDefinition(), movieIndex.getMovId()), movieIndex));
		}
		return movieSearchIndexes;
	}
}
