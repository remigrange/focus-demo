package rodolphe.demo.domain.people;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données People
 */
@DtDefinition
public final class People implements KeyConcept {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long peoId;
	private String lastName;
	private String firstName;
	private String peoName;
	private String imdbid;
	private String comment;
	private String fileName;
	private String mimeType;
	private String filePath;
	private String titCd;
	private rodolphe.demo.domain.masterdatas.Title title;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.files.FileInfo> fileInfo;

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
	@Field(domain = "DO_NAME", label = "Last Name")
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
	@Field(domain = "DO_FIRSTNAME", label = "First Name")
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
	@Field(domain = "DO_LABEL_LONG", label = "Peo Name")
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
	@Field(domain = "DO_LABEL", label = "imdbID")
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
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Commentaire'. 
	 * @return String comment 
	 */
	@Field(domain = "DO_COMMENT", persistent = false, label = "Commentaire")
	public String getComment() {
		return comment;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Commentaire'.
	 * @param comment String 
	 */
	public void setComment(final String comment) {
		this.comment = comment;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'File name'. 
	 * @return String fileName 
	 */
	@Field(domain = "DO_FILE_NAME", persistent = false, label = "File name")
	public String getFileName() {
		return fileName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'File name'.
	 * @param fileName String 
	 */
	public void setFileName(final String fileName) {
		this.fileName = fileName;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'MIME type'. 
	 * @return String mimeType 
	 */
	@Field(domain = "DO_FILE_NAME", persistent = false, label = "MIME type")
	public String getMimeType() {
		return mimeType;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'MIME type'.
	 * @param mimeType String 
	 */
	public void setMimeType(final String mimeType) {
		this.mimeType = mimeType;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'File path'. 
	 * @return String filePath 
	 */
	@Field(domain = "DO_FILE_PATH", persistent = false, label = "File path")
	public String getFilePath() {
		return filePath;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'File path'.
	 * @param filePath String 
	 */
	public void setFilePath(final String filePath) {
		this.filePath = filePath;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Title'. 
	 * @return String titCd 
	 */
	@Field(domain = "DO_CODE", type = "FOREIGN_KEY", label = "Title")
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
	/**
	 * Association : File info.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.files.FileInfo>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_PEO_FIL",
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
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getFileInfoDtListURI();
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
    	name = "ANN_PEO_FIL",
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
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForNNAssociation getFileInfoDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForNNAssociation(this, "ANN_PEO_FIL", "FileInfo");
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
