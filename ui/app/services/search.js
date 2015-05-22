var URL = require('../../config/server');
var fetch = Focus.network.fetch;
module.exports = {
    searchByScope: function searchByScope(criteria){
        return fetch(URL.search.searchByScope({urlData: criteria.pageInfos, data: criteria}));
    }
};
