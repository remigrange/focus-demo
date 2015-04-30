package rodolphe.demo.services.search;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.transaction.Transactional;

import javax.inject.Inject;

import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleResult;

/**
 * Search service.
 *
 * @author JDALMEIDA
 */
public class SearchServicesImpl implements SearchServices {

    @Inject
    private MovieSearchHandler movieSearchHandler;
    @Inject
    private PeopleSearchHandler peopleSearchHandler;

    /** {@inheritDoc} */
    @Override
    @Transactional
    public void indexMovies() {
        movieSearchHandler.index();
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public void indexMovie(final Long movId) {
        movieSearchHandler.indexItem(movId);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public void removeMovieFromIndex(final Long movId) {
        movieSearchHandler.removeItem(movId);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> searchMovie(
            final SearchCriterium<MovieCriteria> criteria, final DtListState listState) {
        return movieSearchHandler.rechercher(criteria, listState);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public void indexPeople() {
        peopleSearchHandler.index();
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public void indexPeople(final Long peoId) {
        peopleSearchHandler.indexItem(peoId);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public FacetedQueryResult<PeopleResult, SearchCriterium<PeopleCriteria>> searchPeople(
            final SearchCriterium<PeopleCriteria> criteria, final DtListState listState) {
        return peopleSearchHandler.rechercher(criteria, listState);
    }
}
