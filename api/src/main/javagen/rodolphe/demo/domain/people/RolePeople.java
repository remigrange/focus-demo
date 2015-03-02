package rodolphe.demo.domain.people;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données RolePeople
 */
@DtDefinition
public final class RolePeople implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long rlpId;
	private String roleName;
	private Long peoId;
	private Long movId;
	private String rlmCd;
	private rodolphe.demo.domain.people.People people;
	private rodolphe.demo.domain.movies.Movie movie;
	private rodolphe.demo.domain.masterdatas.RoleMovie roleMovie;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'RLP_ID'. 
	 * @return Long rlpId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "PRIMARY_KEY", notNull = true, label = "RLP_ID")
	public Long getRlpId() {
		return rlpId;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'RLP_ID'.
	 * @param rlpId Long <b>Obligatoire</b>
	 */
	public void setRlpId(final Long rlpId) {
		this.rlpId = rlpId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Role Name'. 
	 * @return String roleName 
	 */
	@Field(domain = "DO_TEXTE", label = "Role Name")
	public String getRoleName() {
		return roleName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Role Name'.
	 * @param roleName String 
	 */
	public void setRoleName(final String roleName) {
		this.roleName = roleName;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'People'. 
	 * @return Long peoId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "FOREIGN_KEY", notNull = true, label = "People")
	public Long getPeoId() {
		return peoId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'People'.
	 * @param peoId Long <b>Obligatoire</b>
	 */
	public void setPeoId(final Long peoId) {
		this.peoId = peoId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Movie'. 
	 * @return Long movId 
	 */
	@Field(domain = "DO_ID", type = "FOREIGN_KEY", label = "Movie")
	public Long getMovId() {
		return movId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Movie'.
	 * @param movId Long 
	 */
	public void setMovId(final Long movId) {
		this.movId = movId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Role movie'. 
	 * @return String rlmCd <b>Obligatoire</b>
	 */
	@Field(domain = "DO_IDENTIFIANT_CODE", type = "FOREIGN_KEY", notNull = true, label = "Role movie")
	public String getRlmCd() {
		return rlmCd;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Role movie'.
	 * @param rlmCd String <b>Obligatoire</b>
	 */
	public void setRlmCd(final String rlmCd) {
		this.rlmCd = rlmCd;
	}

	/**
	 * Association : People.
	 * @return rodolphe.demo.domain.people.People
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_RLP_PEO",
    	fkFieldName = "PEO_ID",
    	primaryDtDefinitionName = "DT_PEOPLE",
    	primaryIsNavigable = true,
    	primaryRole = "People",
    	primaryLabel = "People",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_ROLE_PEOPLE",
    	foreignIsNavigable = false,
    	foreignRole = "RolePeople",
    	foreignLabel = "Role people",
    	foreignMultiplicity = "0..*"
    )
	public rodolphe.demo.domain.people.People getPeople() {
		final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.people.People> fkURI = getPeopleURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (people != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.people.People> uri;
			uri = new io.vertigo.dynamo.domain.model.URI<>(io.vertigo.dynamo.domain.util.DtObjectUtil.findDtDefinition(people), io.vertigo.dynamo.domain.util.DtObjectUtil.getId(people));
			if (!fkURI.toURN().equals(uri.toURN())) {
				people = null;
			}
		}		
		if (people == null) {
			people = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().get(fkURI);
		}
		return people;
	}

	/**
	 * Retourne l'URI: People.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_RLP_PEO",
    	fkFieldName = "PEO_ID",
    	primaryDtDefinitionName = "DT_PEOPLE",
    	primaryIsNavigable = true,
    	primaryRole = "People",
    	primaryLabel = "People",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_ROLE_PEOPLE",
    	foreignIsNavigable = false,
    	foreignRole = "RolePeople",
    	foreignLabel = "Role people",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.people.People> getPeopleURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_RLP_PEO", rodolphe.demo.domain.people.People.class);
	}
	/**
	 * Association : Movie.
	 * @return rodolphe.demo.domain.movies.Movie
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_RLP_MOV",
    	fkFieldName = "MOV_ID",
    	primaryDtDefinitionName = "DT_MOVIE",
    	primaryIsNavigable = true,
    	primaryRole = "Movie",
    	primaryLabel = "Movie",
    	primaryMultiplicity = "0..1",
    	foreignDtDefinitionName = "DT_ROLE_PEOPLE",
    	foreignIsNavigable = false,
    	foreignRole = "RolePeople",
    	foreignLabel = "Role people",
    	foreignMultiplicity = "0..*"
    )
	public rodolphe.demo.domain.movies.Movie getMovie() {
		final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.movies.Movie> fkURI = getMovieURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (movie != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.movies.Movie> uri;
			uri = new io.vertigo.dynamo.domain.model.URI<>(io.vertigo.dynamo.domain.util.DtObjectUtil.findDtDefinition(movie), io.vertigo.dynamo.domain.util.DtObjectUtil.getId(movie));
			if (!fkURI.toURN().equals(uri.toURN())) {
				movie = null;
			}
		}		
		if (movie == null) {
			movie = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().get(fkURI);
		}
		return movie;
	}

	/**
	 * Retourne l'URI: Movie.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_RLP_MOV",
    	fkFieldName = "MOV_ID",
    	primaryDtDefinitionName = "DT_MOVIE",
    	primaryIsNavigable = true,
    	primaryRole = "Movie",
    	primaryLabel = "Movie",
    	primaryMultiplicity = "0..1",
    	foreignDtDefinitionName = "DT_ROLE_PEOPLE",
    	foreignIsNavigable = false,
    	foreignRole = "RolePeople",
    	foreignLabel = "Role people",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.movies.Movie> getMovieURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_RLP_MOV", rodolphe.demo.domain.movies.Movie.class);
	}
	/**
	 * Association : Role movie.
	 * @return rodolphe.demo.domain.masterdatas.RoleMovie
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_RLP_RLM",
    	fkFieldName = "RLM_CD",
    	primaryDtDefinitionName = "DT_ROLE_MOVIE",
    	primaryIsNavigable = true,
    	primaryRole = "RoleMovie",
    	primaryLabel = "Role movie",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_ROLE_PEOPLE",
    	foreignIsNavigable = false,
    	foreignRole = "RolePeople",
    	foreignLabel = "Role people",
    	foreignMultiplicity = "0..*"
    )
	public rodolphe.demo.domain.masterdatas.RoleMovie getRoleMovie() {
		final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.masterdatas.RoleMovie> fkURI = getRoleMovieURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (roleMovie != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.masterdatas.RoleMovie> uri;
			uri = new io.vertigo.dynamo.domain.model.URI<>(io.vertigo.dynamo.domain.util.DtObjectUtil.findDtDefinition(roleMovie), io.vertigo.dynamo.domain.util.DtObjectUtil.getId(roleMovie));
			if (!fkURI.toURN().equals(uri.toURN())) {
				roleMovie = null;
			}
		}		
		if (roleMovie == null) {
			roleMovie = io.vertigo.core.Home.getComponentSpace().resolve(io.vertigo.dynamo.persistence.PersistenceManager.class).getBroker().get(fkURI);
		}
		return roleMovie;
	}

	/**
	 * Retourne l'URI: Role movie.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_RLP_RLM",
    	fkFieldName = "RLM_CD",
    	primaryDtDefinitionName = "DT_ROLE_MOVIE",
    	primaryIsNavigable = true,
    	primaryRole = "RoleMovie",
    	primaryLabel = "Role movie",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_ROLE_PEOPLE",
    	foreignIsNavigable = false,
    	foreignRole = "RolePeople",
    	foreignLabel = "Role people",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.model.URI<rodolphe.demo.domain.masterdatas.RoleMovie> getRoleMovieURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_RLP_RLM", rodolphe.demo.domain.masterdatas.RoleMovie.class);
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
