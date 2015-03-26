/**
 *
 */
package roldophe.demo.common;

import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetValue;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.model.UiListState;

import java.util.Map.Entry;

import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.junit.Test;

import rodolphe.demo.domain.common.SearchCriteria;
import rodolphe.demo.domain.common.SearchRet;
import rodolphe.demo.domain.common.SelectedFacet;
import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.domain.search.FacetConst;
import rodolphe.demo.services.common.CommonServices;
import rodolphe.demo.services.search.SearchCriterium;
import roldophe.demo.tools.AbstractRodolpheTestCase;

/**
 * Test for common service.
 *
 * @author JDALMEIDA
 */
public class CommonTest extends AbstractRodolpheTestCase {

    @Inject
    private CommonServices commonServices;

    /**
     * Test search method.
     */
    @Test
    public void testSearchMovie() {
        // Test for movie
        final SearchCriteria criteria = new SearchCriteria();
        criteria.setScope(CodeScope.MOVIE.name());
        criteria.setSearchText("Fantastic");
        final UiListState uiListState = new UiListState(50, 0, null, false, null);
        final DtList<SelectedFacet> selection = new DtList<>(SelectedFacet.class);
        FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> movies = (FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>>) commonServices
                .search(criteria, selection, uiListState, "");
        Logger.getLogger(getClass()).info("result : " + movies.getCount());
        for (final Facet facet : movies.getFacets()) {
            getLogger().info(facet.getDefinition().getLabel().getDisplay());
            for (final Entry<FacetValue, Long> entry : facet.getFacetValues().entrySet()) {
                getLogger().info(entry.getKey().getLabel().getDisplay() + " : " + entry.getValue());
                getLogger().info("filter " + entry.getKey().getListFilter().getFilterValue());
            }
        }
        // Test with selected facet.
        final SelectedFacet selected = new SelectedFacet();
        selected.setKey(FacetConst.FCT_MOVIE_COUNTRY.getFacetName());
        selected.setValue("USA");
        selection.add(selected);
        movies = (FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>>) commonServices.search(criteria,
                selection, uiListState, "");
        Logger.getLogger(getClass()).info("result with facet : " + movies.getCount());
    }

    /**
     * Test search method.
     */
    @Test
    public void testSearchPeople() {
        // Test for people
        final SearchCriteria criteria = new SearchCriteria();
        criteria.setScope(CodeScope.PEOPLE.name());
        criteria.setSearchText("Jen");
        final UiListState uiListState = new UiListState(50, 0, null, false, null);
        final DtList<SelectedFacet> selection = new DtList<>(SelectedFacet.class);
        final FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> people = (FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>>) commonServices
                .search(criteria, selection, uiListState, "");
        Logger.getLogger(getClass()).info("result : " + people.getCount());
    }

    /**
     * Test search method.
     */
    @Test
    public void testSearchAll() {
        // Test for all
        final SearchCriteria criteria = new SearchCriteria();
        criteria.setScope(CodeScope.ALL.name());
        criteria.setSearchText("Jen");
        final UiListState uiListState = new UiListState(50, 0, null, false, null);
        final DtList<SelectedFacet> selection = new DtList<>(SelectedFacet.class);
        final DtList<SearchRet> ret = (DtList<SearchRet>) commonServices.search(criteria, selection, uiListState, "");
        Logger.getLogger(getClass()).info("result : " + ret.size());
    }
}
