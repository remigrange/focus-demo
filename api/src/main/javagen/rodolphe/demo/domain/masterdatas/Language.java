package rodolphe.demo.domain.masterdatas;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Language
 */
@DtDefinition
public final class Language implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String lanCd;
	private String label;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'LAN_CD'. 
	 * @return String lanCd <b>Obligatoire</b>
	 */
	@Field(domain = "DO_CODE", type = "PRIMARY_KEY", notNull = true, label = "LAN_CD")
	public String getLanCd() {
		return lanCd;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'LAN_CD'.
	 * @param lanCd String <b>Obligatoire</b>
	 */
	public void setLanCd(final String lanCd) {
		this.lanCd = lanCd;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Label'. 
	 * @return String label 
	 */
	@Field(domain = "DO_LABEL", label = "Label")
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
