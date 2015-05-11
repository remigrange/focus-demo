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
                    data: {castings: data},
                    type: "update"
                });
            }
        );
    },

    loadProducers: function(id){
      movieServices.getMovieProducersById(id).then(
        function(data){
          AppDispatcher.handleServerAction({
            data: {producers: data},
            type: "update"
          });
        }
      );
    },

    loadDirectors: function(id){
      movieServices.getMovieDirectorsById(id).then(
        function(data){
          AppDispatcher.handleServerAction({
            data: {directors: data},
            type: "update"
          });
        }
      );
    },
    save: function saveMovie(jsonMovie){
      jsonMovie.movId = jsonMovie.movId || 1;
      return movieServices.updateMovie(jsonMovie).then(
        function(data){
          AppDispatcher.handleServerAction({
            data: {movie: data},
            type: "update"
          });
        }
      );
    }
};
