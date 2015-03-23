/**
 *
 */
package roldophe.demo.movie;

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
		MovieTest.class, //
				SearchMovieTest.class, //
				WsMovieTest.class, //
		})
public class AllTestsMovies {
	// Les annotations sont suffisantes.
}
