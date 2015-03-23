package rodolphe.demo.domain.movies;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données MovieCriteria
 */
@DtDefinition(persistent = false)
public final class MovieCriteria implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long movId;
	private String title;
	private java.util.Date released;
	private Integer year;
	private Integer runtime;
	private String description;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'primary key'. 
	 * @return Long movId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", notNull = true, persistent = false, label = "primary key")
	public Long getMovId() {
		return movId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'primary key'.
	 * @param movId Long <b>Obligatoire</b>
	 */
	public void setMovId(final Long movId) {
		this.movId = movId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Title'. 
	 * @return String title 
	 */
	@Field(domain = "DO_COMMENTAIRE", persistent = false, label = "Title")
	public String getTitle() {
		return title;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Title'.
	 * @param title String 
	 */
	public void setTitle(final String title) {
		this.title = title;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Released'. 
	 * @return java.util.Date released 
	 */
	@Field(domain = "DO_DATE", persistent = false, label = "Released")
	public java.util.Date getReleased() {
		return released;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Released'.
	 * @param released java.util.Date 
	 */
	public void setReleased(final java.util.Date released) {
		this.released = released;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Year'. 
	 * @return Integer year 
	 */
	@Field(domain = "DO_ENTIER", persistent = false, label = "Year")
	public Integer getYear() {
		return year;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Year'.
	 * @param year Integer 
	 */
	public void setYear(final Integer year) {
		this.year = year;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Runtime'. 
	 * @return Integer runtime 
	 */
	@Field(domain = "DO_ENTIER", persistent = false, label = "Runtime")
	public Integer getRuntime() {
		return runtime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Runtime'.
	 * @param runtime Integer 
	 */
	public void setRuntime(final Integer runtime) {
		this.runtime = runtime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Description'. 
	 * @return String description 
	 */
	@Field(domain = "DO_TEXTE", persistent = false, label = "Description")
	public String getDescription() {
		return description;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Description'.
	 * @param description String 
	 */
	public void setDescription(final String description) {
		this.description = description;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
