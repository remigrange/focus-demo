package rodolphe.demo.webservices.people;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.InnerBodyParam;
import io.vertigo.vega.rest.stereotype.POST;
import io.vertigo.vega.rest.stereotype.PathParam;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.SearchRet;
import rodolphe.demo.domain.people.People;
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
	@POST("/people")
	@AnonymousAccessAllowed
	public DtList<SearchRet> getPeople(@InnerBodyParam("searchText") final String searchText){
		return peopleServices.getPeople(searchText);

	}

	/**
	 * Get people by identifier.
	 * @param peoId identifier
	 * @return people
	 */
	@GET("people/{id}")
	@AnonymousAccessAllowed
	public People getPeople(@PathParam("id") final long peoId){
		return peopleServices.getPeople(peoId);
	}

	/**
	 * Save people.
	 * @param people people
	 * @return people
	 */
	@POST("people/new")
	@AnonymousAccessAllowed
	public People savePeople(final People people){
		return peopleServices.savePeople(people);
	}

}
