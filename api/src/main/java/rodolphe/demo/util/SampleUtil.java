package rodolphe.demo.util;

/**
 * Util classes publish easier method or are stateLess.
 * Check for no duplication.
 *
 * @author pchretien
 */
public final class SampleUtil {

	private SampleUtil() {
		// only static methods are allowed
	}

	/**
	 * Get hello.
	 * 
	 * @return hello
	 */
	public static String hello() {
		return "hello";
	}
}
