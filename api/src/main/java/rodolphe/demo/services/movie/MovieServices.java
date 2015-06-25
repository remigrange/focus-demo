package rodolphe.demo.services.movie;

import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.lang.Component;
import io.vertigo.vega.rest.model.UiListState;

import java.util.List;

import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCasting;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieIndex;
import rodolphe.demo.domain.movies.MovieView;
import rodolphe.demo.domain.people.People;

/**
 * Services about Movie.
 *
 * @author JDALMEIDA
 */
public interface MovieServices extends Component {

	/**
	 * search movies by criteria.
	 *
	 * @param crit criteria
	 * @param uiListState uiListState
	 * @param clusteringFacetName Clustering facet name
	 * @param selection selected facets.
	 * @return result
	 */
	FacetedQueryResult<MovieIndex, SearchQuery> getMoviesByCriteria(MovieCriteria crit, UiListState uiListState,
			String clusteringFacetName, List<ListFilter> selection);

	/**
	 * Get a movie by its primary key.
	 *
	 * @param movId primary key
	 * @return movie
	 */
	Movie getMovie(Long movId);

	/**
	 * Create/update a movie in a database.
	 *
	 * @param mov move to save in database
	 * @return movie
	 */
	Movie saveMovie(Movie mov);

	/**
	 * Get movie's actors.
	 *
	 * @param movId moivie identifier
	 * @return people list
	 */
	DtList<People> getActors(Long movId);

	/**
	 * Get movie's Producers.
	 *
	 * @param movId moivie identifier
	 * @return people list
	 */
	DtList<People> getProducers(Long movId);

	/**
	 * Get movie's Directors.
	 *
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
	 * Get movie castings by movie id.
	 *
	 * @param movId movie id.
	 * @return list of castings.
	 */
	DtList<MovieCasting> getMovieCastings(long movId);
}
