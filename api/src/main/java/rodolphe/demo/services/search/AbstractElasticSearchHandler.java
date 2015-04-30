/**
 *
 */
package rodolphe.demo.services.search;

import io.vertigo.commons.config.ConfigManager;
import io.vertigo.core.Home;
import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.metamodel.FacetDefinition;
import io.vertigo.dynamo.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.dynamo.collections.model.FacetedQuery;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.metamodel.DtField.FieldType;
import io.vertigo.dynamo.domain.metamodel.DtFieldName;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.search.SearchManager;
import io.vertigo.dynamo.search.metamodel.SearchIndexDefinition;
import io.vertigo.dynamo.search.model.SearchIndex;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.dynamo.search.model.SearchQueryBuilder;
import io.vertigo.lang.Option;
import io.vertigo.persona.security.UserSession;
import io.vertigo.util.StringUtil;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import javax.inject.Inject;

import org.apache.log4j.Logger;

import rodolphe.demo.user.RodolpheUserSession;
import rodolphe.demo.user.SecurityHelper;
import rodolphe.demo.util.MemorizeTnrData;
import rodolphe.demo.util.TransactionScope;

/**
 * Classe parente des handlers associés à des index des recherches elastic search spécifiques.
 *
 * @author jmforhan
 * @param <I> Type de l'objet d'index.
 * @param <R> Type de l'objet de résultat.
 * @param <V> Type de la vue contenant les informations à indexer.
 * @param <S> Type du critère.
 */
public abstract class AbstractElasticSearchHandler<I extends DtObject, R extends DtObject, V extends DtObject, S extends DtObject>
        implements ElasticSearchHandler<S, R>, MemorizeTnrData {

    private static final String RANK_FIELD_NAME = "RANK";
    private static final String MSG_INDEXATION = "Indexation de l'index elastic search ";
    @Inject
    private SearchManager searchManager;
    @Inject
    private SecurityHelper securityHelper;
    @Inject
    private ConfigManager configManager;
    private final Map<Object, SearchIndex<I, R>> tnrMap = new HashMap<>();
    private boolean sendDataInTnr;
    private final Logger logger = Logger.getLogger("elasticHandler");

    private boolean isTnr() {
        final Option<UserSession> session = securityHelper.getCurrentSession();
        return session.isDefined() && !((RodolpheUserSession) session.get()).isCanUserCommit();
    }

    /** {@inheritDoc} */
    @Override
    public final void startMemorizeTnrData() {
        if (!tnrMap.isEmpty()) {
            logger.warn("Des données ont été mémorisés pour " + getIndexDefinition()
                    + " . Elles ont pu être envoyées à Elastic search et pas annulées ");
        }
        // Fonction valable uniquement en TNR.
        clearMemorizedTnrData();
        sendDataInTnr = isTnr();
    }

    /** {@inheritDoc} */
    @Override
    public final void sendMemorizedTnrData() {
        if (!sendDataInTnr) {
            // RAF
            return;
        }
        try (final TransactionScope scope = new TransactionScope(true)) {
            for (final SearchIndex<I, R> idx : tnrMap.values()) {
                searchManager.put(getIndexDefinition(), idx);
            }
            scope.commit();
        }
    }

    /** {@inheritDoc} */
    @Override
    public final void removeMemorizedTnrData() {
        if (!sendDataInTnr) {
            // RAF
            return;
        }
        final SearchIndexDefinition indexDef = getIndexDefinition();
        try (final TransactionScope scope = new TransactionScope(true)) {
            for (final SearchIndex<I, R> idx : tnrMap.values()) {
                searchManager.remove(indexDef, idx.getURI());
            }
            scope.commit();
        }
    }

    private void clearMemorizedTnrData() {
        sendDataInTnr = false;
        tnrMap.clear();
    }

    private SearchIndexDefinition getIndexDefinition() {
        return Home.getDefinitionSpace().resolve(getIndexDefinitionName(), SearchIndexDefinition.class);
    }

    /**
     * Retourne le libellé de l'index.
     *
     * @return Libellé de l'index.
     */
    protected abstract String getIndexDefinitionName();

    /**
     * Renvoie une page de la vue en base de données.
     *
     * @param rangMin Rang min de la page.
     * @param maxRows Nombre maximum de lignes à ramener.
     * @return Page de la vue.
     */
    protected abstract DtList<V> getVue(int rangMin, int maxRows);

    /**
     * Retourne un item de la vue à index à partir de sa clé.
     *
     * @param key Clé de l'item.
     * @return Vue.
     */
    protected abstract V getVueItem(final Object key);

    private Map<String, DtField> getFieldMap(final List<DtField> dtFields) {
        final Map<String, DtField> dtFieldMap = new HashMap<>();
        for (final DtField dtField : dtFields) {
            dtFieldMap.put(dtField.name(), dtField);
        }
        return dtFieldMap;
    }

    private <D extends DtObject> D cloneObjectWithId(final D dto) {
        final DtDefinition def = DtObjectUtil.findDtDefinition(dto);
        final D dtoCopy = (D) DtObjectUtil.createDtObject(def);
        for (final DtField field : def.getFields()) {
            copyComputedWithSetter(dto, field, dtoCopy, field);
        }
        return dtoCopy;
    }

    private void copyProperties(final DtObject orig, final DtObject dest) {
        try {
            final DtDefinition defOrig = DtObjectUtil.findDtDefinition(orig);
            final Map<String, DtField> dtFieldMap = getFieldMap(DtObjectUtil.findDtDefinition(dest).getFields());
            for (final DtField fieldOrig : defOrig.getFields()) {
                if (dtFieldMap.containsKey(fieldOrig.name())) {
                    final DtField fieldDest = dtFieldMap.get(fieldOrig.name());
                    copyComputedWithSetter(orig, fieldOrig, dest, fieldDest);
                }
            }
        } catch (final Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void copyComputedWithSetter(final DtObject source, final DtField sourceField, final DtObject target,
            final DtField targetField) {
        Object sourceValue;
        if (FieldType.COMPUTED.equals(sourceField.getType()) && FieldType.COMPUTED.equals(targetField.getType())) {
            // Du fait du fonctionnement du framework, les champs computed n'ont pas besoin d'être setter
            // Il n'y a donc rien à faire
            return;
        }
        try {
            sourceValue = sourceField.getDataAccessor().getValue(source);
        } catch (final Exception t) {
            // Défensif: on ne devrait pas être dans ce cas et on relance l'erreur.
            throw new RuntimeException(t);
        }
        targetField.getDataAccessor().setValue(target, sourceValue);
    }

    /**
     * Retourne un nouvel objet d'index.
     *
     * @param vueItem données sources
     * @return Objet d'index.
     */
    protected I createDtoIndexed(final V vueItem) {
        final DtDefinition dtDefinition = getIndexDefinition().getIndexDtDefinition();
        final I idxItem = (I) DtObjectUtil.createDtObject(dtDefinition);
        copyProperties(vueItem, idxItem);
        return idxItem;
    }

    /**
     * Retourne un nouvel objet de résultat.
     *
     * @param vueItem données sources
     * @return Objet d'index de résultat.
     */
    protected R createDtoResult(final V vueItem) {
        final DtDefinition dtDefinition = getIndexDefinition().getResultDtDefinition();
        final R rsltItem = (R) DtObjectUtil.createDtObject(dtDefinition);
        copyProperties(vueItem, rsltItem);
        return rsltItem;
    }

    private SearchIndex<I, R> createIndex(final SearchIndexDefinition indexDefinition, final V vueItem) {
        final I indexItem = createDtoIndexed(vueItem);
        final R resultItem = createDtoResult(vueItem);
        final URI<I> uri = new URI<>(indexDefinition.getIndexDtDefinition(), DtObjectUtil.getId(vueItem));
        return SearchIndex.createIndex(indexDefinition, uri, indexItem, resultItem);
    }

    /**
     * Obtient le rang d'un item.
     *
     * @param vueItem Item de vue.
     * @return Rang (ID).
     */
    private int getRang(final V vueItem) {
        final DtField fieldRang = DtObjectUtil.findDtDefinition(vueItem).getField(RANK_FIELD_NAME);
        return ((Long) fieldRang.getDataAccessor().getValue(vueItem)).intValue();
    }

    private void clearIndex(final SearchIndexDefinition indexDef, final int rangMin, final Integer rangMax) {
        logger.debug("Vidage de l'index " + indexDef.getName() + "...");
        final ListFilter filter = createClearFilter(rangMin, rangMax);
        logger.debug("sur  " + filter.getFilterValue());
        searchManager.removeAll(indexDef, filter);
        logger.info("Vidage de l'index  " + indexDef.getName() + " terminé.");
    }

    private ListFilter createClearFilter(final int rangMin, final Integer rangMax) {
        final StringBuilder sb = new StringBuilder(RANK_FIELD_NAME + ":[").append(rangMin).append(" TO ");
        if (rangMax == null) {
            sb.append('*');
        } else {
            sb.append(rangMax.intValue());
        }
        sb.append(" ]");
        return new ListFilter(sb.toString());
    }

    /** {@inheritDoc} */
    @Override
    public void indexer() {
        // Lecture de la configuration.
        final Integer clusterCard = configManager.getIntValue("search", "clusterCard");
        final SearchIndexDefinition indexDef = getIndexDefinition();
        logger.debug(MSG_INDEXATION + indexDef.getName() + "...");
        // On charge et on indexe les données par cluster.
        Collection<SearchIndex<I, R>> indexList;
        int rangMin = -10000;
        boolean cont = true;
        int compteur = 0;
        Integer rangMax = null;
        while (cont) {
            // Pas d'itération inutile en TNR
            cont = !isTnr();
            final DtList<V> dbList = getVue(rangMin, clusterCard);
            indexList = new ArrayList<>();
            for (final V dbItem : dbList) {
                indexList.add(createIndex(indexDef, dbItem));
            }
            final V lastItem = dbList.get(dbList.size() - 1);
            if (dbList.size() < clusterCard) {
                rangMax = null;
            } else {
                rangMax = getRang(lastItem);
            }
            // On vide les rangs que l'on va mettre à jour
            clearIndex(indexDef, rangMin, rangMax);
            try (final TransactionScope scope = new TransactionScope()) {
                searchManager.putAll(indexDef, indexList);
                scope.commit();
            }
            compteur += dbList.size();
            logger.debug(MSG_INDEXATION + indexDef.getName() + " : " + dbList.size() + " éléments indexés (Total : "
                    + compteur + ").");
            // Condition de sortie : cluster inférieur à la taille de cluster
            if (rangMax == null) {
                break;
            }
            // Le prochain rang est le dernier rang ramené + 1.
            rangMin = rangMax + 1;
        }
        logger.info(MSG_INDEXATION + indexDef.getName() + " terminée.");
    }

    /** {@inheritDoc} */
    @Override
    public final void indexerItem(final Object key) {
        logger.debug("Indexation unitaire ");
        final SearchIndexDefinition indexDef = getIndexDefinition();
        final V vueItem = getVueItem(key);
        if (vueItem == null) {
            // Pas d'objet => Rien à indexer
            // Ce cas peut arriver si on a précisé des données qui ne peuvent pas être retrouvée par la vue sous jacente
            logger.debug("Rien à indexer ");
            return;
        }
        final SearchIndex<I, R> idx = createIndex(indexDef, vueItem);
        if (sendDataInTnr) {
            tnrMap.put(key, idx);
        }
        searchManager.put(indexDef, idx);
        logger.debug("Indexation planifiée");
    }

    /** {@inheritDoc} */
    @Override
    public final void supprimerItem(final Object key) {
        final SearchIndexDefinition indexDef = getIndexDefinition();
        final URI<I> uri = new URI<>(indexDef.getIndexDtDefinition(), key);
        searchManager.remove(indexDef, uri);
    }

    /** {@inheritDoc} */
    @Override
    public final FacetedQueryResult<R, SearchCriterium<S>> rechercher(final SearchCriterium<S> criterium,
            final DtListState listState) {
        /* Surcharge du critère : on clone même par la clé primaire au cas où. */
        final S criteriaClone = cloneObjectWithId(criterium.getCriteria());
        treatCriteria(criteriaClone);
        /* Chargement des définitions. */
        final SearchIndexDefinition indexDef = getIndexDefinition();
        final FacetedQueryDefinition facetedQueryDefinition = criterium.getFacetsDefinition();
        // Construction de la query.
        SearchQueryBuilder searchQueryBuilder = new SearchQueryBuilder(getListFilter(criteriaClone).getFilterValue());
        if (criterium.getSelectedFacets() != null) {
            // Restauration des facettes de la première recherche.
            final List<ListFilter> facetFilter = new ArrayList<>();
            for (final FacetSelection facetSel : criterium.getSelectedFacets()) {
                facetFilter.add(facetSel.getFacetQuery());
            }
            // Cas d'un appel avec facettes.
            final FacetedQuery facetedQuery = new FacetedQuery(facetedQueryDefinition, facetFilter);
            searchQueryBuilder = searchQueryBuilder.withFacetStrategy(facetedQuery);
        }
        // Si Group by facet
        if (!StringUtil.isEmpty(criterium.getClusteringFacetName())) {
            searchQueryBuilder.withFacetClustering(Home.getDefinitionSpace().resolve(
                    criterium.getClusteringFacetName(), FacetDefinition.class));
        }
        final SearchQuery searchQuery = searchQueryBuilder.build();
        logger.info("ES request " + searchQuery.getListFilter().getFilterValue());
        // final DtListState listState = new DtListState(100, 0, criterium.getSortFieldName(), !criterium.isSortAsc())
        final FacetedQueryResult<R, SearchQuery> result = searchManager.loadList(indexDef, searchQuery, listState);
        final SearchCriterium<S> retCrit = SearchCriterium.clone(criterium);
        // On met à jour les facettes
        // retCrit.setFacets(result.getFacets());
        // On crée le bon objet de retour
        // FIXME : problème des highlihts
        return new FacetedQueryResult<>(result.getFacetedQuery(), result.getCount(), result.getDtList(),
                result.getFacets(), result.getClusters(), new HashMap<R, Map<DtField, String>>(), retCrit);
    }

    /**
     * Comportement par default.
     *
     * @param resultItem objet sérializé.
     * @return nouvel object (ou castà
     */
    @SuppressWarnings("unchecked")
    protected R mapResult(final DtObject resultItem) {
        return (R) resultItem;
    }

    /**
     * Transformation d'un dto critère en recherche elastic search.
     *
     * @param criterium critère
     * @return String
     */
    protected String getTranslatedCriteria(final S criterium) {
        return "";
    }

    private ListFilter getListFilter(final S criterium) {
        return new ListFilter(getTranslatedCriteria(criterium));
    }

    /**
     * Traitement spécifique du critère.
     *
     * @param criteriaClone Critère.
     */
    @SuppressWarnings("unused")
    protected void treatCriteria(final S criteriaClone) {
        // RAS
    }

    /**
     * Echappe les caractères spéciaux de la chaine de caracteres.
     *
     * @param str chaine avec caracteres.
     * @return chaine avec caracteres echappés.
     */
    protected final String escapeRegexpSpecialChar(final String str) {
        if (StringUtil.isEmpty(str)) {
            return str;
        }
        final String specialCharacters = "/!.?+*|{}[]()";
        String result = str;
        for (int i = 0; i < specialCharacters.length(); i++) {
            final char c = specialCharacters.charAt(i);
            result = result.replace(String.valueOf(c), "\\" + c);
        }
        return result;
    }

    /**
     * Ajoute un critere simple à la requete ElasticSearch.
     *
     * @param criteriaList la liste des criteres de la requete.
     * @param indexFieldName le nom de l'index ES.
     * @param criterium critere de recherche.
     * @param criteriaFieldName le nom de l'attribut du critere de recherche.
     */
    protected void addSimpleCriteriaAttribute(final List<String> criteriaList, final DtFieldName indexFieldName,
            final S criterium, final DtFieldName criteriaFieldName) {
        final DtDefinition def = DtObjectUtil.findDtDefinition(criterium);
        final DataType dataType = def.getField(criteriaFieldName).getDomain().getDataType();
        String attribute;
        final Object value = def.getField(criteriaFieldName).getDataAccessor().getValue(criterium);
        if (value != null) {
            switch (dataType) {
                case Integer:
                    final Integer intValue = (Integer) value;
                    attribute = indexFieldName.name() + ":(" + intValue + ")";
                    break;
                case Long:
                    final Long longValue = (Long) value;
                    attribute = indexFieldName.name() + ":(" + longValue + ")";
                    break;
                case BigDecimal:
                    final BigDecimal decValue = (BigDecimal) value;
                    attribute = indexFieldName.name() + ":(" + decValue + ")";
                    break;
                case Double:
                    final Double doubleValue = (Double) value;
                    attribute = indexFieldName.name() + ":(" + doubleValue + ")";
                    break;
                case Date:
                    final Date dateValue = (Date) value;
                    attribute = indexFieldName.name() + ":(\"" + getDateXmlFormat(dateValue) + "\")";
                    break;
                case String:
                    final String strValue = (String) value;
                    attribute = indexFieldName.name() + ":(" + escapeRegexpSpecialChar(strValue) + ")";
                    break;
                case Boolean:
                    final Boolean booleanValue = (Boolean) value;
                    attribute = indexFieldName.name() + ":(" + booleanValue + ")";
                    break;
                case DataStream:
                case DtList:
                case DtObject:
                default:
                    throw new RuntimeException("Type de données non comparable : " + dataType.name());
            }
            criteriaList.add(attribute);
        }
    }

    /**
     * Retourne la date UTC en string.
     *
     * @param date la date.
     * @return la chaine de caractere formattée.
     */
    private String getDateXmlFormat(final Date date) {
        final DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
        final TimeZone tz = TimeZone.getTimeZone("UTC");
        formatter.setTimeZone(tz);
        return formatter.format(date);
    }

    /**
     * Ajoute un critere de recherche de type "commence par".
     *
     * @param criteriaList liste des criteres.
     * @param indexFieldName nom du champs de l'index.
     * @param criterium criteres de recherche.
     * @param criteriaFieldName nom du champs du critere.
     */
    protected void addStartWithCriteria(final List<String> criteriaList, final DtFieldName indexFieldName,
            final S criterium, final DtFieldName criteriaFieldName) {
        final DtDefinition def = DtObjectUtil.findDtDefinition(criterium);
        final String val = (String) def.getField(criteriaFieldName).getDataAccessor().getValue(criterium);
        if (val != null) {
            final String value = val;
            final StringBuilder sb = new StringBuilder("");
            sb.append(indexFieldName);
            sb.append(":(");
            sb.append(escapeRegexpSpecialChar(value.toLowerCase(Locale.FRANCE)));
            sb.append("*)");
            criteriaList.add(sb.toString());
        }
    }

    /**
     * Ajoute un critere de recherche en commence par sur 2 champs de l'index avec un "ou".
     *
     * @param criteriaList liste des criteres.
     * @param indexFieldName1 nom du champs 1 de l'index.
     * @param indexFieldName2 nom du champs 2 de l'index.
     * @param criterium critere.
     * @param criteriaFieldName nom du champs du critere.
     */
    protected void addOrStartWithCriteria(final List<String> criteriaList, final DtFieldName indexFieldName1,
            final DtFieldName indexFieldName2, final S criterium, final DtFieldName criteriaFieldName) {
        final DtDefinition def = DtObjectUtil.findDtDefinition(criterium);
        final String val = (String) def.getField(criteriaFieldName).getDataAccessor().getValue(criterium);
        if (val != null) {
            final String value = val;
            final StringBuilder sb = new StringBuilder("(");
            sb.append(indexFieldName1);
            sb.append(":(");
            sb.append(escapeRegexpSpecialChar(value.toLowerCase()));
            sb.append("*)");
            sb.append(" OR ");
            sb.append(indexFieldName2);
            sb.append(":(");
            sb.append(escapeRegexpSpecialChar(value.toLowerCase()));
            sb.append("*))");
            criteriaList.add(sb.toString());
        }
    }

    /**
     * Construit la requete ES correspondant à l'ensemble des criteres de la liste (ET).
     *
     * @param liste liste des criteres ES.
     * @return la requete ES.
     */
    protected String getRequestFromCriteriaList(final List<String> liste) {
        // Si aucun critère => il faut quand même une recherche
        if (liste.isEmpty()) {
            liste.add("*:*");
        }
        final StringBuilder sb = new StringBuilder();
        for (int i = 0; i < liste.size(); i++) {
            if (i > 0) {
                sb.append(" AND ");
            }
            sb.append(liste.get(i));
        }
        return sb.toString();
    }
}
