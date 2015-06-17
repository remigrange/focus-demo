package rodolphe.demo.dao.movies;

import javax.inject.Inject;
import java.util.List;
import io.vertigo.core.Home;
import io.vertigo.core.di.injector.Injector;
import io.vertigo.dynamo.search.SearchManager;
import io.vertigo.dynamo.search.metamodel.SearchIndexDefinition;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.dynamo.search.model.SearchQueryBuilder;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.dynamo.collections.metamodel.ListFilterBuilder;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import rodolphe.demo.domain.movies.MovieIndex;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.task.model.TaskResult;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.impl.persistence.util.DAOBroker;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.movies.Movie;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * MovieDAO
 */
public final class MovieDAO extends DAOBroker<Movie, java.lang.Long> {
	private final SearchManager searchManager;
	/** Liste des taches. */
	private static enum Tasks {
		/** Tache TK_GET_MOVIES_BY_CRITERIA */
		TK_GET_MOVIES_BY_CRITERIA,
		/** Tache TK_GET_FILMOGRAPHY_BY_PEO_ID */
		TK_GET_FILMOGRAPHY_BY_PEO_ID,
	}

	/** Constante de paramètre de la tache SEARCH_TEXT. */
	private static final String ATTR_IN_TK_GET_MOVIES_BY_CRITERIA_SEARCH_TEXT = "SEARCH_TEXT";

	/** Constante de paramètre de la tache DTC_MOVIE. */
	private static final String ATTR_OUT_TK_GET_MOVIES_BY_CRITERIA_DTC_MOVIE = "DTC_MOVIE";

	/** Constante de paramètre de la tache PEO_ID. */
	private static final String ATTR_IN_TK_GET_FILMOGRAPHY_BY_PEO_ID_PEO_ID = "PEO_ID";

	/** Constante de paramètre de la tache DTC_MOVIE. */
	private static final String ATTR_OUT_TK_GET_FILMOGRAPHY_BY_PEO_ID_DTC_MOVIE = "DTC_MOVIE";

	 
	/**
	 * Contructeur.
	 * @param persistenceManager Manager de persistance
	 * @param taskManager Manager de Task
	 * @param searchManager Manager de Search
	 */
	@Inject
	public MovieDAO(final PersistenceManager persistenceManager, final TaskManager taskManager, final SearchManager searchManager) {
		super(Movie.class, persistenceManager, taskManager);
		this.searchManager = searchManager;
	}
	
	/**
	 * Indique que le keyConcept associé à cette uri va être modifié.
	 * Techniquement cela interdit les opérations d'ecriture en concurrence 
	 * et envoie un évenement de modification du keyConcept (à la fin de transaction eventuellement) 
	 * @param uri URI du keyConcept modifié
	 */
	 public void workOnKeyConcept(final URI<Movie> uri) {
		broker.workOn(uri);
	}

	/**
	 * Indique que le keyConcept associé à cet id va être modifié.
	 * Techniquement cela interdit les opérations d'ecriture en concurrence 
	 * et envoie un évenement de modification du keyConcept (à la fin de transaction eventuellement) 
	 * @param id Clé du keyConcept modifié
	 */
	 public void workOnKeyConcept(final java.lang.Long id) {
		workOnKeyConcept(createDtObjectURI(id));
	}
	
    
    /**
	 * Création d'une SearchQuery de type : MovieWoFct.
	 * @param criteria Critères de recherche
	 * @param listFilters Liste des filtres à appliquer (notament les facettes sélectionnées)
	 * @return SearchQueryBuilder pour ce type de recherche
	 */
	public SearchQueryBuilder createSearchQueryBuilderMovieWoFct(final rodolphe.demo.domain.movies.MovieCriteria criteria, final List<ListFilter> listFilters) {
		final FacetedQueryDefinition facetedQueryDefinition = Home.getDefinitionSpace().resolve("QRY_MOVIE_WO_FCT", FacetedQueryDefinition.class);
		final ListFilterBuilder<rodolphe.demo.domain.movies.MovieCriteria> listFilterBuilder = Injector.newInstance(facetedQueryDefinition.getListFilterBuilderClass(), Home.getComponentSpace());
		final ListFilter criteriaListFilter = listFilterBuilder.withBuildQuery(facetedQueryDefinition.getListFilterBuilderQuery()).withCriteria(criteria).build();
		return new SearchQueryBuilder(criteriaListFilter).withFacetStrategy(facetedQueryDefinition, listFilters);
	}
    /**
	 * Création d'une SearchQuery de type : MovieWithFct.
	 * @param criteria Critères de recherche
	 * @param listFilters Liste des filtres à appliquer (notament les facettes sélectionnées)
	 * @return SearchQueryBuilder pour ce type de recherche
	 */
	public SearchQueryBuilder createSearchQueryBuilderMovieWithFct(final rodolphe.demo.domain.movies.MovieCriteria criteria, final List<ListFilter> listFilters) {
		final FacetedQueryDefinition facetedQueryDefinition = Home.getDefinitionSpace().resolve("QRY_MOVIE_WITH_FCT", FacetedQueryDefinition.class);
		final ListFilterBuilder<rodolphe.demo.domain.movies.MovieCriteria> listFilterBuilder = Injector.newInstance(facetedQueryDefinition.getListFilterBuilderClass(), Home.getComponentSpace());
		final ListFilter criteriaListFilter = listFilterBuilder.withBuildQuery(facetedQueryDefinition.getListFilterBuilderQuery()).withCriteria(criteria).build();
		return new SearchQueryBuilder(criteriaListFilter).withFacetStrategy(facetedQueryDefinition, listFilters);
	}
    
	/**
	 * Récupération du résultat issu d'une requête.
	 * @param searchQuery critères initiaux
	 * @param listState Etat de la liste (tri et pagination)
	 * @return Résultat correspondant à la requête (de type MovieIndex) 
	 */
	public FacetedQueryResult<MovieIndex, SearchQuery> loadList(final SearchQuery searchQuery, final DtListState listState) {
		final SearchIndexDefinition indexDefinition = searchManager.findIndexDefinitionByKeyConcept(Movie.class);
		return searchManager.loadList(indexDefinition, searchQuery, listState);
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


}
