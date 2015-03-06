package rodolphe.demo.services.batch;

/**
 * Classe parente de tous les jobs Stitch.
 * On n'a pas a s'occuper de l'injection de dependance qui est faite automatiquement par le JobManager.
 *
 * @author jmforhan
 */
abstract class AbstractRodolpheJob extends AbstractRodolpheBatch implements RodolpheJob {

	/**
	 * Construit une instance de AbstractFicenJob.
	 */
	public AbstractRodolpheJob() {
		super();
	}

	/** {@inheritDoc} */
	@Override
	public final void run() {
		process();
	}

	/** {@inheritDoc} */
	@Override
	protected final void doProcess() {
		doRun();
	}

	/**
	 * Traitement specifique du job.
	 */
	protected abstract void doRun();
}
