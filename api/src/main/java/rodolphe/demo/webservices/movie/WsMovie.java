package rodolphe.demo.webservices.movie;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.POST;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.services.movie.MovieServices;
import rodolphe.demo.services.search.SearchCriterium;

/**
 * Webservice about Movie.
 *
 * @author JDALMEIDA
 *
 */
public class WsMovie implements RestfulService {

	@Inject
	MovieServices movieServices;

	/**
	 * Search movies
	 *
	 * @param movieCriteria
	 *            search criteria
	 * @return search result.
	 */
	@AnonymousAccessAllowed
	@POST("/movies")
	public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMovies(
			final MovieCriteria movieCriteria) {
		return movieServices.getMoviesByCriteria(movieCriteria);
	}

}
