var peopleServices = require('../../services').people;
var actionBuilder = Focus.application.actionBuilder;

module.exports = {
    people: {
        load: actionBuilder({
            service: peopleServices.getPeopleViewById,
            node: 'people',
            status: 'loaded'
        })
    },
    filmography: {
        load: actionBuilder({
            service: peopleServices.getPeopleFilmographyById,
            node: 'filmography',
            status: 'loaded'
        })
    }
};
