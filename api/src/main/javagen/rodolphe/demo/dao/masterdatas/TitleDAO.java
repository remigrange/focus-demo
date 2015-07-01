package rodolphe.demo.dao.masterdatas;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.masterdatas.Title;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * TitleDAO
 */
public final class TitleDAO extends DAOBroker<Title, java.lang.String> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public TitleDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(Title.class, storeManager, taskManager);
	}
	

}
