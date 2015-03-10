package rodolphe.demo.services.movie;

import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.lang.Component;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.services.search.SearchCriterium;

/**
 * Services about Movie.
 * @author JDALMEIDA
 *
 */
public interface MovieServices  extends Component {

	/**
	 * search movies by criteria.
	 * @param crit criteria
	 * @return result
	 */
	FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMoviesByCriteria(MovieCriteria crit, Facet ... facets);
	/**
	 * Get a movie by its primary key.
	 * @param movId primary key
	 * @return movie
	 */
	Movie getMovie(Long movId);
	/**
	 * Create/update a movie in a database.
	 * @param mov move to save in database
	 * @return movie
	 */
	Movie saveMovie(Movie mov);

}
