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
	private final boolean canUserCommit;

	/**
	 * Construit une instance de IdNotUserSession.
	 */
	public RodolpheUserSession() {
		this(true);
	}

	/**
	 * Construit une instance de IdNotUserSession.
	 *
	 * @param canUserCommit l'utilisateur peut-il commité? Oui dans cas normal, non dans le cas des TNR.
	 */
	protected RodolpheUserSession(final boolean canUserCommit) {
		super();
		this.canUserCommit = canUserCommit;
	}

	/**
	 * L'utilisateur peut-il commité?
	 *
	 * @return booléen.
	 */
	public boolean isCanUserCommit() {
		return canUserCommit;
	}

	/**
	 * @return Default Locale.
	 */
	@Override
	public Locale getLocale() {
		return Locale.FRANCE;
	}
}
