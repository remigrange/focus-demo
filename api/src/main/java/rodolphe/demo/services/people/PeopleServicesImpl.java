package rodolphe.demo.services.people;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.persistence.criteria.FilterCriteria;
import io.vertigo.dynamo.persistence.criteria.FilterCriteriaBuilder;
import io.vertigo.dynamo.transaction.Transactional;
import io.vertigo.util.StringUtil;
import io.vertigo.vega.rest.model.UiListState;

import javax.inject.Inject;

import rodolphe.demo.dao.people.PeopleDAO;
import rodolphe.demo.dao.people.PeoplePAO;
import rodolphe.demo.dao.people.RolePeopleDAO;
import rodolphe.demo.domain.DtDefinitions.RolePeopleFields;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.domain.people.PeopleView;
import rodolphe.demo.domain.people.RolePeople;
import rodolphe.demo.domain.search.FacetConst;
import rodolphe.demo.domain.search.FacetedSearchConst;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.services.search.SearchCriterium;
import rodolphe.demo.services.search.SearchServices;

/**
 * Implementation of People Services.
 *
 * @author JDALMEIDA
 */
public class PeopleServicesImpl implements PeopleServices {

    private static final int MAX_ROWS = 50;
    @Inject
    private PeopleDAO peopleDAO;
    @Inject
    private SearchServices searchServices;
    @Inject
    private RolePeopleDAO rolePeopleDAO;
    @Inject
    private PeoplePAO peoplePAO;

    /** {@inheritDoc} */
    @Override
    public FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> getPeopleByCriteria(
            final PeopleCriteria crit, final UiListState uiListState, final String clusteringFacetName,
            final FacetSelection... selection) {
        final SearchCriterium<PeopleCriteria> criteria = new SearchCriterium<>(
                FacetedSearchConst.QRY_PEOPLE_WO_FCT.getQuery());
        criteria.setCriteria(crit);
        for (final FacetSelection sel : selection) {
            criteria.addFacet(sel.getFacetName(), sel.getFacetValueKey(), sel.getFacetQuery());
        }
        if (!StringUtil.isEmpty(uiListState.getSortFieldName())) {
            criteria.setSortAsc(!uiListState.isSortDesc());
            criteria.setSortFieldName(uiListState.getSortFieldName());
        }
        String sortFieldName = null;
        boolean isSortDesc = false;
        final DtListState listState;
        if (!StringUtil.isEmpty(uiListState.getSortFieldName())) {
            sortFieldName = uiListState.getSortFieldName();
            isSortDesc = uiListState.isSortDesc();
        }
        if (uiListState.getSkip() > 0) {
            listState = new DtListState(MAX_ROWS, (uiListState.getSkip() - 1) * MAX_ROWS, sortFieldName, isSortDesc);
        } else {
            listState = new DtListState(MAX_ROWS, 0, sortFieldName, isSortDesc);
        }
        final FacetConst facetConst = FacetConst.getFacetByName(clusteringFacetName);
        if (facetConst != null) {
            criteria.setClusteringFacetName(facetConst.name());
        }
        return searchServices.searchPeople(criteria, listState);
    }

    /** {@inheritDoc} */
    @Override
    public People getPeople(final Long peopId) {
        return peopleDAO.get(peopId);
    }

    /** {@inheritDoc} */
    @Override
    public People savePeople(final People people) {
        peopleDAO.save(people);
        searchServices.indexPeople(people.getPeoId());
        return people;
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public DtList<Movie> getMoviesByPeo(final Long peoId) {
        final DtList<Movie> ret = new DtList<>(Movie.class);
        final FilterCriteria<RolePeople> rolePeopleCriteria = new FilterCriteriaBuilder<RolePeople>().withFilter(
                RolePeopleFields.PEO_ID.name(), peoId).build();
        final DtList<RolePeople> rolePeopleList = rolePeopleDAO.getList(rolePeopleCriteria, Integer.MAX_VALUE);
        for (final RolePeople rolePeople : rolePeopleList) {
            ret.add(rolePeople.getMovie());
        }
        return ret;
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public PeopleView getPeopleDetails(final long peoId) {
        return peoplePAO.getPeopleViewForPeopleDetailsByPeoId(peoId);
    }
}
