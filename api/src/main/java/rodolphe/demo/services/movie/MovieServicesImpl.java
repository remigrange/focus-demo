package rodolphe.demo.services.movie;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.persistence.criteria.FilterCriteriaBuilder;
import io.vertigo.dynamo.transaction.Transactional;

import javax.inject.Inject;

import rodolphe.demo.dao.movies.MovieDAO;
import rodolphe.demo.dao.people.RolePeopleDAO;
import rodolphe.demo.domain.DtDefinitions.RolePeopleFields;
import rodolphe.demo.domain.masterdata.CodeRoleMovie;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieCriteria;
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.RolePeople;
import rodolphe.demo.domain.search.FacetedSearchConst;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.services.search.SearchCriterium;
import rodolphe.demo.services.search.SearchServices;

/**
 * Implementation of Movie Services.
 * @author JDALMEIDA
 *
 */
public class MovieServicesImpl implements MovieServices {

	@Inject
	private MovieDAO movieDAO;
	@Inject
	private SearchServices searchServices;
	@Inject
	private RolePeopleDAO rolePeopleDAO ;


	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#getMoviesByCriteria(rodolphe.demo.domain.movies.MovieCriteria)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMoviesByCriteria(final MovieCriteria crit, final FacetSelection ...selection) {
		/*final SearchCriterium<MovieCriteria> criteria = new SearchCriterium<>(
				FacetedSearchConst.QRY_MOVIE_WO_FCT.getQuery());*/
		final SearchCriterium<MovieCriteria> criteria = new SearchCriterium<>(
				FacetedSearchConst.QRY_MOVIE_WITH_FCT.getQuery());
		criteria.setCriteria(crit);
		for (final FacetSelection sel : selection) {
			criteria.addFacet(sel.getFacetName(), sel.getFacetValueKey(), sel.getFacetQuery());
		}
		return searchServices.searchMovie(criteria);
	}



	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#getMovie(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public Movie getMovie(final Long movId) {
		return movieDAO.get(movId);
	}


	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#saveMovie(rodolphe.demo.domain.movies.Movie)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public Movie saveMovie(final Movie mov) {
		if (mov.getMovId() == null) {
			movieDAO.create(mov);
		} else {
			movieDAO.update(mov);
		}
		searchServices.indexMovie(mov.getMovId());
		return mov;
	}


	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#getActors(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public DtList<People> getActors(final Long movId) {
		final DtList<People> ret = new DtList<>(People.class);
		final FilterCriteriaBuilder<RolePeople> builder= new FilterCriteriaBuilder<>();
		builder.withFilter(RolePeopleFields.MOV_ID.name(), movId);
		builder.withFilter(RolePeopleFields.RLM_CD.name(), CodeRoleMovie.actor.name());
		final DtList<RolePeople> rolePeopleList = rolePeopleDAO.getList(builder.build(), Integer.MAX_VALUE);
		for(final RolePeople  rolePeople : rolePeopleList){
			ret.add(rolePeople.getPeople());
		}
		return ret;
	}



	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#getProducers(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public DtList<People> getProducers(final Long movId) {
		final DtList<People> ret = new DtList<>(People.class);
		final FilterCriteriaBuilder<RolePeople> builder= new FilterCriteriaBuilder<>();
		builder.withFilter(RolePeopleFields.MOV_ID.name(), movId);
		builder.withFilter(RolePeopleFields.RLM_CD.name(), CodeRoleMovie.producer.name());
		final DtList<RolePeople> rolePeopleList = rolePeopleDAO.getList(builder.build(), Integer.MAX_VALUE);
		for(final RolePeople  rolePeople : rolePeopleList){
			ret.add(rolePeople.getPeople());

		}
		return ret;
	}



	/* (non-Javadoc)
	 * @see rodolphe.demo.services.movie.MovieServices#getDirectors(java.lang.Long)
	 */
	/** {@inheritDoc} */
	@Override
	@Transactional
	public DtList<People> getDirectors(final Long movId) {
		final DtList<People> ret = new DtList<>(People.class);
		final FilterCriteriaBuilder<RolePeople> builder= new FilterCriteriaBuilder<>();
		builder.withFilter(RolePeopleFields.MOV_ID.name(), movId);
		builder.withFilter(RolePeopleFields.RLM_CD.name(), CodeRoleMovie.director.name());
		final DtList<RolePeople> rolePeopleList = rolePeopleDAO.getList(builder.build(), Integer.MAX_VALUE);
		for(final RolePeople  rolePeople : rolePeopleList){
			ret.add(rolePeople.getPeople());

		}
		return ret;
	}

}
