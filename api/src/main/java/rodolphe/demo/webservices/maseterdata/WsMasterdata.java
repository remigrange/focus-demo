package rodolphe.demo.webservices.maseterdata;

import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.services.masterdata.MasterdataServices;
import rodolphe.demo.util.ReferenceObject;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.GET;

/**
 * Webservices for master data.
 * 
 * @author JDALMEIDA
 *
 */
public class WsMasterdata implements RestfulService{
	
	@Inject MasterdataServices masterdataServices;
	
	
	/**
	 * Get Scope list
	 * 
	 * @return scope List
	 */
	@GET("/scopes")
	public List<ReferenceObject> getScopes() {
		return masterdataServices.getScopeList();
	}
}
