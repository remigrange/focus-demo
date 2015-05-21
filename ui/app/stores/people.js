/* global focus*/
/**
 * Store dealing with the movie subject.
 * @type {focus}
 */
var peopleStore = new Focus.store.CoreStore({
    definition : {
        'people': 'people',
        'filmography': 'filmography'
    }
  });
module.exports = peopleStore;
