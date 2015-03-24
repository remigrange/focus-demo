var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    getPeopleViewById: function getPeopleViewById(id){
        return fetch(URL.people.peopleView({urlData: {id: id}}));
    },
    getPeopleFilmographyById: function getPeopleFilmographyById(id){
        return fetch(URL.people.movies({urlData: {id: id}}));
    }
};