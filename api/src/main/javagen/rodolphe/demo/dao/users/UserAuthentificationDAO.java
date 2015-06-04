package rodolphe.demo.dao.users;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.users.UserAuthentification;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * UserAuthentificationDAO
 */
public final class UserAuthentificationDAO extends DAOBroker<UserAuthentification, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public UserAuthentificationDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(UserAuthentification.class, persistenceManager, taskManager);
	}
	

}
