package rodolphe.demo.boot.initializer;

import io.vertigo.core.spaces.component.ComponentInitializer;
import io.vertigo.tempo.job.JobManager;

import javax.inject.Inject;

import rodolphe.demo.services.batch.JobIndexerMovie;

/**
 * Initialisation du manager des jobs.
 *
 * @author jmforhan
 */
public final class JobManagerInitializer implements ComponentInitializer<JobManager> {

	/**
	 * Construit une instance de JobManagerInitializer.
	 */
	@Inject
	public JobManagerInitializer() {
		super();
	}

	/** {@inheritDoc} */
	@Override
	public void init(final JobManager manager) {
		manager.scheduleNow(JobIndexerMovie.getJobDefinition());
		//manager.scheduleNow(JobIndexPeople.getJobDefinition());
	}
}
