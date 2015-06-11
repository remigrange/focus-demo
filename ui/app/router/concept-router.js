/*global Focus */
//Dependencies.
let Router = Focus.router;

//Creates the router for the application's key concepts.
let ConceptRouter = Router.extend({
    log: true,
    beforeRoute(){
      Focus.application.changeRoute('detail');
    },
    routes: {
      'movie/:id(/:anchor)': 'movie',
      'people/:id(/:anchor)': 'people'
    },
    movie(id, anchor) {
      let MovieDetailView = require('../views/movie');
      this._pageContent(MovieDetailView, {
        props: {id: id, anchor: anchor}
      });
    },
    people(id) {
      let PeopleDetailView = require('../views/people');
      this._pageContent(PeopleDetailView, {props: {id: id}});
    }
});

module.exports = new ConceptRouter();
