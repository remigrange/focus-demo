/**
 *
 */
package rodolphe.demo.services.common;

import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.transaction.Transactional;

import javax.inject.Inject;

import rodolphe.demo.domain.common.SearchCriteria;
import rodolphe.demo.domain.common.SearchRet;
import rodolphe.demo.domain.common.SelectedFacet;
import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.services.movie.MovieServices;
import rodolphe.demo.services.people.PeopleServices;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.services.search.SearchCriterium;

/**
 * Implementation of common ws.
 * @author JDALMEIDA
 *
 */
public class CommonServicesImpl implements CommonServices {

	@Inject
	private MovieServices movieServices;
	@Inject
	private PeopleServices peopleServices;

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.common.CommonServices#search(java.lang.String, java.lang.String)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public Object search(final SearchCriteria searchCriteria, final DtList<SelectedFacet> selection) {
		final MovieCriteria movieCrit = new MovieCriteria();
		final String searchText = searchCriteria.getSearchText();
		final String scope = searchCriteria.getScope();
		movieCrit.setTitle(searchText);
		final PeopleCriteria peopleCrit = new PeopleCriteria();
		peopleCrit.setPeoName(searchText);
		peopleCrit.setFirstName(searchText);
		peopleCrit.setLastName(searchText);
		final FacetSelection [] facetSel = new FacetSelection[selection.size()];
		for(int i=0; i<selection.size(); i++){
			final SelectedFacet selected = selection.get(i);
			final ListFilter filter = new ListFilter(selected.getFacetQuery());
			facetSel[i]= new FacetSelection(selected.getFacetName(), selected.getFacetValueKey(), filter);

		}

		if(CodeScope.MOVIE.name().equals(scope)){
			return movieServices.getMoviesByCriteria(movieCrit,facetSel);
		} else if (CodeScope.PEOPLE.name().equals(scope)) {
			return peopleServices.getPeopleByCriteria(peopleCrit,facetSel);
		} else {
			final FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> movies = movieServices.getMoviesByCriteria(movieCrit, facetSel);
			final FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> people = peopleServices.getPeopleByCriteria(peopleCrit, facetSel);
			final DtList<SearchRet> ret = new DtList<>(SearchRet.class);

			final SearchRet searchRet = new SearchRet();
			searchRet.setType(CodeScope.MOVIE.name());
			for(final MovieResult mov : movies.getDtList()){
				searchRet.setField1(String.valueOf(mov.getMovId()));
				searchRet.setField2(mov.getTitle());
				if(mov.getReleased()!=null){
					searchRet.setField3(mov.getReleased().toString());
				}
				searchRet.setField4(mov.getGenreIds());
				ret.add(searchRet);
			}
			searchRet.setType(CodeScope.PEOPLE.name());
			for(final PeopleResult peo : people.getDtList()){
				searchRet.setField1(String.valueOf(peo.getPeoId()));
				searchRet.setField2(peo.getPeoName());
				searchRet.setField3(peo.getTitCd());
				searchRet.setField4(peo.getImdbid());
				ret.add(searchRet);
			}

			return ret;
		}
	}

}
