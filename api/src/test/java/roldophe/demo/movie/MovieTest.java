package roldophe.demo.movie;

import io.vertigo.dynamo.domain.model.DtList;

import javax.inject.Inject;

import org.junit.Test;

import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
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

	/**
	 * Test getMovies service.
	 */
	@Test
	public void searchByTitle(){
		final MovieCriteria crit = new MovieCriteria();
		crit.setTitle("Fantastic");
		final DtList<MovieResult> movies = movieServices.getMoviesByCriteria(crit);
	}
}
