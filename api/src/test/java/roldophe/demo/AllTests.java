/**
 *
 */
package roldophe.demo;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

/**
 * Launch all NRT.
 *
 * @author jmforhan
 */
@RunWith(Suite.class)
@SuiteClasses(value = { //
		ApplicationStartTest.class, //
		DtoTest.class, //
})
public class AllTests {
	// Les annotations sont suffisantes.
}
