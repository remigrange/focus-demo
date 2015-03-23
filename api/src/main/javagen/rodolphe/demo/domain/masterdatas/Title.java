package rodolphe.demo.domain.masterdatas;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Title
 */
@DtDefinition
public final class Title implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String titCd;
	private String label;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'TIT_CD'. 
	 * @return String titCd <b>Obligatoire</b>
	 */
	@Field(domain = "DO_IDENTIFIANT_CODE", type = "PRIMARY_KEY", notNull = true, label = "TIT_CD")
	public String getTitCd() {
		return titCd;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'TIT_CD'.
	 * @param titCd String <b>Obligatoire</b>
	 */
	public void setTitCd(final String titCd) {
		this.titCd = titCd;
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


	// Association : People non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
