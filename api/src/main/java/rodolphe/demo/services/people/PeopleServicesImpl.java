package rodolphe.demo.services.people;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.persistence.criteria.FilterCriteria;
import io.vertigo.dynamo.persistence.criteria.FilterCriteriaBuilder;

import javax.inject.Inject;

import rodolphe.demo.dao.people.PeopleDAO;
import rodolphe.demo.dao.people.RolePeopleDAO;
import rodolphe.demo.domain.DtDefinitions.RolePeopleFields;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.domain.people.RolePeople;
import rodolphe.demo.domain.search.FacetedSearchConst;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.services.search.SearchCriterium;
import rodolphe.demo.services.search.SearchServices;

/**
 * Implementation of People Services.
 * @author JDALMEIDA
 *
 */
public class PeopleServicesImpl implements PeopleServices {

	@Inject
	private PeopleDAO peopleDAO;
	@Inject
	private SearchServices searchServices;
	@Inject
	private RolePeopleDAO rolePeopleDAO ;


	/** {@inheritDoc} */
	@Override
	public FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> getPeopleByCriteria(
			final PeopleCriteria crit, final FacetSelection ...selection) {
		final SearchCriterium<PeopleCriteria> criteria = new SearchCriterium<>(
				FacetedSearchConst.QRY_PEOPLE_WO_FCT.getQuery());
		criteria.setCriteria(crit);
		for (final FacetSelection sel : selection) {
			criteria.addFacet(sel.getFacetName(), sel.getFacetValueKey(), sel.getFacetQuery());
		}
		//final FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> res = searchServices.searchPeople(criteria);
		return  searchServices.searchPeople(criteria);
	}


	/** {@inheritDoc} */
	@Override
	public People getPeople(final Long peopId) {
		return peopleDAO.get(peopId) ;
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
	public DtList<Movie> getMoviesByPeo(final Long peoId) {
		final DtList<Movie> ret = new DtList<>(Movie.class);
		final FilterCriteria<RolePeople> rolePeopleCriteria= new FilterCriteriaBuilder<RolePeople>()
				.withFilter(RolePeopleFields.PEO_ID.name(), peoId)
				.build();
		final DtList<RolePeople> rolePeopleList = rolePeopleDAO.getList(rolePeopleCriteria, Integer.MAX_VALUE);
		for(final RolePeople  rolePeople : rolePeopleList){
			ret.add(rolePeople.getMovie());
		}
		return ret;
	}

}
