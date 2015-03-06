/**
 *
 */
package roldophe.demo;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import roldophe.demo.movie.AllTestsMovies;
import roldophe.demo.people.AllTestsPeople;

/**
 * Launch all NRT.
 *
 * @author jmforhan
 */
@RunWith(Suite.class)
@SuiteClasses(value = { //
		ApplicationStartTest.class, //
		DtoTest.class, //
		AllTestsPeople.class, //
		AllTestsMovies.class, //
})
public class AllTests {
	// Les annotations sont suffisantes.
}
