/**
 *
 */
package roldophe.demo.movie;

import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetValue;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.util.DateBuilder;
import io.vertigo.util.DateUtil;

import java.util.Map.Entry;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Test;

import rodolphe.demo.domain.DtDefinitions.MovieCriteriaFields;
import rodolphe.demo.domain.DtDefinitions.MovieFields;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.services.movie.MovieServices;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.services.search.MovieSearchHandler;
import rodolphe.demo.services.search.SearchCriterium;
import rodolphe.demo.util.MemorizeTnrData;
import roldophe.demo.tools.AbstractEsSearchTestCase;

/**
 * @author jmforhan
 *
 */
public class SearchMovieTest extends AbstractEsSearchTestCase<MovieCriteria, MovieResult> {

	@Inject
	private MovieServices movieServices;

	/* (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractEsSearchTestCase#getCritereForEsSearchWithUniqueResultAsSU()
	 */
	/** {@inheritDoc} */
	@Override
	protected MovieCriteria getCritereForEsSearchWithUniqueResultAsSU() {
		final Movie mov= getNewMovie();
		final MovieCriteria crit = new MovieCriteria();
		crit.setMovId(mov.getMovId());
		return crit;
	}

	private Movie getNewMovie() {
		final Movie mov = new Movie();
		mov.setDescription("Movie for non regression testing");
		mov.setImdbid("id");
		mov.setMetadasJson("{meta:data}");
		mov.setReleased(DateUtil.newDate());
		mov.setRuntime(3);
		mov.setTitle("NRT title");
		movieServices.saveMovie(mov);
		return mov;
	}


	/* (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractSearchTestCase#getDataSenderClass()
	 */
	/** {@inheritDoc} */
	@Override
	protected Class<? extends MemorizeTnrData> getDataSenderClass() {
		return MovieSearchHandler.class;
	}

	/* (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractSearchTestCase#getListByCritere(io.vertigo.dynamo.domain.model.DtObject)
	 */
	/** {@inheritDoc} */
	@Override
	protected DtList<MovieResult> getListByCritere(final MovieCriteria critere) {
		return movieServices.getMoviesByCriteria(critere).getDtList();
	}

	/* (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractSearchTestCase#getId(io.vertigo.dynamo.domain.model.DtObject)
	 */
	/** {@inheritDoc} */
	@Override
	protected Long getId(final MovieResult dto) {
		return dto.getMovId();
	}

	/* (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractSearchTestCase#getIdForCritere(io.vertigo.dynamo.domain.model.DtObject)
	 */
	/** {@inheritDoc} */
	@Override
	protected Long getIdForCritere(final MovieCriteria critere) {
		return critere.getMovId();
	}

	/**
	 * Search the title of a movie.
	 */
	@Test
	public void searchByTitle() {
		final MovieCriteria crit = getCritereForSearchWithUniqueResultAsSU();
		final Movie mov = movieServices.getMovie(getIdForCritere(crit));
		verifierRechercheTokenBeginWoAccent(crit, MovieCriteriaFields.TITLE, mov, MovieFields.TITLE,
				movieServices, "saveMovie");
	}

	/**
	 * Search by the released date.
	 */
	@Test
	public void searchByReleasedDate() {
		final MovieCriteria crit = getCritereForSearchWithUniqueResultAsSU();
		final Movie mov = movieServices.getMovie(getIdForCritere(crit));
		crit.setReleased(mov.getReleased());
		checkUniqueResult(crit);
		crit.setReleased(new DateBuilder(mov.getReleased()).addDays(1).build());
		checkResultSize(crit, 0);
		crit.setReleased(new DateBuilder(mov.getReleased()).addDays(-1).build());
		checkResultSize(crit, 0);
	}


	/**
	 * Test getMovies service.
	 */
	@Test
	public void searchByTitleWithFacet(){
		final MovieCriteria crit = new MovieCriteria();
		crit.setTitle("Fantastic");
		//1ere Recherche
		Facet selectedFacet = null;
		FacetValue selectedFacetValue = null;
		long facetCount = 0L;
		FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> movies = movieServices.getMoviesByCriteria(crit);
		for (final Facet facet : movies.getFacets()) {
			if (selectedFacet == null) {
				selectedFacet = facet;
			}
			getLogger().info(facet.toString());
			getLogger().info(facet.getDefinition().getLabel().getDisplay());
			for(final Entry<FacetValue, Long> entry : facet.getFacetValues().entrySet()) {
				if (selectedFacetValue == null) {
					selectedFacetValue = entry.getKey();
					facetCount = entry.getValue();
				}
				getLogger().info(entry.getKey().getLabel().getDisplay() + " : " + entry.getValue());
				getLogger().info("filter " + entry.getKey().getListFilter().getFilterValue());
			}
		}
		getLogger().info("results : " + movies.getCount());
		//Recherche avec une facette renseignée.
		getLogger().info("facet filter : " +selectedFacetValue.getListFilter().getFilterValue());
		final FacetSelection sel = new FacetSelection(selectedFacet.getDefinition().getName(),selectedFacetValue.getLabel().getDisplay(), selectedFacetValue.getListFilter());
		movies = movieServices.getMoviesByCriteria(crit, sel);
		getLogger().info("results : " + movies.getCount());
		Assert.assertEquals(facetCount, movies.getCount());
		for (   final Facet  facetResult : movies.getFacets()) {
			getLogger().info(facetResult.toString());
			getLogger().info(facetResult.getDefinition().getLabel().getDisplay());
			for(final Entry<FacetValue, Long> entry : facetResult.getFacetValues().entrySet()) {
				getLogger().info(entry.getKey().getLabel().getDisplay() + " : " + entry.getValue());
			}
		}
	}

}
