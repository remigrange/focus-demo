/**
 *
 */
package rodolphe.demo.services.common;

import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetValue;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.transaction.Transactional;
import io.vertigo.util.MapBuilder;
import io.vertigo.vega.rest.engine.UiContext;
import io.vertigo.vega.rest.model.UiListState;
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

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

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
            return constructSearchResponse(movieServices.getMoviesByCriteria(movieCriteria, uiListState, clusteringFacetName, facetSel), CodeScope.MOVIE.name());
        } else if (CodeScope.PEOPLE.name().equals(scope)) {
            return constructSearchResponse(peopleServices.getPeopleByCriteria(peopleCriteria, uiListState, clusteringFacetName, facetSel), CodeScope.PEOPLE.name());
        } else {
            final UiContext uiContext = new UiContext();
            final FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> movies = movieServices
                    .getMoviesByCriteria(movieCriteria, uiListState, clusteringFacetName, facetSel);
            final FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> people = peopleServices
                    .getPeopleByCriteria(peopleCriteria, uiListState, clusteringFacetName, facetSel);

            final UiContext result = new UiContext();
            result.put(CodeScope.MOVIE.name(), movies.getDtList());
            result.put(CodeScope.PEOPLE.name(), people.getDtList());

            final UiContext records = new UiContext();
            records.put(CodeScope.MOVIE.name(), movies.getCount());
            records.put(CodeScope.PEOPLE.name(), people.getCount());

            uiContext.put("map", result);
            uiContext.put("records", records);
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
                if (facetConst.toString().equalsIgnoreCase(selectedFacet.getKey())) {
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

    private UiContext constructSearchResponse(final FacetedQueryResult facetedQueryResult, final String type) {
        final UiContext uiContext = new UiContext();
        final UiContext results = new UiContext();
        results.put(type, facetedQueryResult.getDtList());

        uiContext.put("map", results);

        uiContext.put("facets", new HashMap(getExplicitFacets(facetedQueryResult)));
        uiContext.put("totalRecords", facetedQueryResult.getCount());
        return uiContext;
    }

    private Map<String, Map<String, Long>> getExplicitFacets(final FacetedQueryResult facetedQueryResult) {
        final MapBuilder<String, Map<String, Long>> facetsMapBuilder = new MapBuilder<>();
        for (final Object obj : facetedQueryResult.getFacets()) {
            final Facet facet = (Facet) obj;
            final MapBuilder<String, Long> facetValuesBuilder = new MapBuilder<>();
            for (final Map.Entry<FacetValue, Long> entry : facet.getFacetValues().entrySet()) {
                facetValuesBuilder.put(entry.getKey().getLabel().getDisplay(), entry.getValue());
            }
            facetsMapBuilder.put(facet.getDefinition().getName(), facetValuesBuilder.build());
        }
        return facetsMapBuilder.build();
    }
}
