package rodolphe.demo.dao.movies;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.movies.Alias;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * AliasDAO
 */
public final class AliasDAO extends DAOBroker<Alias, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public AliasDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(Alias.class, persistenceManager, taskManager);
	}
	

}
