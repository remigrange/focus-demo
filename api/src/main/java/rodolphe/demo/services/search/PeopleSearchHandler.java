/**
 *
 */
package rodolphe.demo.services.search;

import io.vertigo.dynamo.domain.model.DtList;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.dao.people.PeoplePAO;
import rodolphe.demo.domain.DtDefinitions.PeopleCriteriaFields;
import rodolphe.demo.domain.DtDefinitions.PeopleIndexFields;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleIndex;
import rodolphe.demo.domain.people.PeopleResult;
import rodolphe.demo.domain.people.PeopleView;

/**
 * People Search handler.
 *
 * @author JDALMEIDA
 */
public class PeopleSearchHandler extends
AbstractElasticSearchHandler<PeopleIndex, PeopleResult, PeopleView, PeopleCriteria> {

    @Inject
    private PeoplePAO peoplePAO;

    /** {@inheritDoc} */
    @Override
    protected String getIndexDefinitionName() {
        return "IDX_PEOPLE";
    }

    /** {@inheritDoc} */
    @Override
    protected DtList<PeopleView> getVue(final int rangMin, final int maxRows) {
        return peoplePAO.getPeopleView(rangMin, maxRows);
    }

    /** {@inheritDoc} */
    @Override
    protected PeopleView getVueItem(final Object key) {
        return peoplePAO.getPeopleViewByPeoId((Long) key);
    }

    /** {@inheritDoc} */
    @Override
    protected String getTranslatedCriteria(final PeopleCriteria peopleCriteria) {
        final List<String> lst = new ArrayList<>();
        addSimpleCriteriaAttribute(lst, PeopleIndexFields.PEO_ID, peopleCriteria, PeopleCriteriaFields.PEO_ID);
        addSimpleCriteriaAttribute(lst, PeopleIndexFields.PEO_NAME, peopleCriteria, PeopleCriteriaFields.PEO_NAME);
        addStartWithCriteria(lst, PeopleIndexFields.TIT_CD, peopleCriteria, PeopleCriteriaFields.TIT_CD);
        return getRequestFromCriteriaList(lst);
    }
}
