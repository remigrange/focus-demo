/**
 *
 */
package rodolphe.demo.util;

import io.vertigo.core.Home;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListURIForMasterData;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.persistence.datastore.Broker;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Option;

/**
 * Helper sur la récupération d'information des listes de références.
 *
 * @author jmforhan
 */
public final class MdlUtil {

    /** préfixe pour les listes de référence. */
    public static final String MADA_PREFIXE = "MADA_";
    /** code pour les URN indiquant que l'on veut tous les éléments, actifs et inactifs. */
    public static final String ALL_DATA_CODE = "TOUS";
    /** code pour les URN indiquant que l'on veut uniquement les éléments actifs. */
    public static final String ACTIF_DATA_CODE = "ACTIF";
    /** Nom de la colonne contenant l'ordre pour une liste de référence. */
    public static final String ORDRE_FIELD_NAME = "ORDRE";
    /** Nom de la colonne contenant le flag actif/non actif pour une liste de référence. */
    public static final String ACTIF_FIELD_NAME = "ACTIF";
    /** Nom de la colonne contenant le code pour une liste de référence. */
    public static final String CODE_FIELD_NAME = "CODE";

    /**
     * Constructeur.
     */
    private MdlUtil() {
        super();
    }

    /**
     * Get the value displayed for a given key.
     *
     * @param dtObjectClass class of the dto
     * @param key the key
     * @return displayed value
     */
    public static String getDisplay(final Class<? extends DtObject> dtObjectClass, final Object key) {
        final DtObject dto = getObject(dtObjectClass, key);
        final DtListURIForMasterData mdlUri = getMasterDataListUri(dtObjectClass, ALL_DATA_CODE);
        final DtField mdFieldDisplay = mdlUri.getDtDefinition().getDisplayField().get();
        return (String) mdFieldDisplay.getDataAccessor().getValue(dto);
    }

    /**
     * Récupère une option permettant de savoir si un champ est présent sur un dto ou pas.
     *
     * @param def definition du dto
     * @param fieldName nom du champ
     * @return option
     */
    private static Option<DtField> getDtField(final DtDefinition def, final String fieldName) {
        try {
            return Option.some(def.getField(fieldName));
        } catch (final NullPointerException e) {
            // Le champ n'existe pas sur l'objet. On retourne null
            return Option.none();
        }
    }

    /**
     * Récupère un objet donné des listes de référence.
     *
     * @param <D> type de l'objet
     * @param dtObjectClass class of the dto
     * @param key clé
     * @return Object
     */
    public static <D extends DtObject> D getObject(final Class<D> dtObjectClass, final Object key) {
        Assertion.checkNotNull(key, "The key of the reference element is mandatory.");
        Assertion.checkNotNull(getRegistredMasterDataDefinition(dtObjectClass), "{0} n'est pas une liste de référence",
                dtObjectClass.getName());
        final URI<D> uri = createDtObjectURI(dtObjectClass, key);
        return getBroker().<D> get(uri);
    }

    /**
     * Récupère un objet donné des listes de référence.
     *
     * @param <D> type de l'objet
     * @param dtDef definition of the dto
     * @param key clé
     * @return Object
     */
    public static <D extends DtObject> D getObject(final DtDefinition dtDef, final Object key) {
        Assertion.checkNotNull(key, "The key of the reference element is mandatory.");
        Assertion.checkNotNull(getRegistredMasterDataDefinition(dtDef), "{0} n'est pas une liste de référence",
                dtDef.getName());
        final URI<D> uri = new URI<>(dtDef, key);
        return getBroker().<D> get(uri);
    }

    private static <D extends DtObject> URI<D> createDtObjectURI(final Class<? extends DtObject> dtObjectClass,
            final Object uriValue) {
        final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(dtObjectClass);
        return new URI<>(dtDefinition, uriValue);
    }

    /**
     * Get the collection associated with a MasterDataList (including all data, active or inactive).
     *
     * @param <D> type of the list elements
     * @param dtObjectClass class of the dto
     * @return the collection
     */
    public static <D extends DtObject> DtList<D> getReferenceListAllData(final Class<D> dtObjectClass) {
        return getReferenceList(dtObjectClass, ALL_DATA_CODE);
    }

    private static Option<DtField> getActifField(final DtDefinition dtDef) {
        return getDtField(dtDef, ACTIF_FIELD_NAME);
    }

    /**
     * Get the collection associated with a specific MasterDataList in all registred reference list for a given
     * dto class.
     *
     * @param <D> type of the list elements
     * @param dtObjectClass class of the dto
     * @param code specific code identifying the specific list
     * @return the collection
     */
    public static <D extends DtObject> DtList<D> getReferenceList(final Class<D> dtObjectClass, final String code) {
        return getBroker().getList(getMasterDataListUri(dtObjectClass, code));
    }

    private static DtListURIForMasterData getMasterDataListUri(final Class<? extends DtObject> dtObjectClass,
            final String code) {
        return getMasterDataListUri(DtObjectUtil.findDtDefinition(dtObjectClass), code);
    }

    private static DtListURIForMasterData getMasterDataListUri(final DtDefinition dtDef, final String code) {
        final DtDefinition masterDataDefinition = getRegistredMasterDataDefinition(dtDef);
        Assertion.checkNotNull(masterDataDefinition, "{0} n'est pas enregistré comme une liste de référence",
                dtDef.getName());
        return new DtListURIForMasterData(masterDataDefinition, code);
    }

    private static Broker getBroker() {
        return getPersistenceManager().getBroker();
    }

    private static PersistenceManager getPersistenceManager() {
        return Home.getComponentSpace().resolve(PersistenceManager.class);
    }

    /**
     * Définition de la MDL associée à un type de DT.
     *
     * @param dtObjectClass classe du DT.
     * @return MasterDataDefinition
     */
    public static DtDefinition getRegistredMasterDataDefinition(final Class<? extends DtObject> dtObjectClass) {
        return getRegistredMasterDataDefinition(DtObjectUtil.findDtDefinition(dtObjectClass));
    }

    private static DtDefinition getRegistredMasterDataDefinition(final DtDefinition dtDef) {
        return getPersistenceManager().getMasterDataConfig().containsMasterData(dtDef) ? dtDef : null;
    }
}
