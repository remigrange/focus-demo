package rodolphe.demo.services.people;

import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.lang.Component;
import rodolphe.demo.domain.movies.SearchRet;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.services.search.SearchCriterium;

/**
 * Services about People.
 * @author JDALMEIDA
 *
 */
public interface PeopleServices  extends Component {

	/**
	 * Search people
	 * @param searchText search criteria
	 * @return search results
	 */
	DtList<SearchRet> getPeople(String searchText);

	/**
	 * search People by criteria.
	 * @param crit criteria
	 * @return result
	 */
	FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> getPeopleByCriteria(PeopleCriteria crit, Facet ... facets);


	/**
	 * Get People by id.
	 * @param peopId people identifier
	 * @return people
	 */
	People getPeople (Long peopId);

	/**
	 * Save People
	 * @param people people
	 * @return peopel
	 */
	People savePeople(People people);
}
