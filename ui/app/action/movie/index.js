var movieServices = require('../../services').movie;
var actionBuilder = Focus.application.actionBuilder;
module.exports = {
    action: {
        group: 'Group by',
        ungroup: 'Ungroup'
    },
    movie: {
        load: actionBuilder({
            service: movieServices.getMovieViewById,
            node: 'movie',
            status: 'loaded'
        }),
        save: actionBuilder({
            service: movieServices.updateMovie,
            node: 'movie',
            status: 'saved'
        })
    },
    castings: {
        load: actionBuilder({
            service: movieServices.getMovieCastingsById,
            node: 'castings',
            status: 'loaded'
        })
    },
    producers: {
        load: actionBuilder({
            service: movieServices.getMovieProducersById,
            node: 'producers',
            status: 'loaded'
        })
    },
    directors: {
        load: actionBuilder({
            service: movieServices.getMovieDirectorsById,
            node: 'directors',
            status: 'loaded'
        })
    }
};
