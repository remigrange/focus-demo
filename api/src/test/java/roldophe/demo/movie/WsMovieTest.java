/**
 *
 */
package roldophe.demo.movie;

import javax.inject.Inject;

import org.junit.Test;

import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.webservices.movie.WsMovie;
import roldophe.demo.tools.AbstractRodolpheTestCase;

/**
 * @author JDALMEIDA
 *
 */
public class WsMovieTest extends AbstractRodolpheTestCase{
	@Inject
	private WsMovie wsMovie;

	@Test
	public void testGetMovies() {
		final MovieCriteria movieCriteria = new MovieCriteria();
		movieCriteria.setTitle("Fantastic");
		wsMovie.getMovies(movieCriteria);
	}

}
