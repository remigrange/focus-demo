package rodolphe.demo.dao.people;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.people.RolePeople;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * RolePeopleDAO
 */
public final class RolePeopleDAO extends DAOBroker<RolePeople, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public RolePeopleDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(RolePeople.class, storeManager, taskManager);
	}
	

}
