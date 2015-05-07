package rodolphe.demo.user;

import io.vertigo.persona.security.UserSession;

import java.util.Locale;

/**
 * Session utilisateur.
 *
 * @author jmforhan
 */
public final class RodolpheUserSession extends UserSession {

    private static final long serialVersionUID = 3522402730076977461L;
    private final boolean canUserCommit;

    /**
     * Construit une instance de IdNotUserSession.
     */
    public RodolpheUserSession() {
        super();
        canUserCommit = true;
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
     * get default locale.
     *
     * @return Default Locale.
     */
    @Override
    public Locale getLocale() {
        return Locale.FRANCE;
    }
}
