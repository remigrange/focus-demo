package rodolphe.demo.services.search;

import io.vertigo.dynamo.collections.ListFilter;

/**
 * Représente la sélection d'une valeur sur une facette dans une recherche à facette.
 *
 * @author jmforhan
 */
public class FacetSelection {

	private String facetName;
	private String facetValueKey;
	private ListFilter facetQuery;

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
	 * Affecte facetName à facetName.
	 *
	 * @param facetName La nouvelle valeur de facetName
	 */
	public void setFacetName(final String facetName) {
		this.facetName = facetName;
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

	/**
	 * @param facetQuery the facetQuery to set
	 */
	public void setFacetQuery(final ListFilter facetQuery) {
		this.facetQuery = facetQuery;
	}

	/**
	 * Affecte facetValueKey à facetValueKey.
	 *
	 * @param facetValueKey La nouvelle valeur de facetValueKey
	 */
	public void setFacetValueKey(final String facetValueKey) {
		this.facetValueKey = facetValueKey;
	}
}
