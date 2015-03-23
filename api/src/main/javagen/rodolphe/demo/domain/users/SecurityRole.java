package rodolphe.demo.domain.users;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données SecurityRole
 */
@DtDefinition
public final class SecurityRole implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String sroCd;
	private String label;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'SRO_CD'. 
	 * @return String sroCd <b>Obligatoire</b>
	 */
	@Field(domain = "DO_IDENTIFIANT_CODE", type = "PRIMARY_KEY", notNull = true, label = "SRO_CD")
	public String getSroCd() {
		return sroCd;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'SRO_CD'.
	 * @param sroCd String <b>Obligatoire</b>
	 */
	public void setSroCd(final String sroCd) {
		this.sroCd = sroCd;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Label'. 
	 * @return String label 
	 */
	@Field(domain = "DO_LIBELLE_250", label = "Label")
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


	// Association : Profil non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
