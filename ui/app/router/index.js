/*global Backbone, focus, Focus.components */
//Dependencies.
let Router = Focus.router;
let render = Focus.application.render;


let AppRouter = Router.extend({
    routes: {
        '': 'home',
        'home': 'home',
        'search/advanced/scope/:scope/query/:query': 'advancedSearch',
        'movie/:id': 'movie',
        'people/:id': 'people'
    },
    home() {
        console.log('ROUTE: HOME');
        let HomeView = require('../views/home');
        this._pageContent(HomeView, {props: {position: 'left', open: true, style: {className: 'home-popin'}}});
    },
    movie(id) {
        console.log('ROUTE: MOVIE');
        let MovieDetailView = require('../views/movie');
        this._pageContent(MovieDetailView, {props: {id: id}});
    },
    people(id) {
        console.log('ROUTE: PEOPLE');
        let PeopleDetailView = require('../views/people');
        this._pageContent(PeopleDetailView, {props: {id: id}});
    },
    advancedSearch(scope, query) {
        console.log('ROUTE: FILTER RESULT');
        scope = scope || 'MOVIE';
        query = query || '';
        let FilterResultView = require('../views/filter-result');
        this._pageContent(FilterResultView, {props: {scope: scope, query: query}});
    }
});

module.exports = new AppRouter();
