/**
 *
 */
package rodolphe.demo.domain.search;

import io.vertigo.core.Home;
import io.vertigo.dynamo.collections.metamodel.FacetedQueryDefinition;
import rodolphe.demo.domain.CodeEnum;
import rodolphe.demo.domain.movies.MovieIndex;

/**
 * Enum of the various searches. With or Without facets.
 *
 * @author jmforhan
 */
public enum FacetedSearchConst implements CodeEnum {
    /** Movie without facets. */
    QRY_MOVIE_WO_FCT(),
    /** Movie with facets. */
    QRY_MOVIE_WITH_FCT(MovieIndex.class, FacetConst.FCT_MOVIE_GENRE, FacetConst.FCT_MOVIE_COUNTRY,
            FacetConst.FCT_MOVIE_LANGUAGE),
    /** People without facets. */
    QRY_PEOPLE_WO_FCT();

    private final FacetConst[] facetConstTab;
    private final Class indexClassname;

    private FacetedSearchConst(final Class indexClassname, final FacetConst... facetConstTab) {
        this.facetConstTab = facetConstTab;
        this.indexClassname = indexClassname;
    }

    private FacetedSearchConst() {
        facetConstTab = null;
        indexClassname = null;
    }

    /**
     * Give the value of facetConstTab.
     * 
     * @return the value of facetConstTab.
     */
    public FacetConst[] getFacetConstTab() {
        return facetConstTab;
    }

    /**
     * Give the value of indexClassname.
     * 
     * @return the value of indexClassname.
     */
    public Class getIndexClassname() {
        return indexClassname;
    }

    /**
     * Get the vertigo definition associated with the search.
     *
     * @return definition
     */
    public FacetedQueryDefinition getQuery() {
        return Home.getDefinitionSpace().resolve(name(), FacetedQueryDefinition.class);
    }
}
