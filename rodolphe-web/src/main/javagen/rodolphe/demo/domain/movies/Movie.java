package rodolphe.demo.domain.movies;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Movie
 */
@DtDefinition
public final class Movie implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long movId;
	private String title;
	private java.util.Date released;
	private Integer runtime;
	private String description;
	private String metadasJson;
	private String imdbid;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.files.FileInfo> fileInfo;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Alias> alias;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.references.Language> language;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.references.Genre> genre;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.references.Country> country;

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
	@Field(domain = "DO_COMMENTAIRE", label = "TITLE")
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
	 * Récupère la valeur de la propriété 'Runtime'. 
	 * @return Integer runtime 
	 */
	@Field(domain = "DO_ENTIER", label = "Runtime")
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
	@Field(domain = "DO_TEXTE", label = "Description")
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
	@Field(domain = "DO_COMMENTAIRE", label = "metadas Json")
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
	 * Association : File info.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.files.FileInfo>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_MOV_FIL",
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
    	name = "A_MOV_FIL",
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
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation getFileInfoDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURI(this, "A_MOV_FIL", "FileInfo");
	}

	// Association : Role people non navigable
	/**
	 * Association : Alias.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Alias>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_MOV_ALS",
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
		final io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation fkDtListURI = getAliasDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (alias == null) {
			alias = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().getList(fkDtListURI);
		}
		return alias;
	}

	/**
	 * Association URI: Alias.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_MOV_ALS",
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
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation getAliasDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURI(this, "A_MOV_ALS", "Alias");
	}
	/**
	 * Association : Language.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.references.Language>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_MOV_LAN",
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
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.references.Language> getLanguageList() {
//		return this.<rodolphe.demo.domain.references.Language> getList(getLanguageListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(rodolphe.demo.domain.references.Language.class);
		}
		final io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation fkDtListURI = getLanguageDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (language == null) {
			language = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().getList(fkDtListURI);
		}
		return language;
	}

	/**
	 * Association URI: Language.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_MOV_LAN",
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
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation getLanguageDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURI(this, "A_MOV_LAN", "Language");
	}
	/**
	 * Association : Genre.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.references.Genre>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_MOV_GEN",
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
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.references.Genre> getGenreList() {
//		return this.<rodolphe.demo.domain.references.Genre> getList(getGenreListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(rodolphe.demo.domain.references.Genre.class);
		}
		final io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation fkDtListURI = getGenreDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (genre == null) {
			genre = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().getList(fkDtListURI);
		}
		return genre;
	}

	/**
	 * Association URI: Genre.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_MOV_GEN",
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
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation getGenreDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURI(this, "A_MOV_GEN", "Genre");
	}
	/**
	 * Association : Country.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.references.Country>
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_MOV_COU",
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
	public io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.references.Country> getCountryList() {
//		return this.<rodolphe.demo.domain.references.Country> getList(getCountryListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(rodolphe.demo.domain.references.Country.class);
		}
		final io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation fkDtListURI = getCountryDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (country == null) {
			country = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().getList(fkDtListURI);
		}
		return country;
	}

	/**
	 * Association URI: Country.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.AssociationNN (
    	name = "A_MOV_COU",
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
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation getCountryDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURI(this, "A_MOV_COU", "Country");
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
