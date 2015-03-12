Règles de nommage:
- Classe de webservices
- @pathPrefix : à poser sur toutes les classes
```java
@PathPrefix('/movies')
final public class WsMovie implements RestfulService {

	@Inject
	MovieServices movieServices;

	/**
	 * Search movies
	 *
	 * @param movieCriteria
	 *            search criteria
	 * @return search result.
	 */
	@POST()
	@AnonymousAccessAllowed
	public FacetedQueryResult<MovieResult, SearchCriterium<MovieCriteria>> getMovies(
			final MovieCriteria movieCriteria) {
		return movieServices.getMoviesByCriteria(movieCriteria);
	}

	/**
	 * Get movie by id.
	 * @param movId movie id.
	 * @return movie.
	 */
	@GET("/{id}")
	@AnonymousAccessAllowed
	public Movie getMovie(@PathParam("id") final long movId){
		return movieServices.getMovie(movId);
	}

	@POST("/new")
	@AnonymousAccessAllowed
	public Movie saveMovie(final Movie movie){
		return movieServices.saveMovie(movie);
	}

	/**
	 * Get movie's actors.
	 * @param movId moivie identifier
	 * @return people list
	 */
	@GET("/actors/{id}")
	@AnonymousAccessAllowed
	public DtList<People> getActors(@PathParam("id")  final Long movId) {
		return movieServices.getActors(movId);
	}


}
```
