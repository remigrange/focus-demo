/**
 *
 */
package roldophe.demo.masterdata;

import java.lang.reflect.Method;

import org.junit.Test;

import rodolphe.demo.domain.CodeEnum;
import rodolphe.demo.domain.masterdata.CodeScope;
import roldophe.demo.tools.AbstractRodolpheTestCase;

/**
 * @author JDALMEIDA
 */
public class EnumSimpleTest extends AbstractRodolpheTestCase {

    /**
     * check enum codeScope.
     */
    @Test
    public void checkCodeScope() {
        coherenceEnum(CodeScope.class);
    }

    private <E extends CodeEnum> void coherenceEnum(final Class<E> enumClass) {
        getLogger().info("analyse classe " + enumClass.getSimpleName());
        // Chargement valeurs de l'énumération.
        final E[] enumValues = enumClass.getEnumConstants();
        // Pour chaque item de l'enum, appel de valueOf sur le name.
        try {
            final Method method = enumClass.getDeclaredMethod("valueOf", new Class[] { String.class });
            // Appel de la méthode statique valueOf de l'énumération pour chaque valeur.
            for (final E code : enumValues) {
                method.invoke(null, new Object[] { code.name() });
                // On vérifie que les ressources sont bien trouvé dans le localeManager
            }
        } catch (final Exception e) {
            throw new RuntimeException(e);
        }
    }
}
