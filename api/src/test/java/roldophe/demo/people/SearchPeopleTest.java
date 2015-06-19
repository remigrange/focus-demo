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
import rodolphe.demo.domain.people.PeopleIndex;
import rodolphe.demo.services.people.PeopleServices;
import roldophe.demo.tools.AbstractEsSearchTestCase;

/**
 * Test people service.
 *
 * @author JDALMEIDA
 */
public class SearchPeopleTest extends AbstractEsSearchTestCase<PeopleCriteria, PeopleIndex> {

	@Inject
	private PeopleServices peopleServices;

	/** {@inheritDoc} */
	@Override
	protected PeopleCriteria getCritereForEsSearchWithUniqueResultAsSU() {
		final People peo = createNewPeople();
		final PeopleCriteria crit = new PeopleCriteria();
		crit.setPeoId(peo.getPeoId());
		return crit;
	}

	/**
	 * Get new person.
	 *
	 * @return people
	 */
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

	/** {@inheritDoc} */
	@Override
	protected DtList<PeopleIndex> getListByCritere(final PeopleCriteria critere) {
		final UiListState uiListState = new UiListState(50, 0, null, false, null);
		return peopleServices.getPeopleByCriteria(critere, uiListState, "").getDtList();
	}

	/** {@inheritDoc} */
	@Override
	protected Long getId(final PeopleIndex dto) {
		return dto.getPeoId();
	}

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
