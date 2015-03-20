/*global Backbone*/
console.log('Application demo rodoplphe');
focus.components = focusComponents;
////Require dependencies.
require('./initializer');
//Start the application.
require('./router');
Backbone.history.start();
//Render all application modules for the first time.
//React.render(<AlertModule />, document.querySelector('#notification-center'));
