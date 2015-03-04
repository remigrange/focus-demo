package roldophe.demo.people;

import javax.inject.Inject;

import org.junit.Test;

import rodolphe.demo.services.people.PeopleServices;
import roldophe.demo.tools.AbstractRodolpheTestCase;

public class PeopleTest extends AbstractRodolpheTestCase{

	@Inject
	private PeopleServices peopleServices;

	/**
	 * Test the getPeople method.
	 */
	@Test
	public void testGetPeople(){
		peopleServices.getPeople("ALLEN");
	}

}
