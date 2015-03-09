package roldophe.demo.movie;

import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetValue;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;

import java.util.Map.Entry;

import javax.inject.Inject;

import org.junit.Test;

import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.services.movie.MovieServices;
import rodolphe.demo.services.search.SearchCriterium;
import roldophe.demo.tools.AbstractRodolpheTestCase;

public class MovieTest extends AbstractRodolpheTestCase{

	@Inject
	MovieServices movieServices;


	/**
	 * Test getMovies service.
	 */
	@Test
	public void searchByTitle(){
		final MovieCriteria crit = new MovieCriteria();
		crit.setTitle("Fantastic");
		final FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> movies = movieServices.getMoviesByCriteria(crit);
		for (final Facet facet : movies.getFacets()) {
			getLogger().info(facet.toString());
			getLogger().info(facet.getDefinition().getLabel().getDisplay());
			for(final Entry<FacetValue, Long> entry : facet.getFacetValues().entrySet()) {
				getLogger().info(entry.getKey().getLabel().getDisplay() + " : " + entry.getValue());
			}
		}
	}
}
