var AppDispatcher =  focus.dispatcher;
var movieServices = require('../../services').movie;
module.exports = {
    load: function(id){
        movieServices.getMovieViewById(id).then(
            function(data){
                focus.dispatcher.handleServerAction({
                    data: {movie: data},
                    type: "update"
                });
            }
        );
    }
};
