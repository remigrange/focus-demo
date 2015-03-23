/**
 *
 */
package rodolphe.demo.services.movie;

import io.vertigo.util.StringUtil;

import org.apache.log4j.Logger;

import rodolphe.demo.domain.movies.Movie;
import rodolphe.demo.domain.movies.MovieView;

/**
 * Helper for cleaning movie data.
 *
 * @author JDALMEIDA
 */
public final class CleanMovieData {

	private CleanMovieData() {
		super();
	}

	/**
	 * Fill a movie with a correct title.
	 *
	 * @param movieView movie from database
	 * @return corrected movie
	 */
	public static Movie parseMovieTitle(final MovieView movieView) {
		final Movie movie = new Movie();
		movie.setMovId(movieView.getMovId());
		movie.setDescription(movieView.getDescription());
		movie.setImdbid(movieView.getImdbid());
		movie.setReleased(movieView.getReleased());
		movie.setRuntime(movieView.getRuntime());
		// Set the title
		final String tempTitle = movieView.getTitle();
		final String parsedTitle = parseTitle(tempTitle);
		if (StringUtil.isEmpty(parsedTitle)) {
			movie.setTitle(tempTitle);
			movie.setMetadasJson(movieView.getMetadasJson());
		} else {
			movie.setTitle(parsedTitle);
			// save the old title in metadataJSON
			movie.setMetadasJson(tempTitle);
		}
		// set the year
		final Integer year = parseYear(tempTitle);
		if (year != null) {
			movie.setYear(year);
		} else {
			movie.setYear(movieView.getYear());
		}
		return movie;
	}

	private static String parseTitle(final String title) {
		if (!StringUtil.isEmpty(title)) {
			final int firstOccurrence = title.indexOf("\"");
			final int lastOccurrence = title.lastIndexOf("\"");
			if (firstOccurrence >= 0 && lastOccurrence >= 0 && lastOccurrence != firstOccurrence) {
				return title.substring(firstOccurrence + 1, lastOccurrence);
			}
		}
		return null;
	}

	private static Integer parseYear(final String title) {
		if (!StringUtil.isEmpty(title)) {
			final int firstOccurrence = title.indexOf("(");
			int lastOccurrence = -1;
			if (firstOccurrence >= 0) {
				final String titleTemp = title.substring(firstOccurrence);
				lastOccurrence = titleTemp.indexOf(")");
			}
			if (lastOccurrence >= 0 && lastOccurrence > firstOccurrence) {
				try {
					return Integer.valueOf(title.substring(firstOccurrence + 1, lastOccurrence));
				} catch (final NumberFormatException e) {
					Logger.getLogger(CleanMovieData.class).debug(e);
				}
			}
		}
		return null;
	}
}
