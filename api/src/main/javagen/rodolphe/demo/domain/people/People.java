package rodolphe.demo.domain.people;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données People
 */
@DtDefinition
public final class People implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long peoId;
	private String lastName;
	private String firstName;
	private String peoName;
	private String imdbid;
	private String titCd;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.files.FileInfo> fileInfo;
	private rodolphe.demo.domain.masterdatas.Title title;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'PEO_ID'. 
	 * @return Long peoId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "PRIMARY_KEY", notNull = true, label = "PEO_ID")
	public Long getPeoId() {
		return peoId;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'PEO_ID'.
	 * @param peoId Long <b>Obligatoire</b>
	 */
	public void setPeoId(final Long peoId) {
		this.peoId = peoId;
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
	 * Récupère la valeur de la propriété 'Peo Name'. 
	 * @return String peoName 
	 */
	@Field(domain = "DO_LIBELLE_250", label = "Peo Name")
	public String getPeoName() {
		return peoName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Peo Name'.
	 * @param peoName String 
	 */
	public void setPeoName(final String peoName) {
		this.peoName = peoName;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'imdbID'. 
	 * @return String imdbid 
	 */
	@Field(domain = "DO_LIBELLE_100", label = "imdbID")
	public String getImdbid() {
		return imdbid;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'imdbID'.
	 * @param imdbid String 
	 */
	public void setImdbid(final String imdbid) {
		this.imdbid = imdbid;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Title'. 
	 * @return String titCd 
	 */
	@Field(domain = "DO_IDENTIFIANT_CODE", type = "FOREIGN_KEY", label = "Title")
	public String getTitCd() {
		return titCd;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Title'.
	 * @param titCd String 
	 */
	public void setTitCd(final String titCd) {
		this.titCd = titCd;
	}

	/**
	 * Association : File info.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.files.FileInfo>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_PEO_FIL",
    	tableName = "PEO_FIL",
    	dtDefinitionA = "DT_PEOPLE",
    	dtDefinitionB = "DT_FILE_INFO",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "People",
    	roleB = "FileInfo",
    	labelA = "People",
    	labelB = "File info"
    )
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.files.FileInfo> getFileInfoList() {
//		return this.<rodolphe.demo.domain.files.FileInfo> getList(getFileInfoListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(rodolphe.demo.domain.files.FileInfo.class);
		}
		final io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation fkDtListURI = getFileInfoDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (fileInfo == null) {
			fileInfo = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().getList(fkDtListURI);
		}
		return fileInfo;
	}

	/**
	 * Association URI: File info.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_PEO_FIL",
    	tableName = "PEO_FIL",
    	dtDefinitionA = "DT_PEOPLE",
    	dtDefinitionB = "DT_FILE_INFO",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "People",
    	roleB = "FileInfo",
    	labelA = "People",
    	labelB = "File info"
    )
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation getFileInfoDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURI(this, "A_PEO_FIL", "FileInfo");
	}

	// Association : Role people non navigable
	/**
	 * Association : Title.
	 * @return rodolphe.demo.domain.masterdatas.Title
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_PEO_TIT",
    	fkFieldName = "TIT_CD",
    	primaryDtDefinitionName = "DT_TITLE",
    	primaryIsNavigable = true,
    	primaryRole = "Title",
    	primaryLabel = "Title",
    	primaryMultiplicity = "0..1",
    	foreignDtDefinitionName = "DT_PEOPLE",
    	foreignIsNavigable = false,
    	foreignRole = "People",
    	foreignLabel = "People",
    	foreignMultiplicity = "0..*"
    )
	public rodolphe.demo.domain.masterdatas.Title getTitle() {
		final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.masterdatas.Title> fkURI = getTitleURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (title != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.masterdatas.Title> uri;
			uri = new io.vertigo.dynamo.domain.model.URI<>(io.vertigo.dynamo.domain.util.DtObjectUtil.findDtDefinition(title), io.vertigo.dynamo.domain.util.DtObjectUtil.getId(title));
			if (!fkURI.toURN().equals(uri.toURN())) {
				title = null;
			}
		}		
		if (title == null) {
			title = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().get(fkURI);
		}
		return title;
	}

	/**
	 * Retourne l'URI: Title.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_PEO_TIT",
    	fkFieldName = "TIT_CD",
    	primaryDtDefinitionName = "DT_TITLE",
    	primaryIsNavigable = true,
    	primaryRole = "Title",
    	primaryLabel = "Title",
    	primaryMultiplicity = "0..1",
    	foreignDtDefinitionName = "DT_PEOPLE",
    	foreignIsNavigable = false,
    	foreignRole = "People",
    	foreignLabel = "People",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.masterdatas.Title> getTitleURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_PEO_TIT", rodolphe.demo.domain.masterdatas.Title.class);
	}

	// Association : Casting non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
