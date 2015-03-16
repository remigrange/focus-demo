package rodolphe.demo.domain.common;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données SelectedFacet
 */
@DtDefinition(persistent = false)
public final class SelectedFacet implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String key;
	private String facetQuery;
	private String value;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Facet Name'. 
	 * @return String key 
	 */
	@Field(domain = "DO_LIBELLE_250", persistent = false, label = "Facet Name")
	public String getKey() {
		return key;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Facet Name'.
	 * @param key String 
	 */
	public void setKey(final String key) {
		this.key = key;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Facet query'. 
	 * @return String facetQuery 
	 */
	@Field(domain = "DO_LIBELLE_250", persistent = false, label = "Facet query")
	public String getFacetQuery() {
		return facetQuery;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Facet query'.
	 * @param facetQuery String 
	 */
	public void setFacetQuery(final String facetQuery) {
		this.facetQuery = facetQuery;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Facet key value'. 
	 * @return String value 
	 */
	@Field(domain = "DO_LIBELLE_250", persistent = false, label = "Facet key value")
	public String getValue() {
		return value;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Facet key value'.
	 * @param value String 
	 */
	public void setValue(final String value) {
		this.value = value;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
