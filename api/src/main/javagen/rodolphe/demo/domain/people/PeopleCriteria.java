package rodolphe.demo.domain.people;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données PeopleCriteria
 */
@DtDefinition(persistent = false)
public final class PeopleCriteria implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long peoId;
	private String lastName;
	private String firstName;
	private String titCd;
	private String peoName;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'primary key'. 
	 * @return Long peoId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", notNull = true, persistent = false, label = "primary key")
	public Long getPeoId() {
		return peoId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'primary key'.
	 * @param peoId Long <b>Obligatoire</b>
	 */
	public void setPeoId(final Long peoId) {
		this.peoId = peoId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Last name'. 
	 * @return String lastName 
	 */
	@Field(domain = "DO_LIBELLE_50", persistent = false, label = "Last name")
	public String getLastName() {
		return lastName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Last name'.
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
	@Field(domain = "DO_LIBELLE_50", persistent = false, label = "First Name")
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
	 * Récupère la valeur de la propriété 'Title'. 
	 * @return String titCd 
	 */
	@Field(domain = "DO_IDENTIFIANT_CODE", persistent = false, label = "Title")
	public String getTitCd() {
		return titCd;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Title'.
	 * @param titCd String 
	 */
	public void setTitCd(final String titCd) {
		this.titCd = titCd;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Name'. 
	 * @return String peoName 
	 */
	@Field(domain = "DO_LIBELLE_250", persistent = false, label = "Name")
	public String getPeoName() {
		return peoName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Name'.
	 * @param peoName String 
	 */
	public void setPeoName(final String peoName) {
		this.peoName = peoName;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
