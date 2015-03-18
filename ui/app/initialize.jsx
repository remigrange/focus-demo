/* global focus*/
console.log(focus);
console.log(focusComponents);
focus.components = focusComponents;
//Require dependencies.
require('./initializer');
require("router");
Backbone.history.start();
//focus.application.render(Hello, '#page', {props: {name: "rodolphe ....."}});
