package rodolphe.demo.services.people;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
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


	/* (non-Javadoc)
	 * @see rodolphe.demo.services.people.PeopleServices#getPeopleByCriteria(rodolphe.demo.domain.people.PeopleCriteria, io.vertigo.dynamo.collections.model.Facet[])
	 */
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

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.people.PeopleServices#getPeople(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	public People getPeople(final Long peopId) {
		return peopleDAO.get(peopId) ;
	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.people.PeopleServices#savePeople(rodolphe.demo.domain.people.People)
	 */
	/** {@inheritDoc} */
	@Override
	public People savePeople(final People people) {
		if (people.getPeoId() == null) {
			peopleDAO.create(people);
		} else {
			peopleDAO.update(people);
		}
		searchServices.indexPeople(people.getPeoId());
		return people;
	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.people.PeopleServices#getMoviesByPeo(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	public DtList<Movie> getMoviesByPeo(final Long peoId) {
		final DtList<Movie> ret = new DtList<>(Movie.class);
		final FilterCriteriaBuilder<RolePeople> builder= new FilterCriteriaBuilder<>();
		builder.withFilter(RolePeopleFields.PEO_ID.name(), peoId);
		final DtList<RolePeople> rolePeopleList = rolePeopleDAO.getList(builder.build(), Integer.MAX_VALUE);
		for(final RolePeople  rolePeople : rolePeopleList){
			ret.add(rolePeople.getMovie());
		}
		return ret;
	}

}
