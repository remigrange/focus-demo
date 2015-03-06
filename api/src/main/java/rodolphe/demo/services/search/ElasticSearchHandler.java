/**
 *
 */
package rodolphe.demo.services.search;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtObject;

/**
 * Handler de recherche pour les recherches avec Elastic Search.
 *
 * @param <S> Type du critère.
 * @param <R> Type du résultat.
 * @author jmforhan
 */
public interface ElasticSearchHandler<S extends DtObject, R extends DtObject> {

	/**
	 * Recalcul l'index.
	 */
	void indexer();

	/**
	 * Index un élément à partir de sa clé.
	 *
	 * @param key Clé de l'élément.
	 */
	void indexerItem(Object key);

	/**
	 * Supprime un élément à partir de sa clé.
	 *
	 * @param key Clé de l'élément.
	 */
	void supprimerItem(Object key);

	/**
	 * Exécute la recherche.
	 *
	 * @param criterium Critère
	 * @return Résultat.
	 */
	FacetedQueryResult<R, SearchCriterium<S>> rechercher(SearchCriterium<S> criterium);
}
