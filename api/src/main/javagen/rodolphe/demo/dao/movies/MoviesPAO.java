package rodolphe.demo.dao.movies;

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
 * MoviesPAO
 */
public final class MoviesPAO {
	/** Liste des taches. */
	private static enum Tasks {
		/** Tache TK_GET_MOVIE_INDEX */
		TK_GET_MOVIE_INDEX,
		/** Tache TK_GET_MOVIE_VIEW_BY_MOV_ID */
		TK_GET_MOVIE_VIEW_BY_MOV_ID,
		/** Tache TK_GET_MOVIE_VIEW_FOR_MOVIE_DETAILS_BY_MOV_ID */
		TK_GET_MOVIE_VIEW_FOR_MOVIE_DETAILS_BY_MOV_ID,
		/** Tache TK_GET_CASTING_BY_MOV_ID */
		TK_GET_CASTING_BY_MOV_ID,
	}

	/** Constante de paramètre de la tache DTC_MOVIE_IDS. */
	private static final String ATTR_IN_TK_GET_MOVIE_INDEX_DTC_MOVIE_IDS = "DTC_MOVIE_IDS";

	/** Constante de paramètre de la tache DTC_MOVIES. */
	private static final String ATTR_OUT_TK_GET_MOVIE_INDEX_DTC_MOVIES = "DTC_MOVIES";

	/** Constante de paramètre de la tache MOV_ID. */
	private static final String ATTR_IN_TK_GET_MOVIE_VIEW_BY_MOV_ID_MOV_ID = "MOV_ID";

	/** Constante de paramètre de la tache DTO_MOVIE. */
	private static final String ATTR_OUT_TK_GET_MOVIE_VIEW_BY_MOV_ID_DTO_MOVIE = "DTO_MOVIE";

	/** Constante de paramètre de la tache MOV_ID. */
	private static final String ATTR_IN_TK_GET_MOVIE_VIEW_FOR_MOVIE_DETAILS_BY_MOV_ID_MOV_ID = "MOV_ID";

	/** Constante de paramètre de la tache DTO_MOVIE. */
	private static final String ATTR_OUT_TK_GET_MOVIE_VIEW_FOR_MOVIE_DETAILS_BY_MOV_ID_DTO_MOVIE = "DTO_MOVIE";

	/** Constante de paramètre de la tache MOV_ID. */
	private static final String ATTR_IN_TK_GET_CASTING_BY_MOV_ID_MOV_ID = "MOV_ID";

	/** Constante de paramètre de la tache DTO_MOVIE_CASTING. */
	private static final String ATTR_OUT_TK_GET_CASTING_BY_MOV_ID_DTO_MOVIE_CASTING = "DTO_MOVIE_CASTING";

	private final TaskManager taskManager;

	/**
	 * Constructeur.
	 * @param taskManager Manager des Task
	 */
	@Inject
	public MoviesPAO(final TaskManager taskManager) {
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
	 * Execute la tache TK_GET_MOVIE_INDEX.
	 * @param dtcMovieIds io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.common.Dummy> 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.MovieIndex> dtcMovies
	*/
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.MovieIndex> getMovieIndex(final io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.common.Dummy> dtcMovieIds) {
		final Task task = createTaskBuilder(Tasks.TK_GET_MOVIE_INDEX)
				.addValue(ATTR_IN_TK_GET_MOVIE_INDEX_DTC_MOVIE_IDS, dtcMovieIds)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_MOVIE_INDEX_DTC_MOVIES);
	}

	/**
	 * Execute la tache TK_GET_MOVIE_VIEW_BY_MOV_ID.
	 * @param movId Long 
	 * @return rodolphe.demo.domain.movies.MovieView dtoMovie
	*/
	public rodolphe.demo.domain.movies.MovieView getMovieViewByMovId(final Long movId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_MOVIE_VIEW_BY_MOV_ID)
				.addValue(ATTR_IN_TK_GET_MOVIE_VIEW_BY_MOV_ID_MOV_ID, movId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_MOVIE_VIEW_BY_MOV_ID_DTO_MOVIE);
	}

	/**
	 * Execute la tache TK_GET_MOVIE_VIEW_FOR_MOVIE_DETAILS_BY_MOV_ID.
	 * @param movId Long 
	 * @return rodolphe.demo.domain.movies.MovieView dtoMovie
	*/
	public rodolphe.demo.domain.movies.MovieView getMovieViewForMovieDetailsByMovId(final Long movId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_MOVIE_VIEW_FOR_MOVIE_DETAILS_BY_MOV_ID)
				.addValue(ATTR_IN_TK_GET_MOVIE_VIEW_FOR_MOVIE_DETAILS_BY_MOV_ID_MOV_ID, movId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_MOVIE_VIEW_FOR_MOVIE_DETAILS_BY_MOV_ID_DTO_MOVIE);
	}

	/**
	 * Execute la tache TK_GET_CASTING_BY_MOV_ID.
	 * @param movId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.MovieCasting> dtoMovieCasting
	*/
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.MovieCasting> getCastingByMovId(final Long movId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_CASTING_BY_MOV_ID)
				.addValue(ATTR_IN_TK_GET_CASTING_BY_MOV_ID_MOV_ID, movId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_CASTING_BY_MOV_ID_DTO_MOVIE_CASTING);
	}

    
    private TaskManager getTaskManager(){
    	return taskManager;
    } 
}
