package rodolphe.demo.webservices.masterdata;

import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;

import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.services.masterdata.MasterdataServices;
import rodolphe.demo.util.ReferenceObject;

/**
 * Webservices for master data.
 *
 * @author JDALMEIDA
 */
public final class WsMasterdata implements RestfulService {

    @Inject
    private MasterdataServices masterdataServices;

    /**
     * Get Scope list.
     *
     * @return scope List
     */
    @GET("/scopes")
    @AnonymousAccessAllowed
    public List<ReferenceObject> getScopes() {
        return masterdataServices.getScopes();
    }
}
