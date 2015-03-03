package rodolphe.demo.webservices.people;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.SearchRet;
import rodolphe.demo.services.people.PeopleServices;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.InnerBodyParam;
import io.vertigo.vega.rest.stereotype.POST;
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
	@POST("/people")
	public DtList<SearchRet> getPeople(@InnerBodyParam("searchText") String searchText){
		return peopleServices.getPeople(searchText);
		
	}

}
