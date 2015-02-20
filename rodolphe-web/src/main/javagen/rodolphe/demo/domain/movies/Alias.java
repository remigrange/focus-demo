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
	private String couCd;

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
	@Field(domain = "DO_LIBELLE_100", label = "Title")
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
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Country'. 
	 * @return String couCd <b>Obligatoire</b>
	 */
	@Field(domain = "DO_IDENTIFIANT_CODE", type = "FOREIGN_KEY", notNull = true, label = "Country")
	public String getCouCd() {
		return couCd;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Country'.
	 * @param couCd String <b>Obligatoire</b>
	 */
	public void setCouCd(final String couCd) {
		this.couCd = couCd;
	}


	// Association : Movie non navigable

	// Association : Country non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
