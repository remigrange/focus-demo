package rodolphe.demo.util;

import io.vertigo.core.Home;
import io.vertigo.dynamo.transaction.VTransactionManager;
import io.vertigo.dynamo.transaction.VTransactionWritable;

import org.apache.log4j.Logger;

import rodolphe.demo.user.SecurityHelper;

/**
 * Classe utilitaire permettant de poser une transaction autonome autour d'un bloc
 * à l'aide d'une syntaxe try-resources.
 * ATTENTION : la transaction doit être explicitement commitée à la fin du block try.
 *
 * @author sezratty
 */
public class TransactionScope implements AutoCloseable {

    private static final Logger LOGGER = Logger.getLogger(TransactionScope.class);
    private final VTransactionWritable transaction;

    /**
     * Construit une instance de TransactionScope.
     * Ouvre une nouvelle transaction. On d�tecte automatiquement si l'utilisateur peut commiter.
     */
    public TransactionScope() {
        this(!Home.getComponentSpace().resolve(SecurityHelper.class).isTNR());
    }

    /**
     * Construit une instance de TransactionScope. On crée une transaction autonome si l'utilisateur peut commité.
     *
     * @param canCommit l'utilisateur peut-il commit�?
     */
    public TransactionScope(final boolean canCommit) {
        final VTransactionManager kTransactionManager = Home.getComponentSpace().resolve(VTransactionManager.class);
        if (canCommit) {
            if (kTransactionManager.hasCurrentTransaction()) {
                transaction = kTransactionManager.createAutonomousTransaction();
            } else {
                transaction = kTransactionManager.createCurrentTransaction();
            }
        } else {
            transaction = null;
        }
        if (transaction == null) {
            LOGGER.info("Utilisation transaction courante");
        } else {
            LOGGER.info("Utilisation transaction autonome");
        }
    }

    /**
     * Commit la transaction autonome.
     */
    public void commit() {
        if (transaction != null) {
            transaction.commit();
            LOGGER.info("Transaction autonome : commit");
        }
    }

    /** {@inheritDoc} */
    @Override
    public void close() {
        // On rollback la transaction (sans effet si la transaction a été committée explicitement avant).
        if (transaction != null) {
            transaction.rollback();
            LOGGER.info("Transaction autonome : rollback");
        }
    }
}
