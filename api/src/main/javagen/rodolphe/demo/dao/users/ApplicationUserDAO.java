package rodolphe.demo.dao.users;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.users.ApplicationUser;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * ApplicationUserDAO
 */
public final class ApplicationUserDAO extends DAOBroker<ApplicationUser, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public ApplicationUserDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(ApplicationUser.class, storeManager, taskManager);
	}
	

}
