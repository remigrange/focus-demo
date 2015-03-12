/**
 *
 */
package rodolphe.demo.services.batch;

import io.vertigo.tempo.job.metamodel.JobDefinition;

import javax.inject.Inject;

import rodolphe.demo.services.search.SearchServices;

/**
 * Job for People index.
 * @author JDALMEIDA
 *
 */
public class JobIndexPeople  extends AbstractRodolpheJob {

	private static final String JOB_NAME = "indexPeople";
	@Inject
	private SearchServices searchServices;

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.batch.AbstractRodolpheJob#doRun()
	 */
	/** {@inheritDoc} */
	@Override
	protected void doRun() {
		searchServices.indexPeople();
	}

	/**
	 * Recuperation de la definition du job pour le job manager. On utilise un nom par defaut.
	 *
	 * @return JobDefinition
	 */
	public static JobDefinition getJobDefinition() {
		return new JobDefinition(JOB_NAME, JobIndexPeople.class);
	}

}
