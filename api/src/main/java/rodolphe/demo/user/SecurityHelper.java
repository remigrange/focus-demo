/**
 *
 */
package rodolphe.demo.user;

import io.vertigo.lang.Option;
import io.vertigo.persona.security.KSecurityManager;
import io.vertigo.persona.security.UserSession;

import javax.inject.Inject;

/**
 * Helper pour les vérifications de sécurité.
 *
 * @author jmforhan
 */
public class SecurityHelper {

	@Inject
	private KSecurityManager kSecurityManager;


	/**
	 * Récupère la session courante.
	 *
	 * @return une option sur la session courante
	 */
	public Option<UserSession> getCurrentSession() {
		return kSecurityManager.getCurrentUserSession();
	}

	/**
	 * Est-on dans le cas des tests de non régressions, où il ne faut pas commiter?
	 *
	 * @return booléen.
	 */
	public boolean isTNR() {
		final Option<UserSession> opt = getCurrentSession();
		final RodolpheUserSession session;
		if (opt.isDefined()) {
			session = (RodolpheUserSession) opt.get();
		} else {
			session = kSecurityManager.createUserSession();
		}
		return session.isCanUserCommit();
	}

}
