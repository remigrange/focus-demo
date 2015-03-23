/**
 *
 */
package roldophe.demo;

import io.vertigo.vega.plugins.rest.routesregister.sparkjava.VegaSparkApplication;

import org.junit.Test;

import roldophe.demo.tools.AbstractRodolpheTestCase;

/**
 * Classe testant le démarrage de l'application.
 *
 * @author jmforhan
 */
public class ApplicationStartTest extends AbstractRodolpheTestCase {

    /**
     * Test the start of the application.
     * The idea is to check that all vertigo components are correctly registred and the WS REST routes are correctly
     * initialized.
     */
    @Test
    public void testApplicationStart() {
        new VegaSparkApplication().init();
    }
}
