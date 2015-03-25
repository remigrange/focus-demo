package rodolphe.demo.webservices.movie;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.model.UiListState;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.POST;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.QueryParam;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCasting;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.movies.MovieView;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.services.movie.MovieServices;
import rodolphe.demo.services.search.SearchCriterium;

/**
 * Webservice about Movie.
 *
 * @author JDALMEIDA
 */
public final class WsMovie implements RestfulService {

    @Inject
    private MovieServices movieServices;

    /**
     * Search movies.
     *
     * @param movieCriteria search criteria
     * @param uiListState uiListState
     * @return search result.
     */
    @POST("/movies")
    @AnonymousAccessAllowed
    public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMovies(final MovieCriteria movieCriteria,
            @QueryParam("") final UiListState uiListState) {
        return movieServices.getMoviesByCriteria(movieCriteria, uiListState, "");
    }

    /**
     * Get movie by id.
     *
     * @param movId movie id.
     * @return movie.
     */
    @GET("/movies/{id}")
    @AnonymousAccessAllowed
    public Movie getMovie(@PathParam("id") final long movId) {
        return movieServices.getMovie(movId);
    }

    // TODO change the ws name.
    /**
     * Save Movie.
     *
     * @param movie movie
     * @return movie
     */
    @POST("/movies/new")
    @AnonymousAccessAllowed
    public Movie saveMovie(final Movie movie) {
        return movieServices.saveMovie(movie);
    }

    /**
     * Get movie's actors.
     *
     * @param movId movie identifier
     * @return people list
     */
    @GET("/movies/{id}/actors")
    @AnonymousAccessAllowed
    public DtList<People> getActors(@PathParam("id") final Long movId) {
        return movieServices.getActors(movId);
    }

    /**
     * Get movie's producers.
     *
     * @param movId movie identifier
     * @return people list
     */
    @GET("/movies/{id}/producers")
    @AnonymousAccessAllowed
    public DtList<People> getProducers(@PathParam("id") final Long movId) {
        return movieServices.getProducers(movId);
    }

    /**
     * Get movie's directors.
     *
     * @param movId movie identifier
     * @return people list
     */
    @GET("/movies/{id}/directors")
    @AnonymousAccessAllowed
    public DtList<People> getDirectors(@PathParam("id") final Long movId) {
        return movieServices.getDirectors(movId);
    }

    /**
     * Get movie by id.
     *
     * @param movId movie id.
     * @return movie.
     */
    @GET("/movies/{id}/movieView")
    @AnonymousAccessAllowed
    public MovieView getMovieDetails(@PathParam("id") final long movId) {
        return movieServices.getMovieDetails(movId);
    }

    /**
     * Get movie castings by movie id.
     *
     * @param movId movie id.
     * @return list of castings.
     */
    @GET("/movies/{id}/castings")
    @AnonymousAccessAllowed
    public DtList<MovieCasting> getMovieCastings(@PathParam("id") final long movId) {
        return movieServices.getMovieCastings(movId);
    }
}
