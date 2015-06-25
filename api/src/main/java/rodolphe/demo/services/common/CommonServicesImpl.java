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

import java.util.ArrayList;
import java.util.List;

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
		if (CodeScope.MOVIE.name().equals(scope)) {
			return movieServices.getMoviesByCriteria(movieCriteria, uiListState, clusteringFacetName, toListFilters(selection));
		} else if (CodeScope.PEOPLE.name().equals(scope)) {
			return peopleServices.getPeopleByCriteria(peopleCriteria, uiListState, clusteringFacetName, toListFilters(selection));
		} else {
			final FacetedQueryResult<MovieIndex, SearchQuery> movies = movieServices.getMoviesByCriteria(movieCriteria,
					uiListState, "", toListFilters(selection));
			final FacetedQueryResult<PeopleIndex, SearchQuery> people = peopleServices.getPeopleByCriteria(
					peopleCriteria, uiListState, "", toListFilters(selection));
			final FacetedQueryResult<DtObject, SearchQuery> allData = new FacetedQueryResultMerger<>(movies, "SCOPE:" + CodeScope.MOVIE.name(), "Movies", null)
					.with(people, "SCOPE:" + CodeScope.PEOPLE.name(), "People", null)
					.withFacet("FCT_SCOPE")
					.build();
			return allData;
		}
	}

	private List<ListFilter> toListFilters(final DtList<SelectedFacet> selectedFacets) {
		final List<ListFilter> listFilters = new ArrayList<>(selectedFacets.size());
		// facet selection list.
		for (int i = 0; i < selectedFacets.size(); i++) {
			final SelectedFacet selectedFacet = selectedFacets.get(i);
			final FacetDefinition facetDefinition = Home.getDefinitionSpace().resolve(selectedFacet.getKey(), FacetDefinition.class);
			if (facetDefinition.isRangeFacet()) {
				for (final FacetValue facet : facetDefinition.getFacetRanges()) {
					if (facet.getLabel().getDisplay().equals(selectedFacet.getValue())) {
						listFilters.add(facet.getListFilter());
						break;
					}
				}
			} else {
				final ListFilter filter = new ListFilter(facetDefinition.getDtField().getName() + ":\"" + selectedFacet.getValue() + "\"");
				listFilters.add(filter);
			}
		}
		return listFilters;
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
