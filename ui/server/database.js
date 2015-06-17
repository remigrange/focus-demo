module.exports = {
    scopes: [
        {
            code: 'MOVIE',
            label: 'Films',
            active: true
        },
        {
            code: 'PEOPLE',
            label: 'Personnes',
            active: true
        },
        {
            code: 'ALL',
            label: 'Tous',
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
        },
        {
            'movId': 985153,
            'title': 'Happiness therapy',
            'released': '2004-07-19T00:00:00.000Z',
            'year': 2004,
            'metadasJson': ''
        },
        {
            'movId': 985152,
            'title': 'Taxi driver',
            'released': '2004-07-19T00:00:00.000Z',
            'year': 2004,
            'metadasJson': ''
        }
    ],
    movieDetails: [
        {
            'movId': 985154,
            'title': 'Le groupe',
            'released': '2001-09-12T00:00:00.000Z',
            'genreIds': 'Comedy|Drama|Romance',
            'countryIds': 'France',
            'languageIds': 'French'
        },
        {
            'movId': 985153,
            'title': 'Happiness therapy',
            'released': '2004-07-19T00:00:00.000Z',
            'genreIds': 'Comedy|Drama|Romance',
            'countryIds': 'France',
            'languageIds': 'French'
        },
        {
            'movId': 985152,
            'title': 'Taxi driver',
            'released': '2004-07-19T00:00:00.000Z',
            'genreIds': 'Comedy|Drama|Romance',
            'countryIds': 'France',
            'languageIds': 'French'
        }
    ],
    facets: {
        MOVIE: {
            FCT_MOVIE_COUNTRY: {
                FK_MOVIE_COUNTRY_FR: 47,
                FK_MOVIE_COUNTRY_DE: 86,
                FK_MOVIE_COUNTRY_NL: 12,
                FK_MOVIE_COUNTRY_GB: 79,
                FK_MOVIE_COUNTRY_ES: 42,
                FK_MOVIE_COUNTRY_IT: 67
            },
            FCT_MOVIE_GENRE: {
                FK_MOVIE_GENRE_DRAMA: 41,
                FK_MOVIE_GENRE_COMEDY: 52,
                FK_MOVIE_GENRE_THRILLER: 41,
                FK_MOVIE_GENRE_ROMANCE: 96
            }
        },
        PEOPLE: {
            FCT_PEOPLE_PROFESSION: {
                FK_PEOPLE_PROFESSION_ACTOR: 452,
                FK_PEOPLE_PROFESSION_COMPOSER: 49,
                FK_PEOPLE_PROFESSION_PRODUCER: 16
            },
            FCT_PEOPLE_GENRE: {
                FK_PEOPLE_GENRE_FEMALE: 84,
                FK_PEOPLE_GENRE_MALE: 97
            }
        }
    },
    groups: {
        FCT_MOVIE_GENRE: {
            FK_MOVIE_GENRE_DRAMA: [985154, 985153],
            FK_MOVIE_GENRE_THRILLER: [985152]
        }
    }
};