var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    getMovieById: function getMovieById(id){
        return fetch(URL.movie.get({urlData:{id: id}}));
    },
    getMovieViewById: function getMovieViewById(id){
        return fetch(URL.movie.movieView({urlData:{id: id}}));
    }
};