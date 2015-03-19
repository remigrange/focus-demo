package rodolphe.demo.domain.movies;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données MovieView
 */
@DtDefinition(persistent = false)
public final class MovieView implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long movId;
	private String title;
	private java.util.Date released;
	private Integer runtime;
	private String description;
	private String metadasJson;
	private String imdbid;
	private String genreIds;
	private String countryIds;
	private String languageIds;
	private Long rank;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> actors;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> producers;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> directors;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'primary key'. 
	 * @return Long movId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "PRIMARY_KEY", notNull = true, persistent = false, label = "primary key")
	public Long getMovId() {
		return movId;
	}

	/**
	 * Champ : PRIMARY_KEY.
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

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Meta Data JSON'. 
	 * @return String metadasJson 
	 */
	@Field(domain = "DO_COMMENTAIRE", persistent = false, label = "Meta Data JSON")
	public String getMetadasJson() {
		return metadasJson;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Meta Data JSON'.
	 * @param metadasJson String 
	 */
	public void setMetadasJson(final String metadasJson) {
		this.metadasJson = metadasJson;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Id imdb'. 
	 * @return String imdbid 
	 */
	@Field(domain = "DO_LIBELLE_100", persistent = false, label = "Id imdb")
	public String getImdbid() {
		return imdbid;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Id imdb'.
	 * @param imdbid String 
	 */
	public void setImdbid(final String imdbid) {
		this.imdbid = imdbid;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Movie's genres identifiers'. 
	 * @return String genreIds 
	 */
	@Field(domain = "DO_MULTI_VALUES_FIELD", persistent = false, label = "Movie's genres identifiers")
	public String getGenreIds() {
		return genreIds;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Movie's genres identifiers'.
	 * @param genreIds String 
	 */
	public void setGenreIds(final String genreIds) {
		this.genreIds = genreIds;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Movie's contries identifiers'. 
	 * @return String countryIds 
	 */
	@Field(domain = "DO_MULTI_VALUES_FIELD", persistent = false, label = "Movie's contries identifiers")
	public String getCountryIds() {
		return countryIds;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Movie's contries identifiers'.
	 * @param countryIds String 
	 */
	public void setCountryIds(final String countryIds) {
		this.countryIds = countryIds;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Movie's languages identifiers'. 
	 * @return String languageIds 
	 */
	@Field(domain = "DO_MULTI_VALUES_FIELD", persistent = false, label = "Movie's languages identifiers")
	public String getLanguageIds() {
		return languageIds;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Movie's languages identifiers'.
	 * @param languageIds String 
	 */
	public void setLanguageIds(final String languageIds) {
		this.languageIds = languageIds;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'rank'. 
	 * @return Long rank <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", notNull = true, persistent = false, label = "rank")
	public Long getRank() {
		return rank;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'rank'.
	 * @param rank Long <b>Obligatoire</b>
	 */
	public void setRank(final Long rank) {
		this.rank = rank;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Actors'. 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> actors 
	 */
	@Field(domain = "DO_DT_PEOPLE_DTC", persistent = false, label = "Actors")
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> getActors() {
		return actors;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Actors'.
	 * @param actors io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> 
	 */
	public void setActors(final io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> actors) {
		this.actors = actors;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Producers'. 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> producers 
	 */
	@Field(domain = "DO_DT_PEOPLE_DTC", persistent = false, label = "Producers")
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> getProducers() {
		return producers;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Producers'.
	 * @param producers io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> 
	 */
	public void setProducers(final io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> producers) {
		this.producers = producers;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Directors'. 
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> directors 
	 */
	@Field(domain = "DO_DT_PEOPLE_DTC", persistent = false, label = "Directors")
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> getDirectors() {
		return directors;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Directors'.
	 * @param directors io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> 
	 */
	public void setDirectors(final io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.people.People> directors) {
		this.directors = directors;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
