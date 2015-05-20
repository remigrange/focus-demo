var URL = require('../../config/server');
var fetch = Focus.network.fetch;
module.exports = {
    getScopes: function getScopes(id){
        return fetch(URL.reference.getScopes({}));
    }
};