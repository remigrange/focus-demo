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
	private String query;

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
	 * Récupère la valeur de la propriété 'Search Text'. 
	 * @return String searchText 
	 */
	@Field(domain = "DO_COMMENTAIRE", persistent = false, label = "Search Text")
	public String getSearchText() {
		return searchText;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Search Text'.
	 * @param searchText String 
	 */
	public void setSearchText(final String searchText) {
		this.searchText = searchText;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'query'. 
	 * @return String query 
	 */
	@Field(domain = "DO_COMMENTAIRE", persistent = false, label = "query")
	public String getQuery() {
		return query;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'query'.
	 * @param query String 
	 */
	public void setQuery(final String query) {
		this.query = query;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
