package rodolphe.demo.dao.users;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.users.Profil;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * ProfilDAO
 */
public final class ProfilDAO extends DAOBroker<Profil, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public ProfilDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(Profil.class, storeManager, taskManager);
	}
	

}
