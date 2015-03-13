/**
 *
 */
package rodolphe.demo.services.common;

import io.vertigo.lang.Component;

/**
 * Contains commons services.
 * @author JDALMEIDA
 *
 */
public interface CommonServices  extends Component{


	/**
	 * Search by scope.
	 * @param scope scope
	 * @param searchText search criteria.
	 * @return
	 */
	public Object search(String scope, String searchText);

}
