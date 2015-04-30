/**
 *
 */
package rodolphe.demo.services.common;

import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.transaction.Transactional;
import io.vertigo.vega.rest.engine.UiContext;
import io.vertigo.vega.rest.model.UiListState;

import javax.inject.Inject;

import rodolphe.demo.domain.common.SearchCriteria;
import rodolphe.demo.domain.common.SelectedFacet;
import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.domain.search.FacetConst;
import rodolphe.demo.services.movie.MovieServices;
import rodolphe.demo.services.people.PeopleServices;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.services.search.SearchCriterium;

/**
 * Implementation of common ws.
 *
 * @author JDALMEIDA
 */
public class CommonServicesImpl implements CommonServices {

    @Inject
    private MovieServices movieServices;
    @Inject
    private PeopleServices peopleServices;

    /** {@inheritDoc} */
    @Override
    @Transactional
    public Object search(final SearchCriteria searchCriteria, final DtList<SelectedFacet> selection,
            final UiListState uiListState, final String clusteringFacetName) {
        final MovieCriteria movieCriteria = new MovieCriteria();
        final String searchText = searchCriteria.getQuery();
        final String scope = searchCriteria.getScope();
        movieCriteria.setTitle(searchText);
        final PeopleCriteria peopleCriteria = new PeopleCriteria();
        peopleCriteria.setPeoName(searchText);
        peopleCriteria.setFirstName(searchText);
        peopleCriteria.setLastName(searchText);
        final FacetSelection[] facetSel = getFacetSelectionList(selection);
        if (CodeScope.MOVIE.name().equals(scope)) {
            return movieServices.getMoviesByCriteria(movieCriteria, uiListState, clusteringFacetName, facetSel);
        } else if (CodeScope.PEOPLE.name().equals(scope)) {
            return peopleServices.getPeopleByCriteria(peopleCriteria, uiListState, clusteringFacetName, facetSel);
        } else {
            final UiContext uiContext = new UiContext();
            final FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> movies = movieServices
                    .getMoviesByCriteria(movieCriteria, uiListState, clusteringFacetName, facetSel);
            final FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> people = peopleServices
                    .getPeopleByCriteria(peopleCriteria, uiListState, clusteringFacetName, facetSel);
            final UiContext result = new UiContext();
            result.put("Movies", movies.getDtList());
            result.put("People", people.getDtList());
            uiContext.put("list", result);
            uiContext.put("totalRecords", movies.getCount() + people.getCount());
            return uiContext;
        }
    }

    /** {@inheritDoc} */
    @Override
    public FacetSelection[] getFacetSelectionList(final DtList<SelectedFacet> selectedFacets) {
        final FacetSelection[] facetSelections = new FacetSelection[selectedFacets.size()];
        // facet selection list.
        for (int i = 0; i < selectedFacets.size(); i++) {
            final SelectedFacet selectedFacet = selectedFacets.get(i);
            FacetConst selectedFacetConst = null;
            final FacetConst[] facets = FacetConst.values();
            for (final FacetConst facetConst : facets) {
                if (facetConst.getFacetName().equalsIgnoreCase(selectedFacet.getKey())) {
                    selectedFacetConst = facetConst;
                    break;
                }
            }
            if (selectedFacetConst != null) {
                final ListFilter filter = new ListFilter(selectedFacetConst.getField().name() + ":\""
                        + selectedFacet.getValue() + "\"");
                facetSelections[i] = new FacetSelection(selectedFacetConst.name(), selectedFacet.getValue(), filter);
            }
        }
        return facetSelections;
    }
}
