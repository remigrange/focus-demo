package rodolphe.demo.services.people;

import io.vertigo.core.Home;
import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.metamodel.FacetDefinition;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.persistence.criteria.FilterCriteria;
import io.vertigo.dynamo.persistence.criteria.FilterCriteriaBuilder;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.dynamo.search.model.SearchQueryBuilder;
import io.vertigo.dynamo.transaction.Transactional;
import io.vertigo.vega.rest.model.UiListState;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.dao.movies.MovieDAO;
import rodolphe.demo.dao.people.PeopleDAO;
import rodolphe.demo.dao.people.PeoplePAO;
import rodolphe.demo.dao.people.RolePeopleDAO;
import rodolphe.demo.domain.DtDefinitions.RolePeopleFields;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleIndex;
import rodolphe.demo.domain.people.PeopleView;
import rodolphe.demo.domain.people.RolePeople;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.util.DtListStateUtil;

/**
 * Implementation of People Services.
 *
 * @author JDALMEIDA
 */
public class PeopleServicesImpl implements PeopleServices {

	private static final int MAX_ROWS = 50;
	@Inject
	private PeopleDAO peopleDAO;
	// @Inject
	// private SearchServices searchServices;
	@Inject
	private RolePeopleDAO rolePeopleDAO;
	@Inject
	private PeoplePAO peoplePAO;
	@Inject
	private MovieDAO movieDAO;

	/** {@inheritDoc} */
	@Override
	@Transactional
	public FacetedQueryResult<PeopleIndex, SearchQuery> getPeopleByCriteria(final PeopleCriteria crit,
			final UiListState uiListState, final String clusteringFacetName, final List<ListFilter> facetSelections) {
		final DtListState listState = DtListStateUtil.readUiListState(uiListState);
		//----
		final SearchQueryBuilder searchQueryBuilder = peopleDAO.createSearchQueryBuilderPeopleWithFct(crit, facetSelections);
		if (clusteringFacetName != null && !clusteringFacetName.isEmpty()) {
			final FacetDefinition clusterFacetDefinition = Home.getDefinitionSpace().resolve(clusteringFacetName, FacetDefinition.class);
			searchQueryBuilder.withFacetClustering(clusterFacetDefinition);
		}
		// -----
		return peopleDAO.loadList(searchQueryBuilder.build(), listState);
	}

	private List<ListFilter> toListFilters(final FacetSelection... facetSelections) {
		final List<ListFilter> facetListFilters = new ArrayList<>(facetSelections.length);
		for (final FacetSelection facetSelection : facetSelections) {
			facetListFilters.add(facetSelection.getFacetQuery());
		}
		return facetListFilters;
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
		//done by searchManager : searchServices.indexPeople(people.getPeoId());
		return people;
	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public DtList<Movie> getMoviesByPeo(final Long peoId) {
		final DtList<Movie> ret = new DtList<>(Movie.class);
		final FilterCriteria<RolePeople> rolePeopleCriteria = new FilterCriteriaBuilder<RolePeople>().addFilter(
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

	/** {@inheritDoc} */
	@Override
	@Transactional
	public DtList<Movie> getFilmographyByPeo(final Long peoId) {
		return movieDAO.getFilmographyByPeoId(peoId);
	}
}
