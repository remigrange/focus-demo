package rodolphe.demo.services.search;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.transaction.Transactional;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;

public class SearchServicesImpl implements SearchServices {

	@Inject
	private MovieSearchHandler movieSearchHandler;
	@Inject
	private PeopleSearchHandler peopleSearchHandler;

	/** {@inheritDoc} */
	@Override
	@Transactional
	public void indexMovies() {
		movieSearchHandler.indexer();

	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public void indexMovie(final Long movId) {
		movieSearchHandler.indexerItem(movId);	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public void removeMovieFromIndex(final Long movId) {
		movieSearchHandler.supprimerItem(movId);
	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> searchMovie(
			final SearchCriterium<MovieCriteria> criteria) {
		return movieSearchHandler.rechercher(criteria);
	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public void indexPeople() {
		peopleSearchHandler.indexer();

	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public void indexPeople(final Long peoId) {
		peopleSearchHandler.indexerItem(peoId);

	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> searchPeople(
			final SearchCriterium<PeopleCriteria> criteria) {
		return peopleSearchHandler.rechercher(criteria);
	}


}
