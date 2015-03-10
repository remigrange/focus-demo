package rodolphe.demo.webservices.movie;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.POST;
import io.vertigo.vega.rest.stereotype.PathParam;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.people.People;
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
	@POST("/movies")
	@AnonymousAccessAllowed
	public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMovies(
			final MovieCriteria movieCriteria) {
		return movieServices.getMoviesByCriteria(movieCriteria);
	}

	/**
	 * Get movie by id.
	 * @param movId movie id.
	 * @return movie.
	 */
	@GET("/movies/{id}")
	@AnonymousAccessAllowed
	public Movie getMovie(@PathParam("id") final long movId){
		return movieServices.getMovie(movId);
	}

	@POST("/movies/new")
	@AnonymousAccessAllowed
	public Movie saveMovie(final Movie movie){
		return movieServices.saveMovie(movie);
	}

	/**
	 * Get movie's actors.
	 * @param movId moivie identifier
	 * @return people list
	 */
	@GET("/actors/{id}")
	@AnonymousAccessAllowed
	public DtList<People> getActors(@PathParam("id")  final Long movId) {
		return movieServices.getActors(movId);
	}


}
