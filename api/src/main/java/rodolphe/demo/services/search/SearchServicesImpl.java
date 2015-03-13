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

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.search.SearchServices#indexMovies()
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public void indexMovies() {
		movieSearchHandler.indexer();

	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.search.SearchServices#indexMovie(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public void indexMovie(final Long movId) {
		movieSearchHandler.indexerItem(movId);	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.search.SearchServices#removeMovieFromIndex(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public void removeMovieFromIndex(final Long movId) {
		movieSearchHandler.supprimerItem(movId);
	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.search.SearchServices#searchMovie(rodolphe.demo.services.search.SearchCriterium)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> searchMovie(
			final SearchCriterium<MovieCriteria> criteria) {
		return movieSearchHandler.rechercher(criteria);
	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.search.SearchServices#indexPeople()
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public void indexPeople() {
		peopleSearchHandler.indexer();

	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.search.SearchServices#indexPeople(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public void indexPeople(final Long peoId) {
		peopleSearchHandler.indexerItem(peoId);

	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.search.SearchServices#searchPeople(rodolphe.demo.services.search.SearchCriterium)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> searchPeople(
			final SearchCriterium<PeopleCriteria> criteria) {
		return peopleSearchHandler.rechercher(criteria);
	}


}
