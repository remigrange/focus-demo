/**
 *
 */
package roldophe.demo.people;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

/**
 * Launch all NRT.
 *
 * @author jmforhan
 */
@RunWith(Suite.class)
@SuiteClasses(value = {
		PeopleTest.class, //
})
public class AllTestsPeople {
	// Les annotations sont suffisantes.
}
