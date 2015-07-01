package rodolphe.demo.dao.masterdatas;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.masterdatas.Language;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * LanguageDAO
 */
public final class LanguageDAO extends DAOBroker<Language, java.lang.String> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public LanguageDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(Language.class, storeManager, taskManager);
	}
	

}
