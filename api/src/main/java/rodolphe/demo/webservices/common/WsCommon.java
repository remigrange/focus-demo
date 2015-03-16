/**
 *
 */
package rodolphe.demo.webservices.common;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.InnerBodyParam;
import io.vertigo.vega.rest.stereotype.POST;

import javax.inject.Inject;

import rodolphe.demo.domain.common.SearchCriteria;
import rodolphe.demo.domain.common.SelectedFacet;
import rodolphe.demo.services.common.CommonServices;

/**
 *
 * Commons webservices.
 * @author JDALMEIDA
 *
 */
public class WsCommon implements RestfulService {

	@Inject
	private CommonServices commonServices;
	/**
	 * Search by scope.
	 * @param scope scope
	 * @param searchText search criteria.
	 * @return
	 */
	@POST("searchbyScope")
	@AnonymousAccessAllowed
	public Object search(@InnerBodyParam("criteria") final SearchCriteria searchCriteria , @InnerBodyParam("facets") final DtList<SelectedFacet> selection) {
		return commonServices.search(searchCriteria, selection);

	}

}
