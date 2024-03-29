package rodolphe.demo.webservices.movie;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.POST;
import io.vertigo.vega.rest.stereotype.PUT;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.PathPrefix;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCasting;
import rodolphe.demo.domain.movies.MovieView;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.services.movie.MovieServices;

/**
 * Webservice about Movie.
 *
 * @author JDALMEIDA
 */
@PathPrefix("/movies")
public final class MovieWebServices implements RestfulService {

    @Inject
    private MovieServices movieServices;

    /**
     * Get movie by id.
     *
     * @param movId movie id.
     * @return movie.
     */
    @GET("/{id}")
    @AnonymousAccessAllowed
    public Movie getMovie(@PathParam("id") final long movId) {
        return movieServices.getMovie(movId);
    }

    /**
     * Save Movie.
     *
     * @param movie movie
     * @return movie
     */
    @POST("")
    @AnonymousAccessAllowed
    public Movie saveMovie(final Movie movie) {
        return movieServices.saveMovie(movie);
    }

    @PUT("/{id}")
    @AnonymousAccessAllowed
    public Movie updateMovie(@PathParam("id") final long movId, final Movie movie) {
        if (movId != movie.getMovId()) {
        }
        return movieServices.saveMovie(movie);
    }

    /**
     * Get movie's actors.
     *
     * @param movId movie identifier
     * @return people list
     */
    @GET("/{id}/actors")
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
    @GET("/{id}/producers")
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
    @GET("/{id}/directors")
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
    @GET("/{id}/details")
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
    @GET("/{id}/castings")
    @AnonymousAccessAllowed
    public DtList<MovieCasting> getMovieCastings(@PathParam("id") final long movId) {
        return movieServices.getMovieCastings(movId);
    }
}
