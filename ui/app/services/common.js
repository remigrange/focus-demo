var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    searchByScope: function searchByScope(criteria){
        return fetch(URL.common.searchByScope({data:criteria}));
    }
};