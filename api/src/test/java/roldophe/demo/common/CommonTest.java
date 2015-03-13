/**
 *
 */
package roldophe.demo.common;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;

import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.junit.Test;

import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.movies.SearchRet;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.services.common.CommonServices;
import rodolphe.demo.services.search.SearchCriterium;
import roldophe.demo.tools.AbstractRodolpheTestCase;

/**
 * Test for common service.
 * @author JDALMEIDA
 *
 */
public class CommonTest extends AbstractRodolpheTestCase{

	@Inject
	CommonServices commonServices;

	@Test
	public void testSearchMovie(){
		//Test for movie
		final FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> movies  = (FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>>)
				commonServices.search(CodeScope.MOVIE.name(), "Fantastic");
		Logger.getLogger(getClass()).info("result : "+ movies.getCount());

	}
	@Test
	public void testSearchPeople(){
		//Test for people
		final FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> people = (FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>>)
				commonServices.search(CodeScope.PEOPLE.name(), "Jen");
		Logger.getLogger(getClass()).info("result : "+ people.getCount());

	}
	@Test
	public void testSearchAll(){
		//Test for all
		final DtList<SearchRet> ret = (DtList<SearchRet>) commonServices.search("ALL", "Allen");
		Logger.getLogger(getClass()).info("result : "+ ret.size());

	}

}
