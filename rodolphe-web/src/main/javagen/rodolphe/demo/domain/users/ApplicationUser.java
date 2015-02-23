package rodolphe.demo.domain.users;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données ApplicationUser
 */
@DtDefinition
public final class ApplicationUser implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long usrId;
	private String lastName;
	private String firstName;
	private String email;
	private Long proId;
	private rodolphe.demo.domain.users.Profil profil;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'USR_ID'. 
	 * @return Long usrId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "PRIMARY_KEY", notNull = true, label = "USR_ID")
	public Long getUsrId() {
		return usrId;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'USR_ID'.
	 * @param usrId Long <b>Obligatoire</b>
	 */
	public void setUsrId(final Long usrId) {
		this.usrId = usrId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Last Name'. 
	 * @return String lastName 
	 */
	@Field(domain = "DO_NOM", label = "Last Name")
	public String getLastName() {
		return lastName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Last Name'.
	 * @param lastName String 
	 */
	public void setLastName(final String lastName) {
		this.lastName = lastName;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'First Name'. 
	 * @return String firstName 
	 */
	@Field(domain = "DO_PRENOM", label = "First Name")
	public String getFirstName() {
		return firstName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'First Name'.
	 * @param firstName String 
	 */
	public void setFirstName(final String firstName) {
		this.firstName = firstName;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'email'. 
	 * @return String email 
	 */
	@Field(domain = "DO_EMAIL", label = "email")
	public String getEmail() {
		return email;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'email'.
	 * @param email String 
	 */
	public void setEmail(final String email) {
		this.email = email;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Profil'. 
	 * @return Long proId 
	 */
	@Field(domain = "DO_ID", type = "FOREIGN_KEY", label = "Profil")
	public Long getProId() {
		return proId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Profil'.
	 * @param proId Long 
	 */
	public void setProId(final Long proId) {
		this.proId = proId;
	}


	// Association : User authentification non navigable
	/**
	 * Association : Profil.
	 * @return rodolphe.demo.domain.users.Profil
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_USR_PRO",
    	fkFieldName = "PRO_ID",
    	primaryDtDefinitionName = "DT_PROFIL",
    	primaryIsNavigable = true,
    	primaryRole = "Profil",
    	primaryLabel = "Profil",
    	primaryMultiplicity = "0..1",
    	foreignDtDefinitionName = "DT_APPLICATION_USER",
    	foreignIsNavigable = false,
    	foreignRole = "ApplicationUser",
    	foreignLabel = "Application user",
    	foreignMultiplicity = "0..*"
    )
	public rodolphe.demo.domain.users.Profil getProfil() {
		final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.users.Profil> fkURI = getProfilURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (profil != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.users.Profil> uri;
			uri = new io.vertigo.dynamo.domain.model.URI<>(io.vertigo.dynamo.domain.util.DtObjectUtil.findDtDefinition(profil), io.vertigo.dynamo.domain.util.DtObjectUtil.getId(profil));
			if (!fkURI.toURN().equals(uri.toURN())) {
				profil = null;
			}
		}		
		if (profil == null) {
			profil = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().get(fkURI);
		}
		return profil;
	}

	/**
	 * Retourne l'URI: Profil.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_USR_PRO",
    	fkFieldName = "PRO_ID",
    	primaryDtDefinitionName = "DT_PROFIL",
    	primaryIsNavigable = true,
    	primaryRole = "Profil",
    	primaryLabel = "Profil",
    	primaryMultiplicity = "0..1",
    	foreignDtDefinitionName = "DT_APPLICATION_USER",
    	foreignIsNavigable = false,
    	foreignRole = "ApplicationUser",
    	foreignLabel = "Application user",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.users.Profil> getProfilURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_USR_PRO", rodolphe.demo.domain.users.Profil.class);
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
