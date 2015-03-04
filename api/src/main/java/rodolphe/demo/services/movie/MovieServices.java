package rodolphe.demo.services.movie;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.lang.Component;
import rodolphe.demo.domain.movies.SearchRet;

/**
 * Services about Movie.
 * @author JDALMEIDA
 *
 */
public interface MovieServices  extends Component {

	/**
	 * Search movies
	 * @param searchText search criteria
	 * @return search result.
	 */
	DtList<SearchRet> getMovies(String searchText);

}
