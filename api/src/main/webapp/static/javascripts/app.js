(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("action/index", function(exports, require, module) {
var AppDispatcher =  focus.dispatcher;
//var fetch = require('../../core/fetch');
//var URL = require('../../config/server');

var data = [{id:1, title : "toto", body:"ceci est un test"},{id:2, title:"tata",body:"deuxieme test"}]
var countId = 3;
module.exports = {
    searchByScope: function search(criteria){
        var url = "./searchByScope";
         //Promisify.model(url, {}).fetch();
       // Promisify.collection(url).search({criteria: criteria, pagesInfos: pagesInfos});
        //AppDispatcher.handleServerAction()
        return fetch.model(url, {}).fetch();
    }
};

});

require.register("action/movie/index", function(exports, require, module) {
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

});

require.register("action/people/index", function(exports, require, module) {
var AppDispatcher = focus.dispatcher;
var peopleServices = require('../../services').people;
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

});

require.register("action/search/filterSearch/index", function(exports, require, module) {
var services = require('../../../services');

module.exports = {
    search: function (criteria) {
        var page = criteria.pageInfos.page;
        if (page === undefined || page === null) {
            page = 0;
        }
        criteria.pageInfos.skip = page;
        criteria.group = criteria.pageInfos.group;
        if (criteria.group === undefined || criteria.group === null) {
            criteria.group = '';
        }
        if (criteria.pageInfos.order !== undefined) {
            criteria.pageInfos.sortFieldName = criteria.pageInfos.order.key;
            if (criteria.pageInfos.order.order !== undefined && criteria.pageInfos.order.order !== null) {
                if (criteria.pageInfos.order.order.toLowerCase() === 'asc') {
                    criteria.pageInfos.sortDesc = false;
                } else if (criteria.pageInfos.order.order.toLowerCase() === 'desc') {
                    criteria.pageInfos.sortDesc = true;
                }
            }
        } else {
            criteria.pageInfos.sortFieldName = undefined;
            criteria.pageInfos.sortDesc = undefined;
        }
        services.search.searchByScope(criteria).then(
            function success(data) {

                var dataRet = {
                    facet: data.facet,
                    list: data.list,
                    pageInfos: {
                        currentPage: criteria.pageInfos.page,
                        perPage: 50,
                        totalRecords: data.totalRecords
                    }
                };
                if (criteria.group) {
                    dataRet.pageInfos = {};
                }
                focus.dispatcher.handleServerAction({data: dataRet, type: 'update'});
            },
            function error(errors) {
                console.info('Errrors: ', errors);
            }
        );
    }
};

});

require.register("action/search/index", function(exports, require, module) {
var services = require('../../services');

module.exports = {
    search: function (criteria) {
        var page = criteria.pageInfos.page;
        if (page === undefined || page === null) {
            page = 0;
        }
        criteria.pageInfos.skip = page;
        criteria.group = criteria.pageInfos.group;
        if (criteria.group === undefined || criteria.group === null) {
            criteria.group = '';
        }
        if (criteria.pageInfos.order !== undefined) {
            criteria.pageInfos.sortFieldName = criteria.pageInfos.order.key;
            if (criteria.pageInfos.order.order !== undefined && criteria.pageInfos.order.order !== null) {
                if (criteria.pageInfos.order.order.toLowerCase() === 'asc') {
                    criteria.pageInfos.sortDesc = false;
                } else if (criteria.pageInfos.order.order.toLowerCase() === 'desc') {
                    criteria.pageInfos.sortDesc = true;
                }
            }
        } else {
            criteria.pageInfos.sortFieldName = undefined;
            criteria.pageInfos.sortDesc = undefined;
        }
        services.search.searchByScope(criteria).then(
            function success(data) {

                var dataRet = {
                    facet: data.facet,
                    list: data.list,
                    pageInfos: {
                        currentPage: criteria.pageInfos.page,
                        perPage: 50,
                        totalRecords: data.totalRecords
                    }
                };
                if (criteria.group) {
                    dataRet.pageInfos = {};
                }
                focus.dispatcher.handleServerAction({data: dataRet, type: 'update'});
            },
            function error(errors) {
                console.info('Errrors: ', errors);
            }
        );
    }
};

});

require.register("action/search/quickSearch/index", function(exports, require, module) {
var services = require('../../../services');


module.exports = {
    search: function (criteria) {
        var page = 0;
        if ((criteria.pageInfos.page !== undefined) && (criteria.pageInfos.page !== null)) {
            page = criteria.pageInfos.page;
        }
        var critere = {
            criteria: {
                scope: criteria.criteria.scope,
                query: criteria.criteria.query
            },
            pageInfos: {
                sortFieldName: undefined,
                sortDesc: undefined,
                skip: page
            },
            facets: [],
            group: ''
        };
        services.search.searchByScope(critere).then(
            function success(data) {
                var list = data;
                if (data.list !== undefined) {
                    list = data.list;
                }
                var dataRet = {
                    list: list,
                    facet: {},
                    pageInfos: {
                        currentPage: page,
                        perPage: 50,
                        totalRecords: data.totalRecords
                    },
                    searchContext: {
                        scope: criteria.criteria.scope,
                        query: criteria.criteria.query
                    }
                };
                focus.dispatcher.handleServerAction({data: dataRet, type: 'update'});
            },
            function error(errors) {
                console.info('Errrors ', errors);
            }
        );
    }
};

});

require.register("application", function(exports, require, module) {
console.log('Application');
});

require.register("config/domain/index", function(exports, require, module) {
module.exports = {
    "DO_BOOLEEN": {
        "type": "boolean"
    },
    "DO_DATE": {
        "type": "text",
        "decorator": "datePicker",
        "style": "date right",
        "format": {
            "value": function(data){return data;}
        },'InputComponent': focusComponents.common.input.date.component,
        'formatter': function(date){
            var monthNames = [
                'January', "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            date = new Date(date);
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            return "" + day +" "+ monthNames[monthIndex] +" "+ year;
        }

    },
    "DO_MONTANT": {
        "type": "number",
        "validation": [{
            "type": "number",
            "options": {"min": 0}
        }],
        "symbol": "\u20AC",
        "format": {
            "value": function(data){return data;}
        }
    },
    "DO_EMAIL": {
        "type": "email",
        "inputMaxLength": 150,
        "validation": [{
            "type": "email"
        }, {
            "type": "string",
            "options": {
                "maxLength": 150
            }
        }]
    },
    "DO_ENTIER": {
		"type": "number",
		"validation": [{
			"type": "number",
            "options": {"min": 0}
		}]
	},
    "DO_ID": {
        "type": "text"
    },
    "DO_LISTE_MULTI": {
        "type": "text",
        "decorator": "select2"
    },
    "DO_ACTIF": {
        "type": "boolean"
    },
    "DO_ANNEE": {
        "type": "number"
    },
    "DO_CHAMP_ADRESSE": {
        "type": "text",
        "inputMaxLength": 50,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 50
            }
        }]
    },
    "DO_CHEMIN_ACCES": {
        "type": "text",
        "inputMaxLength": 250,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 250
            }
        }]
    },
    "DO_CODE_1": {
        "type": "text",
        "inputMaxLength": 1,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 1
            }
        }]
    },
    "DO_CODE_3": {
        "type": "text",
        "inputMaxLength": 3,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 3
            }
        }]
    },
    "DO_CODE_4": {
        "type": "text",
        "inputMaxLength": 4,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 4
            }
        }]
    },
    "DO_CODE_10": {
        "type": "text",
        "inputMaxLength": 10,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 10
            }
        }]
    },
    "DO_CODE_20": {
        "type": "text",
        "inputMaxLength": 20,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 20
            }
        }]
    },
    "DO_CODE_POSTAL": {
        "type": "text",
        "inputMaxLength": 9,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 9
            }
        }]
    },
    "DO_COMMENTAIRE": {
        "type": "textarea",
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 3000
            }
        }]
    },
    "DO_DATE_INC": {
        "type": "text",
        "validation": [{
            "type": "regex",
            "value": /^((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19[0-9][0-9]|20[0-9][0-9]))|((0[1-9]|1[012])\/(19[0-9][0-9]|20[0-9][0-9]))|(19[0-9][0-9]|20[0-9][0-9])$/,
            "options": {
                "translationKey": "Veuillez saisir une date au format DD/MM/AAAA, MM/AAAA ou AAAA."
            }
        }]
    },
    "DO_TIMESTAMP": {
        "type": "text",
        "decorator": "datePicker",
        "style": "date right",
        "format": {
            "value": function(data){return data;}
        }
    },
    "DO_DECIMAL_3": {
        "type": "number"
    },
    "DO_DECIMAL_5": {
        "type": "number"
    },
    "DO_DEPARTEMENT": {
        "type": "number"
    },
    "DO_CD": {
        "type": "text",
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 18
            }
        }]
    },
    "DO_ID_BADGE": {
        "type": "text",
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 13
            }
        }]
    },
    "DO_MDP": {
        "type": "password",
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 15
            }
        }]
    },
    "DO_LIBELLE_COURT": {
        "type": "text",
        "inputMaxLength": 50,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 50
            }
        }],
        "style": "texte_50"
    },
    "DO_LIBELLE": {
        "type": "text",
        "inputMaxLength": 100,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 100
            }
        }],
        "style": "texte_100"
    },
    "DO_LIBELLE_LONG": {
        "type": "text",
        "inputMaxLength": 250,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 250
            }
        }],
        "style": "texte_250"
    },
    "DO_LIBELLE_FACIAL": {
        "type": "text",
        "inputMaxLength": 40,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 40
            }
        }],
        "style": "texte_40"
    },
    "DO_MATRICULE": {
        "type": "text",
        "inputMaxLength": 10,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 10
            }
        }]
    },
    "DO_TEL": {
        "type": "text",
        "inputMaxLength": 13,
        "validation": [{
            "type": "regex",
            "options": {
                "maxLength": 13
            },
            "value": /^[\+]?[0-9]+$/
        }]//,
        //"format": {
        //    "value": stitchFormatters.phoneNumber
        //}
    },
    "DO_VILLE": {
        "type": "text",
        "inputMaxLength": 50,
        "validation": [{
            "type": "string",
            "options": {
                "maxLength": 50
            }
        }],
        "style": "texte_13"
    }
};
});

require.register("config/entityDefinition/index", function(exports, require, module) {
/**
 * These metadatas are generated automatically.
 * @type {Object}
 */
module.exports = {
	"searchCriteria": {
			"scope": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"searchText": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"query": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			}		
	},
	"searchRet": {
			"type": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"field1": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"field2": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"field3": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"field4": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			}		
	},
	"selectedFacet": {
			"key": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"facetQuery": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"value": {
				"domain": "DO_LIBELLE_250",
				"required": false
			}		
	},
	"fileInfo": {
			"filId": {
				"domain": "DO_ID",
				"required": true
			},		
			"fileName": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"mimeType": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"length": {
				"domain": "DO_TAILLE_FICHIER",
				"required": true
			},		
			"lastModified": {
				"domain": "DO_TIMESTAMP",
				"required": true
			},		
			"filePath": {
				"domain": "DO_CHEMIN_ACCES",
				"required": false
			}		
	},
	"country": {
			"couCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": true
			},		
			"label": {
				"domain": "DO_LIBELLE_100",
				"required": false
			}		
	},
	"genre": {
			"genCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": true
			},		
			"label": {
				"domain": "DO_LIBELLE_100",
				"required": false
			}		
	},
	"language": {
			"lanCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": true
			},		
			"label": {
				"domain": "DO_LIBELLE_100",
				"required": false
			}		
	},
	"roleMovie": {
			"rlmCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": true
			},		
			"label": {
				"domain": "DO_LIBELLE_100",
				"required": false
			}		
	},
	"title": {
			"titCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": true
			},		
			"label": {
				"domain": "DO_LIBELLE_100",
				"required": false
			}		
	},
	"alias": {
			"alsId": {
				"domain": "DO_ID",
				"required": true
			},		
			"title": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"addition": {
				"domain": "DO_TEXTE",
				"required": false
			}		
	},
	"movie": {
			"movId": {
				"domain": "DO_ID",
				"required": true
			},		
			"title": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"released": {
				"domain": "DO_DATE",
				"required": false
			},		
			"year": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"runtime": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"description": {
				"domain": "DO_TEXTE",
				"required": false
			},		
			"metadasJson": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"imdbid": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"genreIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"countryIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"languageIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			}		
	},
	"movieCasting": {
			"castId": {
				"domain": "DO_ID",
				"required": true
			},		
			"peoName": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"role": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"characterName": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"fileName": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"mimeType": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"filePath": {
				"domain": "DO_LIBELLE_250",
				"required": false
			}		
	},
	"movieCriteria": {
			"movId": {
				"domain": "DO_ID",
				"required": true
			},		
			"title": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"released": {
				"domain": "DO_DATE",
				"required": false
			},		
			"year": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"runtime": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"description": {
				"domain": "DO_TEXTE",
				"required": false
			}		
	},
	"movieIndex": {
			"movId": {
				"domain": "DO_ID",
				"required": true
			},		
			"title": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"titleSortOnly": {
				"domain": "DO_COMMENTAIRE_NOT_ANALYZED",
				"required": false
			},		
			"released": {
				"domain": "DO_DATE",
				"required": false
			},		
			"year": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"runtime": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"description": {
				"domain": "DO_TEXTE",
				"required": false
			},		
			"imdbid": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"genreIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"countryIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"languageIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"rank": {
				"domain": "DO_ID",
				"required": true
			}		
	},
	"movieResult": {
			"movId": {
				"domain": "DO_ID",
				"required": true
			},		
			"title": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"released": {
				"domain": "DO_DATE",
				"required": false
			},		
			"year": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"runtime": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"description": {
				"domain": "DO_TEXTE",
				"required": false
			},		
			"metadasJson": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"imdbid": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"genreIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"countryIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"languageIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			}		
	},
	"movieView": {
			"movId": {
				"domain": "DO_ID",
				"required": true
			},		
			"title": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"titleSortOnly": {
				"domain": "DO_COMMENTAIRE_NOT_ANALYZED",
				"required": false
			},		
			"released": {
				"domain": "DO_DATE",
				"required": false
			},		
			"year": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"runtime": {
				"domain": "DO_ENTIER",
				"required": false
			},		
			"description": {
				"domain": "DO_TEXTE",
				"required": false
			},		
			"metadasJson": {
				"domain": "DO_COMMENTAIRE",
				"required": false
			},		
			"imdbid": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"genreIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"countryIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"languageIds": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"rank": {
				"domain": "DO_ID",
				"required": true
			},		
			"actors": {
				"domain": "DO_DT_PEOPLE_DTC",
				"required": false
			},		
			"producers": {
				"domain": "DO_DT_PEOPLE_DTC",
				"required": false
			},		
			"directors": {
				"domain": "DO_DT_PEOPLE_DTC",
				"required": false
			}		
	},
	"casting": {
			"castId": {
				"domain": "DO_ID",
				"required": true
			},		
			"characterName": {
				"domain": "DO_TEXTE",
				"required": false
			},		
			"peoId": {
				"domain": "DO_ID",
				"required": true
			},		
			"movId": {
				"domain": "DO_ID",
				"required": true
			},		
			"rlmCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": true
			}		
	},
	"people": {
			"peoId": {
				"domain": "DO_ID",
				"required": true
			},		
			"lastName": {
				"domain": "DO_NOM",
				"required": false
			},		
			"firstName": {
				"domain": "DO_PRENOM",
				"required": false
			},		
			"peoName": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"imdbid": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"comment": {
				"domain": "DO_TEXTE",
				"required": false
			},		
			"fileName": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"mimeType": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"filePath": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"titCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": false
			}		
	},
	"peopleCriteria": {
			"peoId": {
				"domain": "DO_ID",
				"required": true
			},		
			"lastName": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"firstName": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"titCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": false
			},		
			"peoName": {
				"domain": "DO_LIBELLE_250",
				"required": false
			}		
	},
	"peopleIndex": {
			"peoId": {
				"domain": "DO_ID",
				"required": true
			},		
			"lastName": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"firstName": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"titCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": false
			},		
			"peoName": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"imdbid": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"peoNameSortOnly": {
				"domain": "DO_COMMENTAIRE_NOT_ANALYZED",
				"required": false
			},		
			"professions": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"rank": {
				"domain": "DO_ID",
				"required": true
			}		
	},
	"peopleResult": {
			"peoId": {
				"domain": "DO_ID",
				"required": true
			},		
			"lastName": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"firstName": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"titCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": false
			},		
			"peoName": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"imdbid": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"professions": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"rank": {
				"domain": "DO_ID",
				"required": true
			}		
	},
	"peopleView": {
			"peoId": {
				"domain": "DO_ID",
				"required": true
			},		
			"lastName": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"firstName": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"titCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": false
			},		
			"peoName": {
				"domain": "DO_LIBELLE_250",
				"required": false
			},		
			"peoNameSortOnly": {
				"domain": "DO_COMMENTAIRE_NOT_ANALYZED",
				"required": false
			},		
			"imdbid": {
				"domain": "DO_LIBELLE_100",
				"required": false
			},		
			"professions": {
				"domain": "DO_MULTI_VALUES_FIELD",
				"required": false
			},		
			"rank": {
				"domain": "DO_ID",
				"required": true
			}		
	},
	"rolePeople": {
			"rlpId": {
				"domain": "DO_ID",
				"required": true
			},		
			"comment": {
				"domain": "DO_TEXTE",
				"required": false
			},		
			"peoId": {
				"domain": "DO_ID",
				"required": true
			},		
			"movId": {
				"domain": "DO_ID",
				"required": false
			},		
			"rlmCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": true
			}		
	},
	"applicationUser": {
			"usrId": {
				"domain": "DO_ID",
				"required": true
			},		
			"lastName": {
				"domain": "DO_NOM",
				"required": false
			},		
			"firstName": {
				"domain": "DO_PRENOM",
				"required": false
			},		
			"email": {
				"domain": "DO_EMAIL",
				"required": false
			},		
			"proId": {
				"domain": "DO_ID",
				"required": false
			}		
	},
	"profil": {
			"proId": {
				"domain": "DO_ID",
				"required": true
			},		
			"label": {
				"domain": "DO_LIBELLE_100",
				"required": false
			}		
	},
	"securityRole": {
			"sroCd": {
				"domain": "DO_IDENTIFIANT_CODE",
				"required": true
			},		
			"label": {
				"domain": "DO_LIBELLE_250",
				"required": false
			}		
	},
	"userAuthentification": {
			"authId": {
				"domain": "DO_ID",
				"required": true
			},		
			"login": {
				"domain": "DO_LIBELLE_50",
				"required": false
			},		
			"password": {
				"domain": "DO_PASSWORD",
				"required": false
			},		
			"usrId": {
				"domain": "DO_ID",
				"required": true
			}		
	}
};

});

require.register("config/server/index", function(exports, require, module) {
module.exports= {
    movie: require('./movie'),
    people: require('./people'),
    search: require('./search'),
    reference: require('./reference')
};

});

require.register("config/server/movie", function(exports, require, module) {
var root = "./movies/";
var url = focus.util.url.builder;
module.exports = {
    getAll: url(root, 'GET'),
    update: url(root + "${id}",'PUT'),
    create: url(root, 'POST'),
    get: url(root + "${id}", 'GET'),
    actors: url(root + "${id}/" + 'actors', 'GET'),
    producers: url(root + "${id}/" + 'producers', 'GET'),
    directors: url(root + "${id}/" + 'directors', 'GET'),
    movieView: url(root + "${id}/" + 'details', 'GET'),
    castings: url(root + "${id}/" + 'castings', 'GET')
};
});

require.register("config/server/people", function(exports, require, module) {
var root = "./people/";
var url = focus.util.url.builder;
module.exports = {
  getAll: url(root, 'GET'),
  update: url(root + "${id}/",'PUT'),
  create: url(root, 'POST'),
  get: url(root + "${id}/", 'GET'),
  peopleView: url(root + "${id}/" + 'peopleView', 'GET'),
  movies: url(root + "${id}/" + 'movies', 'GET'),
  filmography: url(root + "${id}/" + 'filmography', 'GET')
};

});

require.register("config/server/reference", function(exports, require, module) {
var root = ".";
var url = focus.util.url.builder;
module.exports = {
    getScopes: url(root+"/scopes", 'GET')
};

});

require.register("config/server/search", function(exports, require, module) {
var root = '.';
var url = focus.util.url.builder;
module.exports = {
    searchByScope: url(root + '/searchByScope?sortFieldName=${sortFieldName}&sortDesc=${sortDesc}&skip=${skip}', 'POST')
};

});

require.register("config/url/index", function(exports, require, module) {
var root = require('../../conf.json').url + "movies/";
module.exports = {
  getAll: function(){
    return {
      url : root,
      method: 'GET'
    };
  },
  save: function(){
    return {
      url: root,
      method: 'POST'
    };
  }
}

});

;require.register("i18n/en-GB", function(exports, require, module) {
module.exports = {
    'live': {
        'filter': {
           'title': 'Filter results'
        }
    },
    'result': {
        'for': 'results for'
    }
};

});

require.register("i18n/generated/fr-FR.generated", function(exports, require, module) {
/**
 * Attention ce fichier est généré automatiquement !
 * DtDefinitionsLabel
 */

module.exports = {
    "searchCriteria": {
        "scope" : "The Scope",
        "searchText" : "Search Text",
        "query" : "query"
    },
    "searchRet": {
        "type" : "Type of the object",
        "field1" : "Field 1",
        "field2" : "Field 2",
        "field3" : "Field 3",
        "field4" : "Field 4"
    },
    "selectedFacet": {
        "key" : "Facet Name",
        "facetQuery" : "Facet query",
        "value" : "Facet key value"
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
        "genreIds" : "Movie's genres identifiers",
        "countryIds" : "Movie's contries identifiers",
        "languageIds" : "Movie's languages identifiers"
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
        "imdbid" : "Id imdb",
        "genreIds" : "Movie's genres identifiers",
        "countryIds" : "Movie's contries identifiers",
        "languageIds" : "Movie's languages identifiers",
        "rank" : "rank"
    },
    "movieResult": {
        "movId" : "primary key",
        "title" : "Title",
        "released" : "Released",
        "year" : "Year",
        "runtime" : "Runtime",
        "description" : "Description",
        "metadasJson" : "Meta Data JSON",
        "imdbid" : "Id imdb",
        "genreIds" : "Movie's genres identifiers",
        "countryIds" : "Movie's contries identifiers",
        "languageIds" : "Movie's languages identifiers"
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
        "genreIds" : "Movie's genres identifiers",
        "countryIds" : "Movie's contries identifiers",
        "languageIds" : "Movie's languages identifiers",
        "rank" : "rank",
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
        "professions" : "People's professions",
        "rank" : "rank"
    },
    "peopleResult": {
        "peoId" : "primary key",
        "lastName" : "Last name",
        "firstName" : "First Name",
        "titCd" : "Title",
        "peoName" : "Name",
        "imdbid" : "Id imdb",
        "professions" : "People's professions",
        "rank" : "rank"
    },
    "peopleView": {
        "peoId" : "primary key",
        "lastName" : "Last name",
        "firstName" : "First Name",
        "titCd" : "Title",
        "peoName" : "Name",
        "peoNameSortOnly" : "Name",
        "imdbid" : "Id imdb",
        "professions" : "People's professions",
        "rank" : "rank"
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

});

require.register("i18n/index", function(exports, require, module) {
var combineHelper = require('../lib/combineFunction');

var english = combineHelper.combine(require('./en-GB'), require('./generated/fr-FR.generated'));
//module.exports = {'en-GB': {translation: require('./generated/fr-FR.generated')}};
module.exports = {'en-GB': {translation: english}};
});

require.register("index", function(exports, require, module) {
/*global Backbone*/
console.log('Application demo rodoplphe');
focus.components = focusComponents;
////Require dependencies.
require('./initializer');
//Start the application.
require('./router');
Backbone.history.start();

//render menu modules
var render = focus.application.render;
var LeftMenuView = require('../views/menu/leftMenu');
var PageHeader = require('../views/menu/appHeader');
render(PageHeader, '#header');
render(LeftMenuView, '#leftMenu');

//Render all application modules for the first time.
//React.render(<AlertModule />, document.querySelector('#notification-center'));

});

require.register("initializer/definition-initializer", function(exports, require, module) {
/*global focus*/
focus.definition.entity.container.setEntityConfiguration(require('../config/entityDefinition'));

});

require.register("initializer/domain-initializer", function(exports, require, module) {
/*global focus*/
focus.definition.domain.container.setAll(require('../config/domain'));
});

require.register("initializer/i18n-initializer", function(exports, require, module) {
//Initialize translations configuration.
var i18nConfig = {
  resStore: require('../i18n'),
  lng: 'en-GB'///langOpts.i18nCulture
};

//In production, fallback is english.
/*if (config.env === "production") {
  _.extend(i18nConfig, {
    fallbackLng: 'en-GB'
  });
}*/

//Ajax culture into headers.
/*$.ajaxSetup({
  headers: {
    'CultureCode': culture
  }
});*/

// Plugin initialization.
i18n.init(i18nConfig, function(content) {
  return console.log('Translation correctly initialized.');
});

});

require.register("initializer/index", function(exports, require, module) {
/*global.$ = require('jquery');//(window);
global.Backbone = require('backbone');
Backbone.$ = $;*/
//React tap event initializer.
//var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
//injectTapEventPlugin();

require('./domain-initializer');
require('./definition-initializer');
require('./reference_list_initializer').initialize();
require('./i18n-initializer');

});

require.register("initializer/reference_list_initializer", function(exports, require, module) {
//Path to the reference service.
/*global focus */
var serviceReference = require('../services');
var reference = focus.reference;

module.exports = {
    initialize: function(options, context) {
        reference.config.set({'scopes': serviceReference.refernce.getScopes});
        reference.builder.loadListByName('scopes');
    }
};

});

require.register("lib/combineFunction", function(exports, require, module) {
// Unflatten a json object.
// from an object `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
// Gives a `{contact: {nom: "nom", prenom: "prenom"}}`
JSON.unflatten = function(data) {
    if (Object(data) !== data || Array.isArray(data))
        return data;
    if ("" in data)
        return data[""];
    var result = {},
        cur, prop, idx, last, temp;
    for (var p in data) {
        cur = result;
        prop = "";
        last = 0;
        do {
            idx = p.indexOf(".", last);
            temp = p.substring(last, idx !== -1 ? idx : undefined);
            cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
            prop = temp;
            last = idx + 1;
        } while (idx >= 0);
        cur[prop] = data[p];
    }
    return result[""];
};

//Flatten a json object.
// from an object`{contact: {nom: "nom", prenom: "prenom"}}`
// Gives a one level object:  `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
JSON.flatten = function(data) {
    var result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop ? prop + "." + i : "" + i);
            if (l === 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
};
//Deeply combine an arbitrary number of JS objects.
var combine = function combine() {
    var res = {};
    var args = _.map(arguments, function (item) {
        return item && !_.isEmpty(item) ? JSON.flatten(item) : {};
    });
    args.unshift(res);
    _.extend.apply(this, args);
    return JSON.unflatten(res);
}

module.exports = {
    combine: combine
};

});

require.register("router/index", function(exports, require, module) {
/*global Backbone, focus, focusComponents */
//Dependencies.
var Router = Backbone.Router;
var render = focus.application.render;

//var AlertModule = require('../component/alert');
//render(AlertModule, '#notification-center');

var LeftMenuView = require('../views/menu/leftMenu');

var renderMenu = function(){
  var PageHeader = require('../views/menu/appHeader');
  render(PageHeader, '#header');
  render(LeftMenuView, '#leftMenu');
};

var AppRouter = Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'search/advanced/scope/:scope/query/:query': 'filterResult',
    'search/quick': 'searchResult',
    'movie/:id': 'movie',
    'people/:id': 'people'
  },
  home: function handleHomeRoute() {
    console.log('ROUTE: HOME');
    var HomeView = require('../views/home');
   // renderMenu();
    render(HomeView, '#page', {props: {position: 'left', open: true, style: {className: 'home-popin'}}});
  },
  movie: function handleMovieRoute(id) {
    console.log('ROUTE: MOVIE');
    var MovieDetailView = require('../views/movie');
  //  renderMenu();
    render(MovieDetailView, '#page', {props: {id: id}});
  },
  people: function handlePeopleRoute(id) {
    console.log('ROUTE: PEOPLE');
    var PeopleDetailView = require('../views/people');
   // renderMenu();
    render(PeopleDetailView, '#page', {props: {id: id}});
  },
  filterResult: function handleFilterResult(scope, query) {
    console.log('ROUTE: FILTER RESULT');
    if(!scope){
      //set defaut to MOVIE
      scope = 'MOVIE';
    }
    if(!query){
      //set defaut to empty
      query = '';
    }
    var FilterResultView = require('../views/filter-result');
    //renderMenu();
    render(FilterResultView, '#page', {props: {scope: scope, query: query}});
  },

  searchResult: function handleSearchResult() {
    console.log('ROUTE: SEARCH RESULT');
    var SearchResultView = require('../views/search-result');
   // renderMenu();
    render(SearchResultView, '#page', {props: {position: 'left', open: true, displaySelector: 'a[href="#search/quick"]', style: {className: 'quick-search-popin'}}});
  }
});
module.exports = new AppRouter();

});

require.register("services/index", function(exports, require, module) {
module.exports= {
    search: require('./search'),
    movie: require('./movie'),
    people: require('./people'),
    refernce : require('./reference')
};
});

require.register("services/movie", function(exports, require, module) {
var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    getMovieById: function getMovieById(id){
        return fetch(URL.movie.get({urlData:{id: id}}));
    },
    getMovieViewById: function getMovieViewById(id){
        return fetch(URL.movie.movieView({urlData:{id: id}}));
    },
    getMovieCastingsById: function getMovieCastingsById(id){
        return fetch(URL.movie.castings({urlData:{id: id}}));
    },

  getMovieProducersById: function getMovieProducersById(id){
    return fetch(URL.movie.producers({urlData:{id: id}}));
  },

  getMovieDirectorsById: function getMovieDirectorsById(id){
    return fetch(URL.movie.directors({urlData:{id: id}}));
  },

  updateMovie: function updateMovie(jsonMovie) {
    return fetch(URL.movie.update({urlData:{id: jsonMovie.movId}, data: jsonMovie}));
  }
};

});

require.register("services/people", function(exports, require, module) {
var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    getPeopleViewById: function getPeopleViewById(id){
        return fetch(URL.people.peopleView({urlData: {id: id}}));
    },
    getPeopleFilmographyById: function getPeopleFilmographyById(id){
        return fetch(URL.people.filmography({urlData: {id: id}}));
    }
};
});

require.register("services/reference", function(exports, require, module) {
var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    getScopes: function getScopes(id){
        return fetch(URL.reference.getScopes({}));
    }
};
});

require.register("services/search", function(exports, require, module) {
var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    searchByScope: function searchByScope(criteria){
        return fetch(URL.search.searchByScope({urlData: criteria.pageInfos, data: criteria}));
    }
};

});

require.register("stores/movie", function(exports, require, module) {
/* global focus*/
/**
 * Store dealing with the movie subject.
 * @type {focus}
 */
var movieStore = new focus.store.CoreStore({
    definition : {
        'movie': 'movie',
        'castings': 'movieCasting',
        'producers': 'people',
        'directors': 'people'
    }
  });
module.exports = movieStore;

});

require.register("stores/people", function(exports, require, module) {
/* global focus*/
/**
 * Store dealing with the movie subject.
 * @type {focus}
 */
var peopleStore = new focus.store.CoreStore({
    definition : {
        'people': 'people',
        'filmography': 'filmography'
    }
  });
module.exports = peopleStore;

});

require.register("stores/reference", function(exports, require, module) {
/* global focus*/
/**
 * Store dealing with the movie subject.
 * @type {focus}
 */
var referenceStore = new focus.store.CoreStore({
    definition : {
        'reference': 'reference'
    }
});
module.exports = referenceStore;

});

require.register("views/filter-result/filterResult", function(exports, require, module) {
/*global React, focusComponents */
var Title = focusComponents.common.title.component;
var Button = focusComponents.common.button.action.component;
var action = require('../../action/search/filterSearch');

module.exports = React.createClass({displayName: "exports",
  mixins: [focusComponents.page.search.filterResult.mixin],
  actions: action,
  store: new focus.store.SearchStore(),
  render: function () {
    var list = this.isSimpleList() ? this.simpleListComponent({type: this.props.criteria.scope.toLowerCase()}) : this.groupByListComponent();
    var root = React.createElement('div', {className: 'search-result'},
      this.liveFilterComponent(),
      React.createElement(
        'div',
        {className: 'resultContainer'},
        this.listSummaryComponent(),
        this.actionBarComponent(),
        list
      )
    );
    return root;
  },
  renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
    var buttonSeeMore = React.createElement("div", null);
    if (list.length > this.props.groupMaxRows && maxRows <= this.props.groupMaxRows) {
      buttonSeeMore = React.createElement(Button, {handleOnClick: this.changeGroupByMaxRows(groupKey, 10), label: "See More", className: "btn-show-all"});
    }
    return React.createElement("div", {className: "listResultContainer panel"}, 
      React.createElement(Title, {className: "results-groupBy-title", title: groupKey}), 
      this.simpleListComponent(
        {type: this.props.criteria.scope.toLowerCase(), list: list, maxRows: maxRows}), 
      React.createElement("div", {className: "btn-group-by-container"}, 
        React.createElement("div", {className: "btn-see-more"}, buttonSeeMore), 
        React.createElement("div", {className: "btn-show-all"}, 
          React.createElement(Button, {handleOnClick: this.showAllGroupListHandler(groupKey), label: "Show all"})
        )
      )
    );

  }
});

});

require.register("views/filter-result/index", function(exports, require, module) {
/*global focusComponents, React */
var FilterResult = require('./filterResult');

//Composants de ligne
var PeopleLineComponent = require('../search-result/peopleLineComponent');
var MovieLineComponent = require('../search-result/movieLineComponent');

var config = {
    facetConfig: {
        Country: 'text',
        Genre: 'text',
        Language: 'text'
    },
    openedFacetList: {Genre: true},
    orderableColumnList: [
        {key: 'TITLE_SORT_ONLY', order: 'desc', label: 'Title desc'},
        {key: 'TITLE_SORT_ONLY', order: 'asc', label: 'Title asc'},
        {key: 'GENRE_IDS', order: 'desc', label: 'Genre desc'},
        {key: 'GENRE_IDS', order: 'asc', label: 'Genre asc'}],
    operationList: [],
    onLineClick: function onLineClick(data) {
        var url = '';
        if(data.movId !== undefined && data.movId !== null){
            url = '#movie/' + data.movId;
        } else {
            if(data.peoId !== undefined && data.peoId !== null){
                url = '#people/' + data.peoId;
            }
        }
        Backbone.history.navigate(url, true);
    },
    isSelection: true,
    lineOperationList: [],
    criteria: {
        scope: 'MOVIE',
        searchText: ''
    },
    idField: 'movId',
    groupMaxRows: 3
};

module.exports = React.createClass({displayName: "exports",
    render: function () {
        config.criteria = {
            scope: this.props.scope,
            searchText: this.props.query
        };
        if(this.props.scope.toLowerCase() === 'movie'){
            config.idField = 'movId';
        } else if(this.props.scope.toLowerCase() === 'people'){
            config.idField = 'peoId';
            config.facetConfig = {
                Profession: 'text',
                Title: 'text'
            };
            config.openedFacetList = {Title: true};
            config.orderableColumnList = [
                {key: 'PEO_NAME_SORT_ONLY', order: 'desc', label: 'Name desc'},
                {key: 'PEO_NAME_SORT_ONLY', order: 'asc', label: 'Name asc'}];
        }
        return React.createElement(FilterResult, {
            facetConfig: config.facetConfig, 
            openedFacetList: config.openedFacetList, 
            orderableColumnList: config.orderableColumnList, 
            operationList: config.operationList, 
            lineMap: {'movie': MovieLineComponent, 'people': PeopleLineComponent}, 
            onLineClick: config.onLineClick, 
            isSelection: config.isSelection, 
            lineOperationList: config.lineOperationList, 
            criteria: config.criteria, 
            idField: config.idField, 
            groupMaxRows: config.groupMaxRows}
        );
    }
});

});

require.register("views/home/index", function(exports, require, module) {
/* global React, focusComponents */
module.exports = React.createClass({displayName: "exports",
  render: function renderPeopleView() {
    return (
      React.createElement("div", {className: "welcome-title"}, 
        "Welcome page"
      )
    );
  }
});

});

require.register("views/menu/appHeader", function(exports, require, module) {
/*global focusComponents, React */
//Component for the application header.
var AppHeader = focusComponents.application.header.component;
var Cartouche = focus.components.application.cartridge.component;
//Create the view.
module.exports = React.createClass({displayName: "exports",
  render: function () {
    var notification = React.createElement("div", {className: "header-menu-item"}, 
      React.createElement("i", {className: "fa fa-bell-o"}), 
      React.createElement("span", {className: "badge badge-alerte"}, "11")
    );
    var eye = React.createElement("div", {className: "header-menu-item"}, 
      React.createElement("i", {className: "fa fa-eye"}), 
      React.createElement("span", {className: "badge badge-warning"}, "11")
    );
    var user = React.createElement("div", {className: "header-menu-item"}, 
      React.createElement("i", {className: "fa fa-user"})
    );
    return React.createElement('div', null,
      React.createElement(AppHeader, null,
        React.createElement('div', {className: 'content-bar'},
          React.createElement('div', {className: 'real-bar'},
            React.createElement('div', {className: 'actions-left'},
              //React.createElement('button', {className: 'btn btn-raise btn-default fa fa-reply-all header-back'}, 'FOCUS')
              React.createElement('span', {className: 'header-title'}, 'FOCUS')
            ),
           /* React.createElement('div', {className: 'entete'},
              'Super film vraiment top...',
              React.createElement('button', {className: 'btn btn-info btn-raise'}, 'Context'),
            ),*/

            React.createElement('div', {className: 'user-infos'}, notification, eye, user)
          ),
         // React.createElement(Cartouche, {className: 'cartridge'})
         React.createElement(Cartouche, {className: 'entete-tall'})
        ),
        React.createElement('div', {className: 'entete-actions'},
          React.createElement('button', {className: 'btn btn-success btn-fab btn-raised fa fa-bell-o'}),
          React.createElement('button', {className: 'btn btn-danger btn-fab btn-raised fa fa-eye'}),
          React.createElement('button', {className: 'btn btn-primary btn-fab btn-raised fa fa-user'})
        )
      )
    );
  }
});

});

require.register("views/menu/cartridge", function(exports, require, module) {
/*global focusComponents, React */


module.exports = React.createClass({
  displayName: 'UserCartouche',
  render: function() {
    return (
      React.createElement("div", {className: "cartouche"}, 
        "tetsttttt"
      )
    );
  }
});

});

require.register("views/menu/index", function(exports, require, module) {
/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var Menu = React.createClass({displayName: "Menu",
  mixins: [menuMixin],
  renderContent: function renderMenuContent() {
    if (this.props.type === 'menuLeft') {
      return this.props.links.map(function (link) {
        if(!link.img){
          return React.createElement("a", {href: link.url}, "link.title");
        } else {
          return React.createElement("a", {href: link.url}, React.createElement("img", {src: link.img}));
        }
      });
    }
    return this.renderLinks();
  }
});

module.exports = React.createClass({displayName: "exports",
  render: function renderPeopleView() {
    var test = React.createElement("div", null, 
      React.createElement("button", {id: "buttonLeft", onClick: this.hanleOpenLeftPopin}, "Open popin left"), 
      React.createElement("button", {id: "buttonUp", onClick: this.hanleOpenUpPopin}, "Open popin up"), 
      React.createElement("button", {id: "buttonDown", onClick: this.hanleOpenDownPopin}, "Open popin down"), 
      React.createElement("button", {id: "buttonRight", onClick: this.hanleOpenRightPopin}, "Open popin right"), 
      React.createElement("div", null, "  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl. Sed ut quam consectetur sem porta blandit sed vitae magna. Sed ultrices egestas risus, id euismod magna interdum et. Proin lobortis porta commodo." + ' ' +

        "Quisque vitae suscipit massa, ac mollis leo. Phasellus nisl magna, placerat a diam posuere, luctus blandit odio. Donec sagittis vehicula sem id ullamcorper. Nunc tincidunt arcu sagittis, faucibus quam ut, laoreet sapien. Cras magna odio, viverra quis elit ut, elementum tempor enim. Integer magna mauris, porttitor id nisl a, dapibus porttitor magna. Quisque ac porttitor magna. Nulla dapibus eleifend urna fermentum vehicula. Pellentesque ac tincidunt leo, quis gravida massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae purus sed metus molestie dapibus et ac est." + ' ' +

        "Vestibulum est est, fermentum sed vestibulum ut, ultrices eu velit. Vivamus consequat auctor dui, at pulvinar nunc suscipit ut. Nulla porta tincidunt ipsum ut euismod. Donec ante lacus, mollis at vehicula a, sagittis at eros. Fusce fringilla erat sit amet ex vestibulum, et dignissim tellus rhoncus. Nullam eu suscipit tellus. Quisque hendrerit leo laoreet ligula dignissim malesuada. Duis consectetur nisl et tellus accumsan dignissim. Sed ultricies luctus tortor. Nam molestie convallis mauris dictum rutrum. Praesent ligula urna, tempus vitae auctor sed, condimentum a eros. Aliquam ante lacus, convallis vitae scelerisque ornare, tristique quis orci. Integer volutpat, erat at porta finibus, quam lectus ornare tortor, et lacinia leo purus eget ligula. Maecenas elementum semper pulvinar." + ' ' +

        "Nulla nec neque maximus, sollicitudin mauris sit amet, mollis urna. Duis pellentesque non nunc sed cursus. Nunc sed ullamcorper purus. Morbi erat nulla, congue at urna tincidunt, rhoncus imperdiet eros. Vivamus interdum mattis risus, ut mollis orci convallis et. Maecenas a nulla quam. Maecenas sit amet eros a tortor lacinia accumsan eu non sapien." + ' ' +

        "Duis fringilla arcu vitae sollicitudin facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at cursus ipsum, ac sollicitudin orci. Nam ultricies augue mi, eu interdum neque venenatis et. Duis euismod a massa et vestibulum. Quisque et lacinia nunc, eget vulputate orci. Nulla scelerisque rhoncus erat nec maximus. Nullam tincidunt mauris erat, non tempor nunc blandit vitae. Mauris non arcu sit amet turpis euismod elementum in nec magna. Donec id purus sodales erat auctor pharetra sit amet at orci. Nam dignissim vitae ligula at dictum."

      )
    );

    return (
      React.createElement(Menu, {
        open: true, 
        position: this.props.position, 
        direction: this.props.direction, 
        title: this.props.title, 
        links: this.props.links, 
        ref: this.props.reference, 
        type: this.props.reference, 
        style: this.props.style}
      ));
  }
});

});

require.register("views/menu/leftMenu", function(exports, require, module) {
/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var render = focus.application.render;
var isFirstTime = true;
var Menu = React.createClass({displayName: "Menu",
  mixins: [menuMixin],
  /** @inheriteddoc */
  renderTitle: function () {
    if (!this.props.brand) {
      return React.createElement("h3", null, this.props.title);
    }
    return React.createElement("div", {className: "brand"}, 
      React.createElement("img", {src: this.props.brand})
    );
  },
  renderContent: function renderMenuContent() {
    var home = React.createElement("a", {onClick: this.handleNaviagtion, "data-action": "#"}, 
      React.createElement("img", {src: "static/img/home-32x32-white.svg"})
    );
    var search = React.createElement("a", {onClick: this.openQuickSearchPopin, id: "quick-search-link"}, 
      React.createElement("img", {src: "static/img/search-32x32-white.svg"})
    );
    var films = React.createElement("a", {onClick: this.handleNaviagtion, "data-action": "#", className: "fa fa-film"});
    var videos = React.createElement("a", {onClick: this.handleNaviagtion, "data-action": "#", className: "fa fa-video-camera"});
    var users = React.createElement("a", {onClick: this.handleNaviagtion, "data-action": "#", className: "fa fa-user"});
    var settings = React.createElement("a", {onClick: this.handleNaviagtion, "data-action": "#", className: "fa fa-cog"});
    var help = React.createElement("a", {onClick: this.handleNaviagtion, "data-action": "#", className: "fa fa-info-circle"});
    var root = React.createElement('div', null, home, search, films, videos, users, settings, help);
    return root;
  },
  openQuickSearchPopin: function openQuickSearchPopin(event) {
    event.preventDefault();
    console.info('click on search icon');
    if(isFirstTime){
      var SearchResultView = require('../search-result');
      render(SearchResultView, '#modalContainer', {
        props: {
          position: 'left',
          open: true,
          displaySelector: '#quick-search-link',
          style: {className: 'quick-search-popin'}
        }
      });
      isFirstTime = false;
    }
    $('body').toggleClass('stop-scrolling');
    //this.refs.qs._toggleOpen();
  },
  handleNaviagtion: function (event){
    event.preventDefault();
    var url = $(event.target).closest('a').attr('data-action');
    Backbone.history.navigate(url, true);
    var qsPopin = $('.quick-search-popin .popin-close-btn');
    if(qsPopin !== undefined && qsPopin !== null && qsPopin.length > 0){
      qsPopin.click();
    }
    var qsPreview = $('.preview-popin .popin-close-btn');
    if(qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0){
      qsPreview.click();
    }
  }
});

module.exports = React.createClass({displayName: "exports",
  render: function renderLeftMenu() {
    var style = {className: 'left-menu'};
    var menu = React.createElement(Menu, {
      open: true, 
      position: "left", 
      direction: "vertical", 
      title: "", 
      links: [], 
      ref: "menuLeft", 
      style: style, 
      brand: "static/img/brand.png"}
    );
    return React.createElement('div', null, menu);
  }
});

});

require.register("views/menu/topMenu", function(exports, require, module) {
/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var Menu = React.createClass({displayName: "Menu",
  mixins: [menuMixin],
  /**
   * Render the title content
   * @returns {XML} - title content
   */
  renderTitle: function () {
    return React.createElement("h3", null, this.props.title);
  },
  renderContent: function renderMenuContent() {
    return React.createElement("div", {className: "top-menu-items-container"}, 
      React.createElement("div", {className: "top-menu-item"}, 
        React.createElement("i", {className: "fa fa-bell-o"}), 
        React.createElement("span", {className: "badge badge-alerte"}, "4")
      ), 
      React.createElement("div", {className: "top-menu-item"}, 
        React.createElement("i", {className: "fa fa-eye"}), 
        React.createElement("span", {className: "badge badge-warning"}, "11")
      ), 
      React.createElement("div", {className: "top-menu-item"}, 
        React.createElement("i", {className: "fa fa-user"})
      )
    );
  }
});

module.exports = React.createClass({displayName: "exports",
  render: function renderTopMenu() {
    var links = [{url: '', name: '', img: 'static/img/home-32x32-white.svg'},
      {url: '', name: '', img: 'static/img/search-32x32-white.svg'},
      {url: '', name: '', img: 'static/img/search-32x32-white.svg', style: {className: 'user'}}
    ];
    return (
      React.createElement(Menu, {
        open: true, 
        position: this.props.position, 
        direction: this.props.direction, 
        title: this.props.title, 
        links: links, 
        ref: this.props.reference, 
        style: this.props.style}
      ));
  }
});

});

require.register("views/movie/cartridge", function(exports, require, module) {
var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
module.exports = React.createClass({
    definitionPath: "movie",
    displayName: "cartridge",
    getInitialState: function () {
        return {
          actors: [],
          producers: [],
          directors: []
        };
    },
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ["movie"]}],
    action: movieActions,
    renderContent: function renderMovieCartridge() {
        return (
            React.createElement("div", {className: "cartridge"}, 
                React.createElement("div", {className: "header"}, 
                    React.createElement("div", {className: "picture"}, React.createElement("img", {src: "./static/img/logoMovie.png", width: "100%", height: "100%"})), 
                    React.createElement("div", {className: "title"}, this.state.title), 
                    React.createElement("div", {className: "year"}, this.state.year)
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "GENRES"), 
                    React.createElement("div", {className: "content"}, 
                        this.state.genreIds
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "DIRECTORS"), 
                    React.createElement("div", {className: "content"}, 
                        this.state.directors.map(function (people) {
                            return (
                                React.createElement("div", null, people.peoName)
                            )
                        })
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "PRODUCERS"), 
                    React.createElement("div", {className: "content"}, 
                        this.state.producers.map(function (people) {
                            return (
                                React.createElement("div", null, people.peoName, " ", people.comment)
                            )
                        })
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "MAIN ACTORS"), 
                    React.createElement("div", {className: "content"}, 
                        this.state.actors.map(function (people) {
                            return (
                                React.createElement("div", null, people.peoName)
                            )
                        })
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "COUNTRIES"), 
                    React.createElement("div", {className: "content"}, 
                        this.state.countryIds
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "LANGUAGES"), 
                    React.createElement("div", {className: "content"}, 
                        this.state.languageIds
                    )
                )
            )
        );
    }
});

});

require.register("views/movie/castings", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Block = focus.components.common.block.component;
var PeopleCard = require('./component/peopleCard');
var line = React.createClass({displayName: "line",
  definitionPath: 'people',
  mixins: [focus.components.list.selection.line.mixin],
  renderLineContent: function(data){
    return (
      React.createElement(PeopleCard, {picture: "", name: data.peoName, subName: "As ("+data.role+") "+(data.characterName!==undefined?data.characterName:"")})
    );
  }
});
module.exports = React.createClass({
  definitionPath: "people",
  displayName: "movieCastings",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["castings"]}],
  action: {
    load: function (id) {
      movieActions.loadCastings(id);
    }
  },
  renderContent: function renderContentCastings() {
    return (
      React.createElement(Block, {title: "CAST", style: {className: "slidingBlock", titleId: "cast"}}, 
        this.listFor("castings", {LineComponent: line})
      )
    );
  }
});

});

require.register("views/movie/component/peopleCard", function(exports, require, module) {
module.exports = React.createClass({displayName: "exports",
    render: function renderPeopleCard() {
        return (
            React.createElement("div", {className: "card"}, 
                React.createElement("div", {className: "picture"}, React.createElement("img", {src: "./static/img/peopleLogo.png", width: "100%", height: "100%"})), 
                React.createElement("div", {className: "name"}, this.props.name), 
                React.createElement("div", {className: "subName"}, this.props.subName)
            )
        );
    }
});

});

require.register("views/movie/index", function(exports, require, module) {
//Get the form mixin.
var SlidingContent = require('./slidingContent');
var StickyNavigation = focus.components.common.stickyNavigation.component;

module.exports = React.createClass({displayName: "exports",
    render: function renderMovieView() {
        return (
            React.createElement("div", {className: "detail movieView"}, 
                React.createElement(StickyNavigation, {contentSelector: "body"}), 
                React.createElement(SlidingContent, {id: this.props.id})
            )
        );
    }
});

});

require.register("views/movie/movieDetails", function(exports, require, module) {
var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Block = focus.components.common.block.component;
module.exports = React.createClass({
  definitionPath: 'movie',
  displayName: 'movieDetails',
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ['movie']}],
  action: movieActions,
  renderContent: function render() {
      return (
        React.createElement("div", null, 
          React.createElement(Block, {title: "DETAILS", style: {className: "slidingBlock", titleId: "details"}}, 
            this._renderActions(), 
            this.fieldFor('title'), {isEdit: true}, 
            this.fieldFor('released'), 
            this.fieldFor('runtime'), 
            this.fieldFor('countryIds'), 
            this.fieldFor('languageIds'), 
            this.fieldFor('genreIds')
          ), 
          React.createElement(Block, {title: "STORYLINE", style: {className: "slidingBlock", titleId: "storyline"}}, 
            this.state.description
          )
        )
      );
  }
});

});

require.register("views/movie/movieDirectors", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Block = focus.components.common.block.component;
var PeopleCard = require('./component/peopleCard');
var line = React.createClass({displayName: "line",
  definitionPath: 'people',
  mixins: [focus.components.list.selection.line.mixin],
  renderLineContent: function(data){
    return (
      React.createElement(PeopleCard, {picture: "", name: data.peoName, subName: ""})
    );
  }
});
module.exports = React.createClass({
  definitionPath: "people",
  displayName: "movieDirectors",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["directors"]}],
  renderActions: function renderActions(){},
  action: {
    load: function (id) {
      movieActions.loadDirectors(id);
    }
  },
  renderContent: function render() {
    return (
      React.createElement(Block, {title: "DIRECTORS", style: {className: "slidingBlock", titleId: "directors"}}, 
        this.listFor("directors", {LineComponent: line})
      )
    );
  }
});

});

require.register("views/movie/moviePictures", function(exports, require, module) {
var Block = focus.components.common.block.component;
module.exports = React.createClass({
  displayName: "moviePictures",
  render: function render() {
    return (
      React.createElement(Block, {title: "PICTURES", style: {className: "slidingBlocK noBorderBottom", titleId: "pictures"}}
      )

    );
  }
});

});

require.register("views/movie/movieProducers", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
var PeopleCard = require('./component/peopleCard');
var Block = focus.components.common.block.component;
var line = React.createClass({displayName: "line",
  definitionPath: 'people',
  mixins: [focus.components.list.selection.line.mixin],
  renderLineContent: function(data){
    return (
      React.createElement(PeopleCard, {picture: "", name: data.peoName, subName: ""})
    );
  }
});
module.exports = React.createClass({
  definitionPath: "people",
  displayName: "movieProducers",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["producers"]}],
  action: {
    load: function (id) {
      movieActions.loadProducers(id);
    }
  },
  renderContent: function render() {
    return (
      React.createElement(Block, {title: "PRODUCERS", style: {className: "slidingBlock", titleId: "producers"}}, 
        this.listFor("producers", {LineComponent: line})
      )
    );
  }
});

});

require.register("views/movie/slidingContent", function(exports, require, module) {
var Title = focus.components.common.title.component;
var MovieDetails = require('./movieDetails');
var Castings = require('./castings');
var MovieProducers = require('./movieProducers');
var MovieDirectors = require('./movieDirectors');
var MoviePictures = require('./moviePictures');

var MovieCartridge = require('./cartridge');

module.exports = React.createClass({
    displayName: 'slidingContent',
    render: function renderSlidingContent() {
        return (
            React.createElement("div", {className: "detail-content"}, 
                React.createElement(MovieCartridge, {id: this.props.id, style: {className: 'catridgeContainer'}}), 
                React.createElement("div", {id: "slidingContent"}, 
                    React.createElement(MovieDetails, {id: this.props.id}), 
                    React.createElement(Castings, {id: this.props.id}), 
                    React.createElement(MovieProducers, {id: this.props.id}), 
                    React.createElement(MovieDirectors, {id: this.props.id}), 
                    React.createElement(MoviePictures, {id: this.props.id})
                )

            )
        );
    }
});

});

require.register("views/people/cartridge", function(exports, require, module) {
var formMixin = focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
module.exports = React.createClass({
  definitionPath: "people",
  displayName: "cartridge",
  mixins: [formMixin],
  stores: [{store: peopleStore, properties: ['people']}],
  action: peopleActions,
  renderActions: function renderActions(){},
  renderContent: function renderMovieCartridge() {
    return (
      React.createElement("div", {className: "cartridge"}, 
        React.createElement("div", {className: "header"}, 
          React.createElement("div", {className: "picture"}, 
            React.createElement("img", {src: "./static/img/peopleLogo.png", width: "100%", height: "100%"})
          ), 
          React.createElement("div", {className: "link"}, React.createElement("a", {href: ""}, "IMDB")), 
          React.createElement("div", {className: "title"}, this.state.peoName), 
          React.createElement("div", {className: "professions"}, this.state.professions)
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "title"}, "PROFESSIONS"), 
          React.createElement("div", {className: "content"}, 
            this.state.professions
          )
        )
      )
    );
  }
});

});

require.register("views/people/index", function(exports, require, module) {
//Get the form mixin.
var SlidingContent = require('./slidingContent');

var StickyNavigation = focus.components.common.stickyNavigation.component;

module.exports = React.createClass({displayName: "exports",
    render: function renderPeopleView() {
        return (
            React.createElement("div", {className: "peopleView"}, 
                React.createElement(StickyNavigation, {contentSelector: "body"}), 
                React.createElement(SlidingContent, {id: this.props.id})
            )
        );
    }
});

});

require.register("views/people/movieCard", function(exports, require, module) {
module.exports = React.createClass({displayName: "exports",
    render: function renderMovieCard() {
        return (
            React.createElement("div", {className: "card"}, 
                React.createElement("div", {className: "picture"}, React.createElement("img", {src: "./static/img/logoMovie.png", width: "100%", height: "100%"})), 
                React.createElement("div", null, 
                  React.createElement("div", {className: "name"}, this.props.name), 
                  React.createElement("div", {className: "middleName"}, this.props.middleName), 
                  React.createElement("div", {className: "subName"}, this.props.subName)
                )
            )
        );
    }
});

});

require.register("views/people/peopleDetails", function(exports, require, module) {
var formMixin = focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
var Title = focus.components.common.title.component;
module.exports = React.createClass({
  definitionPath: 'people',
  displayName: 'peopleIdentification',
  mixins: [formMixin],
  stores: [{store: peopleStore, properties: ['people']}],
  action: peopleActions,
  renderActions: function renderActions(){},
  renderContent: function render() {
    if(this.state.isEdit) {
      return (
        React.createElement("div", {className: "slidingBloc"}, 
          React.createElement(Title, {id: "identification", title: "IDENTIFICATION"}), 
          this.fieldFor('lastName'), 
          this.fieldFor('firstName'), 
          this.fieldFor('imdbid')
        )
      );
    }
    return (
      React.createElement("div", {className: "slidingBloc"}, 
        React.createElement(Title, {id: "identification", title: "IDENTIFICATION"}), 
          this.displayFor('lastName'), 
          this.displayFor('firstName'), 
          this.displayFor('imdbid')
      )
    );
  }
});

});

require.register("views/people/peopleFilmography", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
var Title = focus.components.common.title.component;
var MovieCard = require('./movieCard');
var FormList = focus.components.common.list;
var line = React.createClass({displayName: "line",
  definitionPath: 'movie',
  mixins: [focus.components.list.selection.line.mixin],
  renderLineContent: function(data){
    return (
      React.createElement(MovieCard, {picture: "", name: data.title, middleName: data.genreIds, subName: data.year})
    );
  }
});
module.exports = React.createClass({
  definitionPath: "movie",
  displayName: "peopleFilmography",
  mixins: [formMixin],
  renderActions: function renderActions(){},
  getInitialState: function () {
    this.state = {
      filmography: []
    };
    return this.state;
  },
  stores: [{store: peopleStore, properties: ['filmography']}],
  action: {
    load: function (id) {
      peopleActions.loadFilmography(id);
    }
  },
  renderContent: function render() {
    return (
      React.createElement("div", {className: "slidingBloc"}, 
        React.createElement(Title, {id: "filmography", title: "FILMOGRAPHY"}), 
        React.createElement(FormList, {data: this.state.filmography, line: line, perPage: 5})
      )
    );
  }
});

});

require.register("views/people/peoplePictures", function(exports, require, module) {
var Title = focus.components.common.title.component;
module.exports = React.createClass({
  displayName: "moviePictures",
  render: function render() {
    return (
      React.createElement("div", {className: "slidingBloc noBorderBottom"}, 
        React.createElement(Title, {id: "pictures", title: "PICTURES"})
      )
    );
  }
});

});

require.register("views/people/slidingContent", function(exports, require, module) {
var PeopleDetails = require('./peopleDetails');
var PeopleFilmography = require('./peopleFilmography');
var PeoplePictures = require('./peoplePictures');
var MovieCartridge = require('./cartridge');
module.exports = React.createClass({
    displayName: 'slidingContent',
    render: function renderSlidingContent() {
        return (
            React.createElement("div", {className: "details"}, 
                React.createElement(MovieCartridge, {id: this.props.id, style: {className: 'catridgeContainer'}}), 
                React.createElement("div", {id: "slidingContent"}, 
                    React.createElement(PeopleDetails, {id: this.props.id}), 
                    React.createElement(PeopleFilmography, {id: this.props.id}), 
                    React.createElement(PeoplePictures, {id: this.props.id})
                )
            )
        );
    }
});

});

require.register("views/search-result/index", function(exports, require, module) {
/*global focusComponents, React*/
var MoviePreview = require('./moviePreview');
var PeoplePreview = require('./peoplePreview');
var SearchResult = require('./searchResult');
//Composant d'une ligne.
var PeopleLineComponent = require('./peopleLineComponent');
var MovieLineComponent = require('./movieLineComponent');

//Configuration des props du composant de vue de recherche.
var config = {
  onLineClick: function onLineClick(data) {
    var url = '';
    if (data.movId !== undefined && data.movId !== null) {
      url = '#movie/' + data.movId;
    } else {
      if (data.peoId !== undefined && data.peoId !== null) {
        url = '#people/' + data.peoId;
      }
    }
    Backbone.history.navigate(url, true);
    $('.quick-search-popin .popin-close-btn').click();
    //On ferme la popin de preview si elle est affichée.
    var qsPreview = $('.preview-popin .popin-close-btn');
    if(qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0){
      qsPreview.click();
    }
  },
  operationList: [
    {
      label: '', action: function (data) {
      var Preview = MoviePreview;
      if(!data.movId){
        Preview = PeoplePreview;
      }
      focus.application.render(Preview, '#previewModal',
        {
          props: {
            data: data,
            position: 'right',
            open: true,
            style: {className: 'preview-popin'}
          }
        });
    }, style: {className: 'preview fa fa-eye'}, priority: 1
    }
  ],
  scopes: [
    {code: 'ALL', label: 'ALL'},
    {code: 'MOVIE', label: 'MOVIE'},
    {code: 'PEOPLE', label: 'PEOPLE'}
  ],
  scope: 'ALL',
  idField: 'movId',
  groupMaxRows: 3
};

var parentselector = '.quick-search-popin';

var qs = React.createElement(SearchResult, {
  lineMap: {
    'Movies': MovieLineComponent,
    'People': PeopleLineComponent,
    'MOVIE': MovieLineComponent,
    'PEOPLE': PeopleLineComponent
  },
  onLineClick: config.onLineClick,
  operationList: config.operationList,
  scopeList: config.scopes,
  scope: config.scope,
  idField: config.idField,
  groupMaxRows: config.groupMaxRows,
  parentSelector: parentselector
});

module.exports = React.createClass({displayName: "exports",
  mixins: [focusComponents.application.popin.mixin],
  renderPopinHeader: function (popin) {
    return React.createElement('div', null,
      React.createElement('div', {
        className: 'quick-search-popin-header'
      }, 'Quick search')
    );
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');

  },
  renderContent: function (popin) {
   /* var parentselector;
    if (this.props.style.className !== null && this.props.style.className !== undefined) {
      parentselector = '.' + this.props.style.className;
    }
    return <SearchResult
      lineMap= {{
        'Movies': MovieLineComponent,
        'People': PeopleLineComponent,
        'MOVIE': MovieLineComponent,
        'PEOPLE': PeopleLineComponent
      }}
      onLineClick = {config.onLineClick}
      operationList = {config.operationList}
      scopeList = {config.scopes}
      scope = {config.scope}
      idField = {config.idField}
      groupMaxRows= {config.groupMaxRows}
      parentSelector = {parentselector}/>;*/
    return qs;
  },
  /** @inheritdoc */
  componentDidMount: function popinDidMount() {
    var source = document.querySelector(this.props.displaySelector);
    var currentView = this;
    if(source !== undefined && source !== null){
      source.onclick = function () {
        currentView._toggleOpen();
      };
    }
   /*$('#qs-affix').affix({
      offset: {
        top: 70
      },
     target: '.qs-search-popin'
    });*/
  }
});

});

require.register("views/search-result/movieLineComponent", function(exports, require, module) {
/*global React, focusComponents */
module.exports = React.createClass({displayName: "exports",
  mixins: [focusComponents.list.selection.line.mixin],
  definitionPath: 'movie',
  renderLineContent: function (data) {
    var id = React.createElement('div', null, data.id);
    var logo = React.createElement("div", {className: "movie-background fa fa-film"});
    var movieTilte = this.displayFor('title', {style: {className: 'title-level-1'}});
    var genreIds = this.displayFor('genreIds', {style: {className: 'title-level-2'}});
    var released = this.displayFor('released', {style: {className: 'title-level-3'}});
    if(!data.genreIds){
      genreIds = '';
    }
    if(!data.released){
      released = '';
    }
    var item = React.createElement("div", {className: "item"}, movieTilte, " ", genreIds, " ", released, " ")
    var root = React.createElement('div', null, id, logo, item);
    return root;
  }
});

});

require.register("views/search-result/moviePreview", function(exports, require, module) {
/*global React, focusComponents */
var Field = focusComponents.common.field.component;
module.exports = React.createClass({displayName: "exports",
  mixins: [focusComponents.application.popin.mixin, focusComponents.common.mixin.definition, focusComponents.common.mixin.fieldComponentBehaviour],
  definitionPath: 'movie',
  renderPopinHeader: function (popin) {
    return React.createElement('div', null,
      React.createElement('div', {
        className: 'preview-popin-header'
      }, '')
    );
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');
  },
  renderContent: function (data) {
    var movieLink = '#movie/' + this.props.data.movId;
    var released = React.createElement("div", null);
    if(this.props.data.released !== undefined && this.props.data.released !== null) {
      var options = {
        isEdit: false,
        hasLabel: false,
        value: this.props.data.released,
        refContainer: this.props.data.released,
        style: {className: 'movie-preview-release-date'}
      };
      var fieldProps = this._buildFieldProps('released', options, this);
      released = React.createElement(Field, fieldProps);
    }

    var root = React.createElement("div", null, " ", React.createElement("div", {className: "movie-preview-header"}, 
      React.createElement("div", {className: "movie-preview-picture"}), 
      React.createElement("div", {className: "movie-preview-description"}, 
        React.createElement("div", {className: "title-level-1"}, this.props.data.title), 
        React.createElement("div", {className: "title-level-3"}, "IMBD ID ", React.createElement("span", {className: "movie-preview-imdb-id"}, this.props.data.imdbId)), 
        React.createElement("div", {className: "genres"}, this.props.data.genreIds), 
        React.createElement("div", {className: "description"}, this.props.data.description)
      )
    ), 
    React.createElement("div", {className: "clear"}), 
    React.createElement("div", {className: "movie-preview-detail"}, 
      React.createElement("div", {className: "title"}, " Details"), 
      React.createElement("div", {className: "title-line"}), 
      React.createElement("div", {className: "movie-detail-line"}, React.createElement("div", {className: "movie-detail-label"}, "Country "), React.createElement("div", null, this.props.data.countryIds)), 
      React.createElement("div", {className: "movie-detail-line"}, React.createElement("div", {className: "movie-detail-label"}, "Language "), React.createElement("div", null, this.props.data.languageIds)), 
      React.createElement("div", {className: "movie-detail-line"}, React.createElement("div", {className: "movie-detail-label"}, "Released "), React.createElement("div", null, released)), 
      React.createElement("div", {className: "movie-detail-line"}, React.createElement("div", {className: "movie-detail-label"}, "Runtime "), React.createElement("div", null, this.props.data.runtime))
    ), 
    React.createElement("div", {className: "movie-preview-detailed-sheet"}, React.createElement("a", {onClick: this.detailedSheet, "data-action": movieLink}, "Detailed sheet "))
    );

    return root;
  },

  detailedSheet: function (event){
    event.preventDefault();
    var url = $(event.target).closest('a').attr('data-action');
    Backbone.history.navigate(url, true);
    var qsPopin = $('.quick-search-popin .popin-close-btn');
    if(qsPopin !== undefined && qsPopin !== null && qsPopin.length > 0){
      qsPopin.click();
    }
    var qsPreview = $('.preview-popin .popin-close-btn');
    if(qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0){
      qsPreview.click();
    }
  }
});

});

require.register("views/search-result/peopleLineComponent", function(exports, require, module) {
/*global React, focusComponents */
module.exports = React.createClass({displayName: "exports",
  mixins: [focusComponents.list.selection.line.mixin],
  definitionPath: 'people',
  renderLineContent: function (data) {
    var id = React.createElement('div', null, data.id);
    var logo = React.createElement("div", {className: "movie-background fa fa-user"});
    var userName = this.displayFor('peoName', {style: {className: 'title-level-1'}});
    var item = React.createElement("div", {className: "item"}, userName)
    var root = React.createElement('div', null, id, logo, item);
    return root;
  }
});

});

require.register("views/search-result/peoplePreview", function(exports, require, module) {
/*global React, focusComponents */
var Field = focusComponents.common.field.component;
module.exports = React.createClass({displayName: "exports",
  mixins: [focusComponents.application.popin.mixin, focusComponents.common.mixin.definition, focusComponents.common.mixin.fieldComponentBehaviour],
  definitionPath: 'people',
  renderPopinHeader: function (popin) {
    return React.createElement('div', null,
      React.createElement('div', {
        className: 'preview-popin-header'
      }, '')
    );
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');
  },
  renderContent: function (data) {
    var peopleLink = '#people/' + this.props.data.peoId;

    var root = React.createElement("div", null, " ", React.createElement("div", {className: "movie-preview-header"}, 
      React.createElement("div", {className: "movie-preview-picture"}), 
      React.createElement("div", {className: "movie-preview-description"}, 
        React.createElement("div", {className: "title-level-1"}, this.props.data.peoName), 
        React.createElement("div", {className: "title-level-3"}, "IMBD ID ", React.createElement("span", {className: "movie-preview-imdb-id"}, this.props.data.imdbId))
      )
    ), 
      React.createElement("div", {className: "clear"}), 
      React.createElement("div", {className: "movie-preview-detailed-sheet"}, React.createElement("a", {onClick: this.detailedSheet, "data-action": peopleLink}, "Detailed sheet "))
    );

    return root;
  },
  detailedSheet: function (event){
    event.preventDefault();
    var url = $(event.target).closest('a').attr('data-action');
    Backbone.history.navigate(url, true);
    var qsPopin = $('.quick-search-popin .popin-close-btn');
    if(qsPopin !== undefined && qsPopin !== null && qsPopin.length > 0){
      qsPopin.click();
    }
    var qsPreview = $('.preview-popin .popin-close-btn');
    if(qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0){
      qsPreview.click();
    }
  }
});

});

require.register("views/search-result/searchResult", function(exports, require, module) {
/*global React, focusComponents*/
var action = require('../../action/search/quickSearch');

module.exports = React.createClass({displayName: "exports",
  mixins: [focusComponents.page.search.searchResult.mixin],
  actions: action,
  store: new focus.store.SearchStore(),
  render: function render() {
    var qs = this.quickSearchComponent();
    var summary = React.createElement("div", null);
    var helpContainer = React.createElement("div", null);
    var scope = this.state.scope;
    var mountedHelp = $('.qs-help-container').html('');
    if(mountedHelp !== undefined && mountedHelp !== null && mountedHelp.length > 0){
      mountedHelp.html('');
      mountedHelp.toggleClass('qs-help-container');
    }
    if (this.state.totalRecords !== undefined && this.state.totalRecords !== null) {
      var groupKey = 'Movies';
      var faIconClass = 'fa fa-film';
      if(scope !== null && scope !== undefined) {
        if (scope.toLowerCase() === 'people') {
          groupKey = 'People';
          faIconClass = 'fa fa-user';
        }
      } else {
        //TODO Check avec PIERRRE.
        if(this.state.list.length > 0){
          if(this.state.list[0].peoId !== null && this.state.list[0].peoId !== undefined){
            scope = 'PEOPLE';
            groupKey = 'People';
            faIconClass = 'fa fa-user';
          }
        }
      }
     var resultsContent = React.createElement("div", {className: "title-group-key"}, React.createElement("i", {className: faIconClass}), " ", groupKey, " (", this.state.totalRecords, ") ");
      if(!this.isSimpleList()) {
        resultsContent = React.createElement("div", null, "Total records (", this.state.totalRecords, ")");
      }
      var linkFilterResult = React.createElement("div", null);
      if (this.state.totalRecords > 0) {
        if (scope !== null && scope !== undefined) {
          if (scope.toLowerCase() !== 'all') {
            var url = '#search/advanced/scope/' + scope + '/query/' + this.state.query;
            linkFilterResult = React.createElement("div", {className: "linkAdvancedSearch"}, " ", React.createElement("a", {onClick: this.advancedSearch, "data-action": url}, "Advanced search"));
          }
        }
        helpContainer = React.createElement("div", {className: "qs-help-container"}, 
          React.createElement("div", null, React.createElement("img", {src: "./static/img/arrow-help.png"})), 
          React.createElement("div", null, "Hover over a line and click on ", React.createElement("i", {className: "fa fa-eye"}), " to see a preview")
        );
      }
      summary = React.createElement('div', {className: 'group-result-header'}, resultsContent, linkFilterResult);
    }
    var type = 'MOVIE';
    if(scope !== undefined && scope !== null){
        type = scope;
    } else {
      //TODO Check avec PIERRRE.
      if(this.state.list.length > 0){
        if(this.state.list[0].peoId !== null && this.state.list[0].peoId !== undefined){
          type = 'PEOPLE';
        }
      }
    }
    var list = this.isSimpleList() ? this.simpleListComponent({type: type}) : this.groupByListComponent();
    var qsAffix = React.createElement("div", {id: "qs-affix"}, " ", qs)
    var root = React.createElement('div', {className: 'search-panel'}, qsAffix, summary, list, helpContainer);
    return root;
  },
  renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
    var summary;
    var mostRelevent = React.createElement("div", null);
    var scope = 'PEOPLE';
    var faIconClass = 'fa fa-user';
    if (groupKey.toLowerCase().indexOf('movie') >= 0) {
      scope = 'MOVIE';
      faIconClass = 'fa fa-film';
    }
    var title = React.createElement("div", {className: "title-group-key"}, React.createElement("i", {className: faIconClass}), " ", groupKey);
    if (list.length > 3) {
      title = React.createElement("div", {className: "title-group-key"}, React.createElement("i", {className: faIconClass}), " ", groupKey, " (", list.length, ")");
    }

    var linkFilterResult = React.createElement("div", null);
    var criteria = this.getCriteria();

    if (list.length > 0) {
      var url = '#search/advanced/scope/' + scope + '/query/' + criteria.query;
      linkFilterResult = React.createElement("div", {className: "linkAdvancedSearch"}, " ", React.createElement("a", {onClick: this.advancedSearch, "data-action": url}, "Advanced search"));
      if(list.length >= 3){
        mostRelevent = React.createElement("div", {className: "qs-results-most-relevents"}, "The 3 most relevents");
      }
    }
    summary = React.createElement("div", null, mostRelevent, " ", linkFilterResult);
    var goupHeader = React.createElement('div', {className: 'group-result-header'}, title, summary);

    return React.createElement('div', {className: 'listResultContainer panel qs-group-results'},
      goupHeader,
      this.simpleListComponent(
        {type: groupKey, list: list, maxRows: maxRows}));

  },
  advancedSearch: function (event){
    event.preventDefault();
    var url = $(event.target).closest('a').attr('data-action');
    Backbone.history.navigate(url, true);
    $('.quick-search-popin .popin-close-btn').click();
  }

});

});

