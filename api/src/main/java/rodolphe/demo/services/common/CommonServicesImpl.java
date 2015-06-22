/**
 *
 */
package rodolphe.demo.services.common;

import io.vertigo.core.Home;
import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.metamodel.FacetDefinition;
import io.vertigo.dynamo.collections.model.FacetValue;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.collections.model.FacetedQueryResultMerger;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.search.SearchManager;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.dynamo.transaction.Transactional;
import io.vertigo.vega.rest.model.UiListState;

import javax.inject.Inject;

import rodolphe.demo.domain.common.SearchCriteria;
import rodolphe.demo.domain.common.SelectedFacet;
import rodolphe.demo.domain.masterdata.CodeScope;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieIndex;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.PeopleCriteria;
import rodolphe.demo.domain.people.PeopleIndex;
import rodolphe.demo.services.movie.MovieServices;
import rodolphe.demo.services.people.PeopleServices;
import rodolphe.demo.services.search.FacetSelection;

/**
 * Implementation of common ws.
 *
 * @author JDALMEIDA
 */
@Transactional
public class CommonServicesImpl implements CommonServices {

	@Inject
	private MovieServices movieServices;
	@Inject
	private PeopleServices peopleServices;
	@Inject
	private SearchManager searchManager;

	/** {@inheritDoc} */
	@Override
	public FacetedQueryResult<? extends DtObject, SearchQuery> search(final SearchCriteria searchCriteria, final DtList<SelectedFacet> selection,
			final UiListState uiListState, final String clusteringFacetName) {
		final MovieCriteria movieCriteria = new MovieCriteria();
		final String query = searchCriteria.getQuery();
		final String scope = searchCriteria.getScope();
		movieCriteria.setTitle(query);
		final PeopleCriteria peopleCriteria = new PeopleCriteria();
		peopleCriteria.setPeoName(query);
		peopleCriteria.setFirstName(query);
		peopleCriteria.setLastName(query);
		final FacetSelection[] facetSel = getFacetSelectionList(selection);
		if (CodeScope.MOVIE.name().equals(scope)) {
			return movieServices.getMoviesByCriteria(movieCriteria, uiListState, clusteringFacetName, facetSel);
		} else if (CodeScope.PEOPLE.name().equals(scope)) {
			return peopleServices.getPeopleByCriteria(peopleCriteria, uiListState, clusteringFacetName, facetSel);
		} else {
			final FacetedQueryResult<MovieIndex, SearchQuery> movies = movieServices.getMoviesByCriteria(movieCriteria,
					uiListState, "", facetSel);
			final FacetedQueryResult<PeopleIndex, SearchQuery> people = peopleServices.getPeopleByCriteria(
					peopleCriteria, uiListState, "", facetSel);
			final FacetedQueryResult<DtObject, SearchQuery> allData = new FacetedQueryResultMerger<>(movies, "SCOPE:" + CodeScope.MOVIE.name(), "Movies", null)
					.with(people, "SCOPE:" + CodeScope.PEOPLE.name(), "People", null)
					.withFacet(clusteringFacetName)
					.build();
			return allData;
		}
	}

	/** {@inheritDoc} */
	@Override
	public FacetSelection[] getFacetSelectionList(final DtList<SelectedFacet> selectedFacets) {
		final FacetSelection[] facetSelections = new FacetSelection[selectedFacets.size()];
		// facet selection list.
		for (int i = 0; i < selectedFacets.size(); i++) {
			final SelectedFacet selectedFacet = selectedFacets.get(i);
			final FacetDefinition facetDefinition = Home.getDefinitionSpace().resolve(selectedFacet.getKey(), FacetDefinition.class);
			if (facetDefinition.isRangeFacet()) {
				for (final FacetValue facet : facetDefinition.getFacetRanges()) {
					if (facet.getLabel().getDisplay().equals(selectedFacet.getValue())) {
						facetSelections[i] = new FacetSelection(facetDefinition, selectedFacet.getValue(), facet.getListFilter());
						break;
					}
				}
			} else {
					final ListFilter filter = new ListFilter(facetDefinition.getDtField().getName() + ":\""
							+ selectedFacet.getValue() + "\"");
					facetSelections[i] = new FacetSelection(facetDefinition, selectedFacet.getValue(), filter);
				}
		}
		return facetSelections;
	}

	/** {@inheritDoc} */
	@Override
	public void reindexAllMovies() {
		searchManager.reindexAll(searchManager.findIndexDefinitionByKeyConcept(Movie.class));
	}

	/** {@inheritDoc} */
	@Override
	public void reindexAllPeople() {
		searchManager.reindexAll(searchManager.findIndexDefinitionByKeyConcept(People.class));
	}

	/** {@inheritDoc} */
	@Override
	public void removeAllIndex() {
		searchManager.removeAll(searchManager.findIndexDefinitionByKeyConcept(Movie.class), new ListFilter("*:*"));
		searchManager.removeAll(searchManager.findIndexDefinitionByKeyConcept(People.class), new ListFilter("*:*"));
	}
}
