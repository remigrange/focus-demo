package rodolphe.demo.dao.users;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.users.Profil;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * ProfilDAO
 */
public final class ProfilDAO extends DAOBroker<Profil, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public ProfilDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(Profil.class, persistenceManager, taskManager);
	}
	

}
