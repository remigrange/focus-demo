package rodolphe.demo.services.people;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.lang.Component;
import io.vertigo.vega.rest.model.UiListState;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.services.search.SearchCriterium;

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
     * @return result
     */
    FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> getPeopleByCriteria(PeopleCriteria crit,
            UiListState uiListState, FacetSelection... selection);

    /**
     * Get People by id.
     * 
     * @param peopId people identifier
     * @return people
     */
    People getPeople(Long peopId);

    /**
     * Save People
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
}
