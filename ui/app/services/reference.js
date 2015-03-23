var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    getScopes: function getScopes(id){
        return fetch(URL.reference.getScopes({}));
    }
};