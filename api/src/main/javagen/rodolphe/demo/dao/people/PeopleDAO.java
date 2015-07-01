package rodolphe.demo.dao.people;

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
import rodolphe.demo.domain.people.PeopleIndex;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.task.model.TaskResult;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.impl.store.util.DAOBroker;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.task.TaskManager;
import rodolphe.demo.domain.people.People;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * PeopleDAO
 */
public final class PeopleDAO extends DAOBroker<People, java.lang.Long> {
	private final SearchManager searchManager;
	/** Liste des taches. */
	private static enum Tasks {
		/** Tache TK_GET_PEOPLE_BY_CRITERIA */
		TK_GET_PEOPLE_BY_CRITERIA,
	}

	/** Constante de paramètre de la tache SEARCH_TEXT. */
	private static final String ATTR_IN_TK_GET_PEOPLE_BY_CRITERIA_SEARCH_TEXT = "SEARCH_TEXT";

	/** Constante de paramètre de la tache DTC_PEOPLE. */
	private static final String ATTR_OUT_TK_GET_PEOPLE_BY_CRITERIA_DTC_PEOPLE = "DTC_PEOPLE";

	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 * @param searchManager Manager de Search
	 */
	@Inject
	public PeopleDAO(final StoreManager storeManager, final TaskManager taskManager, final SearchManager searchManager) {
		super(People.class, storeManager, taskManager);
		this.searchManager = searchManager;
	}
	
	/**
	 * Indique que le keyConcept associé à cette uri va être modifié.
	 * Techniquement cela interdit les opérations d'ecriture en concurrence 
	 * et envoie un évenement de modification du keyConcept (à la fin de transaction eventuellement) 
	 * @param uri URI du keyConcept modifié
	 */
	 public void workOnKeyConcept(final URI<People> uri) {
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
	 * Création d'une SearchQuery de type : PeopleWoFct.
	 * @param criteria Critères de recherche
	 * @param listFilters Liste des filtres à appliquer (notament les facettes sélectionnées)
	 * @return SearchQueryBuilder pour ce type de recherche
	 */
	public SearchQueryBuilder createSearchQueryBuilderPeopleWoFct(final rodolphe.demo.domain.people.PeopleCriteria criteria, final List<ListFilter> listFilters) {
		final FacetedQueryDefinition facetedQueryDefinition = Home.getDefinitionSpace().resolve("QRY_PEOPLE_WO_FCT", FacetedQueryDefinition.class);
		final ListFilterBuilder<rodolphe.demo.domain.people.PeopleCriteria> listFilterBuilder = Injector.newInstance(facetedQueryDefinition.getListFilterBuilderClass(), Home.getComponentSpace());
		final ListFilter criteriaListFilter = listFilterBuilder.withBuildQuery(facetedQueryDefinition.getListFilterBuilderQuery()).withCriteria(criteria).build();
		return new SearchQueryBuilder(criteriaListFilter).withFacetStrategy(facetedQueryDefinition, listFilters);
	}
    /**
	 * Création d'une SearchQuery de type : PeopleWithFct.
	 * @param criteria Critères de recherche
	 * @param listFilters Liste des filtres à appliquer (notament les facettes sélectionnées)
	 * @return SearchQueryBuilder pour ce type de recherche
	 */
	public SearchQueryBuilder createSearchQueryBuilderPeopleWithFct(final rodolphe.demo.domain.people.PeopleCriteria criteria, final List<ListFilter> listFilters) {
		final FacetedQueryDefinition facetedQueryDefinition = Home.getDefinitionSpace().resolve("QRY_PEOPLE_WITH_FCT", FacetedQueryDefinition.class);
		final ListFilterBuilder<rodolphe.demo.domain.people.PeopleCriteria> listFilterBuilder = Injector.newInstance(facetedQueryDefinition.getListFilterBuilderClass(), Home.getComponentSpace());
		final ListFilter criteriaListFilter = listFilterBuilder.withBuildQuery(facetedQueryDefinition.getListFilterBuilderQuery()).withCriteria(criteria).build();
		return new SearchQueryBuilder(criteriaListFilter).withFacetStrategy(facetedQueryDefinition, listFilters);
	}
    
	/**
	 * Récupération du résultat issu d'une requête.
	 * @param searchQuery critères initiaux
	 * @param listState Etat de la liste (tri et pagination)
	 * @return Résultat correspondant à la requête (de type PeopleIndex) 
	 */
	public FacetedQueryResult<PeopleIndex, SearchQuery> loadList(final SearchQuery searchQuery, final DtListState listState) {
		final SearchIndexDefinition indexDefinition = searchManager.findIndexDefinitionByKeyConcept(People.class);
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
	 * Execute la tache TK_GET_PEOPLE_BY_CRITERIA.
	 * @param searchText String 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> dtcPeople
	*/
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> getPeopleByCriteria(final String searchText) {
		final Task task = createTaskBuilder(Tasks.TK_GET_PEOPLE_BY_CRITERIA)
				.addValue(ATTR_IN_TK_GET_PEOPLE_BY_CRITERIA_SEARCH_TEXT, searchText)
				.build();
		final TaskResult taskResult = getTaskManager().execute(task);
		return taskResult.getValue(ATTR_OUT_TK_GET_PEOPLE_BY_CRITERIA_DTC_PEOPLE);
	}


}
