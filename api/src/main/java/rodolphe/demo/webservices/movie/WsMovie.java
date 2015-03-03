package rodolphe.demo.webservices.movie;


import javax.inject.Inject;

import rodolphe.demo.domain.movies.SearchRet;
import rodolphe.demo.services.movie.MovieServices;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AutoSortAndPagination;
import io.vertigo.vega.rest.stereotype.POST;
/**
 * Webservice about Movie.
 * 
 * @author JDALMEIDA
 *
 */
public class WsMovie implements RestfulService{
	
	@Inject MovieServices movieServices;
	
	
	/**
	 * Search movies
	 * @param searchText search criteria
	 * @return search result.
	 */
	@AutoSortAndPagination
	@POST("/movies")
	public DtList<SearchRet> getMovies(final String searchText) {
		return movieServices.getMovies(searchText);
	}

}
