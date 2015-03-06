/**
 *
 */
package rodolphe.demo.domain.search;

import io.vertigo.core.Home;
import io.vertigo.dynamo.collections.metamodel.FacetedQueryDefinition;
import rodolphe.demo.domain.CodeEnum;

/**
 * Enumération des différentes recherches. Avec facettes et sans facettes.
 *
 * @author jmforhan
 */
public enum FacetedSearchConst implements CodeEnum {
	/** Recherche de movie sans facette. */
	QRY_MOVIE_WO_FCT();

	private final FacetConst[] facetConstTab;

	private FacetedSearchConst(final FacetConst... facetConst) {
		facetConstTab = facetConst;
	}

	/**
	 * Donne la valeur de facetConstTab.
	 *
	 * @return la valeur de facetConstTab.
	 */
	public FacetConst[] getFacetConstTab() {
		return facetConstTab;
	}

	/**
	 * Récupération de la définition vertigo associée à la recherche à facette.
	 *
	 * @return définition
	 */
	public FacetedQueryDefinition getQuery() {
		return Home.getDefinitionSpace().resolve(name(), FacetedQueryDefinition.class);
	}
}
