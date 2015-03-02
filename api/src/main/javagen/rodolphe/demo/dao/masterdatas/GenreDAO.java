package rodolphe.demo.dao.masterdatas;

import javax.inject.Inject;

import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * GenreDAO
 */
public final class GenreDAO extends DAOBroker<rodolphe.demo.domain.masterdatas.Genre, java.lang.String> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public GenreDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(rodolphe.demo.domain.masterdatas.Genre.class, persistenceManager, taskManager);
	}
}
