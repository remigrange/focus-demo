package rodolphe.demo.services.masterdata;

import io.vertigo.lang.Component;

import java.util.List;

import rodolphe.demo.util.ReferenceObject;


/**
 * Master datas services.
 *
 * @author JDALMEIDA
 *
 */
public interface MasterdataServices  extends Component {

	/**
	 * Get Scope list
	 *
	 * @return scope List
	 */
	List<ReferenceObject> getScopeList();
}
