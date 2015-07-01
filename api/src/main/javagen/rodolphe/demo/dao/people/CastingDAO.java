package rodolphe.demo.dao.people;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.people.Casting;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * CastingDAO
 */
public final class CastingDAO extends DAOBroker<Casting, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public CastingDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(Casting.class, storeManager, taskManager);
	}
	

}
