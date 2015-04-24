/*global Backbone*/
console.log('Application demo rodoplphe');
focus.components = focusComponents;
////Require dependencies.
require('./initializer');
//Start the application.
require('./router');
Backbone.history.start();

//render menu modules
var render = focus.application.render;
var LeftMenuView = require('../views/menu/leftMenu');
var PageHeader = require('../views/menu/appHeader');
render(PageHeader, '#header');
render(LeftMenuView, '#leftMenu');

//Render all application modules for the first time.
//React.render(<AlertModule />, document.querySelector('#notification-center'));
