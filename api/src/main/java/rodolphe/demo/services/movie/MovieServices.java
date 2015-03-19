package rodolphe.demo.services.movie;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.lang.Component;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.movies.MovieView;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.services.search.SearchCriterium;

/**
 * Services about Movie.
 * @author JDALMEIDA
 *
 */
public interface MovieServices  extends Component {

	/**
	 * search movies by criteria.
	 * @param crit criteria
	 * @return result
	 */
	FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMoviesByCriteria(MovieCriteria crit, FacetSelection ...selection);



	/**
	 * Get a movie by its primary key.
	 * @param movId primary key
	 * @return movie
	 */
	Movie getMovie(Long movId);
	/**
	 * Create/update a movie in a database.
	 * @param mov move to save in database
	 * @return movie
	 */
	Movie saveMovie(Movie mov);

	/**
	 * Get movie's actors.
	 * @param movId moivie identifier
	 * @return people list
	 */
	DtList<People> getActors(Long movId);

	/**
	 * Get movie's Producers.
	 * @param movId moivie identifier
	 * @return people list
	 */
	DtList<People> getProducers(Long movId);

	/**
	 * Get movie's Directors.
	 * @param movId moivie identifier
	 * @return people list
	 */
	DtList<People> getDirectors(Long movId);



	/**
	 * Get all necessary movie details for MovieView.
	 *
	 * @param movId movie identifier
	 * @return MovieDetail
	 */
	MovieView getMovieDetails(Long movId);



	/**
	 * Get aggregated genres for a movie.
	 *
	 * @param movId movie identifier
	 * @return genres
	 */
	String getGenresAggregatedByMovId(Long movId);



	/**
	 * Get aggregated countrys for a movie.
	 *
	 * @param movId movie identifier
	 * @return countrys
	 */
	String getCountrysAggregatedByMovId(Long movId);



	/**
	 * Get aggregated languages for a movie.
	 *
	 * @param movId movie identifier
	 * @return languages
	 */
	String getLanguagesAggregatedByMovId(Long movId);



}
