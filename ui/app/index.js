/*global Backbone*/

console.log('Application demo rodoplphe');

//Write focusComponents into Focus.components
Focus.components = FocusComponents;

//Initialisation des configurations et du layout.
require('./initializer');

// Démarrage de l'application
require('./application');


//Render all application modules for the first time.
//React.render(<AlertModule />, document.querySelector('#notification-center'));
