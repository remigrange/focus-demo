package rodolphe.demo.domain.common;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données SearchCriteria
 */
@DtDefinition(persistent = false)
public final class SearchCriteria implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String scope;
	private String searchText;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'The Scope'. 
	 * @return String scope 
	 */
	@Field(domain = "DO_LIBELLE_50", persistent = false, label = "The Scope")
	public String getScope() {
		return scope;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'The Scope'.
	 * @param scope String 
	 */
	public void setScope(final String scope) {
		this.scope = scope;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Field 1'. 
	 * @return String searchText 
	 */
	@Field(domain = "DO_COMMENTAIRE", persistent = false, label = "Field 1")
	public String getSearchText() {
		return searchText;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Field 1'.
	 * @param searchText String 
	 */
	public void setSearchText(final String searchText) {
		this.searchText = searchText;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
