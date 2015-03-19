/* global focus*/
/**
 * Store dealing with the movie subject.
 * @type {focus}
 */
var movieStore = new focus.store.CoreStore({
    definition : {
        'movie': 'movie'
    }
  });
module.exports = movieStore;
