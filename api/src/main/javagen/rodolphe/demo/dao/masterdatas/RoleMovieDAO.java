package rodolphe.demo.dao.masterdatas;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.masterdatas.RoleMovie;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * RoleMovieDAO
 */
public final class RoleMovieDAO extends DAOBroker<RoleMovie, java.lang.String> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public RoleMovieDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(RoleMovie.class, storeManager, taskManager);
	}
	

}
