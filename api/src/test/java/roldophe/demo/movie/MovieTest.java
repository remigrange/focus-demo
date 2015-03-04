package roldophe.demo.movie;

import javax.inject.Inject;

import org.junit.Test;

import rodolphe.demo.services.movie.MovieServices;
import roldophe.demo.tools.AbstractRodolpheTestCase;

public class MovieTest extends AbstractRodolpheTestCase{

	@Inject
	MovieServices movieServices;
	/**
	 * Test getMovies service.
	 */
	@Test
	public void testGetMovies(){
		movieServices.getMovies("Fantastic");
	}

}
