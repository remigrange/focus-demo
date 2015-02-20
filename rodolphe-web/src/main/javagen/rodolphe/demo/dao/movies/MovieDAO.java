package rodolphe.demo.dao.movies;

import javax.inject.Inject;

import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * MovieDAO
 */
public final class MovieDAO extends DAOBroker<rodolphe.demo.domain.movies.Movie, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public MovieDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(rodolphe.demo.domain.movies.Movie.class, persistenceManager, taskManager);
	}
}
