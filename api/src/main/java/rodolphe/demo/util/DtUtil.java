/**
 *
 */
package rodolphe.demo.util;

import io.vertigo.dynamo.domain.metamodel.DataAccessor;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Option;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    private static <D extends DtObject> D createDtObject(final DtDefinition dtDefinition) {
        return (D) DtObjectUtil.createDtObject(dtDefinition);
    }

    /**
     * Transforme une liste en dictionnaire avec pour clé la clé primaire du DTO.
     *
     * @param list Liste de DTO.
     * @return Map clé primaire -> DTO.
     * @param <K> Type de la clé primaire.
     * @param <D> Type du DTO.
     */
    public static <K, D extends DtObject> Map<K, D> getDictionnary(final List<D> list) {
        final Map<K, D> map = new HashMap<>();
        for (final D dto : list) {
            map.put((K) DtObjectUtil.getId(dto), dto);
        }
        return map;
    }

    /**
     * Transforme une liste en dictionnaire avec pour clé le champ précisé.
     *
     * @param list Liste de DTO.
     * @param fieldName Nom du champ pour la clé.
     * @return Map clé primaire -> DTO.
     * @param <K> Type de la clé primaire.
     * @param <D> Type du DTO.
     */
    public static <K, D extends DtObject> Map<K, D> getDictionnary(final DtList<D> list, final String fieldName) {
        final DataAccessor dataAccessor = list.getDefinition().getField(fieldName).getDataAccessor();
        final Map<K, D> map = new HashMap<>();
        for (final D dto : list) {
            map.put((K) dataAccessor.getValue(dto), dto);
        }
        return map;
    }

    /**
     * Groupe une liste de DTO selon un champ donné.
     *
     * @param source Liste des DTO à grouper.
     * @param fieldName Nom du champ surlequel groupé.
     * @param defaultKey Valeur par défaut pour la clé de groupe si le champ est null.
     * @return Map valeur du champ => liste des DTO ayant cet valeur.
     * @param <K> Type du champ de groupe.
     * @param <D> Type du DTO.
     */
    public static <K, D extends DtObject> Map<K, DtList<D>> groupBy(final DtList<D> source, final String fieldName,
            final K defaultKey) {
        final DataAccessor dataAccessor = source.getDefinition().getField(fieldName).getDataAccessor();
        final Map<K, DtList<D>> map = new HashMap<>();
        for (final D item : source) {
            final K realKey = (K) dataAccessor.getValue(item);
            final K key = realKey != null ? realKey : defaultKey;
            if (map.containsKey(key)) {
                map.get(key).add(item);
            } else {
                final DtList<D> dtc = new DtList<>(source.getDefinition());
                dtc.add(item);
                map.put(key, dtc);
            }
        }
        return map;
    }

    /**
     * Fusionne les listes d'une map de groupe.
     *
     * @param map Map de groupe.
     * @param dtoClass Class du DTO.
     * @param <D> Type de l'objet dans les listes.
     * @return Union des listes de la map.
     */
    public static <D extends DtObject> DtList<D> mergeGroupMap(final Map<?, DtList<D>> map,
            final Class<? extends DtObject> dtoClass) {
        Assertion.checkNotNull(map);
        final DtList<D> list = new DtList<>(dtoClass);
        for (final List<D> subList : map.values()) {
            list.addAll(subList);
        }
        return list;
    }

    /**
     * Wrap une liste d'ID dans une liste de DTO.
     *
     * @param idList Liste d'ID.
     * @param clazz Classe du DTO.
     * @return Liste de DTO.
     * @param <K> Type de la clé.
     * @param <D> Type du DTO.
     */
    public static <D extends DtObject, K> DtList<D> wrapIdList(final Collection<K> idList, final Class<D> clazz) {
        final DtList<D> list = new DtList<>(clazz);
        final DtDefinition dtDef = list.getDefinition();
        final DataAccessor pkAcc = dtDef.getIdField().get().getDataAccessor();
        for (final K key : idList) {
            final D dto = createDtObject(dtDef);
            pkAcc.setValue(dto, key);
            list.add(dto);
        }
        return list;
    }

    /**
     * Unwrap une liste de DTO dans une list d'ID.
     *
     * @param dtList Liste des DtObjects.
     * @return Liste de DTO.
     * @param <K> Type de la clé.
     * @param <D> Type du DTO.
     */
    public static <D extends DtObject, K> List<K> unwrapIdList(final Collection<D> dtList) {
        final List<K> list = new ArrayList<>();
        for (final D dto : dtList) {
            list.add((K) DtObjectUtil.getId(dto));
        }
        return list;
    }

    /**
     * Vérification qu'un liste ne contient qu'un élément au maximum.
     *
     * @param dtc liste
     * @param <D> Type du DTO.
     */
    public static <D extends DtObject> void checkDbUnicite(final DtList<D> dtc) {
        Assertion.checkState(dtc.size() <= 1, "Contrainte d'unicité manquante en base");
    }
}
