package rodolphe.demo.services.movie;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.transaction.Transactional;

import javax.inject.Inject;

import rodolphe.demo.dao.movies.MovieDAO;
import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.domain.masterdatas.Genre;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.SearchRet;

/**
 * Implementation of Movie Services.
 * @author JDALMEIDA
 *
 */
public class MovieServicesImpl implements MovieServices {

	@Inject MovieDAO movieDAO;

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

}
