let URL = require('../../config/server');
let fetch = Focus.network.fetch;

module.exports = {
    unscopedSearch(ajaxConfig) {
        return fetch(URL.search.searchByScope(ajaxConfig));
    },
    scopedSearch(ajaxConfig) {
        return fetch(URL.search.searchByScope(ajaxConfig));
    }
};
