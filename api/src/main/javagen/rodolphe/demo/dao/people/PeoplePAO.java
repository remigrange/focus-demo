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
		/** Tache TK_GET_PEOPLE_VIEW */
		TK_GET_PEOPLE_VIEW,
		/** Tache TK_GET_PEOPLE_VIEW_BY_PEO_ID */
		TK_GET_PEOPLE_VIEW_BY_PEO_ID,
	}

	/** Constante de paramètre de la tache MIN_RANK. */
	private static final String ATTR_IN_TK_GET_PEOPLE_VIEW_MIN_RANK = "MIN_RANK";

	/** Constante de paramètre de la tache MAX_ROWS. */
	private static final String ATTR_IN_TK_GET_PEOPLE_VIEW_MAX_ROWS = "MAX_ROWS";

	/** Constante de paramètre de la tache DTC_PEOPLE. */
	private static final String ATTR_OUT_TK_GET_PEOPLE_VIEW_DTC_PEOPLE = "DTC_PEOPLE";

	/** Constante de paramètre de la tache PEOP_ID. */
	private static final String ATTR_IN_TK_GET_PEOPLE_VIEW_BY_PEO_ID_PEOP_ID = "PEOP_ID";

	/** Constante de paramètre de la tache DTO_PEOPLE. */
	private static final String ATTR_OUT_TK_GET_PEOPLE_VIEW_BY_PEO_ID_DTO_PEOPLE = "DTO_PEOPLE";

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
	 * Execute la tache TK_GET_PEOPLE_VIEW.
	 * @param minRank Integer 
	 * @param maxRows Integer 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.PeopleView> dtcPeople
	*/
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.PeopleView> getPeopleView(final Integer minRank, final Integer maxRows) {
		final Task task = createTaskBuilder(Tasks.TK_GET_PEOPLE_VIEW)
				.withValue(ATTR_IN_TK_GET_PEOPLE_VIEW_MIN_RANK, minRank)
				.withValue(ATTR_IN_TK_GET_PEOPLE_VIEW_MAX_ROWS, maxRows)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_PEOPLE_VIEW_DTC_PEOPLE);
	}

	/**
	 * Execute la tache TK_GET_PEOPLE_VIEW_BY_PEO_ID.
	 * @param peopId Long 
	 * @return rodolphe.demo.domain.people.PeopleView dtoPeople
	*/
	public rodolphe.demo.domain.people.PeopleView getPeopleViewByPeoId(final Long peopId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_PEOPLE_VIEW_BY_PEO_ID)
				.withValue(ATTR_IN_TK_GET_PEOPLE_VIEW_BY_PEO_ID_PEOP_ID, peopId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_PEOPLE_VIEW_BY_PEO_ID_DTO_PEOPLE);
	}

    
    private TaskManager getTaskManager(){
    	return taskManager;
    } 
}
