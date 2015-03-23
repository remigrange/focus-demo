/**
 *
 */
package roldophe.demo.people;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.model.UiListState;

import javax.inject.Inject;

import org.junit.Test;

import rodolphe.demo.domain.DtDefinitions.PeopleCriteriaFields;
import rodolphe.demo.domain.DtDefinitions.PeopleFields;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.services.people.PeopleServices;
import rodolphe.demo.services.search.PeopleSearchHandler;
import rodolphe.demo.util.MemorizeTnrData;
import roldophe.demo.tools.AbstractEsSearchTestCase;

/**
 * @author JDALMEIDA
 */
public class SearchPeopleTest extends AbstractEsSearchTestCase<PeopleCriteria, PeopleResult> {

	@Inject
	PeopleServices peopleServices;

	/*
	 * (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractEsSearchTestCase#getCritereForEsSearchWithUniqueResultAsSU()
	 */
	/** {@inheritDoc} */
	@Override
	protected PeopleCriteria getCritereForEsSearchWithUniqueResultAsSU() {
		final People peo = createNewPeople();
		final PeopleCriteria crit = new PeopleCriteria();
		crit.setPeoId(peo.getPeoId());
		return crit;
	}

	public static People getNewPeople() {
		final People peo = new People();
		peo.setPeoName("TNR_NOM TNR_PRENOM");
		peo.setImdbid("id");
		peo.setFirstName("TNR_PRENOM");
		peo.setLastName("TNR_NOM");
		peo.setTitCd("M");
		return peo;
	}

	private People createNewPeople() {
		final People peo = getNewPeople();
		peopleServices.savePeople(peo);
		return peo;
	}

	/*
	 * (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractSearchTestCase#getDataSenderClass()
	 */
	/** {@inheritDoc} */
	@Override
	protected Class<? extends MemorizeTnrData> getDataSenderClass() {
		return PeopleSearchHandler.class;
	}

	/*
	 * (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractSearchTestCase#getListByCritere(io.vertigo.dynamo.domain.model.DtObject)
	 */
	/** {@inheritDoc} */
	@Override
	protected DtList<PeopleResult> getListByCritere(final PeopleCriteria critere) {
		final UiListState uiListState = new UiListState(50, 0, null, false, null);
		return peopleServices.getPeopleByCriteria(critere, uiListState).getDtList();
	}

	/*
	 * (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractSearchTestCase#getId(io.vertigo.dynamo.domain.model.DtObject)
	 */
	/** {@inheritDoc} */
	@Override
	protected Long getId(final PeopleResult dto) {
		return dto.getPeoId();
	}

	/*
	 * (non-Javadoc)
	 * @see roldophe.demo.tools.AbstractSearchTestCase#getIdForCritere(io.vertigo.dynamo.domain.model.DtObject)
	 */
	/** {@inheritDoc} */
	@Override
	protected Long getIdForCritere(final PeopleCriteria critere) {
		return critere.getPeoId();
	}

	/**
	 * Search people by the name.
	 */
	@Test
	public void searchByPeoName() {
		final PeopleCriteria crit = getCritereForSearchWithUniqueResultAsSU();
		final People peo = peopleServices.getPeople(getIdForCritere(crit));
		verifierRechercheTokenBeginWoAccent(crit, PeopleCriteriaFields.PEO_NAME, peo, PeopleFields.PEO_NAME,
				peopleServices, "savePeople");
	}
}
