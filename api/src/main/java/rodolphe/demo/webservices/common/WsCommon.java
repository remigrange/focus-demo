/**
 *
 */
package rodolphe.demo.webservices.common;

import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.InnerBodyParam;
import io.vertigo.vega.rest.stereotype.POST;

import javax.inject.Inject;

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
	public Object search(@InnerBodyParam("scope") final String scope, @InnerBodyParam("searchText") final String searchText) {
		return commonServices.search(scope, searchText);

	}

}
