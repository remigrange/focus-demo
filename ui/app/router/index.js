/*global Backbone, focus, Focus.components */
//Dependencies.
//let Router = Focus.router; // We don't use it since it bugs, double extension might be the problem
let Router = Backbone.Router;
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
        Focus.application.changeRoute('home');
        console.log('ROUTE: HOME');
        let HomeView = require('../views/home');
        this._pageContent(HomeView, {props: {position: 'left', open: true, style: {className: 'home-popin'}}});
    },
    movie(id) {
        Focus.application.changeRoute('detail');
        console.log('ROUTE: MOVIE');
        let MovieDetailView = require('../views/movie');
        this._pageContent(MovieDetailView, {props: {id: id}});
    },
    people(id) {
        Focus.application.changeRoute('detail');
        console.log('ROUTE: PEOPLE');
        let PeopleDetailView = require('../views/people');
        this._pageContent(PeopleDetailView, {props: {id: id}});
    },
    advancedSearch(scope, query) {
        Focus.application.changeRoute('search')
        console.log('ROUTE: FILTER RESULT');
        scope = scope || 'MOVIE';
        query = query || '';
        let AdvancedSearchView = require('../views/search/advanced-search');
        this._pageContent(AdvancedSearchView, {props: {scope: scope, query: query}});
    },
    _pageContent(component, options){
        return render(component, '[data-focus="page-content"]', options);
    }
});

module.exports = new AppRouter();
