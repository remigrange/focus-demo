package rodolphe.demo.services.masterdata;

import java.util.ArrayList;
import java.util.List;

import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.util.ReferenceObject;

/**
 * Implementations of masterdata services.
 *
 * @author JDALMEIDA
 */
public class MasterdataServicesImpl implements MasterdataServices {

    @Override
    public List<ReferenceObject> getScopeList() {
        final List<ReferenceObject> ret = new ArrayList<>();
        final CodeScope[] list = CodeScope.values();
        for (final CodeScope code : list) {
            ret.add(new ReferenceObject(code.name(), code.name(), true));
        }
        return ret;
    }
}
