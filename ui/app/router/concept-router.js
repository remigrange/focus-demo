/*global Focus */
//Dependencies.
let Router = Focus.router;
let resetScroll = require('./reset-scroll');

//Creates the router for the application's key concepts.
let ConceptRouter = Router.extend({
    log: true,
    beforeRoute() {
        Focus.application.changeRoute('detail');
    },
    routes: {
        'movie/:id(/:anchor)': 'movie',
        'people/:id(/:anchor)': 'people'
    },
    movie(id, anchor) {
        let MovieDetailView = require('views/concept/movie');
        resetScroll();
        this._pageContent(MovieDetailView, {
            props: {id: id, anchor: anchor}
        });
    },
    people(id, anchor) {
        let PeopleDetailView = require('views/concept/people');
        resetScroll();
        this._pageContent(PeopleDetailView, {props: {id: id, anchor: anchor}});
    }
});

module.exports = new ConceptRouter();
