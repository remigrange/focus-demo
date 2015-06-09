let URL = require('../../config/server');
let fetch = Focus.network.fetch;

module.exports = {
    getPeopleViewById(id){
        return fetch(URL.people.peopleView({urlData: {id}}));
    },
    getPeopleFilmographyById(id){
        return fetch(URL.people.filmography({urlData: {id}}));
    }
};