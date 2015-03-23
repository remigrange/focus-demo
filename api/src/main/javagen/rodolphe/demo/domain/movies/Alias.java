package rodolphe.demo.domain.movies;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Alias
 */
@DtDefinition
public final class Alias implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long alsId;
	private String title;
	private String addition;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'ALS_ID'. 
	 * @return Long alsId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "PRIMARY_KEY", notNull = true, label = "ALS_ID")
	public Long getAlsId() {
		return alsId;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'ALS_ID'.
	 * @param alsId Long <b>Obligatoire</b>
	 */
	public void setAlsId(final Long alsId) {
		this.alsId = alsId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Title'. 
	 * @return String title 
	 */
	@Field(domain = "DO_COMMENTAIRE", label = "Title")
	public String getTitle() {
		return title;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Title'.
	 * @param title String 
	 */
	public void setTitle(final String title) {
		this.title = title;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'addition'. 
	 * @return String addition 
	 */
	@Field(domain = "DO_TEXTE", label = "addition")
	public String getAddition() {
		return addition;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'addition'.
	 * @param addition String 
	 */
	public void setAddition(final String addition) {
		this.addition = addition;
	}


	// Association : Movie non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
