var AppDispatcher = focus.dispatcher;
var peopleServices = require('../../services').movie;
module.exports = {
    load: function(id){
        peopleServices.getPeopleViewById(id).then(
            function(data){
              AppDispatcher.handleServerAction({
                    data: {people: data},
                    type: 'update'
                });
            }
        );
    },

    loadFilmography: function(id){
        peopleServices.getPeopleFilmographyById(id).then(
            function(data){
              AppDispatcher.handleServerAction({
                    data: {filmography: {filmography: data}},
                    type: 'update'
                });
            }
        );
    }
};
