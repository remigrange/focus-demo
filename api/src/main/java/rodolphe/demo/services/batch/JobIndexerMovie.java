/**
 *
 */
package rodolphe.demo.services.batch;

import io.vertigo.tempo.job.metamodel.JobDefinition;

import javax.inject.Inject;

import rodolphe.demo.services.search.SearchServices;

/**
 * Job de reindexation complète des personnes.
 *
 * @author jmforhan
 */
public class JobIndexerMovie extends AbstractRodolpheJob {

    private static final String JOB_NAME = "indexMovie";
    @Inject
    private SearchServices searchServices;

    /** {@inheritDoc} */
    @Override
    protected void doRun() {
        searchServices.indexMovies();
    }

    /**
     * Recuperation de la definition du job pour le job manager. On utilise un nom par defaut.
     *
     * @return JobDefinition
     */
    public static JobDefinition getJobDefinition() {
        return new JobDefinition(JOB_NAME, JobIndexerMovie.class);
    }
}
