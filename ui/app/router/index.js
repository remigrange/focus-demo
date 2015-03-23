//Dependencies.
var Router = Backbone.Router;
var render = focus.application.render;

//var AlertModule = require('../component/alert');
//render(AlertModule, '#notification-center');


var AppRouter = Router.extend({
  routes: {
    '': 'home',
    'filterResult': 'filterResult',
    'searchResult': 'searchResult',
    'movie/:id': 'movie',
    'people/:id': 'people'
  },
  home: function handleHomeRoute() {
    console.log('ROUTE: HOME');
    //Require the applications modules
  },
  movie: function handleMovieRoute(id) {
    console.log('ROUTE: MOVIE');
    //Require the applications modules
    var MovieDetailView = require('../views/movie');
    render(MovieDetailView, '#page', {props: {id: id}});
  },
  people: function handlePeopleRoute(id) {
    console.log('ROUTE: PEOPLE');
    //Require the applications modules
    var PeopleDetailView = require('../views/people');
    render(PeopleDetailView, '#page', {props: {id: id}});
  },
  filterResult: function handleFilterResult() {
    console.log('ROUTE: FILTER RESULT');
    //Require the applications modules
    var FilterResultView = require('../views/filter-result');
    //React.render(<TestView test="Test Rodolphe ROUTE"/>, document.querySelector('#page'));
    render(FilterResultView, '#page');
  },
  searchResult: function handleSearchResult() {
    console.log('ROUTE: SEARCH RESULT');
    //Require the applications modules
    var SearchResultView = require('../views/search-result');
    //React.render(<TestView test="Test Rodolphe ROUTE"/>, document.querySelector('#page'));
    render(SearchResultView, '#page');
  }
});
module.exports = new AppRouter();
