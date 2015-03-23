/**
 *
 */
package rodolphe.demo.services.batch;

import io.vertigo.tempo.job.metamodel.JobDefinition;

import javax.inject.Inject;

import rodolphe.demo.services.movie.MovieServices;

/**
 * Job for cleaning data in database.
 * 
 * @author JDALMEIDA
 */
public class JobCleanData extends AbstractRodolpheJob {

	private static final String JOB_NAME = "cleanData";
	private static final int MAX_ROWS = 4000;
	@Inject
	private MovieServices movieServices;

	/*
	 * (non-Javadoc)
	 * @see rodolphe.demo.services.batch.AbstractRodolpheJob#doRun()
	 */
	/** {@inheritDoc} */
	@Override
	protected void doRun() {
		int minRow = 1;
		int maxRank = 0;
		while (maxRank >= 0) {
			maxRank = movieServices.cleanMovieTitle(minRow, MAX_ROWS);
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
