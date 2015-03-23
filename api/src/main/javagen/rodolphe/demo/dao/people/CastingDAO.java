package rodolphe.demo.dao.people;

import javax.inject.Inject;

import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * CastingDAO
 */
public final class CastingDAO extends DAOBroker<rodolphe.demo.domain.people.Casting, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public CastingDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(rodolphe.demo.domain.people.Casting.class, persistenceManager, taskManager);
	}
}
