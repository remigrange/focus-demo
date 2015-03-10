/**
 *
 */
package roldophe.demo.tools;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.metamodel.DtFieldName;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.MessageKey;
import io.vertigo.lang.VUserException;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Locale;

import org.junit.Assert;
import org.junit.Test;

import rodolphe.demo.util.MemorizeTnrData;

/**
 * Classe abstraite de test d'une recherche.
 *
 * @param <C> critère de recherche
 * @param <R> Objet de résultat
 * @author jmforhan
 * @version $Id: AbstractSearchTestCase.java 1326 2012-04-24 15:33:30Z npiedeloup $
 */
public abstract class AbstractSearchTestCase<C extends DtObject, R extends DtObject> extends AbstractRodolpheTestCase{

	/**
	 * Vérifie-t-on les droits du WS de recherche avec la façade de service?
	 *
	 * @return false par défaut
	 */
	protected boolean checkDroitsWsRechercheWithFacade() {
		return false;
	}

	/**
	 * WS d'obtention de la liste à partir d'un critère. renvoie null par défaut.
	 *
	 * @param critere critère
	 * @return liste retournée
	 */
	protected DtList<R> getListByCritereWS(final C critere) {
		// null par défaut
		return null;
	}


	/**
	 * Vérifie que les données retournées par la recherche sont bien les données attendues.
	 */
	@Test
	public final void testDonneesResultatRecherche() {
		final C critere = getCritereForSearchWithUniqueResultAsSU();
		final Long id = getIdForCritere(critere);
		final DtList<R> dtc = getListByCritere(critere);
		Assert.assertEquals(1, dtc.size());
		if (dtc.size() > 0) {
			final R dto = dtc.get(0);
			Assert.assertEquals(id, getId(dto));
			// vérifications complémentaires
			checkDataResult(id, dto);
		}
	}

	/**
	 * Effectue la recherche en fonction du critère.
	 *
	 * @param critere critère de recherche
	 * @return Collection des données trouvées
	 */
	protected abstract DtList<R> getListByCritere(C critere);

	/**
	 * Vérifie la taille des résultats de la recherche.
	 *
	 * @param critere critère de recherche
	 * @param expected taille attendue
	 */
	protected final void checkResultSize(final C critere, final int expected) {
		final DtList<R> dtc = getListByCritere(critere);
		Assert.assertEquals(critere.toString() + " " + dtc.toString(), expected, dtc.size());
	}

	/**
	 * Vérifie le nombre d'occurences d'un id dans les résultats de recherche.
	 *
	 * @param critere critère de recherche
	 * @param id identifiant de l'objet dont on veut vérifier le nombre d'occurences
	 * @param expected nombre d'occurences attendu
	 */
	protected final void checkResultSizeForId(final C critere, final Long id, final int expected) {
		final DtList<R> dtc = getListByCritere(critere);
		int nbOccurences = 0;
		for (final R res : dtc) {
			if (getId(res).equals(id)) {
				nbOccurences++;
			}
		}
		Assert.assertEquals(expected, nbOccurences);
	}

	/**
	 * Vérifie que le résultat de la recherche contient un unique Id correspondant à celui référencé dans le critère.
	 * On fait des contrôles différents de checkResultSizeForId
	 *
	 * @param critere critère de recherche
	 */
	protected final void checkUniqueResult(final C critere) {
		checkUniqueResult(critere, getIdForCritere(critere));
	}

	/**
	 * Vérifie que le résultat de la recherche contient un unique Id connu.
	 * On fait des contrôles différents de checkResultSizeForId
	 *
	 * @param critere critère de recherche
	 * @param id id du résultat attendu
	 */
	protected final void checkUniqueResult(final C critere, final Long id) {
		final DtList<R> dtc = getListAndCheckError(critere, null);
		Assert.assertEquals(1, dtc.size());
		Assert.assertEquals(id, getId(dtc.get(0)));
	}


	/**
	 * Vérifie que la recherche donne bien une erreur utilisateur si on en attend une.
	 *
	 * @param critere critère de recherche
	 * @param key erreur attendue si non vide. si vide, on n'attend pas d'erreur.
	 * @param params paramètre de du message d'erreur
	 * @return résultat de la recherche. null si on a bien trouvé l'erreur attendu.
	 */
	protected final DtList<R> getListAndCheckError(final C critere, final MessageKey key, final Serializable... params) {
		DtList<R> dtc = null;
		try {
			dtc = getListByCritere(critere);
			failIfExpectedError(key, params);
		} catch (final VUserException e) {
			assertEqualsMessage(key, e, params);
		}
		return dtc;
	}

	/**
	 * Récupère l'identifiant d'un objet de résultat.
	 *
	 * @param dto Objet
	 * @return identifiant
	 */
	protected abstract Long getId(R dto);

	/**
	 * Crée les données nécessaires et récupère un critère donnant un unique résultat.
	 *
	 * @return critère
	 */
	protected abstract C getCritereForSearchWithUniqueResultAsSU();

	/**
	 * Récupère l'id attendu à partir d'un critère donnant un résultat unique.
	 *
	 * @param critere critère
	 * @return id
	 */
	protected abstract Long getIdForCritere(C critere);

	/**
	 * Vérification des données ramenées par une recherche. Il est nécessaire de récupérer à partir de l'identifiant de
	 * référence les données de la base pour les comparer au résultat de la recherche. L'identifiant a déjà été vérifié.
	 *
	 * @param id identifiant de l'objet de référence
	 * @param dto résultat de la recherche
	 */
	@SuppressWarnings("unused")
	protected void checkDataResult(final Long id, final R dto) {
		// RAF par défaut
	}

	/**
	 * Teste la recherche sur un critère donné pour s'assurer que la recherche est bien en commence par mais en mode
	 * token, insensible à la
	 * casse et aux accents.
	 *
	 * @param critere critère donnant un résulat unique
	 * @param critFldName nom du champ du critère
	 * @param data objet à sauvagarder associé au résultat unique.
	 * @param dataFldName nom du champ de la donnée
	 * @param facade Objet permettant de faire la sauvegarde
	 * @param saveMethode méthode de sauvegarde
	 */
	protected final void verifierRechercheTexteBeginWoAccent(final C critere, final DtFieldName critFldName,
			final DtObject data, final DtFieldName dataFldName, final Object facade, final String saveMethode) {
		verifierRechercheTexteBegin(critere, critFldName, data, dataFldName, facade, saveMethode, data, true, false);
	}

	/**
	 * Teste la recherche sur un critère donné pour s'assurer que la recherche est bien en commence par, insensible à la
	 * casse et aux accents.
	 *
	 * @param critere critère donnant un résulat unique
	 * @param critFldName nom du champ du critère
	 * @param data objet à sauvagarder associé au résultat unique.
	 * @param dataFldName nom du champ de la donnée
	 * @param facade Objet permettant de faire la sauvegarde
	 * @param saveMethode méthode de sauvegarde
	 */
	protected final void verifierRechercheTokenBeginWoAccent(final C critere, final DtFieldName critFldName,
			final DtObject data, final DtFieldName dataFldName, final Object facade, final String saveMethode) {
		verifierRechercheTexteBegin(critere, critFldName, data, dataFldName, facade, saveMethode, data, true, true);
	}

	/**
	 * Teste la recherche sur un critère donné pour s'assurer que la recherche est bien en commence par, insensible à la
	 * casse et aux accents.
	 *
	 * @param critere critère donnant un résulat unique
	 * @param critFldName nom du champ du critère
	 * @param data objet à sauvagarder associé au résultat unique.
	 * @param dataFldName nom du champ de la donnée
	 * @param facade Objet permettant de faire la sauvegarde
	 * @param saveMethode méthode de sauvegarde
	 * @param saveData objet englobant data et à passer à la méthode de sauvegarde
	 */
	protected final void verifierRechercheTexteBeginWoAccent(final C critere, final DtFieldName critFldName,
			final DtObject data, final DtFieldName dataFldName, final Object facade, final String saveMethode,
			final DtObject saveData) {
		verifierRechercheTexteBegin(critere, critFldName, data, dataFldName, facade, saveMethode, saveData, true, false);
	}

	private void verifierRechercheTexteBegin(final C critere, final DtFieldName critFldName, final DtObject data,
			final DtFieldName dataFldName, final Object facade, final String saveMethode, final DtObject saveData,
			final boolean accentInsensitive, final boolean tokenSearch) {
		final String libelleAccent = "àç Li tESt";
		final String deb = libelleAccent.substring(0, 5);
		final String debWoAccent = "ac L";
		final String debKo = "ca";
		final String contient = libelleAccent.substring(1, 2);
		final String token = libelleAccent.substring(3, 5);
		// On sette la valeur sur l'objet et on sauvegarde
		final DtDefinition dtDefData = DtObjectUtil.findDtDefinition(data);
		dtDefData.getField(dataFldName).getDataAccessor().setValue(data, libelleAccent);
		final Method met = getPublicMethodForName(facade, saveMethode, saveData);
		invokeMethod(met, facade, saveData);
		sendMemorizedData();
		// On sette le critère et on fait la recherche
		final DtField critFld = DtObjectUtil.findDtDefinition(critere).getField(critFldName);
		// Libelle exact
		critFld.getDataAccessor().setValue(critere, libelleAccent);
		checkUniqueResult(critere);
		// Libelle ko
		critFld.getDataAccessor().setValue(critere, debKo);
		checkResultSize(critere, 0);
		// Début avec accent pour toutes les casses
		critFld.getDataAccessor().setValue(critere, deb);
		checkUniqueResult(critere);
		critFld.getDataAccessor().setValue(critere, deb.toUpperCase(Locale.FRANCE));
		checkUniqueResult(critere);
		critFld.getDataAccessor().setValue(critere, deb.toLowerCase(Locale.FRANCE));
		checkUniqueResult(critere);
		// Début sans accent pour toutes les casses
		if (accentInsensitive) {
			critFld.getDataAccessor().setValue(critere, debWoAccent);
			checkUniqueResult(critere);
			critFld.getDataAccessor().setValue(critere, debWoAccent.toUpperCase(Locale.FRANCE));
			checkUniqueResult(critere);
			critFld.getDataAccessor().setValue(critere, debWoAccent.toLowerCase(Locale.FRANCE));
			checkUniqueResult(critere);
		} else {
			critFld.getDataAccessor().setValue(critere, debWoAccent);
			checkResultSize(critere, 0);
			critFld.getDataAccessor().setValue(critere, debWoAccent.toUpperCase(Locale.FRANCE));
			checkResultSize(critere, 0);
			critFld.getDataAccessor().setValue(critere, debWoAccent.toLowerCase(Locale.FRANCE));
			checkResultSize(critere, 0);
		}
		// La recherche n'est pas en contient.
		critFld.getDataAccessor().setValue(critere, contient);
		checkResultSize(critere, 0);
		// recherche en token
		critFld.getDataAccessor().setValue(critere, token);
		checkResultSize(critere, tokenSearch ? 1 : 0);
	}

	/**
	 * Teste la recherche sur un critère donné pour s'assurer que la recherche est bien en commence par, insensible à la
	 * casse et aux accents.
	 *
	 * @param critere critère donnant un résulat unique
	 * @param critFldName nom du champ du critère
	 * @param data objet à sauvagarder associé au résultat unique.
	 * @param dataFldName nom du champ de la donnée
	 * @param facade Objet permettant de faire la sauvegarde
	 * @param saveMethode méthode de sauvegarde
	 */
	protected final void verifierRechercheTexteBegin(final C critere, final DtFieldName critFldName,
			final DtObject data, final DtFieldName dataFldName, final Object facade, final String saveMethode) {
		verifierRechercheTexteBegin(critere, critFldName, data, dataFldName, facade, saveMethode, data, false, false);
	}

	/**
	 * Teste la recherche sur un critère donné pour s'assurer que la recherche est bien en commence par, insensible à la
	 * casse mais pas aux accents.
	 *
	 * @param critere critère donnant un résulat unique
	 * @param critFldName nom du champ du critère
	 * @param data objet à sauvagarder associé au résultat unique.
	 * @param dataFldName nom du champ de la donnée
	 * @param facade Objet permettant de faire la sauvegarde
	 * @param saveMethode méthode de sauvegarde
	 * @param saveData objet englobant data et à passer à la méthode de sauvegarde
	 */
	protected final void verifierRechercheTexteBegin(final C critere, final DtFieldName critFldName,
			final DtObject data, final DtFieldName dataFldName, final Object facade, final String saveMethode,
			final DtObject saveData) {
		verifierRechercheTexteBegin(critere, critFldName, data, dataFldName, facade, saveMethode, saveData, false,
				false);
	}
	/**
	 * Teste la recherche sur un critère donné pour s'assurer que la recherche est bien en commence par, insensible à la
	 * casse mais pas aux accents.
	 *
	 * @param critere critère donnant un résulat unique
	 * @param critFldName nom du champ du critère
	 * @param data objet à sauvagarder associé au résultat unique.
	 * @param dataFldName nom du champ de la donnée
	 * @param facade Objet permettant de faire la sauvegarde
	 * @param saveMethode méthode de sauvegarde
	 */
	protected final void verifierRechercheTokenBegin(final C critere, final DtFieldName critFldName,
			final DtObject data, final DtFieldName dataFldName, final Object facade, final String saveMethode) {
		verifierRechercheTexteBegin(critere, critFldName, data, dataFldName, facade, saveMethode, data, false, true);
	}

	/**
	 * Envoie les données mémorisées à l'application chargée d'indexer.
	 */
	protected final void sendMemorizedData() {
		if (getDataSenderClass() == null) {
			Assert.assertFalse(" getDataSenderClass() doit préciser le handler elastic search associé à la recherche",
					useESHandler());
		} else {
			sendMemorizedData(getDataSenderClass());
		}
	}

	/**
	 * La recherche utilise-t-elle elasticSearch ?
	 *
	 * @return booléan faux par défaut.
	 */
	protected boolean useESHandler() {
		return false;
	}

	/**
	 * Classe responsable de l'indexation des données.
	 *
	 * @return classe.
	 */
	protected Class<? extends MemorizeTnrData> getDataSenderClass() {
		return null;
	}
}
