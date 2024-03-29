package roldophe.demo.movie;

import io.vertigo.dynamo.domain.model.DtList;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Test;

import rodolphe.demo.dao.people.CastingDAO;
import rodolphe.demo.dao.people.RolePeopleDAO;
import rodolphe.demo.domain.masterdata.CodeRoleMovie;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.people.Casting;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.RolePeople;
import rodolphe.demo.services.movie.ExploitationServices;
import rodolphe.demo.services.movie.MovieServices;
import rodolphe.demo.services.people.PeopleServices;
import roldophe.demo.people.SearchPeopleTest;
import roldophe.demo.tools.AbstractRodolpheTestCase;

/**
 * Tests some movies related services.
 *
 * @author jmforhan
 */
public class MovieTest extends AbstractRodolpheTestCase {

    @Inject
    private MovieServices movieServices;
    @Inject
    private PeopleServices peopleServices;
    @Inject
    private RolePeopleDAO rolePeopleDAO;
    @Inject
    private CastingDAO castingDAO;
    @Inject
    private ExploitationServices exploitationServices;

    /**
     * Get a specific movie.
     */
    @Test
    public void testGetMovie() {
        final Movie mov = getNewMovie();
        final Movie ret = movieServices.getMovie(mov.getMovId());
        Assert.assertEquals(mov.getMovId(), ret.getMovId());
    }

    /**
     * Save a movie.
     */
    @Test
    public void testSaveMovie() {
        getNewMovie();
    }

    /**
     * Get actors of a movie.
     */
    @Test
    public void testGetActors() {
        final Movie mov = getNewMovie();
        final People peo = getNewPeople();
        final Casting cast = new Casting();
        cast.setMovId(mov.getMovId());
        cast.setPeoId(peo.getPeoId());
        cast.setRlmCd(CodeRoleMovie.ACTOR.dbValue());
        castingDAO.create(cast);
        final DtList<People> actors = movieServices.getActors(mov.getMovId());
        Assert.assertEquals(1, actors.size());
    }

    /**
     * Get director of a movie.
     */
    @Test
    public void testGetDirector() {
        final Movie mov = getNewMovie();
        final People peo = getNewPeople();
        final RolePeople rolePeople = new RolePeople();
        rolePeople.setMovId(mov.getMovId());
        rolePeople.setPeoId(peo.getPeoId());
        rolePeople.setRlmCd(CodeRoleMovie.DIRECTOR.dbValue());
        rolePeopleDAO.create(rolePeople);
        final DtList<People> directors = movieServices.getDirectors(mov.getMovId());
        Assert.assertEquals(1, directors.size());
    }

    /**
     * Get producer of a movie.
     */
    @Test
    public void testGetProducer() {
        final Movie mov = getNewMovie();
        final People peo = getNewPeople();
        final RolePeople rolePeople = new RolePeople();
        rolePeople.setMovId(mov.getMovId());
        rolePeople.setPeoId(peo.getPeoId());
        rolePeople.setRlmCd(CodeRoleMovie.PRODUCER.dbValue());
        rolePeopleDAO.create(rolePeople);
        final DtList<People> producers = movieServices.getProducers(mov.getMovId());
        Assert.assertEquals(1, producers.size());
    }

    private Movie getNewMovie() {
        final Movie mov = SearchMovieTest.getNewMovie();
        movieServices.saveMovie(mov);
        return mov;
    }

    private People getNewPeople() {
        final People peo = SearchPeopleTest.getNewPeople();
        peopleServices.savePeople(peo);
        return peo;
    }
}
