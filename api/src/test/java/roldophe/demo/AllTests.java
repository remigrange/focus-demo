/**
 *
 */
package roldophe.demo;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import roldophe.demo.common.AllTestCommon;
import roldophe.demo.masterdata.MasterdataAllTest;
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
				MasterdataAllTest.class, //
				AllTestCommon.class, //
		})
public class AllTests {
	// Les annotations sont suffisantes.
}
