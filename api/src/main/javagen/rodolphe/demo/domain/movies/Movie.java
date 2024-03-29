package rodolphe.demo.domain.movies;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Movie
 */
@DtDefinition
public final class Movie implements KeyConcept {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long movId;
	private String title;
	private java.util.Date released;
	private Integer year;
	private Integer runtime;
	private String description;
	private String metadasJson;
	private String imdbid;
	private String poster;
	private String rated;
	private String genreIds;
	private String countryIds;
	private String languageIds;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.files.FileInfo> fileInfo;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Alias> alias;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.masterdatas.Language> language;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.masterdatas.Genre> genre;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.masterdatas.Country> country;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'MOV_ID'. 
	 * @return Long movId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "PRIMARY_KEY", notNull = true, label = "MOV_ID")
	public Long getMovId() {
		return movId;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'MOV_ID'.
	 * @param movId Long <b>Obligatoire</b>
	 */
	public void setMovId(final Long movId) {
		this.movId = movId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'TITLE'. 
	 * @return String title 
	 */
	@Field(domain = "DO_LABEL_LONG", label = "TITLE")
	public String getTitle() {
		return title;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'TITLE'.
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
	@Field(domain = "DO_DATE", label = "Released")
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
	@Field(domain = "DO_YEAR", label = "Year")
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
	@Field(domain = "DO_DURATION", label = "Runtime")
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
	@Field(domain = "DO_COMMENT", label = "Description")
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
	 * Récupère la valeur de la propriété 'metadas Json'. 
	 * @return String metadasJson 
	 */
	@Field(domain = "DO_COMMENT", label = "metadas Json")
	public String getMetadasJson() {
		return metadasJson;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'metadas Json'.
	 * @param metadasJson String 
	 */
	public void setMetadasJson(final String metadasJson) {
		this.metadasJson = metadasJson;
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
	 * Récupère la valeur de la propriété 'Poster'. 
	 * @return String poster 
	 */
	@Field(domain = "DO_LABEL_LONG", label = "Poster")
	public String getPoster() {
		return poster;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Poster'.
	 * @param poster String 
	 */
	public void setPoster(final String poster) {
		this.poster = poster;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'rated'. 
	 * @return String rated 
	 */
	@Field(domain = "DO_LABEL_LONG", label = "rated")
	public String getRated() {
		return rated;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'rated'.
	 * @param rated String 
	 */
	public void setRated(final String rated) {
		this.rated = rated;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Genres'. 
	 * @return String genreIds 
	 */
	@Field(domain = "DO_MULTI_VALUES_FIELD", persistent = false, label = "Genres")
	public String getGenreIds() {
		return genreIds;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Genres'.
	 * @param genreIds String 
	 */
	public void setGenreIds(final String genreIds) {
		this.genreIds = genreIds;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Countries'. 
	 * @return String countryIds 
	 */
	@Field(domain = "DO_MULTI_VALUES_FIELD", persistent = false, label = "Countries")
	public String getCountryIds() {
		return countryIds;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Countries'.
	 * @param countryIds String 
	 */
	public void setCountryIds(final String countryIds) {
		this.countryIds = countryIds;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Languages'. 
	 * @return String languageIds 
	 */
	@Field(domain = "DO_MULTI_VALUES_FIELD", persistent = false, label = "Languages")
	public String getLanguageIds() {
		return languageIds;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Languages'.
	 * @param languageIds String 
	 */
	public void setLanguageIds(final String languageIds) {
		this.languageIds = languageIds;
	}


	// Association : Role people non navigable

	// Association : Casting non navigable
	/**
	 * Association : File info.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.files.FileInfo>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_FIL",
    	tableName = "MOV_FIL",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_FILE_INFO",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "FileInfo",
    	labelA = "Movie",
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
			fileInfo = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().getList(fkDtListURI);
		}
		return fileInfo;
	}

	/**
	 * Association URI: File info.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_FIL",
    	tableName = "MOV_FIL",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_FILE_INFO",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "FileInfo",
    	labelA = "Movie",
    	labelB = "File info"
    )
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForNNAssociation getFileInfoDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForNNAssociation(this, "ANN_MOV_FIL", "FileInfo");
	}
	/**
	 * Association : Alias.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Alias>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_ALS",
    	tableName = "MOV_ALS",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_ALIAS",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "Alias",
    	labelA = "Movie",
    	labelB = "Alias"
    )
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Alias> getAliasList() {
//		return this.<rodolphe.demo.domain.movies.Alias> getList(getAliasListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(rodolphe.demo.domain.movies.Alias.class);
		}
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getAliasDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (alias == null) {
			alias = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().getList(fkDtListURI);
		}
		return alias;
	}

	/**
	 * Association URI: Alias.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_ALS",
    	tableName = "MOV_ALS",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_ALIAS",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "Alias",
    	labelA = "Movie",
    	labelB = "Alias"
    )
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForNNAssociation getAliasDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForNNAssociation(this, "ANN_MOV_ALS", "Alias");
	}
	/**
	 * Association : Language.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.masterdatas.Language>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_LAN",
    	tableName = "MOV_LAN",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_LANGUAGE",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "Language",
    	labelA = "Movie",
    	labelB = "Language"
    )
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.masterdatas.Language> getLanguageList() {
//		return this.<rodolphe.demo.domain.masterdatas.Language> getList(getLanguageListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(rodolphe.demo.domain.masterdatas.Language.class);
		}
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getLanguageDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (language == null) {
			language = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().getList(fkDtListURI);
		}
		return language;
	}

	/**
	 * Association URI: Language.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_LAN",
    	tableName = "MOV_LAN",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_LANGUAGE",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "Language",
    	labelA = "Movie",
    	labelB = "Language"
    )
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForNNAssociation getLanguageDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForNNAssociation(this, "ANN_MOV_LAN", "Language");
	}
	/**
	 * Association : Genre.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.masterdatas.Genre>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_GEN",
    	tableName = "MOV_GEN",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_GENRE",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "Genre",
    	labelA = "Movie",
    	labelB = "Genre"
    )
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.masterdatas.Genre> getGenreList() {
//		return this.<rodolphe.demo.domain.masterdatas.Genre> getList(getGenreListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(rodolphe.demo.domain.masterdatas.Genre.class);
		}
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getGenreDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (genre == null) {
			genre = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().getList(fkDtListURI);
		}
		return genre;
	}

	/**
	 * Association URI: Genre.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_GEN",
    	tableName = "MOV_GEN",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_GENRE",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "Genre",
    	labelA = "Movie",
    	labelB = "Genre"
    )
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForNNAssociation getGenreDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForNNAssociation(this, "ANN_MOV_GEN", "Genre");
	}
	/**
	 * Association : Country.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.masterdatas.Country>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_COU",
    	tableName = "MOV_COU",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_COUNTRY",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "Country",
    	labelA = "Movie",
    	labelB = "Country"
    )
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.masterdatas.Country> getCountryList() {
//		return this.<rodolphe.demo.domain.masterdatas.Country> getList(getCountryListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(rodolphe.demo.domain.masterdatas.Country.class);
		}
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getCountryDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (country == null) {
			country = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().getList(fkDtListURI);
		}
		return country;
	}

	/**
	 * Association URI: Country.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "ANN_MOV_COU",
    	tableName = "MOV_COU",
    	dtDefinitionA = "DT_MOVIE",
    	dtDefinitionB = "DT_COUNTRY",
    	navigabilityA = false,
    	navigabilityB = true,
    	roleA = "Movie",
    	roleB = "Country",
    	labelA = "Movie",
    	labelB = "Country"
    )
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForNNAssociation getCountryDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForNNAssociation(this, "ANN_MOV_COU", "Country");
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
