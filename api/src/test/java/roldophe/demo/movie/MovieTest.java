package roldophe.demo.movie;

import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetValue;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;

import java.util.HashMap;
import java.util.Map;
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
		//1ere Recherche
		FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> movies = movieServices.getMoviesByCriteria(crit);
		for (final Facet facet : movies.getFacets()) {
			getLogger().info(facet.toString());
			getLogger().info(facet.getDefinition().getLabel().getDisplay());
			for(final Entry<FacetValue, Long> entry : facet.getFacetValues().entrySet()) {
				getLogger().info(entry.getKey().getLabel().getDisplay() + " : " + entry.getValue());
			}
		}
		//Recherche avec une facette renseignée.
		final Facet facet = movies.getFacets().get(0);
		final Map<FacetValue, Long> facetValues = new HashMap<FacetValue, Long>();
		movies = movieServices.getMoviesByCriteria(crit, facet);
		for(final Entry<FacetValue, Long> entry : facet.getFacetValues().entrySet()) {
			//on prend qu'une seule valeur de la facette.
			getLogger().info(entry.getKey().getLabel().getDisplay() + " : " + entry.getValue());
			facetValues.put(entry.getKey(), entry.getValue());
			break;
		}

		//
		final Facet facetParam = new Facet(facet.getDefinition(), facetValues);
		movies = movieServices.getMoviesByCriteria(crit, facetParam);
		for (   final Facet  facetResult : movies.getFacets()) {
			getLogger().info(facetResult.toString());
			getLogger().info(facetResult.getDefinition().getLabel().getDisplay());
			for(final Entry<FacetValue, Long> entry : facet.getFacetValues().entrySet()) {
				getLogger().info(entry.getKey().getLabel().getDisplay() + " : " + entry.getValue());
			}
		}
	}
}
