package rodolphe.demo.services.search;

import io.vertigo.dynamo.collections.ListFilter;

/**
 * Représente la sélection d'une valeur sur une facette dans une recherche à facette.
 *
 * @author jmforhan
 */
public class FacetSelection {

    private final String facetName;
    private final String facetValueKey;
    private final ListFilter facetQuery;

    /**
     * Construit une instance de FacetSelection.
     *
     * @param facetName Nom de la facette.
     * @param facetValueKey Clé de la valeur de facette.
     * @param facetQuery query associated with the facet. Generally facetName:facetValueKey but it could be range.
     */
    public FacetSelection(final String facetName, final String facetValueKey, final ListFilter facetQuery) {
        super();
        this.facetName = facetName;
        this.facetValueKey = facetValueKey;
        this.facetQuery = facetQuery;
    }

    /**
     * Donne la valeur de facetName.
     *
     * @return la valeur de facetName.
     */
    public String getFacetName() {
        return facetName;
    }

    /**
     * Donne la valeur de facetValueKey.
     *
     * @return la valeur de facetValueKey.
     */
    public String getFacetValueKey() {
        return facetValueKey;
    }

    /**
     * @return the facetQuery
     */
    public ListFilter getFacetQuery() {
        return facetQuery;
    }
}
