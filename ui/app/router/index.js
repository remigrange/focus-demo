/*global Backbone, focus, Focus.components */
//Dependencies.
var Router = Focus.router;
var render = Focus.application.render;

//var AlertModule = require('../component/alert');
//render(AlertModule, '#notification-center');

var LeftMenuView = require('../views/menu/leftMenu');

var renderMenu = function(){
  var PageHeader = require('../views/menu/appHeader');
  render(PageHeader, '#header');
  render(LeftMenuView, '#leftMenu');
};

var AppRouter = Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'search/advanced/scope/:scope/query/:query': 'filterResult',
    'search/quick': 'searchResult',
    'movie/:id': 'movie',
    'people/:id': 'people'
  },
  home: function handleHomeRoute() {
    console.log('ROUTE: HOME');
    var HomeView = require('../views/home');
    this._pageContent(HomeView, {props: {position: 'left', open: true, style: {className: 'home-popin'}}});
  },
  movie: function handleMovieRoute(id) {
    console.log('ROUTE: MOVIE');
    var MovieDetailView = require('../views/movie');
    this._pageContent(MovieDetailView, {props: {id: id}});
  },
  people: function handlePeopleRoute(id) {
    console.log('ROUTE: PEOPLE');
    var PeopleDetailView = require('../views/people');
   // renderMenu();
    this._pageContent(PeopleDetailView, {props: {id: id}});
  },
  filterResult: function handleFilterResult(scope, query) {
    console.log('ROUTE: FILTER RESULT');
    if(!scope){
      //set defaut to MOVIE
      scope = 'MOVIE';
    }
    if(!query){
      //set defaut to empty
      query = '';
    }
    var FilterResultView = require('../views/filter-result');
    //renderMenu();
    this._pageContent(FilterResultView, {props: {scope: scope, query: query}});
  },

  searchResult: function handleSearchResult() {
    console.log('ROUTE: SEARCH RESULT');
    var SearchResultView = require('../views/search-result');
   // renderMenu();
    this._pageContent(SearchResultView, {props: {position: 'left', open: true, displaySelector: 'a[href="#search/quick"]', style: {className: 'quick-search-popin'}}});
  }
});
module.exports = new AppRouter();
