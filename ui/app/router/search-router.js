/*global Focus */
//Dependencies.
let Router = Focus.router;
let resetScroll = require('./reset-scroll');

let SearchRouter = Router.extend({
    log: true,
    beforeRoute(){
      Focus.application.changeRoute('search');
    },
    routes: {
        'search/advanced': 'advancedSearch'
    },
    advancedSearch() {
        let AdvancedSearchView = require('../views/search/advanced-search');
        resetScroll();
        this._pageContent(AdvancedSearchView, {});
    }
});

module.exports = new SearchRouter();
