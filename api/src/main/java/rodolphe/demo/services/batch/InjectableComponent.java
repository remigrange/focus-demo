package rodolphe.demo.services.batch;

/**
 * Interface signalant que le composant possede un methode propre pour faire l'injection de dependance.
 * Doit etre utiliser apres le constructeur.
 * Necessaire si l'objet a ete cree directement, sans passe par le conteneur d'injection.
 *
 * @author kkacim
 */
public interface InjectableComponent {

    /**
     * Injecte les dependances.
     */
    void injectMembers();
}
