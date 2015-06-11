package rodolphe.demo.services.movie;

import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.persistence.criteria.FilterCriteria;
import io.vertigo.dynamo.persistence.criteria.FilterCriteriaBuilder;
import io.vertigo.dynamo.transaction.Transactional;
import io.vertigo.util.StringUtil;
import io.vertigo.vega.rest.model.UiListState;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Date;

import javax.inject.Inject;

import org.apache.log4j.Logger;

import com.sleepycat.je.DatabaseConfig;

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
import rodolphe.demo.domain.movies.MovieResult;
import rodolphe.demo.domain.movies.MovieView;
import rodolphe.demo.domain.people.Casting;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.RolePeople;
import rodolphe.demo.domain.search.FacetConst;
import rodolphe.demo.domain.search.FacetedSearchConst;
import rodolphe.demo.services.search.FacetSelection;
import rodolphe.demo.services.search.SearchCriterium;
import rodolphe.demo.services.search.SearchServices;

/**
 * Implementation of Movie Services.
 *
 * @author JDALMEIDA
 */
public class MovieServicesImpl implements MovieServices {

    private static final int MAX_ROWS = 50;
    @Inject
    private MovieDAO movieDAO;
    @Inject
    private SearchServices searchServices;
    @Inject
    private CastingDAO castingDAO;
    @Inject
    private RolePeopleDAO rolePeopleDAO;
    @Inject
    private MoviesPAO moviePao;
    private final Logger logger = Logger.getLogger("*****************updateMovieTableData***************");

    /** {@inheritDoc} */
    @Override
    @Transactional
    public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMoviesByCriteria(
            final MovieCriteria crit, final UiListState uiListState, final String clusteringFacetName,
            final FacetSelection... selection) {
        final SearchCriterium<MovieCriteria> criteria = new SearchCriterium<>(
                FacetedSearchConst.QRY_MOVIE_WITH_FCT.getQuery());
        criteria.setCriteria(crit);
        for (final FacetSelection sel : selection) {
            criteria.addFacet(sel.getFacetName(), sel.getFacetValueKey(), sel.getFacetQuery());
        }
        // -----
        final String sortFieldName;
        final boolean isSortDesc;
        if (!StringUtil.isEmpty(uiListState.getSortFieldName())) {
            sortFieldName = uiListState.getSortFieldName();
            isSortDesc = uiListState.isSortDesc();
        } else {
            sortFieldName = null;
            isSortDesc = false;
        }
        // -----
        final int skipRows;
        if (uiListState.getSkip() > 0) {
            skipRows = (uiListState.getSkip() - 1) * MAX_ROWS;
        } else {
            skipRows = 0;
        }
        // -----
        final DtListState listState = new DtListState(MAX_ROWS, skipRows, sortFieldName, isSortDesc);
        final FacetConst facetConst = FacetConst.getFacetByName(clusteringFacetName);
        if (facetConst != null) {
            criteria.setClusteringFacetName(facetConst.name());
        }
        return searchServices.searchMovie(criteria, listState);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public Movie getMovie(final Long movId) {
        return movieDAO.get(movId);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public Movie saveMovie(final Movie movie) {
        movieDAO.save(movie);
        searchServices.indexMovie(movie.getMovId());
        return movie;
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public DtList<People> getActors(final Long movId) {
        final DtList<People> ret = new DtList<>(People.class);
        final FilterCriteria<Casting> castingCriteria = new FilterCriteriaBuilder<Casting>()
                .withFilter(CastingFields.MOV_ID.name(), movId)
                .withFilter(CastingFields.RLM_CD.name(), CodeRoleMovie.ACTOR.dbValue()).build();
        final DtList<Casting> castingList = castingDAO.getList(castingCriteria, Integer.MAX_VALUE);
        for (final Casting casting : castingList) {
            ret.add(casting.getPeople());
        }
        return ret;
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public DtList<People> getProducers(final Long movId) {
        final DtList<People> ret = new DtList<>(People.class);
        final FilterCriteria<RolePeople> rolePeopleCriteria = new FilterCriteriaBuilder<RolePeople>()
                .withFilter(RolePeopleFields.MOV_ID.name(), movId)
                .withFilter(RolePeopleFields.RLM_CD.name(), CodeRoleMovie.PRODUCER.dbValue()).build();
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
                .withFilter(RolePeopleFields.MOV_ID.name(), movId)
                .withFilter(RolePeopleFields.RLM_CD.name(), CodeRoleMovie.DIRECTOR.dbValue()).build();
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
        final MovieView movieView = moviePao.getMovieViewForMovieDetailsByMovId(movId);
        movieView.setActors(getActors(movId));
        movieView.setProducers(getProducers(movId));
        movieView.setDirectors(getDirectors(movId));
        return movieView;
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public DtList<MovieCasting> getMovieCastings(final long movId) {
        return moviePao.getCastingByMovId(movId);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public int cleanMovieTitle(final int minRank, final int maxRows) {
        Long maxRank = -1L;
        final DtList<MovieView> movieViews = moviePao.getMovieView(minRank, maxRows);
        final DtList<Movie> movies = new DtList<>(Movie.class);
        for (final MovieView movieView : movieViews) {
            // Pour ne pas remttre à jour les donnes deja mise à jour.
            if (StringUtil.isEmpty(movieView.getMetadasJson())) {
                movies.add(CleanMovieData.parseMovieTitle(movieView));
            }
            if (maxRank < movieView.getRank()) {
                maxRank = movieView.getRank();
            }
        }
        moviePao.updateMoviesTitles(movies);
        return maxRank.intValue();
    }

    /** {@inheritDoc} */
    @Override
    @Transactional
    public void updateMovieTableData() {
        try (final BufferedReader br = new BufferedReader(new FileReader("D:\\omdbData\\dump.txt"))) {
            String line = null;
            final String typeText = "\"Type\":";
            final String titleText = "\"Title\":";
            final String ratedText = "\"Rated\":";
            final String plotText = "\"Plot\":";
            final String imdbIDText = "\"imdbID\"";
            final String releasedText = "\"Released\"";
            final String yearText = "\"Year\"";
            final String posterText = "\"Poster\"";
            int lineNum = 0;
            while ((line = br.readLine()) != null) {
                ++lineNum;
                if (!StringUtil.isEmpty(line)) {
                    final String title = getAttributeFromString(line, titleText);
                    final String type = getAttributeFromString(line, typeText);
                    final String rated = getAttributeFromString(line, ratedText);
                    final String plot = getAttributeFromString(line, plotText);
                    final String imdbID = getAttributeFromString(line, imdbIDText);
                    final String released = getAttributeFromString(line, releasedText);
                    final String year = getAttributeFromString(line, yearText);
                    final String poster = getAttributeFromString(line, posterText);
                    final final dateReleasead = new Date(released);
                    logger.debug("line number = " + lineNum + " splliit line :  Title=" + title + "--------imdbID="
                            + imdbID + "--------Type=" + type + "-------Rated=" + rated + "------released=" + released
                            + "-------year=" + year + "-------poster=" + poster + "------plot=" + plot);
                }
            }
        } catch (final IOException e) {
            logger.debug(e.getMessage());
        }
    }

    /**
     * Get attribute from String.
     *
     * @param line
     */
    private static String getAttributeFromString(final String line, final String valueToSearch) {
        if (!StringUtil.isEmpty(line)) {
            final int index = line.indexOf(valueToSearch);
            if (index < 0) {
                return null;
            }
            String temp = line.substring(index);
            final int firstCommaIndex = temp.indexOf(",");
            if (firstCommaIndex < 0) {
                return null;
            }
            final int indexSeparator = temp.indexOf(":");
            if (indexSeparator < 0) {
                return null;
            }
            temp = temp.substring(0, firstCommaIndex);
            String ret = temp.substring(indexSeparator + 1);
            ret.replaceAll("\"", "");
            if (ret.equalsIgnoreCase("N/A")) {
                ret = null;
            }
            return ret;
        }
        return null;
    }
}
