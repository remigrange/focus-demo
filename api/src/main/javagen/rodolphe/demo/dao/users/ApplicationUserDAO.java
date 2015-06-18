package rodolphe.demo.dao.users;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.users.ApplicationUser;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * ApplicationUserDAO
 */
public final class ApplicationUserDAO extends DAOBroker<ApplicationUser, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public ApplicationUserDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(ApplicationUser.class, persistenceManager, taskManager);
	}
	

}
