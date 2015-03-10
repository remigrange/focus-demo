package rodolphe.demo.services.people;

import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.transaction.Transactional;

import javax.inject.Inject;

import rodolphe.demo.dao.people.PeopleDAO;
import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.domain.movies.SearchRet;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.domain.search.FacetedSearchConst;
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


	@Override
	@Transactional
	public DtList<SearchRet> getPeople(final String searchText) {
		final DtList<People> peopleList = peopleDAO.getPeopleByCriteria(searchText);
		final DtList<SearchRet> ret = new DtList<>(SearchRet.class);
		for(final People people : peopleList){
			final SearchRet searchRet = new SearchRet();
			searchRet.setType(CodeScope.PEOPLE.name());
			searchRet.setField1(String.valueOf(people.getPeoId()));
			searchRet.setField2(people.getPeoName());
			ret.add(searchRet);
		}
		return ret;
	}


	/* (non-Javadoc)
	 * @see rodolphe.demo.services.people.PeopleServices#getPeopleByCriteria(rodolphe.demo.domain.people.PeopleCriteria, io.vertigo.dynamo.collections.model.Facet[])
	 */
	/** {@inheritDoc} */
	@Override
	public FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> getPeopleByCriteria(
			final PeopleCriteria crit, final Facet... facets) {
		final SearchCriterium<PeopleCriteria> criteria = new SearchCriterium<>(
				FacetedSearchConst.QRY_PEOPLE_WO_FCT.getQuery());
		/*final SearchCriterium<PeopleCriteria> criteria = new SearchCriterium<>(
				FacetedSearchConst.QRY_MOVIE_WITH_FCT.getQuery());
		criteria.setCriteria(crit);
		if(facets!=null && facets.length>0){
			final List<Facet> facetList = new ArrayList<Facet>();
			for(final Facet facet : facets){
				facetList.add(facet);
			}
			criteria.setFacets(facetList);
		}*/
		criteria.setCriteria(crit);
		final FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> res = searchServices.searchPeople(criteria);
		return res;
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

}
