var AppDispatcher = focus.dispatcher;
var movieServices = require('../../services').movie;
module.exports = {
    load: function(id){
        movieServices.getMovieViewById(id).then(
            function(data){
              AppDispatcher.handleServerAction({
                    data: {movie: data},
                    type: "update"
                });
            }
        );
    },

    loadCastings: function(id){
        movieServices.getMovieCastingsById(id).then(
            function(data){
              AppDispatcher.handleServerAction({
                    data: {castings: {castings: data}},
                    type: "update"
                });
            }
        );
    },

    loadProducers: function(id){
      movieServices.getMovieProducersById(id).then(
        function(data){
          AppDispatcher.handleServerAction({
            data: {producers: {producers: data}},
            type: "update"
          });
        }
      );
    },

    loadDirectors: function(id){
      movieServices.getMovieDirectorsById(id).then(
        function(data){
          AppDispatcher.handleServerAction({
            data: {directors: {directors: data}},
            type: "update"
          });
        }
      );
    }
};
