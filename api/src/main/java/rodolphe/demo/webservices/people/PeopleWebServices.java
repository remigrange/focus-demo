package rodolphe.demo.webservices.people;

import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.model.UiListState;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.POST;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.PathPrefix;
import io.vertigo.vega.rest.stereotype.QueryParam;

import java.util.Collections;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleIndex;
import rodolphe.demo.domain.people.PeopleView;
import rodolphe.demo.services.people.PeopleServices;

/**
 * Webservice about Movie.
 *
 * @author JDALMEIDA
 */
@PathPrefix("/people")
public final class PeopleWebServices implements RestfulService {

	@Inject
	private PeopleServices peopleServices;

	/**
	 * Search people.
	 *
	 * @param peopleCriteria search criteria
	 * @param uiListState uiListState
	 * @return search results
	 */
	@POST("")
	@AnonymousAccessAllowed
	public FacetedQueryResult<PeopleIndex, SearchQuery> getPeopleByCriteria(
			final PeopleCriteria peopleCriteria, @QueryParam("") final UiListState uiListState) {
		return peopleServices.getPeopleByCriteria(peopleCriteria, uiListState, "", Collections.<ListFilter> emptyList());
	}

	/**
	 * Get people by identifier.
	 *
	 * @param peoId identifier
	 * @return people
	 */
	@GET("/{id}")
	@AnonymousAccessAllowed
	public People getPeople(@PathParam("id") final long peoId) {
		return peopleServices.getPeople(peoId);
	}

	/**
	 * Save people.
	 *
	 * @param people people
	 * @return people
	 */
	// TODO change the ws name.
	@POST("/new")
	@AnonymousAccessAllowed
	public People savePeople(final People people) {
		return peopleServices.savePeople(people);
	}

	/**
	 * Get movies in which the person acts.
	 *
	 * @param peoId people identifier
	 * @return movies list
	 */
	@GET("/{id}/movies")
	@AnonymousAccessAllowed
	public DtList<Movie> getMoviesByPeo(@PathParam("id") final Long peoId) {
		return peopleServices.getMoviesByPeo(peoId);
	}

	/**
	 * Get people by id.
	 *
	 * @param peoId people id.
	 * @return people.
	 */
	// todo: rename in /people/{id}/detail
	@GET("/{id}/detail")
	@AnonymousAccessAllowed
	public PeopleView getPeopleDetails(@PathParam("id") final long peoId) {
		return peopleServices.getPeopleDetails(peoId);
	}

	/**
	 * Get movies in which the person acts.
	 *
	 * @param peoId people identifier
	 * @return movies list
	 */
	@GET("/{id}/filmography")
	@AnonymousAccessAllowed
	public DtList<Movie> getFilmographyByPeo(@PathParam("id") final Long peoId) {
		return peopleServices.getFilmographyByPeo(peoId);
	}
}
