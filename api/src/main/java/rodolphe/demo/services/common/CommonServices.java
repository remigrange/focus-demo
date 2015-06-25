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
	 * Lance la réindexation complète des intervenants.
	 */
	void reindexAllPeople();

	/**
	 * Lance la réindexation complète des films.
	 */
	void reindexAllMovies();

	/**
	 * Remove all indexes.
	 */
	void removeAllIndex();
}
