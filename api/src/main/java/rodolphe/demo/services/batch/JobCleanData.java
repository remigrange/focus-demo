/**
 *
 */
package rodolphe.demo.services.batch;

import io.vertigo.tempo.job.metamodel.JobDefinition;

import javax.inject.Inject;

import rodolphe.demo.services.movie.MovieServices;

/**
 * @author JDALMEIDA
 *
 */
public class JobCleanData extends AbstractRodolpheJob {

	private static final String JOB_NAME = "cleanData";
	@Inject
	private MovieServices movieServices;

	/* (non-Javadoc)
	 * @see rodolphe.demo.services.batch.AbstractRodolpheJob#doRun()
	 */
	/** {@inheritDoc} */
	@Override
	protected void doRun() {
		int  minRow = 1;
		final int maxRows = 100;
		for (int maxRank =0; maxRank >= 0; ) {
			maxRank = movieServices.cleanMovieTitle(minRow, maxRows);
			minRow = maxRank + 1;
		}

	}

	/**
	 * Recuperation de la definition du job pour le job manager. On utilise un nom par defaut.
	 *
	 * @return JobDefinition
	 */
	public static JobDefinition getJobDefinition() {
		return new JobDefinition(JOB_NAME, JobCleanData.class);
	}

}
