package rodolphe.demo.domain.masterdatas;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Country
 */
@DtDefinition
public final class Country implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String couCd;
	private String label;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'COU_CD'. 
	 * @return String couCd <b>Obligatoire</b>
	 */
	@Field(domain = "DO_IDENTIFIANT_CODE", type = "PRIMARY_KEY", notNull = true, label = "COU_CD")
	public String getCouCd() {
		return couCd;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'COU_CD'.
	 * @param couCd String <b>Obligatoire</b>
	 */
	public void setCouCd(final String couCd) {
		this.couCd = couCd;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Label'. 
	 * @return String label 
	 */
	@Field(domain = "DO_LIBELLE_100", label = "Label")
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Label'.
	 * @param label String 
	 */
	public void setLabel(final String label) {
		this.label = label;
	}


	// Association : Movie non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
