/**
 *
 */
package rodolphe.demo.util;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.lang.Option;

/**
 * Classe utilitaire offrant un ensemble de services concernant les DtObject.
 *
 * @author jmforhan
 */
public final class DtUtil {

    /**
     * Contructeur
     */
    private DtUtil() {
        // Rien ici
    }

    /**
     * Récupère une option permettant de savoir si un champ est présent sur un dto ou pas.
     *
     * @param def definition du dto
     * @param fieldName nom du champ
     * @return option
     */
    public static Option<DtField> getDtField(final DtDefinition def, final String fieldName) {
        try {
            return Option.some(def.getField(fieldName));
        } catch (final NullPointerException e) {
            // Le champ n'existe pas sur l'objet. On retourne null
            return Option.none();
        }
    }
}
