package roldophe.demo.people;

import io.vertigo.dynamo.domain.model.DtList;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Test;

import rodolphe.demo.dao.people.RolePeopleDAO;
import rodolphe.demo.domain.masterdata.CodeRoleMovie;
import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.people.People;
import rodolphe.demo.domain.people.RolePeople;
import rodolphe.demo.services.movie.MovieServices;
import rodolphe.demo.services.people.PeopleServices;
import roldophe.demo.movie.SearchMovieTest;
import roldophe.demo.tools.AbstractRodolpheTestCase;

public class PeopleTest extends AbstractRodolpheTestCase {

	@Inject
	private MovieServices movieServices;
	@Inject
	private PeopleServices peopleServices;
	@Inject
	private RolePeopleDAO rolePeopleDAO;

	@Test
	public void testGetPeople() {
		final People peo = getNewPeople();
		final People ret = peopleServices.getPeople(peo.getPeoId());
		Assert.assertEquals(peo.getPeoId(), ret.getPeoId());
	}

	@Test
	public void testsavePeople() {
		getNewPeople();
	}

	@Test
	public void testGetMovie() {
		final People peo = getNewPeople();
		final Movie mov = getNewMovie();
		final RolePeople rolePeople = new RolePeople();
		rolePeople.setMovId(mov.getMovId());
		rolePeople.setPeoId(peo.getPeoId());
		rolePeople.setRlmCd(CodeRoleMovie.actor.name());
		rolePeopleDAO.create(rolePeople);
		final DtList<Movie> movies = peopleServices.getMoviesByPeo(peo.getPeoId());
		Assert.assertEquals(1, movies.size());
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
