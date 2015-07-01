package rodolphe.demo.dao.files;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.files.FileInfo;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * FileInfoDAO
 */
public final class FileInfoDAO extends DAOBroker<FileInfo, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public FileInfoDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(FileInfo.class, storeManager, taskManager);
	}
	

}
