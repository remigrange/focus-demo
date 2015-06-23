/**
 * Attention ce fichier est généré automatiquement !
 * DtDefinitionsLabel
 */

module.exports = {
    "dummy": {
        "dummyLong" : "dummy long"
    },
    "searchCriteria": {
        "scope" : "The Scope",
        "query" : "query"
    },
    "selectedFacet": {
        "key" : "Facet Name",
        "facetQuery" : "Facet query",
        "value" : "Facet key value"
    },
    "tempMovieData": {
        "cleanId" : "primary key",
        "title" : "Title",
        "released" : "Released",
        "year" : "Year",
        "plot" : "Description",
        "imdbid" : "Id imdb",
        "rated" : "Rated",
        "movId" : "Movie ID",
        "isUpdated" : "Updated",
        "poster" : "Poster",
        "type" : "Type"
    },
    "fileInfo": {
        "filId" : "FIL_ID",
        "fileName" : "FILE_NAME",
        "mimeType" : "MIME_TYPE",
        "length" : "LENGTH",
        "lastModified" : "LAST_MODIFIED",
        "filePath" : "FILE_PATH"
    },
    "country": {
        "couCd" : "COU_CD",
        "label" : "Label"
    },
    "genre": {
        "genCd" : "GEN_CD",
        "label" : "Label"
    },
    "language": {
        "lanCd" : "LAN_CD",
        "label" : "Label"
    },
    "roleMovie": {
        "rlmCd" : "RLM_CD",
        "label" : "Label"
    },
    "title": {
        "titCd" : "TIT_CD",
        "label" : "Label"
    },
    "alias": {
        "alsId" : "ALS_ID",
        "title" : "Title",
        "addition" : "addition"
    },
    "movie": {
        "movId" : "MOV_ID",
        "title" : "TITLE",
        "released" : "Released",
        "year" : "Year",
        "runtime" : "Runtime",
        "description" : "Description",
        "metadasJson" : "metadas Json",
        "imdbid" : "imdbID",
        "genreIds" : "Genres",
        "countryIds" : "Countries",
        "languageIds" : "Languages"
    },
    "movieCasting": {
        "castId" : "primary key",
        "peoName" : "Name",
        "role" : "Role",
        "characterName" : "Character name",
        "fileName" : "File name",
        "mimeType" : "MIME type",
        "filePath" : "File path"
    },
    "movieCriteria": {
        "movId" : "primary key",
        "title" : "Title",
        "released" : "Released",
        "year" : "Year",
        "runtime" : "Runtime",
        "description" : "Description"
    },
    "movieIndex": {
        "movId" : "primary key",
        "title" : "Title",
        "titleSortOnly" : "Title",
        "released" : "Released",
        "year" : "Year",
        "runtime" : "Runtime",
        "description" : "Description",
        "metadasJson" : "Meta Data JSON",
        "imdbid" : "Id imdb",
        "genreIds" : "Genres",
        "countryIds" : "Countries",
        "languageIds" : "Languages"
    },
    "movieView": {
        "movId" : "primary key",
        "title" : "Title",
        "titleSortOnly" : "Title",
        "released" : "Released",
        "year" : "Year",
        "runtime" : "Runtime",
        "description" : "Description",
        "metadasJson" : "Meta Data JSON",
        "imdbid" : "Id imdb",
        "genreIds" : "Genres",
        "countryIds" : "Contries",
        "languageIds" : "Languages",
        "actors" : "Actors",
        "producers" : "Producers",
        "directors" : "Directors"
    },
    "casting": {
        "castId" : "Cast_id",
        "characterName" : "Character name",
        "peoId" : "People",
        "movId" : "Movie",
        "rlmCd" : "Role movie"
    },
    "people": {
        "peoId" : "PEO_ID",
        "lastName" : "Last Name",
        "firstName" : "First Name",
        "peoName" : "Peo Name",
        "imdbid" : "imdbID",
        "comment" : "Commentaire",
        "fileName" : "File name",
        "mimeType" : "MIME type",
        "filePath" : "File path",
        "titCd" : "Title"
    },
    "peopleCriteria": {
        "peoId" : "primary key",
        "lastName" : "Last name",
        "firstName" : "First Name",
        "titCd" : "Title",
        "peoName" : "Name"
    },
    "peopleIndex": {
        "peoId" : "primary key",
        "lastName" : "Last name",
        "firstName" : "First Name",
        "titCd" : "Title",
        "peoName" : "Name",
        "imdbid" : "Id imdb",
        "peoNameSortOnly" : "Name",
        "professions" : "Professions"
    },
    "peopleView": {
        "peoId" : "primary key",
        "lastName" : "Last name",
        "firstName" : "First Name",
        "titCd" : "Title",
        "peoName" : "Name",
        "peoNameSortOnly" : "Name",
        "imdbid" : "Id imdb",
        "professions" : "Professions"
    },
    "rolePeople": {
        "rlpId" : "RLP_ID",
        "comment" : "Comment",
        "peoId" : "People",
        "movId" : "Movie",
        "rlmCd" : "Role movie"
    },
    "applicationUser": {
        "usrId" : "USR_ID",
        "lastName" : "Last Name",
        "firstName" : "First Name",
        "email" : "email",
        "proId" : "Profil"
    },
    "profil": {
        "proId" : "PRO_ID",
        "label" : "Label"
    },
    "securityRole": {
        "sroCd" : "SRO_CD",
        "label" : "Label"
    },
    "userAuthentification": {
        "authId" : "AUTH_ID",
        "login" : "Login",
        "password" : "Password",
        "usrId" : "Application user"
    }
};
