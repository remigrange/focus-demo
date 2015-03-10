package rodolphe.demo.webservices.people;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.POST;
import io.vertigo.vega.rest.stereotype.PathParam;

import javax.inject.Inject;

import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.services.people.PeopleServices;
import rodolphe.demo.services.search.SearchCriterium;
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
	public FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> getPeopleByCriteria(final PeopleCriteria peopleCriteria){
		return peopleServices.getPeopleByCriteria(peopleCriteria);

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
