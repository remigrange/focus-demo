package rodolphe.demo.webservices.people;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.InnerBodyParam;
import io.vertigo.vega.rest.stereotype.POST;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.SearchRet;
import rodolphe.demo.services.people.PeopleServices;
/**
 * Webservice about Movie.
 *
 * @author JDALMEIDA
 *
 */
public class WsPeople implements RestfulService{

	@Inject PeopleServices peopleServices;

	/**
	 * Search people
	 * @param searchText search criteria
	 * @return search results
	 */
	@AnonymousAccessAllowed
	@POST("/people")
	public DtList<SearchRet> getPeople(@InnerBodyParam("searchText") final String searchText){
		return peopleServices.getPeople(searchText);

	}

}
