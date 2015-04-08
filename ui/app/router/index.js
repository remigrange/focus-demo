/*global Backbone, focus, focusComponents */
//Dependencies.
var Router = Backbone.Router;
var render = focus.application.render;

//var AlertModule = require('../component/alert');
//render(AlertModule, '#notification-center');

var MenuView = require('../views/menu');

var renderMenu = function(){
  render(MenuView, '#header',
    {props: {position: 'top', direction: 'horizontal', title: 'Focus', reference: 'menuTop', links: [{url: '#', name: 'Home'}], style: {className: 'header-menu'}}});
  render(MenuView, '#leftMenu',
    {props: {position: 'left', direction: 'vertical', title: '', reference: 'menuLeft', links: [{url: '#search/quick', name: '', img: 'static/img/search.png'}], style: {className: 'left-menu'}}});
};

var AppRouter = Router.extend({
  routes: {
    '': 'home',
    'search/advanced/scope/:scope/query/:query': 'filterResult',
    'search/quick': 'searchResult',
    'movie/:id': 'movie',
    'people/:id': 'people'
  },
  home: function handleHomeRoute() {
    console.log('ROUTE: HOME');
    var HomeView = require('../views/home');
    renderMenu();
    render(HomeView, '#page');
  },
  movie: function handleMovieRoute(id) {
    console.log('ROUTE: MOVIE');
    var MovieDetailView = require('../views/movie');
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
    render(SearchResultView, '#page');
  }
});
module.exports = new AppRouter();
