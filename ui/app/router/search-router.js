/*global Focus */
//Dependencies.
let Router = Focus.router;

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
        this._pageContent(AdvancedSearchView, {
            props: {scope, query}
        });
    }
});

module.exports = new SearchRouter();
