package rodolphe.demo.services.search;

/**
 * Représente la sélection d'une valeur sur une facette dans une recherche à facette.
 *
 * @author jmforhan
 */
public class FacetSelection {

	private String facetName;
	private String facetValueKey;

	/**
	 * Construit une instance de FacetSelection.
	 *
	 * @param facetName Nom de la facette.
	 * @param facetValueKey Clé de la valeur de facette.
	 */
	public FacetSelection(final String facetName, final String facetValueKey) {
		super();
		this.facetName = facetName;
		this.facetValueKey = facetValueKey;
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
	 * Affecte facetValueKey à facetValueKey.
	 *
	 * @param facetValueKey La nouvelle valeur de facetValueKey
	 */
	public void setFacetValueKey(final String facetValueKey) {
		this.facetValueKey = facetValueKey;
	}
}
