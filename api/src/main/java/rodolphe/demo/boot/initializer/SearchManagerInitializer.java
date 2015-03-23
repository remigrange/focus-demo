/**
 *
 */
package rodolphe.demo.boot.initializer;

import io.vertigo.core.Home;
import io.vertigo.core.spaces.component.ComponentInitializer;
import io.vertigo.dynamo.collections.metamodel.FacetDefinition;
import io.vertigo.dynamo.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.search.SearchManager;
import io.vertigo.lang.MessageText;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import rodolphe.demo.domain.search.FacetConst;
import rodolphe.demo.domain.search.FacetedSearchConst;

/**
 * Initialiseur pour le search manager en charge nottament d'initialiser les définitions des facettes.
 *
 * @author jmforhan
 */
public class SearchManagerInitializer implements ComponentInitializer<SearchManager> {

    /** {@inheritDoc} */
    @Override
    public void init(final SearchManager component) {
        for (final FacetedSearchConst search : FacetedSearchConst.values()) {
            final FacetConst[] facets = search.getFacetConstTab();
            if (facets == null || facets.length == 0) {
                initQueryWoFacet(search);
            } else {
                initQueryWithFacet(search);
            }
        }
    }

    private static void initQueryWoFacet(final FacetedSearchConst search) {
        final List<FacetDefinition> facetDefinitionList = Collections.<FacetDefinition> emptyList();
        final FacetedQueryDefinition queryDefinition = new FacetedQueryDefinition(search.name(), facetDefinitionList);
        Home.getDefinitionSpace().put(queryDefinition, FacetedQueryDefinition.class);
    }

    private static void initQueryWithFacet(final FacetedSearchConst search) {
        //
        // On ajoute facette pour runtime
        final List<FacetDefinition> facetDefinitionList = new ArrayList<>();
        final DtDefinition indexDef = DtObjectUtil.findDtDefinition(search.getIndexClassname());
        for (final FacetConst facet : search.getFacetConstTab()) {
            final DtField dispField = indexDef.getField(facet.getField());
            final FacetDefinition facetDefinition = FacetDefinition.createFacetDefinitionByTerm(facet.name(),
                    dispField, new MessageText(facet.getFacetName(), null));
            Home.getDefinitionSpace().put(facetDefinition, FacetDefinition.class);
            facetDefinitionList.add(facetDefinition);
        }
        final FacetedQueryDefinition queryDefinition = new FacetedQueryDefinition(search.name(), facetDefinitionList);
        Home.getDefinitionSpace().put(queryDefinition, FacetedQueryDefinition.class);
    }
}
