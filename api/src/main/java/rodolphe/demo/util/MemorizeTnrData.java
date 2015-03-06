package rodolphe.demo.util;

/**
 * Interface permettant de signaler qu'il y a des données associées à une ressources transactionnelle à transférer dans
 * un système tiers.
 * Ceci ne doit être utilisée que dans le cadre des tests de non régression automatisés.
 * Il ne faut utiliser que des données créées dans le cadre des tests et ne jamais modifier des données existantes.
 *
 * @author jmforhan
 */
public interface MemorizeTnrData {

	/**
	 * Démarre la mémorisation des données à envoyer au système tiers dans le cadre des TNRs.
	 */
	void startMemorizeTnrData();

	/**
	 * Envoieau système tiers les données mémorisées. Il est important que le code appelant est un finally qui fera un
	 * removeMemorizedTnrData.
	 */
	void sendMemorizedTnrData();

	/**
	 * Supprime les données des TNR envoyés au système. Doit être fait dans un finally.
	 */
	void removeMemorizedTnrData();
}
