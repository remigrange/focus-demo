package rodolphe.demo.dao.users;

import javax.inject.Inject;

import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * SecurityRoleDAO
 */
public final class SecurityRoleDAO extends DAOBroker<rodolphe.demo.domain.users.SecurityRole, java.lang.String> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public SecurityRoleDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(rodolphe.demo.domain.users.SecurityRole.class, persistenceManager, taskManager);
	}
}
