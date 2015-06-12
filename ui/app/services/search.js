let URL = require('../../config/server');
let fetch = Focus.network.fetch;

module.exports = {
    searchByScope(criteria){
        return fetch(URL.search.searchByScope({urlData: criteria.pageInfos, data: criteria}));
    }
};
