var AppDispatcher =  focus.dispatcher;
//var fetch = require('../../core/fetch');
//var URL = require('../../config/server');

var data = [{id:1, title : "toto", body:"ceci est un test"},{id:2, title:"tata",body:"deuxieme test"}]
var countId = 3;
module.exports = {
    searchByScope: function search(criteria){
        var url = "./searchByScope";
         //Promisify.model(url, {}).fetch();
       // Promisify.collection(url).search({criteria: criteria, pagesInfos: pagesInfos});
        //AppDispatcher.handleServerAction()
        return fetch.model(url, {}).fetch();
    }
};
