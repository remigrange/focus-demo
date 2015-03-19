package rodolphe.demo.dao.movies;

import javax.inject.Inject;

import io.vertigo.lang.Option;
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
		/** Tache TK_GET_GENRES_AGGREGATED_BY_MOV_ID */
		TK_GET_GENRES_AGGREGATED_BY_MOV_ID,
		/** Tache TK_GET_COUNTRYS_AGGREGATED_BY_MOV_ID */
		TK_GET_COUNTRYS_AGGREGATED_BY_MOV_ID,
		/** Tache TK_GET_LANGUAGES_AGGREGATED_BY_MOV_ID */
		TK_GET_LANGUAGES_AGGREGATED_BY_MOV_ID,
		/** Tache TK_GET_MOVIE_VIEW */
		TK_GET_MOVIE_VIEW,
		/** Tache TK_GET_MOVIE_VIEW_BY_MOV_ID */
		TK_GET_MOVIE_VIEW_BY_MOV_ID,
	}

	/** Constante de paramètre de la tache MOV_ID. */
	private static final String ATTR_IN_TK_GET_GENRES_AGGREGATED_BY_MOV_ID_MOV_ID = "MOV_ID";

	/** Constante de paramètre de la tache TEXTE. */
	private static final String ATTR_OUT_TK_GET_GENRES_AGGREGATED_BY_MOV_ID_TEXTE = "TEXTE";

	/** Constante de paramètre de la tache MOV_ID. */
	private static final String ATTR_IN_TK_GET_COUNTRYS_AGGREGATED_BY_MOV_ID_MOV_ID = "MOV_ID";

	/** Constante de paramètre de la tache TEXTE. */
	private static final String ATTR_OUT_TK_GET_COUNTRYS_AGGREGATED_BY_MOV_ID_TEXTE = "TEXTE";

	/** Constante de paramètre de la tache MOV_ID. */
	private static final String ATTR_IN_TK_GET_LANGUAGES_AGGREGATED_BY_MOV_ID_MOV_ID = "MOV_ID";

	/** Constante de paramètre de la tache TEXTE. */
	private static final String ATTR_OUT_TK_GET_LANGUAGES_AGGREGATED_BY_MOV_ID_TEXTE = "TEXTE";

	/** Constante de paramètre de la tache MIN_RANK. */
	private static final String ATTR_IN_TK_GET_MOVIE_VIEW_MIN_RANK = "MIN_RANK";

	/** Constante de paramètre de la tache MAX_ROWS. */
	private static final String ATTR_IN_TK_GET_MOVIE_VIEW_MAX_ROWS = "MAX_ROWS";

	/** Constante de paramètre de la tache DTC_MOVIES. */
	private static final String ATTR_OUT_TK_GET_MOVIE_VIEW_DTC_MOVIES = "DTC_MOVIES";

	/** Constante de paramètre de la tache MOV_ID. */
	private static final String ATTR_IN_TK_GET_MOVIE_VIEW_BY_MOV_ID_MOV_ID = "MOV_ID";

	/** Constante de paramètre de la tache DTO_MOVIE. */
	private static final String ATTR_OUT_TK_GET_MOVIE_VIEW_BY_MOV_ID_DTO_MOVIE = "DTO_MOVIE";

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
	 * Execute la tache TK_GET_GENRES_AGGREGATED_BY_MOV_ID.
	 * @param movId Long 
	 * @return Option de String texte
	*/
	public Option<String> getGenresAggregatedByMovId(final Long movId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_GENRES_AGGREGATED_BY_MOV_ID)
				.withValue(ATTR_IN_TK_GET_GENRES_AGGREGATED_BY_MOV_ID_MOV_ID, movId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return Option.option(taskResult.<String> getValue(ATTR_OUT_TK_GET_GENRES_AGGREGATED_BY_MOV_ID_TEXTE));
	}

	/**
	 * Execute la tache TK_GET_COUNTRYS_AGGREGATED_BY_MOV_ID.
	 * @param movId Long 
	 * @return Option de String texte
	*/
	public Option<String> getCountrysAggregatedByMovId(final Long movId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_COUNTRYS_AGGREGATED_BY_MOV_ID)
				.withValue(ATTR_IN_TK_GET_COUNTRYS_AGGREGATED_BY_MOV_ID_MOV_ID, movId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return Option.option(taskResult.<String> getValue(ATTR_OUT_TK_GET_COUNTRYS_AGGREGATED_BY_MOV_ID_TEXTE));
	}

	/**
	 * Execute la tache TK_GET_LANGUAGES_AGGREGATED_BY_MOV_ID.
	 * @param movId Long 
	 * @return Option de String texte
	*/
	public Option<String> getLanguagesAggregatedByMovId(final Long movId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_LANGUAGES_AGGREGATED_BY_MOV_ID)
				.withValue(ATTR_IN_TK_GET_LANGUAGES_AGGREGATED_BY_MOV_ID_MOV_ID, movId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return Option.option(taskResult.<String> getValue(ATTR_OUT_TK_GET_LANGUAGES_AGGREGATED_BY_MOV_ID_TEXTE));
	}

	/**
	 * Execute la tache TK_GET_MOVIE_VIEW.
	 * @param minRank Integer 
	 * @param maxRows Integer 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.MovieView> dtcMovies
	*/
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.MovieView> getMovieView(final Integer minRank, final Integer maxRows) {
		final Task task = createTaskBuilder(Tasks.TK_GET_MOVIE_VIEW)
				.withValue(ATTR_IN_TK_GET_MOVIE_VIEW_MIN_RANK, minRank)
				.withValue(ATTR_IN_TK_GET_MOVIE_VIEW_MAX_ROWS, maxRows)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_MOVIE_VIEW_DTC_MOVIES);
	}

	/**
	 * Execute la tache TK_GET_MOVIE_VIEW_BY_MOV_ID.
	 * @param movId Long 
	 * @return rodolphe.demo.domain.movies.MovieView dtoMovie
	*/
	public rodolphe.demo.domain.movies.MovieView getMovieViewByMovId(final Long movId) {
		final Task task = createTaskBuilder(Tasks.TK_GET_MOVIE_VIEW_BY_MOV_ID)
				.withValue(ATTR_IN_TK_GET_MOVIE_VIEW_BY_MOV_ID_MOV_ID, movId)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_MOVIE_VIEW_BY_MOV_ID_DTO_MOVIE);
	}

    
    private TaskManager getTaskManager(){
    	return taskManager;
    } 
}
