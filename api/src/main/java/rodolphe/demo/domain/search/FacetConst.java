/**
 *
 */
package rodolphe.demo.domain.search;

import io.vertigo.dynamo.domain.metamodel.DtFieldName;
import rodolphe.demo.domain.CodeEnum;
import rodolphe.demo.domain.DtDefinitions.MovieIndexFields;

/**
 * Enum of the various available facets.
 *
 * @author jmforhan
 */
public enum FacetConst implements CodeEnum {
	//
	/** Movie facet associated with runtime. */
	FCT_MOVIE_RUNTIME(MovieIndexFields.RUNTIME, "Runtime"),
	/** Movie facet associated with Genre. */
	FCT_MOVIE_GENRE(MovieIndexFields.GENRE_IDS, "Genre"),
	/** Movie facet associated with Language. */
	FCT_MOVIE_LANGUAGE(MovieIndexFields.LANGUAGE_IDS, "Language"),
	/** Movie facet associated with Country. */
	FCT_MOVIE_COUNTRY(MovieIndexFields.COUNTRY_IDS, "Country");

	private final DtFieldName field;
	private final String facetName;

	private FacetConst(final DtFieldName field, final String facetName) {
		this.field = field;
		this.facetName = facetName;
	}

	/**
	 * Get the associated field.
	 * 
	 * @return the field
	 */
	public DtFieldName getField() {
		return field;
	}

	/**
	 * Get the associated facet label.
	 * 
	 * @return the facetName
	 */
	public String getFacetName() {
		return facetName;
	}
}
