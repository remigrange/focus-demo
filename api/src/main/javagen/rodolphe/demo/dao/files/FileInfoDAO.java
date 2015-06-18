package rodolphe.demo.dao.files;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.files.FileInfo;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * FileInfoDAO
 */
public final class FileInfoDAO extends DAOBroker<FileInfo, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public FileInfoDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(FileInfo.class, persistenceManager, taskManager);
	}
	

}
