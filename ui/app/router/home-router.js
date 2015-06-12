/*global Backbone, Focus, Focus.components */
//Dependencies.
let Router = Focus.router;
let HomeRouter = Router.extend({
    log: true,
    beforeRoute(){
      Focus.application.changeRoute('search');
    },
    routes: {
      '': 'home',
      'home': 'home'
    },
    home() {
        //Focus.application.changeRoute('home');
        console.log('ROUTE: HOME');
        let HomeView = require('../views/home');
        this._pageContent(HomeView, {props: {position: 'left', open: true, style: {className: 'home-popin'}}});
    }
});

module.exports = new HomeRouter();
