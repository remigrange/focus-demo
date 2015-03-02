package rodolphe.demo.domain.masterdatas;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Genre
 */
@DtDefinition
public final class Genre implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String genCd;
	private String label;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'GEN_CD'. 
	 * @return String genCd <b>Obligatoire</b>
	 */
	@Field(domain = "DO_IDENTIFIANT_CODE", type = "PRIMARY_KEY", notNull = true, label = "GEN_CD")
	public String getGenCd() {
		return genCd;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'GEN_CD'.
	 * @param genCd String <b>Obligatoire</b>
	 */
	public void setGenCd(final String genCd) {
		this.genCd = genCd;
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
