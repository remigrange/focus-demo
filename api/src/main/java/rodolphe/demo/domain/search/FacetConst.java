/**
 *
 */
package rodolphe.demo.domain.search;

import io.vertigo.dynamo.domain.metamodel.DtFieldName;
import rodolphe.demo.domain.CodeEnum;
import rodolphe.demo.domain.DtDefinitions.MovieIndexFields;

/**
 * Enumération des différentes facettes possibles.
 *
 * @author jmforhan
 */
public enum FacetConst implements CodeEnum {
	//
	/** Recherche de movie avec facette sur le runtime */
	FCT_MOVIE_RUNTIME (MovieIndexFields.RUNTIME, "Runtime"),
	FCT_MOVIE_GENRE (MovieIndexFields.GENRE_IDS, "Genre");

	private DtFieldName field;
	private String facetName;
	private FacetConst(final DtFieldName field, final String facetName) {
		this.field = field;
		this.facetName = facetName;
	}
	/**
	 * @return the field
	 */
	public DtFieldName getField() {
		return field;
	}
	/**
	 * @param field the field to set
	 */
	public void setField(final DtFieldName field) {
		this.field = field;
	}
	/**
	 * @return the facetName
	 */
	public String getFacetName() {
		return facetName;
	}
	/**
	 * @param facetName the facetName to set
	 */
	public void setFacetName(final String facetName) {
		this.facetName = facetName;
	}


}
