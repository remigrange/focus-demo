/**
 *
 */
package roldophe.demo.tools;

import io.vertigo.dynamo.domain.model.DtObject;

/**
 * Classe abstraite de test d'une recherche.
 *
 * @param <C> critère de recherche
 * @param <R> Objet de résultat
 * @author jmforhan
 * @version $Id: AbstractSearchTestCase.java 1326 2012-04-24 15:33:30Z npiedeloup $
 */
public abstract class AbstractEsSearchTestCase<C extends DtObject, R extends DtObject> extends
		AbstractSearchTestCase<C, R> {

	/** {@inheritDoc} */
	@Override
	protected final C getCritereForSearchWithUniqueResultAsSU() {
		final C crit = getCritereForEsSearchWithUniqueResultAsSU();
		return crit;
	}

	/**
	 * Crée les données nécessaires et récupère un critère donnant un unique résultat dans un cadre Elastic Search.
	 * Est appelé par la méthode getCritereForSearchWithUniqueResultAsSU() qui envoie également les données à elastic
	 * search.
	 *
	 * @return critère
	 */
	protected abstract C getCritereForEsSearchWithUniqueResultAsSU();

	/** {@inheritDoc} */
	@Override
	protected final boolean useESHandler() {
		return true;
	}
}
