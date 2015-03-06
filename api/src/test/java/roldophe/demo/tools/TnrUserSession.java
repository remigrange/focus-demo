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
	private static final long serialVersionUID = -8343118964582535572L;

	/**
	 * Constructeur.
	 */
	public TnrUserSession() {
		// Pas de commit dans le cadre des TNR.
		super(false);
	}

}
