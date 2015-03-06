/**
 *
 */
package roldophe.demo.tools;

import rodolphe.demo.user.RodolpheUserSession;

/**
 * Session spécifique aux TNRs.
 * @author jmforhan
 *
 */
public class TnrUserSession extends RodolpheUserSession {

	/**
	 * Constructeur.
	 */
	public TnrUserSession() {
		// Pas de commit dans le cadre des TNR.
		super(false);
	}

}
