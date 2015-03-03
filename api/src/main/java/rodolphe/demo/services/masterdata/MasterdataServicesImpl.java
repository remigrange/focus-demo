package rodolphe.demo.services.masterdata;

import java.util.ArrayList;
import java.util.List;

import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.util.ReferenceObject;

/**
 * Implementations of masterdata services.
 * 
 * @author JDALMEIDA
 *
 */
public class MasterdataServicesImpl implements MasterdataServices {

	@Override
	public List<ReferenceObject> getScopeList() {
		List<ReferenceObject> ret = new ArrayList<ReferenceObject>();
		CodeScope [] list = CodeScope.values();
		for(CodeScope code : list){
			ret.add(new ReferenceObject(code.name(), code.name(), true));
		}
		return ret;
	}

}
