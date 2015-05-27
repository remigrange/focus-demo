/*global Backbone*/

console.log('Application demo rodoplphe');
Focus.components = FocusComponents;
////Require dependencies.
require('./initializer');

//render menu modules
var render = Focus.application.render;
var LeftMenuView = require('../views/menu/leftMenu');
var PageHeader = require('../views/menu/appHeader');
//render(PageHeader, '#header');
var Header = require('../views/header');
render(Header, '#header');
render(LeftMenuView, '#leftMenu');

//Start the application.
require('./router');
Backbone.history.start();


//Render all application modules for the first time.
//React.render(<AlertModule />, document.querySelector('#notification-center'));
