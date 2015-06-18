package rodolphe.demo.domain.common;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Dummy
 */
@DtDefinition(persistent = false)
public final class Dummy implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long dummyLong;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'dummy long'. 
	 * @return Long dummyLong 
	 */
	@Field(domain = "DO_ID", persistent = false, label = "dummy long")
	public Long getDummyLong() {
		return dummyLong;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'dummy long'.
	 * @param dummyLong Long 
	 */
	public void setDummyLong(final Long dummyLong) {
		this.dummyLong = dummyLong;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
