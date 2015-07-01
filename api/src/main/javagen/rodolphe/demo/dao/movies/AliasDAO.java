package rodolphe.demo.dao.movies;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.movies.Alias;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * AliasDAO
 */
public final class AliasDAO extends DAOBroker<Alias, java.lang.Long> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public AliasDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(Alias.class, storeManager, taskManager);
	}
	

}
