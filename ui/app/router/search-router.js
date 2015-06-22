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
        'search/advanced/scope/:scope(/query/:query)': 'advancedSearch'
    },
    advancedSearch(scope, query) {
        scope = scope || 'MOVIE';
        query = query || '';
        let AdvancedSearchView = require('../views/search/advanced-search');
        resetScroll();
        this._pageContent(AdvancedSearchView, {
            props: {scope, query}
        });
    }
});

module.exports = new SearchRouter();
