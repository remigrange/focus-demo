package rodolphe.demo.dao.masterdatas;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.masterdatas.Country;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * CountryDAO
 */
public final class CountryDAO extends DAOBroker<Country, java.lang.String> {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public CountryDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(Country.class, storeManager, taskManager);
	}
	

}
