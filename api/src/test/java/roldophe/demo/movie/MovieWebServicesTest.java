/**
 *
 */
package roldophe.demo.movie;

import io.vertigo.vega.rest.model.UiListState;

import javax.inject.Inject;

import org.junit.Test;

import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.webservices.movie.MovieWebServices;
import roldophe.demo.tools.AbstractRodolpheTestCase;

/**
 * Test wsMovie.
 *
 * @author JDALMEIDA
 */
public class MovieWebServicesTest extends AbstractRodolpheTestCase {

    @Inject
    private MovieWebServices wsMovie;

    /**
     * Test get movies.
     */
    @Test
    public void testGetMovies() {
        final MovieCriteria movieCriteria = new MovieCriteria();
        movieCriteria.setTitle("Fantastic");
        final UiListState uiListState = new UiListState(50, 0, null, false, null);
        // wsMovie.getMovies(movieCriteria, uiListState,);
    }
}
