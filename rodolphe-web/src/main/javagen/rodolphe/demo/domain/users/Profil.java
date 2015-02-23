package rodolphe.demo.domain.users;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Profil
 */
@DtDefinition
public final class Profil implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long proId;
	private String label;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.users.SecurityRole> securityRole;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'PRO_ID'. 
	 * @return Long proId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "PRIMARY_KEY", notNull = true, label = "PRO_ID")
	public Long getProId() {
		return proId;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'PRO_ID'.
	 * @param proId Long <b>Obligatoire</b>
	 */
	public void setProId(final Long proId) {
		this.proId = proId;
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


	// Association : Application user non navigable
	/**
	 * Association : Security role.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.users.SecurityRole>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_PRO_SRO",
    	tableName = "PRO_SRO",
    	dtDefinitionA = "DT_PROFIL",
    	dtDefinitionB = "DT_SECURITY_ROLE",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Profil",
    	roleB = "SecurityRole",
    	labelA = "Profil",
    	labelB = "Security role"
    )
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.users.SecurityRole> getSecurityRoleList() {
//		return this.<rodolphe.demo.domain.users.SecurityRole> getList(getSecurityRoleListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(rodolphe.demo.domain.users.SecurityRole.class);
		}
		final io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation fkDtListURI = getSecurityRoleDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (securityRole == null) {
			securityRole = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().getList(fkDtListURI);
		}
		return securityRole;
	}

	/**
	 * Association URI: Security role.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_PRO_SRO",
    	tableName = "PRO_SRO",
    	dtDefinitionA = "DT_PROFIL",
    	dtDefinitionB = "DT_SECURITY_ROLE",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Profil",
    	roleB = "SecurityRole",
    	labelA = "Profil",
    	labelB = "Security role"
    )
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation getSecurityRoleDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURI(this, "A_PRO_SRO", "SecurityRole");
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
