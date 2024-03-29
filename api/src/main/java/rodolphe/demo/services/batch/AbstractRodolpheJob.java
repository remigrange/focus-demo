package rodolphe.demo.services.batch;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Option;
import io.vertigo.persona.security.UserSession;
import io.vertigo.persona.security.VSecurityManager;

import javax.inject.Inject;

import org.apache.log4j.Logger;

import rodolphe.demo.user.RodolpheUserSession;

/**
 * Classe parente de tous les traitements non interactifs, job ou webservices offerts.
 *
 * @author jmforhan
 */
public abstract class AbstractRodolpheJob implements Runnable {

    @Inject
    private VSecurityManager vSecurityManager;
    private final Logger logger = Logger.getLogger(getClass());
    private RodolpheUserSession session;

    /**
     * Effectue le traitement du batch.
     */
    @Override
    public final void run() {
        // Creation de la session avec l'utilisateur technique. On met la session en variable pour etre sur que l'on a
        // toujours une reference sur la session
        session = getBatchUserSession();
        Assertion.checkNotNull(session, "La session ne peut etre nulle.");
        doRun();
    }

    /**
     * Traitement specifique du job.
     */
    protected abstract void doRun();

    private RodolpheUserSession getBatchUserSession() {
        final UserSession userSession;
        final Option<UserSession> optSession = vSecurityManager.getCurrentUserSession();
        if (optSession.isEmpty()) {
            // On a besoin de definir une nouvelle session, qu'il faudra nettoyer
            userSession = vSecurityManager.createUserSession();
            vSecurityManager.startCurrentUserSession(userSession);
        } else {
            userSession = optSession.get();
        }
        // On connecte l'utilisateur batch
        // On sort
        return (RodolpheUserSession) userSession;
    }

    /**
     * Donne la valeur de logger.
     *
     * @return la valeur de logger.
     */
    protected final Logger getLogger() {
        return logger;
    }
}
