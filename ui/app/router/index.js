/*global Backbone, focus, focusComponents */
//Dependencies.
var Router = Backbone.Router;
var render = focus.application.render;

//var AlertModule = require('../component/alert');
//render(AlertModule, '#notification-center');

var TopMenuView = require('../views/menu/topMenu');
var LeftMenuView = require('../views/menu/leftMenu');

var renderMenu = function(){
  render(TopMenuView, '#header',
    {props: {position: 'top', direction: 'horizontal', title: '', reference: 'menuTop', style: {className: 'header-menu'}}});
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
    renderMenu();
    render(HomeView, '#page', {props: {position: 'left', open: true, style: {className: 'home-popin'}}});
  },
  movie: function handleMovieRoute(id) {
    console.log('ROUTE: MOVIE');
    var MovieDetailView = require('../views/movie');
    renderMenu();
    render(MovieDetailView, '#page', {props: {id: id}});
  },
  people: function handlePeopleRoute(id) {
    console.log('ROUTE: PEOPLE');
    var PeopleDetailView = require('../views/people');
    renderMenu();
    render(PeopleDetailView, '#page', {props: {id: id}});
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
    renderMenu();
    render(FilterResultView, '#page', {props: {scope: scope, query: query}});
  },

  searchResult: function handleSearchResult() {
    console.log('ROUTE: SEARCH RESULT');
    var SearchResultView = require('../views/search-result');
    renderMenu();
    render(SearchResultView, '#page', {props: {position: 'left', open: true, displaySelector: 'a[href="#search/quick"]', style: {className: 'quick-search-popin'}}});
  }
});
module.exports = new AppRouter();
