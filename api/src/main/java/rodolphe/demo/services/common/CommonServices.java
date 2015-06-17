/**
 *
 */
package rodolphe.demo.services.common;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.lang.Component;
import io.vertigo.vega.rest.model.UiListState;
import rodolphe.demo.domain.common.SearchCriteria;
import rodolphe.demo.domain.common.SelectedFacet;
import rodolphe.demo.services.search.FacetSelection;

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
	 * @param clusteringFacetName clusteringFacetName
	 * @return Object
	 */
	FacetedQueryResult<? extends DtObject, SearchQuery> search(SearchCriteria searchCriteria, final DtList<SelectedFacet> selection, final UiListState uiListState,
			String clusteringFacetName);

	/**
	 * Get facet selection from selected facet.
	 *
	 * @param selection SelectedFacet list
	 * @return facet selection list
	 */
	FacetSelection[] getFacetSelectionList(final DtList<SelectedFacet> selection);

	/**
	 * Lance la réindexation complète.
	 */
	void reindexAll();

	/**
	 * Remove all indexes.
	 */
	void removeAllIndex();
}
