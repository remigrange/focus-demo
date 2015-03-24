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

    /*
     * (non-Javadoc)
     * @see rodolphe.demo.services.search.AbstractElasticSearchHandler#getIndexDefinitionName()
     */
    /** {@inheritDoc} */
    @Override
    protected String getIndexDefinitionName() {
        return "IDX_PEOPLE";
    }

    /*
     * (non-Javadoc)
     * @see rodolphe.demo.services.search.AbstractElasticSearchHandler#getVue(int, int)
     */
    /** {@inheritDoc} */
    @Override
    protected DtList<PeopleView> getVue(final int rangMin, final int maxRows) {
        return peoplePAO.getPeopleView(rangMin, maxRows);
    }

    /*
     * (non-Javadoc)
     * @see rodolphe.demo.services.search.AbstractElasticSearchHandler#getVueItem(java.lang.Object)
     */
    /** {@inheritDoc} */
    @Override
    protected PeopleView getVueItem(final Object key) {
        return peoplePAO.getPeopleViewByPeoId((Long) key);
    }

    /*
     * (non-Javadoc)
     * @see
     * rodolphe.demo.services.search.AbstractElasticSearchHandler#getTranslatedCriteria(io.vertigo.dynamo.domain.model
     * .DtObject)
     */
    /** {@inheritDoc} */
    @Override
    protected String getTranslatedCriteria(final PeopleCriteria criterium) {
        final List<String> lst = new ArrayList<>();
        addSimpleCriteriaAttribute(lst, PeopleIndexFields.PEO_ID, criterium, PeopleCriteriaFields.PEO_ID);
        addSimpleCriteriaAttribute(lst, PeopleIndexFields.PEO_NAME, criterium, PeopleCriteriaFields.PEO_NAME);
        addStartWithCriteria(lst, PeopleIndexFields.TIT_CD, criterium, PeopleCriteriaFields.TIT_CD);
        return getRequestFromCriteriaList(lst);
    }
}
