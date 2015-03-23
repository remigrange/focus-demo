package rodolphe.demo.services.search;

import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.lang.Assertion;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * Critère de recherche pour une recherche à facette.
 * Paramètre d'entrée d'un service de recherche à facette.
 *
 * @author jmforhan
 * @param <S> Type du critère.
 */
public class SearchCriterium<S extends DtObject> {

    private S criteria;
    private final Map<String, FacetSelection> selectedFacetsMap;
    private Integer maxRows;
    // Soit un champ indexé
    private String sortFieldName;
    private boolean sortAsc;
    private final FacetedQueryDefinition facetsDefinition;

    /**
     * Construit une instance de SearchCriterium.
     *
     * @param facetsDefinition définition des facettes
     */
    public SearchCriterium(final FacetedQueryDefinition facetsDefinition) {
        selectedFacetsMap = new HashMap<>();
        sortAsc = true;
        this.facetsDefinition = facetsDefinition;
    }

    /**
     * Clone un SearchCriterium.
     *
     * @param source SearchCriterium à cloner.
     * @return Clone du SearchCriterium.
     * @param <S> Type du critère.
     */
    public static <S extends DtObject> SearchCriterium<S> clone(final SearchCriterium<S> source) {
        Assertion.checkNotNull(source);
        final SearchCriterium<S> target = new SearchCriterium<>(source.getFacetsDefinition());
        target.setCriteria(source.getCriteria());
        // target.setFacets(source.getFacets());
        target.setMaxRows(source.getMaxRows());
        target.setSortAsc(source.isSortAsc());
        target.setSortFieldName(source.getSortFieldName());
        for (final FacetSelection item : source.getSelectedFacets()) {
            target.addFacet(item.getFacetName(), item.getFacetValueKey(), item.getFacetQuery());
        }
        return target;
    }

    /**
     * Donne la valeur de criteria.
     *
     * @return la valeur de criteria.
     */
    public S getCriteria() {
        return criteria;
    }

    /**
     * Affecte criteria à criteria.
     *
     * @param criteria La nouvelle valeur de criteria
     */
    public void setCriteria(final S criteria) {
        this.criteria = criteria;
    }

    /**
     * Donne la valeur de sortFieldName.
     *
     * @return la valeur de sortFieldName.
     */
    public String getSortFieldName() {
        return sortFieldName;
    }

    /**
     * Affecte sortFieldName à sortFieldName.
     *
     * @param sortFieldName La nouvelle valeur de sortFieldName
     */
    public void setSortFieldName(final String sortFieldName) {
        this.sortFieldName = sortFieldName;
    }

    /**
     * Donne la valeur de sortAsc.
     *
     * @return la valeur de sortAsc.
     */
    public boolean isSortAsc() {
        return sortAsc;
    }

    /**
     * Affecte sortAsc à sortAsc.
     *
     * @param sortAsc La nouvelle valeur de sortAsc
     */
    public void setSortAsc(final boolean sortAsc) {
        this.sortAsc = sortAsc;
    }

    /**
     * Donne la valeur de selectedFacets.
     *
     * @return la valeur de selectedFacets.
     */
    public Collection<FacetSelection> getSelectedFacets() {
        return selectedFacetsMap.values();
    }

    /**
     * Donne la valeur de maxRows.
     *
     * @return la valeur de maxRows.
     */
    public Integer getMaxRows() {
        return maxRows;
    }

    /**
     * Affecte maxRows à maxRows.
     *
     * @param maxRows La nouvelle valeur de maxRows
     */
    public void setMaxRows(final Integer maxRows) {
        this.maxRows = maxRows;
    }

    /**
     * Sélectionne une valeur de facette.
     *
     * @param facetName Nom de la facette.
     * @param facetValueKey Valeur de la facette.
     */
    public void addFacet(final String facetName, final String facetValueKey, final ListFilter facetQuery) {
        Assertion.checkState(getFacetsDefinition().getFacetDefinition(facetName) != null, facetName + " inconnu");
        selectedFacetsMap.put(facetName, new FacetSelection(facetName, facetValueKey, facetQuery));
    }

    /**
     * Désélectionne une facette.
     *
     * @param facetName Nom de la facette.
     */
    public void removeFacet(final String facetName) {
        selectedFacetsMap.remove(facetName);
    }

    /**
     * Vide la sélection de facettes.
     */
    public void clearSelectedFacets() {
        selectedFacetsMap.clear();
    }

    /**
     * Donne la valeur de facetsDefinition.
     *
     * @return la valeur de facetsDefinition.
     */
    protected final FacetedQueryDefinition getFacetsDefinition() {
        return facetsDefinition;
    }
}
