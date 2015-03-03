package rodolphe.demo.services.movie;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.transaction.Transactional;
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
	public DtList<SearchRet> getMovies(String searchText) {
		DtList<Movie> movieList = movieDAO.getMoviesByCriteria(searchText);
		DtList<SearchRet> ret = new DtList<>(SearchRet.class);
		for(Movie movie : movieList){
			SearchRet searchRet = new SearchRet();
			searchRet.setType(CodeScope.MOVIE.name());
			searchRet.setField1(String.valueOf(movie.getMovId()));
			searchRet.setField2(movie.getTitle());
			DtList<Genre> genres = movie.getGenreList();
			StringBuilder sb = new StringBuilder("");
			for(Genre genre : genres) {
				sb.append(", ");
				sb.append(genre.getLabel());
			}
			sb.replace(0, 2, "");
			searchRet.setField3(sb.toString());
			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
			searchRet.setField4(format.format(movie.getReleased()));
			ret.add(searchRet);
		}
		return ret;
	}

}
