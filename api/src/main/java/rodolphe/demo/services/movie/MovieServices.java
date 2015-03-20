package rodolphe.demo.services.movie;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.lang.Component;
import io.vertigo.vega.rest.model.UiListState;
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
	 * @param uiListState uiListState
	 * @return result
	 */
	FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMoviesByCriteria(MovieCriteria crit, UiListState uiListState, FacetSelection ...selection);



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

	int cleanMovieTitle(int minRow, int maxRows);

}
