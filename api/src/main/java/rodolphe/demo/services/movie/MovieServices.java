package rodolphe.demo.services.movie;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.lang.Component;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.movies.SearchRet;

/**
 * Services about Movie.
 * @author JDALMEIDA
 *
 */
public interface MovieServices  extends Component {

	/**
	 * Search movies
	 * @param searchText search criteria
	 * @return search result.
	 */
	DtList<SearchRet> getMovies(String searchText);

	/**
	 * search movies by criteria.
	 * @param crit criteria
	 * @return result
	 */
	DtList<MovieResult> getMoviesByCriteria(MovieCriteria crit);
	/**
	 * Get a movie by its primary key.
	 * @param movId primary key
	 * @return movie
	 */
	Movie getMovie(Long movId);
	/**
	 * Create/update a movie in a database.
	 * @param mov move to save in database
	 */
	void saveMovie(Movie mov);

}
