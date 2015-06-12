/**
 * Store dealing with the movie subject.
 * @type {focus}
 */
let movieStore = new Focus.store.CoreStore({
    definition : {
        'movie': 'movie',
        'castings': 'movieCasting',
        'producers': 'people',
        'directors': 'people',
        'movieRecords': 'movieRecords'
    }
  });

module.exports = movieStore;
