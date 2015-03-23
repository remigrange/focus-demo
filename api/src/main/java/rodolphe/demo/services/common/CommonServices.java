/**
 *
 */
package rodolphe.demo.services.common;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.lang.Component;
import io.vertigo.vega.rest.model.UiListState;
import rodolphe.demo.domain.common.SearchCriteria;
import rodolphe.demo.domain.common.SelectedFacet;

/**
 * Contains commons services.
 *
 * @author JDALMEIDA
 */
public interface CommonServices extends Component {

    /**
     * Search by scope.
     *
     * @param searchCriteria criteria
     * @param selection facets.
     * @param uiListState uiListState
     * @return Object
     */
    Object search(SearchCriteria searchCriteria, final DtList<SelectedFacet> selection, final UiListState uiListState);
}
