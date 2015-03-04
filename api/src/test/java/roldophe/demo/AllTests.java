/**
 *
 */
package roldophe.demo;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import roldophe.demo.movie.MovieTest;
import roldophe.demo.people.PeopleTest;

/**
 * Launch all NRT.
 *
 * @author jmforhan
 */
@RunWith(Suite.class)
@SuiteClasses(value = { //
		ApplicationStartTest.class, //
		DtoTest.class, //
		PeopleTest.class, //
		MovieTest.class, //
})
public class AllTests {
	// Les annotations sont suffisantes.
}
