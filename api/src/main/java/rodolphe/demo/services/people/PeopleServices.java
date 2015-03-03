package rodolphe.demo.services.people;

import rodolphe.demo.domain.movies.SearchRet;
import io.vertigo.dynamo.domain.model.DtList;

/**
 * Services about People.
 * @author JDALMEIDA
 *
 */
public interface PeopleServices {

	/**
	 * Search people
	 * @param searchText search criteria
	 * @return search results
	 */
	DtList<SearchRet> getPeople(String searchText);
}
