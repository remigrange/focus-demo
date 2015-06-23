package rodolphe.demo.services.search;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.search.SearchManager;
import io.vertigo.dynamo.search.metamodel.SearchIndexDefinition;
import io.vertigo.dynamo.search.model.SearchIndex;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamox.search.DefaultSearchLoader;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.dao.people.PeoplePAO;
import rodolphe.demo.domain.common.Dummy;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleIndex;

public final class PeopleSearchLoader extends DefaultSearchLoader<Long, People, PeopleIndex> {

	@Inject
	private PeoplePAO peoplePAO;
	private final SearchIndexDefinition indexDefinition;

	/**
	 * Construct an instance of PeopleSearchLoader.
	 *
	 * @param taskManager TaskManager
	 */
	@Inject
	public PeopleSearchLoader(final SearchManager searchManager, final TaskManager taskManager) {
		super(taskManager);
		indexDefinition = searchManager.findIndexDefinitionByKeyConcept(People.class);
	}

	/** {@inheritDoc} */
	@Override
	protected String getNextIdsSqlQuery(final String tableName, final String pkFieldName) {
		return " select peo_id from role_people rpe, movie mov "
				+ "where mov.imdbid is not null "
				+ "and rpe.peo_id >  #PEO_ID# "
				+ "and rpe.mov_id = mov.mov_id "
				+ "order by rpe.PEO_ID ASC limit 500";
	}

	/** {@inheritDoc} */
	@Override
	public List<SearchIndex<People, PeopleIndex>> loadData(final List<URI<People>> uris) {
		final DtList<Dummy> peopleIds = new DtList<>(Dummy.class);
		for (final URI<People> uri : uris) {
			final Dummy dummy = new Dummy();
			dummy.setDummyLong((Long) uri.getId());
			peopleIds.add(dummy);
		}
		final DtList<PeopleIndex> peopleIndexes = peoplePAO.getPeopleIndex(peopleIds);
		final List<SearchIndex<People, PeopleIndex>> peopleSearchIndexes = new ArrayList<>(uris.size());
		for (final PeopleIndex peopleIndex : peopleIndexes) {
			peopleSearchIndexes.add(SearchIndex.createIndex(indexDefinition,
					new URI(indexDefinition.getIndexDtDefinition(), peopleIndex.getPeoId()), peopleIndex));
		}
		return peopleSearchIndexes;
	}
}
