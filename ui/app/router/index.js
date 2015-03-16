//Dependencies.
var Router = Backbone.Router;
var render = focus.application.render;


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
    /*var UserDetailView = require('../view/user');
    //React.render(<UserDetailView userId="12344"/>, document.querySelector('#page'));
     render(UserDetailView, '#page', {
       props:{userId: "6c4a5d96-dc8a-461d-8b23-d9b5ed2f4883"}
     });*/
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
