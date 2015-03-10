package roldophe.demo.tools;

import io.vertigo.AbstractTestCaseJU4;
import io.vertigo.core.Home;
import io.vertigo.dynamo.transaction.KTransactionManager;
import io.vertigo.dynamo.transaction.KTransactionWritable;
import io.vertigo.lang.MessageKey;
import io.vertigo.lang.MessageText;
import io.vertigo.lang.Option;
import io.vertigo.lang.VUserException;
import io.vertigo.persona.security.KSecurityManager;
import io.vertigo.util.StringUtil;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.junit.Assert;

import rodolphe.demo.services.search.ElasticSearchHandler;
import rodolphe.demo.services.search.MovieSearchHandler;
import rodolphe.demo.services.search.PeopleSearchHandler;
import rodolphe.demo.util.MemorizeTnrData;

/**
 * Parent class for all tests.
 * @author jmforhan
 *
 */
public abstract class AbstractRodolpheTestCase extends AbstractTestCaseJU4 {
	private static final int MEM_TIMEOUT_MS = 1 * 1000;
	private final Set<Class<? extends MemorizeTnrData>> memComponent = new HashSet<>();
	@Inject
	private KTransactionManager transactionManager;
	@Inject
	private KSecurityManager securityManager;
	// current transaction
	private KTransactionWritable transaction;
	private boolean memDataStarted;
	// Session courante pour éviter de la perdre dans des WeakRef
	private TnrUserSession session;

	/**
	 * Constructor.
	 */
	public AbstractRodolpheTestCase() {
		super();
		memComponent.add(MovieSearchHandler.class);
		memComponent.add(PeopleSearchHandler.class);

	}

	/**
	 * return Logger de la classe de test.
	 *
	 * @return Logger de la classe de test
	 */
	protected final Logger getLogger() {
		return Logger.getLogger(getClass());
	}
	/**
	 * {@inheritDoc}
	 */
	@Override
	protected Option<String> getPropertiesFileName() {
		final Option<String> ret;
		final String prop = System.getProperty("propertiesFile");
		if (StringUtil.isEmpty(prop)) {
			getLogger().info("Using default properties file");
			ret = Option.<String> some("/test.properties");
		} else {
			getLogger().info("Using properties file :  " + prop);
			ret = Option.<String> some("/" + prop);
		}
		return ret;
	}
	/** {@inheritDoc} */
	@Override
	protected boolean cleanHomeForTest() {
		// Avoid to reload every time
		return false;
	}


	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void doSetUp() throws Exception {
		// manage transactions
		if (!transactionManager.hasCurrentTransaction()) {
			transaction = transactionManager.createCurrentTransaction();
		} else {
			Assert.fail("the previous test hasn't correctly close its transaction.");
		}
		// If there is a current session, it must be stopped, in order to create a new one.
		if (securityManager.getCurrentUserSession().isDefined()) {
			securityManager.stopCurrentUserSession();
			session = (TnrUserSession) securityManager.createUserSession();
		}
		startMemorizeTnrDataAll();
	}
	private void startMemorizeTnrDataAll() {
		if (memDataStarted) {
			// RAF
			return;
		}
		for (final Class<? extends MemorizeTnrData> memClass : memComponent) {
			final MemorizeTnrData item = Home.getComponentSpace().resolve(memClass);
			item.startMemorizeTnrData();
		}
		memDataStarted = true;
	}


	private void removeMemorizedTnrDataAll() {
		for (final Class<? extends MemorizeTnrData> memClass : memComponent) {
			final MemorizeTnrData item = Home.getComponentSpace().resolve(memClass);
			try {
				item.removeMemorizedTnrData();
			} catch (final Throwable t) {
				getLogger().error("problème arret composant " + item.toString(), t);
			}
		}
		memDataStarted = false;
	}

	/**
	 * Envoi de données géré par un MemorizeTnrData.
	 *
	 * @param memClass classe du MemorizeTnrData réellement utilisé.
	 */
	protected final void sendMemorizedData(final Class<? extends MemorizeTnrData> memClass) {
		Assert.assertTrue(
				"La classe n'a pas été référencée dans le constructeur. Il est impossible de vider les données ",
				memComponent.contains(memClass));
		final MemorizeTnrData item = Home.getComponentSpace().resolve(memClass);
		item.sendMemorizedTnrData();
		// Si on est avec un composant lié elastic search, il faut un time out pour s'assurer que la donnée a bien été
		// transmise
		if (item instanceof ElasticSearchHandler) {
			try {
				Thread.sleep(MEM_TIMEOUT_MS);
			} catch (final Throwable t) {
				throw new RuntimeException(t);
			}
		}
	}
	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void doTearDown() throws Exception {
		// On vide la mémorisation
		removeMemorizedTnrDataAll();
		// close transaction
		if (transactionManager.hasCurrentTransaction()) {
			transaction.rollback();
		} else {
			Assert.fail("All tests must rollback");
		}
		// Stop user session
		if (securityManager.getCurrentUserSession().isDefined()) {
			securityManager.stopCurrentUserSession();
			if (session != null) {
				session = null;
			}
		}
	}


	/**
	 * Récupération d'un message associé à une clé et à des paramètres. Si la clé est nulle, on renvoie null.
	 *
	 * @param key clé
	 * @param params paramètres
	 * @return message
	 */
	protected final MessageText getMessage(final MessageKey key, final Serializable... params) {
		final MessageText msg = key == null ? null : new MessageText(key, params);
		return msg;
	}

	/**
	 * Récupération de la méthode publique d'une classe à partir de son nom. Si on en trouve plusieurs, on cherchera la
	 * méthode
	 * que celle qui a le même nombre de paramètre passé en entrée.
	 * Il n'y a pas actuellement de vérification de type
	 *
	 * @param obj objet
	 * @param methodName nom de la méthode
	 * @param params paramètres de la méthode
	 * @return Méthode. Si on n'a pas trouvé avec certitude une unique méthode, on renvoie null
	 */
	protected final Method getPublicMethodForName(final Object obj, final String methodName, final Object... params) {
		final List<Method> mLst = new ArrayList<>();
		final List<Method> mpLst = new ArrayList<>();
		for (final Method met : obj.getClass().getMethods()) {
			if (methodName.equals(met.getName())) {
				mLst.add(met);
				if (params != null && params.length == met.getParameterTypes().length) {
					mpLst.add(met);
				}
			}
		}
		if (mLst.size() == 1) {
			return mLst.get(0);
		}
		if (mpLst.size() == 1) {
			return mpLst.get(0);
		}
		return null;
	}

	/**
	 * Invocation d'une méthode sur un objet et pour des paramètres. Si la méthode lève des exceptions de type
	 * KRuntimeException
	 * ou KUserException, elles seront propagés directement au lieu d'être masquée par une InvocationTargetException.
	 *
	 * @param met Méthode
	 * @param obj objet où la méthode s'applique
	 * @param params paramètres de la méthode
	 * @return objet résultat de l'invocation
	 */
	protected final Object invokeMethod(final Method met, final Object obj, final Object... params) {
		try {
			return met.invoke(obj, params);
		} catch (final InvocationTargetException e) {
			final Throwable t = e.getCause();
			if (t instanceof VUserException) {
				throw (VUserException) t;
			} else if (t instanceof RuntimeException) {
				throw (RuntimeException) t;
			}
			throw new RuntimeException(e);
		} catch (final IllegalAccessException | IllegalArgumentException e) {
			throw new RuntimeException(e);
		}
	}


	/**
	 * Message générique quand une méthode n'a pas levée d'exception alors qu'elle le devrait.
	 */
	protected final void failExpectedError() {
		Assert.fail("Erreur attendue !!!!");
	}

	/**
	 * Message indiquant qu'une méthode devrait avoir levé une exception avec un message spécifique.
	 * Si la clé de ressources n'est pas renseignée, cela signifie que l'on n'attend pas d'erreur.
	 *
	 * @param key clé de ressources
	 * @param params paramètre du message
	 */
	protected final void failIfExpectedError(final MessageKey key, final Serializable... params) {
		if (key != null) {
			final MessageText expected = new MessageText(key, params);
			Assert.fail("Erreur attendue: " + expected.getDisplay());
		}
	}

	/**
	 * Message indiquant qu'une méthode devrait avoir levé une exception avec un message spécifique.
	 * Si la clé de ressources n'est pas renseignée, cela signifie que l'on n'attend pas d'erreur.
	 *
	 * @param key clé de ressources
	 * @param failMsg message du fail
	 */
	protected final void failIfExpectedErrorWithMsg(final MessageKey key, final String failMsg) {
		if (key != null) {
			Assert.fail("Erreur attendue: " + failMsg);
		}
	}

	/**
	 * Message indiquant qu'une méthode devrait avoir levé une exception.
	 * Si "expected" vaut "faux", cela signifie que l'on n'attend pas d'erreur.
	 *
	 * @param expected Erreur attendue.
	 * @param failMsg Message du fail.
	 */
	protected final void failIfExpectedErrorWithMsg(final boolean expected, final String failMsg) {
		if (expected) {
			Assert.fail("Erreur attendue: " + failMsg);
		}
	}

	/**
	 * Provoque une erreur si on a catché une exception imprévue.
	 *
	 * @param expected L'erreur était prévue.
	 * @param message Message explicatif.
	 */
	protected final void failIfUnexpectedError(final boolean expected, final String message) {
		if (!expected) {
			Assert.fail("Erreur inattendue :" + message);
		}
	}

	/**
	 * Provoque une erreur si on a catché une exception imprévue.
	 *
	 * @param expected L'erreur était prévue.
	 * @param t erreur recontrée
	 */
	protected final void failIfUnexpectedError(final boolean expected, final Throwable t) {
		if (!expected) {
			getLogger().error("Erreur rencontrée :", t);
			Assert.fail("Erreur inattendue :" + t.getMessage());
		}
	}

	/**
	 * Loggue les paramètres passés à une méthode.
	 *
	 * @param nomMethode nom de la méthode
	 * @param params paramètre
	 */
	protected final void logParametreMethode(final String nomMethode, final Object... params) {
		final StringBuilder sb = new StringBuilder(nomMethode);
		sb.append(" paramètres :");
		for (final Object param : params) {
			sb.append(' ');
			sb.append(param);
		}
		getLogger().warn(sb.toString());
	}

	/**
	 * Vérification qu'une exception utilisateur correspond bien à un message donné.
	 *
	 * @param key ressource du message
	 * @param e exception à tester
	 * @param params paramètres attendu du message
	 */
	protected final void assertEqualsMessage(final MessageKey key, final VUserException e, final Serializable... params) {
		assertEqualsMessage(getMessage(key, params), e);
	}

	/**
	 * Vérification qu'un message correspond bien à une exception si on met à l'écart les paramètres du message.
	 *
	 * @param key ressource du message
	 * @param e exception à tester
	 */
	protected final void assertEqualsMessageWoParams(final MessageKey key, final VUserException e) {
		if (key == null) {
			Assert.assertNull(e);
			return;
		}
		Assert.assertNotNull(e);
		final String expected = getMessage(key).getDisplay();
		final String actual = e.getMessageText().getDisplay();
		int startExpected = 0;
		final int startActual = 0;
		while (startExpected < expected.length()) {
			// Le message est-il paramétré
			final int idx = expected.indexOf("{", startExpected);
			if (idx < 0) {
				// Pas de paramètre
				Assert.assertEquals(expected.substring(startExpected), actual.substring(startActual));
				// On sort de la boucle
			}
			Assert.assertEquals(expected.substring(startExpected, idx),
					actual.substring(startActual, startActual + idx));
			// Pour expected, il faut juste se placer après le { suivant
			final int idx2 = expected.indexOf("}", idx);
			startExpected = idx2 + 1;
			// Pour actual, il faut arriver à se placer après le paramètre
			// TODO
			break;
		}
	}

	/**
	 * Vérification qu'une exception utilisateur correspond bien à un message donné.
	 *
	 * @param msg message attendu
	 * @param e exception à tester
	 */
	protected final void assertEqualsMessage(final MessageText msg, final VUserException e) {
		try {
			final MessageText actual = e.getMessageText();
			assertEqualsMessage(msg, actual);
		} catch (final AssertionError c) {
			// on logge l'erreur pour avoir la stack tracke puis on la relance
			getLogger().error("Comparaison sur erreur ", e);
			throw c;
		}
	}

	/**
	 * Vérification que 2 messages sont bien identiques.
	 *
	 * @param expected message attendu
	 * @param actual message obtenu
	 */
	protected final void assertEqualsMessage(final MessageText expected, final MessageText actual) {
		if (expected == null && actual == null) {
			// les 2 sont nulls, tout va bien
			Assert.assertTrue(true);
			return;
		}
		if (expected != null && actual != null) {
			// On doit vérifier le message affiché
			Assert.assertEquals(expected.getDisplay(), actual.getDisplay());
			return;
		}
		// Vérification par défaut
		Assert.assertEquals(expected == null ? null : expected.toString(), actual == null ? null : actual.toString());
	}

	/**
	 * Vérifie que l'appel à la méthode lève bien une VUserException avec le message attendu.
	 *
	 * @param obj objet où la méthode s'applique.
	 * @param methodName méthode.
	 * @param key Message d'erreur.
	 * @param params paramètres.
	 * @return le retour de la méthode.
	 */
	protected final Object checkExpectedErrorMethod(final Object obj, final String methodName, final MessageKey key,
			final Object... params) {
		final Method met = getPublicMethodForName(obj, methodName, params);
		Object ret = null;
		try {
			ret = invokeMethod(met, obj, params);
			failIfExpectedError(key);
		} catch (final VUserException e) {
			assertEqualsMessage(key, e);
		}
		return ret;
	}

}
