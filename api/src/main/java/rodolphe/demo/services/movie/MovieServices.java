package rodolphe.demo.services.movie;

import rodolphe.demo.domain.movies.SearchRet;
import io.vertigo.dynamo.domain.model.DtList;

/**
 * Services about Movie.
 * @author JDALMEIDA
 *
 */
public interface MovieServices {
	
	/**
	 * Search movies
	 * @param searchText search criteria
	 * @return search result.
	 */
	DtList<SearchRet> getMovies(String searchText);

}
