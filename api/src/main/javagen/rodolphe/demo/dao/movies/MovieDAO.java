package rodolphe.demo.dao.movies;

import javax.inject.Inject;

import io.vertigo.core.Home;
import io.vertigo.lang.Option;
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
		/** Tache TK_GET_FILMOGRAPHY_BY_PEO_ID */
		TK_GET_FILMOGRAPHY_BY_PEO_ID,
		/** Tache TK_GET_MOVIE_TO_CLEAN */
		TK_GET_MOVIE_TO_CLEAN,
	}

	/** Constante de paramètre de la tache SEARCH_TEXT. */
	private static final String ATTR_IN_TK_GET_MOVIES_BY_CRITERIA_SEARCH_TEXT = "SEARCH_TEXT";

	/** Constante de paramètre de la tache DTC_MOVIE. */
	private static final String ATTR_OUT_TK_GET_MOVIES_BY_CRITERIA_DTC_MOVIE = "DTC_MOVIE";

	/** Constante de paramètre de la tache PEO_ID. */
	private static final String ATTR_IN_TK_GET_FILMOGRAPHY_BY_PEO_ID_PEO_ID = "PEO_ID";

	/** Constante de paramètre de la tache DTC_MOVIE. */
	private static final String ATTR_OUT_TK_GET_FILMOGRAPHY_BY_PEO_ID_DTC_MOVIE = "DTC_MOVIE";

	/** Constante de paramètre de la tache TITLE. */
	private static final String ATTR_IN_TK_GET_MOVIE_TO_CLEAN_TITLE = "TITLE";

	/** Constante de paramètre de la tache RELEASED. */
	private static final String ATTR_IN_TK_GET_MOVIE_TO_CLEAN_RELEASED = "RELEASED";

	/** Constante de paramètre de la tache YEAR. */
	private static final String ATTR_IN_TK_GET_MOVIE_TO_CLEAN_YEAR = "YEAR";

	/** Constante de paramètre de la tache DTC_MOVIE. */
	private static final String ATTR_OUT_TK_GET_MOVIE_TO_CLEAN_DTC_MOVIE = "DTC_MOVIE";

	 
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

	/**
	 * Execute la tache TK_GET_FILMOGRAPHY_BY_PEO_ID.
	 * @param peoId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Movie> dtcMovie
	*/
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Movie> getFilmographyByPeoId(final Long peoId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_FILMOGRAPHY_BY_PEO_ID)
				.withValue(ATTR_IN_TK_GET_FILMOGRAPHY_BY_PEO_ID_PEO_ID, peoId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_FILMOGRAPHY_BY_PEO_ID_DTC_MOVIE);
	}

	/**
	 * Execute la tache TK_GET_MOVIE_TO_CLEAN.
	 * @param title Long 
	 * @param released java.util.Date (peut être null)
	 * @param year Integer (peut être null)
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Movie> dtcMovie
	*/
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Movie> getMovieToClean(final Long title, final Option<java.util.Date> released, final Option<Integer> year) {
		final Task task = createTaskBuilder(Tasks.TK_GET_MOVIE_TO_CLEAN)
				.withValue(ATTR_IN_TK_GET_MOVIE_TO_CLEAN_TITLE, title)
				.withValue(ATTR_IN_TK_GET_MOVIE_TO_CLEAN_RELEASED, released.getOrElse(null))
				.withValue(ATTR_IN_TK_GET_MOVIE_TO_CLEAN_YEAR, year.getOrElse(null))
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_MOVIE_TO_CLEAN_DTC_MOVIE);
	}

}
