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
 * Movie search Handler.
 *
 * @author jmforhan
 */
public class MovieSearchHandler extends AbstractElasticSearchHandler<MovieIndex, MovieResult, MovieView, MovieCriteria> {

    @Inject
    private MoviesPAO moviesPAO;

    /** {@inheritDoc} */
    @Override
    protected String getIndexDefinitionName() {
        return "IDX_MOVIE";
    }

    /** {@inheritDoc} */
    @Override
    protected DtList<MovieView> getVue(final int rangMin, final int maxRows) {
        return moviesPAO.getMovieView(rangMin, maxRows);
    }

    /** {@inheritDoc} */
    @Override
    protected MovieView getVueItem(final Object key) {
        return moviesPAO.getMovieViewByMovId((Long) key);
    }

    /** {@inheritDoc} */
    @Override
    protected String getTranslatedCriteria(final MovieCriteria criterium) {
        final List<String> list = new ArrayList<>();
        addSimpleCriteriaAttribute(list, MovieIndexFields.MOV_ID, criterium, MovieCriteriaFields.MOV_ID);
        addSimpleCriteriaAttribute(list, MovieIndexFields.RELEASED, criterium, MovieCriteriaFields.RELEASED);
        addStartWithCriteria(list, MovieIndexFields.TITLE, criterium, MovieCriteriaFields.TITLE);
        return getRequestFromCriteriaList(list);
    }
}
