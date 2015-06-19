package rodolphe.demo.user;

import io.vertigo.persona.security.UserSession;

import java.util.Locale;

/**
 * Session utilisateur.
 *
 * @author jmforhan
 */
public class RodolpheUserSession extends UserSession {

	private static final long serialVersionUID = 3522402730076977461L;

	/**
	 * get default locale.
	 *
	 * @return Default Locale.
	 */
	@Override
	public Locale getLocale() {
		return Locale.FRANCE;
	}
}
