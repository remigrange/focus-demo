package rodolphe.demo.domain.movies;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données SearchRet
 */
@DtDefinition(persistent = false)
public final class SearchRet implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String type;
	private String field1;
	private String field2;
	private String field3;
	private String field4;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Type of the object'. 
	 * @return String type 
	 */
	@Field(domain = "DO_LIBELLE_50", persistent = false, label = "Type of the object")
	public String getType() {
		return type;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Type of the object'.
	 * @param type String 
	 */
	public void setType(final String type) {
		this.type = type;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Field 1'. 
	 * @return String field1 
	 */
	@Field(domain = "DO_COMMENTAIRE", persistent = false, label = "Field 1")
	public String getField1() {
		return field1;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Field 1'.
	 * @param field1 String 
	 */
	public void setField1(final String field1) {
		this.field1 = field1;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Field 2'. 
	 * @return String field2 
	 */
	@Field(domain = "DO_COMMENTAIRE", persistent = false, label = "Field 2")
	public String getField2() {
		return field2;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Field 2'.
	 * @param field2 String 
	 */
	public void setField2(final String field2) {
		this.field2 = field2;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Field 3'. 
	 * @return String field3 
	 */
	@Field(domain = "DO_COMMENTAIRE", persistent = false, label = "Field 3")
	public String getField3() {
		return field3;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Field 3'.
	 * @param field3 String 
	 */
	public void setField3(final String field3) {
		this.field3 = field3;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Field 4'. 
	 * @return String field4 
	 */
	@Field(domain = "DO_COMMENTAIRE", persistent = false, label = "Field 4")
	public String getField4() {
		return field4;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Field 4'.
	 * @param field4 String 
	 */
	public void setField4(final String field4) {
		this.field4 = field4;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
