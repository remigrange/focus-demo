var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    getMovieById: function getMovieById(id){
        return fetch(URL.movie.get({urlData:{id: id}}));
    },
    getMovieViewById: function getMovieViewById(id){
        return fetch(URL.movie.movieView({urlData:{id: id}}));
    },
    getMovieCastingsById: function getMovieCastingsById(id){
        return fetch(URL.movie.castings({urlData:{id: id}}));
    },

  getMovieProducersById: function getMovieProducersById(id){
    return fetch(URL.movie.producers({urlData:{id: id}}));
  },

  getMovieDirectorsById: function getMovieDirectorsById(id){
    return fetch(URL.movie.directors({urlData:{id: id}}));
  },

  updateMovie: function updateMovie(jsonMovie) {
    return fetch(URL.movie.update({urlData:{id: jsonMovie.movId}, data: jsonMovie}));
  }
};
