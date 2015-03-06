package rodolphe.demo.domain.files;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données FileInfo
 */
@DtDefinition
public final class FileInfo implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long filId;
	private String fileName;
	private String mimeType;
	private Long length;
	private java.util.Date lastModified;
	private String filePath;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'FIL_ID'. 
	 * @return Long filId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "PRIMARY_KEY", notNull = true, label = "FIL_ID")
	public Long getFilId() {
		return filId;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'FIL_ID'.
	 * @param filId Long <b>Obligatoire</b>
	 */
	public void setFilId(final Long filId) {
		this.filId = filId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'FILE_NAME'. 
	 * @return String fileName 
	 */
	@Field(domain = "DO_LIBELLE_100", label = "FILE_NAME")
	public String getFileName() {
		return fileName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'FILE_NAME'.
	 * @param fileName String 
	 */
	public void setFileName(final String fileName) {
		this.fileName = fileName;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'MIME_TYPE'. 
	 * @return String mimeType 
	 */
	@Field(domain = "DO_LIBELLE_100", label = "MIME_TYPE")
	public String getMimeType() {
		return mimeType;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'MIME_TYPE'.
	 * @param mimeType String 
	 */
	public void setMimeType(final String mimeType) {
		this.mimeType = mimeType;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'LENGTH'. 
	 * @return Long length <b>Obligatoire</b>
	 */
	@Field(domain = "DO_TAILLE_FICHIER", notNull = true, label = "LENGTH")
	public Long getLength() {
		return length;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'LENGTH'.
	 * @param length Long <b>Obligatoire</b>
	 */
	public void setLength(final Long length) {
		this.length = length;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'LAST_MODIFIED'. 
	 * @return java.util.Date lastModified <b>Obligatoire</b>
	 */
	@Field(domain = "DO_TIMESTAMP", notNull = true, label = "LAST_MODIFIED")
	public java.util.Date getLastModified() {
		return lastModified;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'LAST_MODIFIED'.
	 * @param lastModified java.util.Date <b>Obligatoire</b>
	 */
	public void setLastModified(final java.util.Date lastModified) {
		this.lastModified = lastModified;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'FILE_PATH'. 
	 * @return String filePath 
	 */
	@Field(domain = "DO_CHEMIN_ACCES", label = "FILE_PATH")
	public String getFilePath() {
		return filePath;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'FILE_PATH'.
	 * @param filePath String 
	 */
	public void setFilePath(final String filePath) {
		this.filePath = filePath;
	}


	// Association : People non navigable

	// Association : Movie non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
