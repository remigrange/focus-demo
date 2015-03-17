//Dependencies.
var Router = Backbone.Router;
var render = focus.application.render;
console.log('test ');

//var AlertModule = require('../component/alert');
//render(AlertModule, '#notification-center');


var AppRouter = Router.extend({
  routes: {
    '': 'home',
    'filterResult': 'filterResult',
    'searchResult': 'searchResult'
  },
  home: function handleHomeRoute(){
      console.log('ROUTE: HOME');
    //Require the applications modules
      var MovieDetailView = require('../views/movie');
      render(MovieDetailView, '#page', {props: {id: "5"}});
  },
  filterResult: function handleFilterResult(){
      console.log('ROUTE: FILTER RESULT');
      //Require the applications modules
       var FilterResultView  = require('../views/filter-result');
      //React.render(<TestView test="Test Rodolphe ROUTE"/>, document.querySelector('#page'));
      render(FilterResultView, '#page');
  },
  searchResult: function handleSearchResult(){
      console.log('ROUTE: SEARCH RESULT');
      //Require the applications modules
      var SearchResultView  = require('../views/search-result');
      //React.render(<TestView test="Test Rodolphe ROUTE"/>, document.querySelector('#page'));
      render(SearchResultView, '#page');
    }
});
module.exports = new AppRouter();
