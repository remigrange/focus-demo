/**
 *
 */
package rodolphe.demo.domain.search;

import io.vertigo.core.Home;
import io.vertigo.dynamo.collections.metamodel.FacetedQueryDefinition;
import rodolphe.demo.domain.CodeEnum;
import rodolphe.demo.domain.movies.MovieIndex;

/**
 * Enumération des différentes recherches. Avec facettes et sans facettes.
 *
 * @author jmforhan
 */
public enum FacetedSearchConst implements CodeEnum {
	/** Recherche de movie sans facette. */
	QRY_MOVIE_WO_FCT(),
	/** Recherche de movie avec facettes.*/
	QRY_MOVIE_WITH_FCT(MovieIndex.class,FacetConst.FCT_MOVIE_RUNTIME, FacetConst.FCT_MOVIE_RELEASED_DATE);
	private final FacetConst[] facetConstTab;
	private final Class indexClassname;



	private FacetedSearchConst(final Class indexClassname, final FacetConst ...facetConstTab) {
		this.facetConstTab = facetConstTab;
		this.indexClassname = indexClassname;
	}

	private FacetedSearchConst() {
		facetConstTab = null;
		indexClassname = null;
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
	 * @return the indexClassname
	 */
	public Class getIndexClassname() {
		return indexClassname;
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
