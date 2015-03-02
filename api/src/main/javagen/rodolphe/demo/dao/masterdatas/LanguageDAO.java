package rodolphe.demo.dao.masterdatas;

import javax.inject.Inject;

import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * LanguageDAO
 */
public final class LanguageDAO extends DAOBroker<rodolphe.demo.domain.masterdatas.Language, java.lang.String> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public LanguageDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(rodolphe.demo.domain.masterdatas.Language.class, persistenceManager, taskManager);
	}
}
