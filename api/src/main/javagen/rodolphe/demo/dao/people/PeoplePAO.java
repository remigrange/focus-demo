package rodolphe.demo.dao.people;

import javax.inject.Inject;

import io.vertigo.core.Home;
import io.vertigo.lang.Assertion;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.task.model.TaskResult;

/**
 * PAO : Accès aux objects du package. 
 * PeoplePAO
 */
public final class PeoplePAO {
	/** Liste des taches. */
	private static enum Tasks {
		/** Tache TK_GET_PEOPLE_INDEX */
		TK_GET_PEOPLE_INDEX,
		/** Tache TK_GET_PEOPLE_VIEW_BY_PEO_ID */
		TK_GET_PEOPLE_VIEW_BY_PEO_ID,
		/** Tache TK_GET_PEOPLE_VIEW_FOR_PEOPLE_DETAILS_BY_PEO_ID */
		TK_GET_PEOPLE_VIEW_FOR_PEOPLE_DETAILS_BY_PEO_ID,
	}

	/** Constante de paramètre de la tache DTC_PEOPLE_IDS. */
	private static final String ATTR_IN_TK_GET_PEOPLE_INDEX_DTC_PEOPLE_IDS = "DTC_PEOPLE_IDS";

	/** Constante de paramètre de la tache DTC_PEOPLE. */
	private static final String ATTR_OUT_TK_GET_PEOPLE_INDEX_DTC_PEOPLE = "DTC_PEOPLE";

	/** Constante de paramètre de la tache PEO_ID. */
	private static final String ATTR_IN_TK_GET_PEOPLE_VIEW_BY_PEO_ID_PEO_ID = "PEO_ID";

	/** Constante de paramètre de la tache DTO_PEOPLE. */
	private static final String ATTR_OUT_TK_GET_PEOPLE_VIEW_BY_PEO_ID_DTO_PEOPLE = "DTO_PEOPLE";

	/** Constante de paramètre de la tache PEO_ID. */
	private static final String ATTR_IN_TK_GET_PEOPLE_VIEW_FOR_PEOPLE_DETAILS_BY_PEO_ID_PEO_ID = "PEO_ID";

	/** Constante de paramètre de la tache DTO_PEOPLE. */
	private static final String ATTR_OUT_TK_GET_PEOPLE_VIEW_FOR_PEOPLE_DETAILS_BY_PEO_ID_DTO_PEOPLE = "DTO_PEOPLE";

	private final TaskManager taskManager;

	/**
	 * Constructeur.
	 * @param taskManager Manager des Task
	 */
	@Inject
	public PeoplePAO(final TaskManager taskManager) {
		Assertion.checkNotNull(taskManager);
		//---------------------------------------------------------------------
		this.taskManager = taskManager;
	}

	/**
	 * Création d'une tache.
	 * @param task Type de la tache
	 * @return Builder de la tache
	 */
	private TaskBuilder createTaskBuilder(final Tasks task) {
		final TaskDefinition taskDefinition = Home.getDefinitionSpace().resolve(task.toString(), TaskDefinition.class);
		return new TaskBuilder(taskDefinition);
	}

	/**
	 * Execute la tache TK_GET_PEOPLE_INDEX.
	 * @param dtcPeopleIds io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.common.Dummy> 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.PeopleIndex> dtcPeople
	*/
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.PeopleIndex> getPeopleIndex(final io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.common.Dummy> dtcPeopleIds) {
		final Task task = createTaskBuilder(Tasks.TK_GET_PEOPLE_INDEX)
				.addValue(ATTR_IN_TK_GET_PEOPLE_INDEX_DTC_PEOPLE_IDS, dtcPeopleIds)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_PEOPLE_INDEX_DTC_PEOPLE);
	}

	/**
	 * Execute la tache TK_GET_PEOPLE_VIEW_BY_PEO_ID.
	 * @param peoId Long 
	 * @return rodolphe.demo.domain.people.PeopleView dtoPeople
	*/
	public rodolphe.demo.domain.people.PeopleView getPeopleViewByPeoId(final Long peoId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_PEOPLE_VIEW_BY_PEO_ID)
				.addValue(ATTR_IN_TK_GET_PEOPLE_VIEW_BY_PEO_ID_PEO_ID, peoId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_PEOPLE_VIEW_BY_PEO_ID_DTO_PEOPLE);
	}

	/**
	 * Execute la tache TK_GET_PEOPLE_VIEW_FOR_PEOPLE_DETAILS_BY_PEO_ID.
	 * @param peoId Long 
	 * @return rodolphe.demo.domain.people.PeopleView dtoPeople
	*/
	public rodolphe.demo.domain.people.PeopleView getPeopleViewForPeopleDetailsByPeoId(final Long peoId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_PEOPLE_VIEW_FOR_PEOPLE_DETAILS_BY_PEO_ID)
				.addValue(ATTR_IN_TK_GET_PEOPLE_VIEW_FOR_PEOPLE_DETAILS_BY_PEO_ID_PEO_ID, peoId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_PEOPLE_VIEW_FOR_PEOPLE_DETAILS_BY_PEO_ID_DTO_PEOPLE);
	}

    
    private TaskManager getTaskManager(){
    	return taskManager;
    } 
}
