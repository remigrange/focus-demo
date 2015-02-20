package rodolphe.demo.domain.references;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Country
 */
@DtDefinition
public final class Country implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String couCd;
	private String label;
	private io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Alias> alias;

	/**
	 * Champ : PRIMARY_KEY.
	 * Récupère la valeur de la propriété 'COU_CD'. 
	 * @return String couCd <b>Obligatoire</b>
	 */
	@Field(domain = "DO_IDENTIFIANT_CODE", type = "PRIMARY_KEY", notNull = true, label = "COU_CD")
	public String getCouCd() {
		return couCd;
	}

	/**
	 * Champ : PRIMARY_KEY.
	 * Définit la valeur de la propriété 'COU_CD'.
	 * @param couCd String <b>Obligatoire</b>
	 */
	public void setCouCd(final String couCd) {
		this.couCd = couCd;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Label'. 
	 * @return String label 
	 */
	@Field(domain = "DO_LIBELLE_100", label = "Label")
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Label'.
	 * @param label String 
	 */
	public void setLabel(final String label) {
		this.label = label;
	}


	// Association : Movie non navigable
	/**
	 * Association : Alias.
	 * @return io.vertigo.dynamo.domain.model.DtList<rodolphe.demo.domain.movies.Alias>
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_ALS_COU",
    	fkFieldName = "COU_CD",
    	primaryDtDefinitionName = "DT_COUNTRY",
    	primaryIsNavigable = false,
    	primaryRole = "Country",
    	primaryLabel = "Country",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_ALIAS",
    	foreignIsNavigable = true,
    	foreignRole = "Alias",
    	foreignLabel = "Alias",
    	foreignMultiplicity = "0..*"
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
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_ALS_COU",
    	fkFieldName = "COU_CD",
    	primaryDtDefinitionName = "DT_COUNTRY",
    	primaryIsNavigable = false,
    	primaryRole = "Country",
    	primaryLabel = "Country",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_ALIAS",
    	foreignIsNavigable = true,
    	foreignRole = "Alias",
    	foreignLabel = "Alias",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForAssociation getAliasDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURI(this, "A_ALS_COU", "Alias");
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
