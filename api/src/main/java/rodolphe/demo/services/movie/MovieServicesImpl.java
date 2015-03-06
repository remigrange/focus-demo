package rodolphe.demo.services.movie;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.transaction.Transactional;

import javax.inject.Inject;

import rodolphe.demo.dao.movies.MovieDAO;
import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.domain.masterdatas.Genre;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.movies.SearchRet;
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


	@Override
	@Transactional
	public DtList<SearchRet> getMovies(final String searchText) {
		final DtList<Movie> movies = movieDAO.getMoviesByCriteria(searchText);
		final DtList<SearchRet> ret = new DtList<>(SearchRet.class);
		for(final Movie movie : movies){
			final SearchRet searchRet = new SearchRet();
			searchRet.setType(CodeScope.MOVIE.name());
			searchRet.setField1(String.valueOf(movie.getMovId()));
			searchRet.setField2(movie.getTitle());
			final DtList<Genre> genres = movie.getGenreList();
			final StringBuilder sb = new StringBuilder("");
			for(final Genre genre : genres) {
				sb.append(", ");
				sb.append(genre.getLabel());
			}
			sb.replace(0, 2, "");
			searchRet.setField3(sb.toString());
			if(movie.getReleased()!=null){
				searchRet.setField4(movie.getReleased().toString());
			}
			ret.add(searchRet);
		}
		return ret;
	}


	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#getMoviesByCriteria(rodolphe.demo.domain.movies.MovieCriteria)
	 */
	/** {@inheritDoc} */
	@Override
	public DtList<MovieResult> getMoviesByCriteria(final MovieCriteria crit) {
		final SearchCriterium<MovieCriteria> criteria = new SearchCriterium<>(
				FacetedSearchConst.QRY_MOVIE_WO_FCT.getQuery());
		criteria.setCriteria(crit);
		final FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> res = searchServices.searchMovie(criteria);
		return res.getDtList();
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
