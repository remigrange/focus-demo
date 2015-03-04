package roldophe.demo.tools;

import io.vertigo.AbstractTestCaseJU4;
import io.vertigo.dynamo.transaction.KTransactionManager;
import io.vertigo.dynamo.transaction.KTransactionWritable;
import io.vertigo.lang.Option;
import io.vertigo.persona.security.KSecurityManager;
import io.vertigo.util.StringUtil;

import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.junit.Assert;

/**
 * Parent class for all tests.
 * @author jmforhan
 *
 */
public abstract class AbstractRodolpheTestCase extends AbstractTestCaseJU4 {
	@Inject
	private KTransactionManager transactionManager;
	@Inject
	private KSecurityManager securityManager;
	// current transaction
	private KTransactionWritable transaction;

	/**
	 * return Logger de la classe de test.
	 *
	 * @return Logger de la classe de test
	 */
	protected final Logger getLogger() {
		return Logger.getLogger(getClass());
	}
	/**
	 * {@inheritDoc}
	 */
	@Override
	protected Option<String> getPropertiesFileName() {
		final Option<String> ret;
		final String prop = System.getProperty("propertiesFile");
		if (StringUtil.isEmpty(prop)) {
			getLogger().info("Using default properties file");
			ret = Option.<String> some("/test.properties");
		} else {
			getLogger().info("Using properties file :  " + prop);
			ret = Option.<String> some("/" + prop);
		}
		return ret;
	}
	/** {@inheritDoc} */
	@Override
	protected boolean cleanHomeForTest() {
		// Avoid to reload every time
		return false;
	}


	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void doSetUp() throws Exception {
		// manage transactions
		if (!transactionManager.hasCurrentTransaction()) {
			transaction = transactionManager.createCurrentTransaction();
		} else {
			Assert.fail("the previous test hasn't correctly close its transaction.");
		}
		// If there is a current session, it must be stopped, in order to create a new one.
		if (securityManager.getCurrentUserSession().isDefined()) {
			securityManager.stopCurrentUserSession();
		}
	}


	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void doTearDown() throws Exception {
		// close transaction
		if (transactionManager.hasCurrentTransaction()) {
			transaction.rollback();
		} else {
			Assert.fail("All tests must rollback");
		}
		// Stop user session
		if (securityManager.getCurrentUserSession().isDefined()) {
			securityManager.stopCurrentUserSession();
		}
	}
}
