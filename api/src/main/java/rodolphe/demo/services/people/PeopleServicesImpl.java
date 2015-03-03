package rodolphe.demo.services.people;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.transaction.Transactional;
import rodolphe.demo.dao.people.PeopleDAO;
import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.domain.movies.SearchRet;
import rodolphe.demo.domain.people.People;

/**
 * Implementation of People Services.
 * @author JDALMEIDA
 *
 */
public class PeopleServicesImpl implements PeopleServices {

	@Inject PeopleDAO peopleDAO;
	@Override
	@Transactional
	public DtList<SearchRet> getPeople(String searchText) {
		DtList<People> peopleList = peopleDAO.getPeopleByCriteria(searchText);
		DtList<SearchRet> ret = new DtList<>(SearchRet.class);
		for(People people : peopleList){
			SearchRet searchRet = new SearchRet();
			searchRet.setType(CodeScope.PEOPLE.name());
			searchRet.setField1(String.valueOf(people.getPeoId()));
			searchRet.setField2(people.getPeoName());
			ret.add(searchRet);
		}
		return ret;
	}

}
