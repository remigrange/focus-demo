package rodolphe.demo.services.movie;

import io.vertigo.core.Home;
import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.metamodel.FacetDefinition;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.search.model.SearchQuery;
import io.vertigo.dynamo.search.model.SearchQueryBuilder;
import io.vertigo.dynamo.store.criteria.FilterCriteria;
import io.vertigo.dynamo.store.criteria.FilterCriteriaBuilder;
import io.vertigo.dynamo.transaction.Transactional;
import io.vertigo.vega.rest.model.UiListState;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.dao.movies.MovieDAO;
import rodolphe.demo.dao.movies.MoviesPAO;
import rodolphe.demo.dao.people.CastingDAO;
import rodolphe.demo.dao.people.RolePeopleDAO;
import rodolphe.demo.domain.DtDefinitions.CastingFields;
import rodolphe.demo.domain.DtDefinitions.RolePeopleFields;
import rodolphe.demo.domain.masterdata.CodeRoleMovie;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCasting;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieIndex;
import rodolphe.demo.domain.movies.MovieView;
import rodolphe.demo.domain.people.Casting;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.RolePeople;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.util.DtListStateUtil;

/**
 * Implementation of Movie Services.
 *
 * @author JDALMEIDA
 */
@Transactional
public class MovieServicesImpl implements MovieServices {

	@Inject
	private MovieDAO movieDAO;

	@Inject
	private CastingDAO castingDAO;
	@Inject
	private RolePeopleDAO rolePeopleDAO;
	@Inject
	private MoviesPAO moviePAO;

	/** {@inheritDoc} */
	@Override
	public FacetedQueryResult<MovieIndex, SearchQuery> getMoviesByCriteria(final MovieCriteria movieCriteria,
			final UiListState uiListState, final String clusteringFacetName, final List<ListFilter> facetSelections) {
		final DtListState listState = DtListStateUtil.readUiListState(uiListState);
		//----
		final SearchQueryBuilder searchQueryBuilder = movieDAO.createSearchQueryBuilderMovieWithFct(movieCriteria, facetSelections);
		if (!clusteringFacetName.isEmpty()) {
			final FacetDefinition clusterFacetDefinition = Home.getDefinitionSpace().resolve(clusteringFacetName, FacetDefinition.class);
			searchQueryBuilder.withFacetClustering(clusterFacetDefinition);
		}
		// -----
		return movieDAO.loadList(searchQueryBuilder.build(), listState);
	}

	private List<ListFilter> toListFilters(final FacetSelection... facetSelections) {
		final List<ListFilter> facetListFilters = new ArrayList<>(facetSelections.length);
		for (final FacetSelection facetSelection : facetSelections) {
			facetListFilters.add(facetSelection.getFacetQuery());
		}
		return facetListFilters;
	}

	/** {@inheritDoc} */
	@Override
	public Movie getMovie(final Long movId) {
		return movieDAO.get(movId);
	}

	/** {@inheritDoc} */
	@Override
	public Movie saveMovie(final Movie movie) {
		movieDAO.save(movie);
		//done by searchManager : searchServices.indexMovie(movie.getMovId());
		return movie;
	}

	/** {@inheritDoc} */
	@Override
	public DtList<People> getActors(final Long movId) {
		final DtList<People> peopleList = new DtList<>(People.class);
		final FilterCriteria<Casting> castingCriteria = new FilterCriteriaBuilder<Casting>()
				.addFilter(CastingFields.MOV_ID.name(), movId)
				.addFilter(CastingFields.RLM_CD.name(), CodeRoleMovie.ACTOR.dbValue())
				.build();
		final DtList<Casting> castings = castingDAO.getList(castingCriteria, Integer.MAX_VALUE);
		for (final Casting casting : castings) {
			peopleList.add(casting.getPeople());
		}
		return peopleList;
	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public DtList<People> getProducers(final Long movId) {
		final DtList<People> ret = new DtList<>(People.class);
		final FilterCriteria<RolePeople> rolePeopleCriteria = new FilterCriteriaBuilder<RolePeople>()
				.addFilter(RolePeopleFields.MOV_ID.name(), movId)
				.addFilter(RolePeopleFields.RLM_CD.name(), CodeRoleMovie.PRODUCER.dbValue()).build();
		final DtList<RolePeople> rolePeopleList = rolePeopleDAO.getList(rolePeopleCriteria, Integer.MAX_VALUE);
		for (final RolePeople rolePeople : rolePeopleList) {
			final People people = rolePeople.getPeople();
			people.setComment(rolePeople.getComment());
			ret.add(people);
		}
		return ret;
	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public DtList<People> getDirectors(final Long movId) {
		final DtList<People> ret = new DtList<>(People.class);
		final FilterCriteria<RolePeople> rolePeopleCriteria = new FilterCriteriaBuilder<RolePeople>()
				.addFilter(RolePeopleFields.MOV_ID.name(), movId)
				.addFilter(RolePeopleFields.RLM_CD.name(), CodeRoleMovie.DIRECTOR.dbValue()).build();
		final DtList<RolePeople> rolePeopleList = rolePeopleDAO.getList(rolePeopleCriteria, Integer.MAX_VALUE);
		for (final RolePeople rolePeople : rolePeopleList) {
			ret.add(rolePeople.getPeople());
		}
		return ret;
	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public MovieView getMovieDetails(final Long movId) {
		final MovieView movieView = moviePAO.getMovieViewForMovieDetailsByMovId(movId);
		movieView.setActors(getActors(movId));
		movieView.setProducers(getProducers(movId));
		movieView.setDirectors(getDirectors(movId));
		return movieView;
	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	public DtList<MovieCasting> getMovieCastings(final long movId) {
		return moviePAO.getCastingByMovId(movId);
	}
}
