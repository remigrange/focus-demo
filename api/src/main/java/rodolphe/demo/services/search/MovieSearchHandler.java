/**
 *
 */
package rodolphe.demo.services.search;

import io.vertigo.dynamo.domain.model.DtList;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.dao.movies.MoviesPAO;
import rodolphe.demo.domain.DtDefinitions.MovieCriteriaFields;
import rodolphe.demo.domain.DtDefinitions.MovieIndexFields;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieIndex;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.movies.MovieView;

/**
 * @author jmforhan
 */
public class MovieSearchHandler extends AbstractElasticSearchHandler<MovieIndex, MovieResult, MovieView, MovieCriteria> {

    @Inject
    private MoviesPAO moviesPAO;

    /*
     * (non-Javadoc)
     * @see rodolphe.demo.services.search.AbstractElasticSearchHandler#getIndexDefinitionName()
     */
    /** {@inheritDoc} */
    @Override
    protected String getIndexDefinitionName() {
        return "IDX_MOVIE";
    }

    /*
     * (non-Javadoc)
     * @see rodolphe.demo.services.search.AbstractElasticSearchHandler#getVue(int, int)
     */
    /** {@inheritDoc} */
    @Override
    protected DtList<MovieView> getVue(final int rangMin, final int maxRows) {
        return moviesPAO.getMovieView(rangMin, maxRows);
    }

    /*
     * (non-Javadoc)
     * @see rodolphe.demo.services.search.AbstractElasticSearchHandler#getVueItem(java.lang.Object)
     */
    /** {@inheritDoc} */
    @Override
    protected MovieView getVueItem(final Object key) {
        return moviesPAO.getMovieViewByMovId((Long) key);
    }

    /*
     * (non-Javadoc)
     * @see
     * rodolphe.demo.services.search.AbstractElasticSearchHandler#getTranslatedCriteria(io.vertigo.dynamo.domain.model
     * .DtObject)
     */
    /** {@inheritDoc} */
    @Override
    protected String getTranslatedCriteria(final MovieCriteria criterium) {
        final List<String> lst = new ArrayList<>();
        addSimpleCriteriaAttribute(lst, MovieIndexFields.MOV_ID, criterium, MovieCriteriaFields.MOV_ID);
        addSimpleCriteriaAttribute(lst, MovieIndexFields.RELEASED, criterium, MovieCriteriaFields.RELEASED);
        addStartWithCriteria(lst, MovieIndexFields.TITLE, criterium, MovieCriteriaFields.TITLE);
        return getRequestFromCriteriaList(lst);
    }
}
