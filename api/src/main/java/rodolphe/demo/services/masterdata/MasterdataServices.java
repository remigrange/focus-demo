package rodolphe.demo.services.masterdata;

import java.util.List;

import rodolphe.demo.util.ReferenceObject;


/**
 * Master datas services.
 * 
 * @author JDALMEIDA
 *
 */
public interface MasterdataServices {
	
	/**
	 * Get Scope list
	 * 
	 * @return scope List
	 */
	List<ReferenceObject> getScopeList();
}
