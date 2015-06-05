var URL = require('../../config/server');
var fetch = Focus.network.fetch;

module.exports = {
    getMovieById(id) {
        return fetch(URL.movie.get({urlData: {id: id}}))
    },
    getMovieViewById(id) {
        return fetch(URL.movie.movieView({urlData: {id: id}})).then((data) => {
            return new Promise((success) => {
                let xmlhttp = new XMLHttpRequest();
                let url = URL.movie.poster({urlData: {title: data.title}});
                xmlhttp.onload  = () => {
                    if (xmlhttp.status == 200) {
                        let poster = JSON.parse(xmlhttp.response).Poster;
                        if (poster != 'N/A') {
                            data.poster = poster;
                        }
                        success(data);
                    }
                };
                xmlhttp.open(url.method, url.url, true);
                xmlhttp.send();
            });
        });
    },
    getMovieCastingsById(id) {
        return fetch(URL.movie.castings({urlData: {id: id}}));
    },

    getMovieProducersById(id) {
        return fetch(URL.movie.producers({urlData: {id: id}}));
    },

    getMovieDirectorsById(id) {
        return fetch(URL.movie.directors({urlData: {id: id}}));
    },

    updateMovie(jsonMovie) {
        return fetch(URL.movie.update({urlData: {id: jsonMovie.movId}, data: jsonMovie}));
    }
};
