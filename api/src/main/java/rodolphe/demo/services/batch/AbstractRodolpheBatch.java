package rodolphe.demo.services.batch;

import io.vertigo.core.Home;
import io.vertigo.core.di.injector.Injector;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Container;
import io.vertigo.lang.Option;
import io.vertigo.persona.security.KSecurityManager;
import io.vertigo.persona.security.UserSession;

import javax.inject.Inject;

import org.apache.log4j.Logger;

import rodolphe.demo.user.RodolpheUserSession;

/**
 * Classe parente de tous les traitements non interactifs, job ou webservices offerts.
 *
 * @author jmforhan
 */
public abstract class AbstractRodolpheBatch implements InjectableComponent {

	@Inject
	private KSecurityManager kSecurityManager;
	private final Logger logger = Logger.getLogger(getClass());
	private RodolpheUserSession session;

	/**
	 * Effectue le traitement du batch.
	 */
	public final void process() {
		// Creation de la session avec l'utilisateur technique. On met la session en variable pour etre sur que l'on a
		// toujours une reference sur la session
		session = getBatchUserSession();
		Assertion.checkNotNull(session, "La session ne peut etre nulle.");
		doProcess();
	}

	/**
	 * Traitement specifique du batch.
	 */
	protected abstract void doProcess();

	private RodolpheUserSession getBatchUserSession() {
		final UserSession session;
		final Option<UserSession> optSession = kSecurityManager.getCurrentUserSession();
		if (optSession.isEmpty()) {
			// On a besoin de definir une nouvelle session, qu'il faudra nettoyer
			session = kSecurityManager.createUserSession();
			kSecurityManager.startCurrentUserSession(session);
		} else {
			session = optSession.get();
		}
		// On connecte l'utilisateur batch
		// On sort
		return (RodolpheUserSession) session;
	}

	/**
	 * Donne la valeur de logger.
	 *
	 * @return la valeur de logger.
	 */
	protected final Logger getLogger() {
		return logger;
	}

	/** {@inheritDoc} */
	@Override
	public final void injectMembers() {
		// On inject tous les composants
		Injector.injectMembers(this, getContainer());
	}

	/**
	 * Fournit le container utilisé pour l'injection.
	 *
	 * @return Container de l'injection
	 */
	private Container getContainer() {
		return Home.getComponentSpace();
	}
}
