var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    searchByScope: function searchByScope(criteria){
        //TODO CHECK AVEC PIERRE
        return fetch(URL.common.searchByScope({urlData : criteria.pageInfos, data:criteria}));
    }/*,
    filterResult: function filterResult(criteria){
        return fetch(URL.common.filterResult({data:criteria}));
    }*/
};