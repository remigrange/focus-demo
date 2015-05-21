/*global Backbone*/

console.log('Application demo rodoplphe');
Focus.components = FocusComponents;
////Require dependencies.
require('./initializer');
//Start the application.
require('./router');
Backbone.history.start();

//render menu modules
var render = Focus.application.render;
var LeftMenuView = require('../views/menu/leftMenu');
var PageHeader = require('../views/menu/appHeader');
render(PageHeader, '#header');
render(LeftMenuView, '#leftMenu');

//Render all application modules for the first time.
//React.render(<AlertModule />, document.querySelector('#notification-center'));
