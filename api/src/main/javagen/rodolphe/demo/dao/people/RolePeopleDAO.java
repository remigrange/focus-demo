package rodolphe.demo.dao.people;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.people.RolePeople;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * RolePeopleDAO
 */
public final class RolePeopleDAO extends DAOBroker<RolePeople, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public RolePeopleDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(RolePeople.class, persistenceManager, taskManager);
	}
	

}
