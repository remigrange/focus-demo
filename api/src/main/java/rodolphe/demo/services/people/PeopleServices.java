package rodolphe.demo.services.people;

import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.lang.Component;
import io.vertigo.vega.rest.model.UiListState;

import java.util.List;

import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleIndex;
import rodolphe.demo.domain.people.PeopleView;

/**
 * Services about People.
 *
 * @author JDALMEIDA
 */
public interface PeopleServices extends Component {

	/**
	 * search People by criteria.
	 *
	 * @param crit criteria
	 * @param uiListState uiListState
	 * @param clusteringFacetName clustering facet param
	 * @param selection selected facets.
	 * @return result
	 */
	FacetedQueryResult<PeopleIndex, SearchQuery> getPeopleByCriteria(PeopleCriteria crit, UiListState uiListState,
			String clusteringFacetName, List<ListFilter> selection);

	/**
	 * Get People by id.
	 *
	 * @param peopId people identifier
	 * @return people
	 */
	People getPeople(Long peopId);

	/**
	 * Save People.
	 *
	 * @param people people
	 * @return peopel
	 */
	People savePeople(People people);

	/**
	 * Get movies in which the person acts.
	 *
	 * @param peoId people identifier
	 * @return movies list
	 */
	DtList<Movie> getMoviesByPeo(Long peoId);

	/**
	 * Get People by id.
	 *
	 * @param peoId people identifier
	 * @return people
	 */
	PeopleView getPeopleDetails(long peoId);

	/**
	 * Get movies by people ID.
	 *
	 * @param peoId people id
	 * @return movie list
	 */
	DtList<Movie> getFilmographyByPeo(final Long peoId);
}
