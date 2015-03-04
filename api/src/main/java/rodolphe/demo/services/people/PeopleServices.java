package rodolphe.demo.services.people;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.lang.Component;
import rodolphe.demo.domain.movies.SearchRet;

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
}
