package rodolphe.demo.services.search;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.lang.Component;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;

/**
 * Search services.
 * @author JDALMEIDA
 *
 */
public interface SearchServices   extends Component{

	/**
	 * Index all movies.
	 */
	void indexMovies();

	/**
	 * Index a specific movie.
	 * @param movId movie identifier
	 */
	void indexMovie(Long movId);
	/**
	 * Remove a movie from the index.
	 * @param movId movie identifier
	 */
	void removeMovieFromIndex(Long movId);

	/**
	 * Search movies matching a given criteria.
	 * @param criteria criteria
	 * @return List of matched movies and associated facets
	 */
	FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> searchMovie(SearchCriterium<MovieCriteria> criteria);
}
