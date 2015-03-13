//Dependencies.
var Router = Backbone.Router;
var render = focus.application.render;


//var AlertModule = require('../component/alert');
//render(AlertModule, '#notification-center');


var AppRouter = Router.extend({
  routes: {
    '': 'home',
    'search': 'search'
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
    search: function handleSearch(){
      console.log('ROUTE: SEARCH');
      //Require the applications modules
       var SearchView  = require('../views/search');
      //React.render(<TestView test="Test Rodolphe ROUTE"/>, document.querySelector('#page'));
      render(SearchView, '#page');
    }
});
module.exports = new AppRouter();
