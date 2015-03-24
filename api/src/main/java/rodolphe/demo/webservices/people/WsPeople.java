package rodolphe.demo.webservices.people;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.model.UiListState;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.POST;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.QueryParam;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.domain.people.PeopleView;
import rodolphe.demo.services.people.PeopleServices;
import rodolphe.demo.services.search.SearchCriterium;

/**
 * Webservice about Movie.
 *
 * @author JDALMEIDA
 */
public final class WsPeople implements RestfulService {

    @Inject
    private PeopleServices peopleServices;

    /**
     * Search people
     *
     * @param peopleCriteria search criteria
     * @param uiListState uiListState
     * @return search results
     */
    @POST("/people")
    @AnonymousAccessAllowed
    public FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> getPeopleByCriteria(
            final PeopleCriteria peopleCriteria, @QueryParam("") final UiListState uiListState) {
        return peopleServices.getPeopleByCriteria(peopleCriteria, uiListState);
    }

    /**
     * Get people by identifier.
     *
     * @param peoId identifier
     * @return people
     */
    @GET("/people/{id}")
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
    // TODO: change the ws name.
    @POST("/people/new")
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
    @GET("/people/{id}/movies")
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
    @GET("/people/{id}/peopleView")
    @AnonymousAccessAllowed
    public PeopleView getPeopleDetails(@PathParam("id") final long peoId) {
        return peopleServices.getPeopleDetails(peoId);
    }
}
