/**
 * Store dealing with the movie subject.
 * @type {focus}
 */
let peopleStore = new Focus.store.CoreStore({
    definition : {
        'people': 'people',
        'filmography': 'filmography',
        'peopleRecords': 'peopleRecords'
    }
  });

module.exports = peopleStore;
