package rodolphe.demo.dao.movies;

import javax.inject.Inject;

import io.vertigo.core.Home;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.task.model.TaskResult;
import io.vertigo.dynamo.impl.persistence.util.DAOBroker;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * MovieDAO
 */
public final class MovieDAO extends DAOBroker<rodolphe.demo.domain.movies.Movie, java.lang.Long> {
	/** Liste des taches. */
	private static enum Tasks {
		/** Tache TK_GET_MOVIES_BY_CRITERIA */
		TK_GET_MOVIES_BY_CRITERIA,
	}

	/** Constante de paramètre de la tache SEARCH_TEXT. */
	private static final String ATTR_IN_TK_GET_MOVIES_BY_CRITERIA_SEARCH_TEXT = "SEARCH_TEXT";

	/** Constante de paramètre de la tache DTC_MOVIE. */
	private static final String ATTR_OUT_TK_GET_MOVIES_BY_CRITERIA_DTC_MOVIE = "DTC_MOVIE";

	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public MovieDAO(final PersistenceManager persistenceManager, final TaskManager taskManager) {
		super(rodolphe.demo.domain.movies.Movie.class, persistenceManager, taskManager);
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
	 * Execute la tache TK_GET_MOVIES_BY_CRITERIA.
	 * @param searchText String 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Movie> dtcMovie
	*/
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Movie> getMoviesByCriteria(final String searchText) {
		final Task task = createTaskBuilder(Tasks.TK_GET_MOVIES_BY_CRITERIA)
				.withValue(ATTR_IN_TK_GET_MOVIES_BY_CRITERIA_SEARCH_TEXT, searchText)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_MOVIES_BY_CRITERIA_DTC_MOVIE);
	}

}
