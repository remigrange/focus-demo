var URL = require('../../config/server');
var fetch = Focus.network.fetch;
module.exports = {
    getPeopleViewById: function getPeopleViewById(id){
        return fetch(URL.people.peopleView({urlData: {id: id}}));
    },
    getPeopleFilmographyById: function getPeopleFilmographyById(id){
        return fetch(URL.people.filmography({urlData: {id: id}}));
    }
};