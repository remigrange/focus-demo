module.exports = {
    scopes: [
        {
            code: 'MOVIES',
            label: 'Films',
            active: true
        },
        {
            code: 'PEOPLE',
            label: 'Personnes',
            active: true
        }
    ],
    movies: [
        {
            'movId': 985154,
            'title': 'Le groupe',
            'released': '2001-09-12T00:00:00.000Z',
            'year': 2001,
            'metadasJson': '\'Le groupe\' (2001) {Conspiration (#1.12)}'
        }
        // TODO : fill in more data
    ],
    movieDetails: [
        {
            'movId': 985154,
            'title': 'Le groupe',
            'released': '2001-09-12T00:00:00.000Z',
            'genreIds': 'Comedy|Drama|Romance',
            'countryIds': 'France',
            'languageIds': 'French'
        }
        // TODO : fill in more data
    ]
};