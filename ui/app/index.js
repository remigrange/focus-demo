/*global Backbone*/

console.log('Application Focus-démo');

//Write focusComponents into Focus.components
Focus.components = FocusComponents;

(function() {
    $.material.init();
    $.material.ripples();
    //$.material.input();
    //$.material.checkbox();
    //$.material.radio();
})();

//Initialisation des configurations et du layout.
require('./initializer');

// Démarrage de l'application
require('./application');


//Render all application modules for the first time.
//React.render(<AlertModule />, document.querySelector('#notification-center'));
