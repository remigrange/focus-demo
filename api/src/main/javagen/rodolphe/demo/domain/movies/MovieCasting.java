package rodolphe.demo.domain.movies;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données MovieCasting
 */
@DtDefinition(persistent = false)
public final class MovieCasting implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long castId;
	private String peoName;
	private String role;
	private String characterName;
	private String fileName;
	private String mimeType;
	private String filePath;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'primary key'. 
	 * @return Long castId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "PRIMARY_KEY", notNull = true, persistent = false, label = "primary key")
	public Long getCastId() {
		return castId;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'primary key'.
	 * @param castId Long <b>Obligatoire</b>
	 */
	public void setCastId(final Long castId) {
		this.castId = castId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Name'. 
	 * @return String peoName 
	 */
	@Field(domain = "DO_LABEL_LONG", persistent = false, label = "Name")
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

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Role'. 
	 * @return String role 
	 */
	@Field(domain = "DO_LABEL", persistent = false, label = "Role")
	public String getRole() {
		return role;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Role'.
	 * @param role String 
	 */
	public void setRole(final String role) {
		this.role = role;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Character name'. 
	 * @return String characterName 
	 */
	@Field(domain = "DO_LABEL_LONG", persistent = false, label = "Character name")
	public String getCharacterName() {
		return characterName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Character name'.
	 * @param characterName String 
	 */
	public void setCharacterName(final String characterName) {
		this.characterName = characterName;
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

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
