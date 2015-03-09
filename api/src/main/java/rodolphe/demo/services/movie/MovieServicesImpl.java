package rodolphe.demo.services.movie;

import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.dao.movies.MovieDAO;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.search.FacetedSearchConst;
import rodolphe.demo.services.search.SearchCriterium;
import rodolphe.demo.services.search.SearchServices;

/**
 * Implementation of Movie Services.
 * @author JDALMEIDA
 *
 */
public class MovieServicesImpl implements MovieServices {

	@Inject
	private MovieDAO movieDAO;
	@Inject
	private SearchServices searchServices;


	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#getMoviesByCriteria(rodolphe.demo.domain.movies.MovieCriteria)
	 */
	/** {@inheritDoc} */
	@Override
	public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMoviesByCriteria(final MovieCriteria crit, final Facet ...facets) {
		/*final SearchCriterium<MovieCriteria> criteria = new SearchCriterium<>(
				FacetedSearchConst.QRY_MOVIE_WO_FCT.getQuery());*/
		final SearchCriterium<MovieCriteria> criteria = new SearchCriterium<>(
				FacetedSearchConst.QRY_MOVIE_WITH_FCT.getQuery());
		criteria.setCriteria(crit);
		if(facets!=null && facets.length>0){
			final List<Facet> facetList = new ArrayList<Facet>();
			for(final Facet facet : facets){
				facetList.add(facet);
			}
			criteria.setFacets(facetList);
		}
		final FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> res = searchServices.searchMovie(criteria);
		return res;//.getDtList();
	}


	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#getMovie(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public Movie getMovie(final Long movId) {
		return movieDAO.get(movId);
	}


	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#saveMovie(rodolphe.demo.domain.movies.Movie)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public void saveMovie(final Movie mov) {
		if (mov.getMovId() == null) {
			movieDAO.create(mov);
		} else {
			movieDAO.update(mov);
		}
		searchServices.indexMovie(mov.getMovId());
	}

}
