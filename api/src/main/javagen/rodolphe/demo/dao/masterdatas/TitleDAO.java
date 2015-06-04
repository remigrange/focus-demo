package rodolphe.demo.dao.masterdatas;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.masterdatas.Title;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * TitleDAO
 */
public final class TitleDAO extends DAOBroker<Title, java.lang.String> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public TitleDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(Title.class, persistenceManager, taskManager);
	}
	

}
