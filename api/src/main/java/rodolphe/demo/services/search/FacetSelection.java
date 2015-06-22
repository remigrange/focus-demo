package rodolphe.demo.services.search;

import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.metamodel.FacetDefinition;

/**
 * Représente la sélection d'une valeur sur une facette dans une recherche à facette.
 *
 * @author jmforhan
 */
public class FacetSelection {

	private final FacetDefinition facetDefinition;
	private final String facetValueKey;
	private final ListFilter facetQuery;

	/**
	 * Construit une instance de FacetSelection.
	 *
	 * @param facetName Nom de la facette.
	 * @param facetValueKey Clé de la valeur de facette.
	 * @param facetQuery query associated with the facet. Generally facetName:facetValueKey but it could be range.
	 */
	public FacetSelection(final FacetDefinition facetDefinition, final String facetValueKey, final ListFilter facetQuery) {
		super();
		this.facetDefinition = facetDefinition;
		this.facetValueKey = facetValueKey;
		this.facetQuery = facetQuery;
	}

	/**
	 * Donne la FacetDefinition.
	 *
	 * @return la FacetDefinition.
	 */
	public FacetDefinition getFacetDefinition() {
		return facetDefinition;
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
