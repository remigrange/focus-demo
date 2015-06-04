(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
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
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
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
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
require.register("action/index", function(exports, require, module) {
"use strict";

var AppDispatcher = Focus.dispatcher;
//var fetch = require('../../core/fetch');
//var URL = require('../../config/server');

var data = [{ id: 1, title: "toto", body: "ceci est un test" }, { id: 2, title: "tata", body: "deuxieme test" }];
var countId = 3;
module.exports = {
    searchByScope: function search(criteria) {
        var url = "./searchByScope";
        //Promisify.model(url, {}).fetch();
        // Promisify.collection(url).search({criteria: criteria, pagesInfos: pagesInfos});
        //AppDispatcher.handleServerAction()
        return fetch.model(url, {}).fetch();
    }
};

});

require.register("action/movie/index", function(exports, require, module) {
'use strict';

var movieServices = require('../../services').movie;
var actionBuilder = Focus.application.actionBuilder;
module.exports = {
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

});

require.register("action/navigation/index", function(exports, require, module) {
"use strict";

module.exports = {
    navigate: function navigate(route) {
        Backbone.hsitory.navigate("#" + route);
    }
};

});

require.register("action/people/index", function(exports, require, module) {
'use strict';

var AppDispatcher = Focus.dispatcher;
var peopleServices = require('../../services').people;
module.exports = {
    load: function load(id) {
        peopleServices.getPeopleViewById(id).then(function (data) {
            AppDispatcher.handleServerAction({
                data: { people: data },
                type: 'update'
            });
        });
    },

    loadFilmography: function loadFilmography(id) {
        peopleServices.getPeopleFilmographyById(id).then(function (data) {
            AppDispatcher.handleServerAction({
                data: { filmography: { filmography: data } },
                type: 'update'
            });
        });
    }
};

});

require.register("action/search/filterSearch/index", function(exports, require, module) {
'use strict';

var services = require('../../../services');

module.exports = {
    search: function search(criteria) {
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
        services.search.searchByScope(criteria).then(function success(data) {

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
            Focus.dispatcher.handleServerAction({ data: dataRet, type: 'update' });
        }, function error(errors) {
            console.info('Errrors: ', errors);
        });
    }
};
});

require.register("action/search/index", function(exports, require, module) {
'use strict';

var services = require('../../services');

module.exports = {
    search: function search(criteria) {
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
        services.search.searchByScope(criteria).then(function success(data) {

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
            Focus.dispatcher.handleServerAction({ data: dataRet, type: 'update' });
        }, function error(errors) {
            console.info('Errrors: ', errors);
        });
    }
};

});

require.register("action/search/quickSearch", function(exports, require, module) {
'use strict';

var services = require('../../../services');

module.exports = {
    search: function search(criteria) {
        var page = 0;
        if (criteria.pageInfos.page !== undefined && criteria.pageInfos.page !== null) {
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
        services.search.searchByScope(critere).then(function success(data) {
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
            Focus.dispatcher.handleServerAction({ data: dataRet, type: 'update' });
        }, function error(errors) {
            console.info('Errrors ', errors);
        });
    }
};

});

require.register("application", function(exports, require, module) {
'use strict';

console.info('############# Application starting ############');
//Start the application.
console.info('Load all the routes.');
require('./router');
//Start the router.
Backbone.history.start();

});

require.register("config/domain/index", function(exports, require, module) {
"use strict";

module.exports = {
    "DO_BOOLEEN": {
        "type": "boolean"
    },
    "DO_DATE": {
        "type": "text",
        "decorator": "datePicker",
        "style": "date right",
        "format": {
            "value": function value(data) {
                return data;
            }
        }, "InputComponent": Focus.components.common.input.date.component,
        "formatter": function formatter(date) {
            return moment(date).format("L");
        }

    },
    "DO_MONTANT": {
        "type": "number",
        "validation": [{
            "type": "number",
            "options": { "min": 0 }
        }],
        "symbol": "€",
        "format": {
            "value": function value(data) {
                return data;
            }
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
            "options": { "min": 0 }
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
            "value": function value(data) {
                return data;
            }
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
        }] //,
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
"use strict";

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
'use strict';

module.exports = {
    movie: require('./movie'),
    people: require('./people'),
    search: require('./search'),
    reference: require('./reference')
};

});

require.register("config/server/movie", function(exports, require, module) {
"use strict";

var root = "./movies/";
var url = Focus.util.url.builder;
module.exports = {
    getAll: url(root, "GET"),
    update: url(root + "${id}", "PUT"),
    create: url(root, "POST"),
    get: url(root + "${id}", "GET"),
    actors: url(root + "${id}/" + "actors", "GET"),
    producers: url(root + "${id}/" + "producers", "GET"),
    directors: url(root + "${id}/" + "directors", "GET"),
    movieView: url(root + "${id}/" + "details", "GET"),
    castings: url(root + "${id}/" + "castings", "GET")
};

});

require.register("config/server/people", function(exports, require, module) {
"use strict";

var root = "./people/";
var url = Focus.util.url.builder;
module.exports = {
  getAll: url(root, "GET"),
  update: url(root + "${id}/", "PUT"),
  create: url(root, "POST"),
  get: url(root + "${id}/", "GET"),
  peopleView: url(root + "${id}/" + "peopleView", "GET"),
  movies: url(root + "${id}/" + "movies", "GET"),
  filmography: url(root + "${id}/" + "filmography", "GET")
};

});

require.register("config/server/reference", function(exports, require, module) {
"use strict";

var root = ".";
var url = Focus.util.url.builder;
module.exports = {
    getScopes: url(root + "/scopes", "GET")
};

});

require.register("config/server/search", function(exports, require, module) {
'use strict';

var root = '.';
var url = Focus.util.url.builder;
module.exports = {
    searchByScope: url(root + '/searchByScope?sortFieldName=${sortFieldName}&sortDesc=${sortDesc}&skip=${skip}', 'POST')
};

});

require.register("config/url/index", function(exports, require, module) {
'use strict';

var root = require('../../conf.json').url + 'movies/';
module.exports = {
  getAll: function getAll() {
    return {
      url: root,
      method: 'GET'
    };
  },
  save: function save() {
    return {
      url: root,
      method: 'POST'
    };
  }
};

});

require.register("i18n/en-GB", function(exports, require, module) {
'use strict';

module.exports = {
    'live': {
        'filter': {
            'title': 'Filter results'
        }
    },
    'result': {
        'for': 'results for'
    },

    'movie': {
        'title': 'Movie',
        'detail': {
            'identity': {
                'title': 'Identity'
            },
            'cast': {
                'title': 'Cast'
            },
            'producers': {
                'title': 'Producers'
            },
            'directors': {
                'title': 'Directors'
            },
            'pictures': {
                'title': 'Pictures'
            }
        }
    }
};

});

require.register("i18n/generated/fr-FR.generated", function(exports, require, module) {
/**
 * Attention ce fichier est généré automatiquement !
 * DtDefinitionsLabel
 */

"use strict";

module.exports = {
    "searchCriteria": {
        "scope": "The Scope",
        "searchText": "Search Text",
        "query": "query"
    },
    "searchRet": {
        "type": "Type of the object",
        "field1": "Field 1",
        "field2": "Field 2",
        "field3": "Field 3",
        "field4": "Field 4"
    },
    "selectedFacet": {
        "key": "Facet Name",
        "facetQuery": "Facet query",
        "value": "Facet key value"
    },
    "fileInfo": {
        "filId": "FIL_ID",
        "fileName": "FILE_NAME",
        "mimeType": "MIME_TYPE",
        "length": "LENGTH",
        "lastModified": "LAST_MODIFIED",
        "filePath": "FILE_PATH"
    },
    "country": {
        "couCd": "COU_CD",
        "label": "Label"
    },
    "genre": {
        "genCd": "GEN_CD",
        "label": "Label"
    },
    "language": {
        "lanCd": "LAN_CD",
        "label": "Label"
    },
    "roleMovie": {
        "rlmCd": "RLM_CD",
        "label": "Label"
    },
    "title": {
        "titCd": "TIT_CD",
        "label": "Label"
    },
    "alias": {
        "alsId": "ALS_ID",
        "title": "Title",
        "addition": "addition"
    },
    "movie": {
        "movId": "MOV_ID",
        "title": "TITLE",
        "released": "Released",
        "year": "Year",
        "runtime": "Runtime",
        "description": "Description",
        "metadasJson": "metadas Json",
        "imdbid": "imdbID",
        "genreIds": "Genres",
        "countryIds": "Contries",
        "languageIds": "Languages"
    },
    "movieCasting": {
        "castId": "primary key",
        "peoName": "Name",
        "role": "Role",
        "characterName": "Character name",
        "fileName": "File name",
        "mimeType": "MIME type",
        "filePath": "File path"
    },
    "movieCriteria": {
        "movId": "primary key",
        "title": "Title",
        "released": "Released",
        "year": "Year",
        "runtime": "Runtime",
        "description": "Description"
    },
    "movieIndex": {
        "movId": "primary key",
        "title": "Title",
        "titleSortOnly": "Title",
        "released": "Released",
        "year": "Year",
        "runtime": "Runtime",
        "description": "Description",
        "imdbid": "Id imdb",
        "genreIds": "Genres",
        "countryIds": "Contries",
        "languageIds": "Languages",
        "rank": "rank"
    },
    "movieResult": {
        "movId": "primary key",
        "title": "Title",
        "released": "Released",
        "year": "Year",
        "runtime": "Runtime",
        "description": "Description",
        "metadasJson": "Meta Data JSON",
        "imdbid": "Id imdb",
        "genreIds": "Genres",
        "countryIds": "Contries",
        "languageIds": "Languages"
    },
    "movieView": {
        "movId": "primary key",
        "title": "Title",
        "titleSortOnly": "Title",
        "released": "Released",
        "year": "Year",
        "runtime": "Runtime",
        "description": "Description",
        "metadasJson": "Meta Data JSON",
        "imdbid": "Id imdb",
        "genreIds": "Genres",
        "countryIds": "Contries",
        "languageIds": "Languages",
        "rank": "rank",
        "actors": "Actors",
        "producers": "Producers",
        "directors": "Directors"
    },
    "casting": {
        "castId": "Cast_id",
        "characterName": "Character name",
        "peoId": "People",
        "movId": "Movie",
        "rlmCd": "Role movie"
    },
    "people": {
        "peoId": "PEO_ID",
        "lastName": "Last Name",
        "firstName": "First Name",
        "peoName": "Peo Name",
        "imdbid": "imdbID",
        "comment": "Commentaire",
        "fileName": "File name",
        "mimeType": "MIME type",
        "filePath": "File path",
        "titCd": "Title"
    },
    "peopleCriteria": {
        "peoId": "primary key",
        "lastName": "Last name",
        "firstName": "First Name",
        "titCd": "Title",
        "peoName": "Name"
    },
    "peopleIndex": {
        "peoId": "primary key",
        "lastName": "Last name",
        "firstName": "First Name",
        "titCd": "Title",
        "peoName": "Name",
        "imdbid": "Id imdb",
        "peoNameSortOnly": "Name",
        "professions": "Professions",
        "rank": "rank"
    },
    "peopleResult": {
        "peoId": "primary key",
        "lastName": "Last name",
        "firstName": "First Name",
        "titCd": "Title",
        "peoName": "Name",
        "imdbid": "Id imdb",
        "professions": "Professions",
        "rank": "rank"
    },
    "peopleView": {
        "peoId": "primary key",
        "lastName": "Last name",
        "firstName": "First Name",
        "titCd": "Title",
        "peoName": "Name",
        "peoNameSortOnly": "Name",
        "imdbid": "Id imdb",
        "professions": "Professions",
        "rank": "rank"
    },
    "rolePeople": {
        "rlpId": "RLP_ID",
        "comment": "Comment",
        "peoId": "People",
        "movId": "Movie",
        "rlmCd": "Role movie"
    },
    "applicationUser": {
        "usrId": "USR_ID",
        "lastName": "Last Name",
        "firstName": "First Name",
        "email": "email",
        "proId": "Profil"
    },
    "profil": {
        "proId": "PRO_ID",
        "label": "Label"
    },
    "securityRole": {
        "sroCd": "SRO_CD",
        "label": "Label"
    },
    "userAuthentification": {
        "authId": "AUTH_ID",
        "login": "Login",
        "password": "Password",
        "usrId": "Application user"
    }
};

});

require.register("i18n/index", function(exports, require, module) {
'use strict';

var combineHelper = require('../lib/combineFunction');

var english = combineHelper.combine(require('./en-GB'), require('./generated/fr-FR.generated'));
//module.exports = {'en-GB': {translation: require('./generated/fr-FR.generated')}};
module.exports = { 'en-GB': { translation: english } };

});

require.register("index", function(exports, require, module) {
/*global Backbone*/

'use strict';

console.log('Application demo rodoplphe');

//Write focusComponents into Focus.components
Focus.components = FocusComponents;

//Initialisation des configurations et du layout.
require('./initializer');

// Démarrage de l'application
require('./application');

//Render all application modules for the first time.
//React.render(<AlertModule />, document.querySelector('#notification-center'));

});

require.register("initializer/definition-initializer", function(exports, require, module) {
/*global focus*/
'use strict';

Focus.definition.entity.container.setEntityConfiguration(require('../config/entityDefinition'));

//Display domaines utilisés
var entityDef = require('../config/entityDefinition');
var arr = [];
for (var node in entityDef) {
  for (var sub in entityDef[node]) {
    arr.push(entityDef[node][sub].domain);
  }
};
var appDomains = _.uniq(arr);
var domains = Object.keys(require('../config/domain'));
console.info('########################## DOMAINS ##############################');
console.info('Entity definitions domains: ', appDomains);
console.info('Domains with a definition', domains);
console.warn('Missing domain\'s definition', _.difference(appDomains, domains));
console.info('####################################################################');

});

require.register("initializer/domain-initializer", function(exports, require, module) {
/*global focus*/
'use strict';

Focus.definition.domain.container.setAll(require('../config/domain'));

});

require.register("initializer/i18n-initializer", function(exports, require, module) {
//Initialize translations configuration.
'use strict';

var i18nConfig = {
  resStore: require('../i18n'),
  lng: 'en-GB' ///langOpts.i18nCulture
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
i18n.init(i18nConfig, function (content) {
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
"use strict";

$(document).on("click", "a:not([data-bypass])", function (evt) {
  var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
  var root = location.protocol + "//" + location.host + "/";

  if (href.prop && href.prop.slice(0, root.length) === root) {
    evt.preventDefault();
    Backbone.history.navigate(href.attr, true);
  }
});

//Initialisation des congfigurations
require("./domain-initializer");
require("./definition-initializer");
require("./reference_list_initializer").initialize();
require("./i18n-initializer");

//Initialisation du layout
//
require("./layout-initializer");

});

require.register("initializer/layout-initializer", function(exports, require, module) {
'use strict';

var render = Focus.application.render;
var Layout = Focus.components.application.layout.component;
var MenuLeft = require('views/menu');

render(Layout, 'body', {
    props: {
        MenuLeft: MenuLeft
    }
});

});

require.register("initializer/reference_list_initializer", function(exports, require, module) {
//Path to the reference service.
/*global focus */
'use strict';

var serviceReference = require('../services');
var reference = Focus.reference;

module.exports = {
    initialize: function initialize(options, context) {
        reference.config.set({ 'scopes': serviceReference.refernce.getScopes });
        reference.builder.loadListByName('scopes');
    }
};

});

require.register("lib/combineFunction", function(exports, require, module) {
// Unflatten a json object.
// from an object `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
// Gives a `{contact: {nom: "nom", prenom: "prenom"}}`
"use strict";

JSON.unflatten = function (data) {
    if (Object(data) !== data || Array.isArray(data)) return data;
    if ("" in data) return data[""];
    var result = {},
        cur,
        prop,
        idx,
        last,
        temp;
    for (var p in data) {
        cur = result;
        prop = "";
        last = 0;
        do {
            idx = p.indexOf(".", last);
            temp = p.substring(last, idx !== -1 ? idx : undefined);
            cur = cur[prop] || (cur[prop] = !isNaN(parseInt(temp)) ? [] : {});
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
JSON.flatten = function (data) {
    var result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++) recurse(cur[i], prop ? prop + "." + i : "" + i);
            if (l === 0) result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty) result[prop] = {};
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
};

module.exports = {
    combine: combine
};

});

require.register("router/index", function(exports, require, module) {
/*global Backbone, focus, Focus.components */
//Dependencies.
'use strict';

var Router = Focus.router;
var render = Focus.application.render;

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
    this._pageContent(HomeView, { props: { position: 'left', open: true, style: { className: 'home-popin' } } });
  },
  movie: function handleMovieRoute(id) {
    console.log('ROUTE: MOVIE');
    var MovieDetailView = require('../views/movie');
    this._pageContent(MovieDetailView, { props: { id: id } });
  },
  people: function handlePeopleRoute(id) {
    console.log('ROUTE: PEOPLE');
    var PeopleDetailView = require('../views/people');
    // renderMenu();
    this._pageContent(PeopleDetailView, { props: { id: id } });
  },
  filterResult: function handleFilterResult(scope, query) {
    console.log('ROUTE: FILTER RESULT');
    if (!scope) {
      //set defaut to MOVIE
      scope = 'MOVIE';
    }
    if (!query) {
      //set defaut to empty
      query = '';
    }
    var FilterResultView = require('../views/filter-result');
    //renderMenu();
    this._pageContent(FilterResultView, { props: { scope: scope, query: query } });
  },

  searchResult: function handleSearchResult() {
    console.log('ROUTE: SEARCH RESULT');
    var SearchResultView = require('../views/search-result');
    // renderMenu();
    this._pageContent(SearchResultView, { props: { position: 'left', open: true, displaySelector: 'a[href="#search/quick"]', style: { className: 'quick-search-popin' } } });
  }
});
module.exports = new AppRouter();

});

require.register("services/index", function(exports, require, module) {
'use strict';

module.exports = {
    search: require('./search'),
    movie: require('./movie'),
    people: require('./people'),
    refernce: require('./reference')
};

});

require.register("services/movie", function(exports, require, module) {
'use strict';

var URL = require('../../config/server');
var fetch = Focus.network.fetch;
module.exports = {
  getMovieById: function getMovieById(id) {
    return fetch(URL.movie.get({ urlData: { id: id } }));
  },
  getMovieViewById: function getMovieViewById(id) {
    return fetch(URL.movie.movieView({ urlData: { id: id } }));
  },
  getMovieCastingsById: function getMovieCastingsById(id) {
    return fetch(URL.movie.castings({ urlData: { id: id } }));
  },

  getMovieProducersById: function getMovieProducersById(id) {
    return fetch(URL.movie.producers({ urlData: { id: id } }));
  },

  getMovieDirectorsById: function getMovieDirectorsById(id) {
    return fetch(URL.movie.directors({ urlData: { id: id } }));
  },

  updateMovie: function updateMovie(jsonMovie) {
    return fetch(URL.movie.update({ urlData: { id: jsonMovie.movId }, data: jsonMovie }));
  }
};

});

require.register("services/people", function(exports, require, module) {
'use strict';

var URL = require('../../config/server');
var fetch = Focus.network.fetch;
module.exports = {
    getPeopleViewById: function getPeopleViewById(id) {
        return fetch(URL.people.peopleView({ urlData: { id: id } }));
    },
    getPeopleFilmographyById: function getPeopleFilmographyById(id) {
        return fetch(URL.people.filmography({ urlData: { id: id } }));
    }
};

});

require.register("services/reference", function(exports, require, module) {
'use strict';

var URL = require('../../config/server');
var fetch = Focus.network.fetch;
module.exports = {
    getScopes: function getScopes(id) {
        return fetch(URL.reference.getScopes({}));
    }
};

});

require.register("services/search", function(exports, require, module) {
'use strict';

var URL = require('../../config/server');
var fetch = Focus.network.fetch;
module.exports = {
    searchByScope: function searchByScope(criteria) {
        return fetch(URL.search.searchByScope({ urlData: criteria.pageInfos, data: criteria }));
    }
};

});

require.register("stores/movie", function(exports, require, module) {
/* global focus*/
/**
 * Store dealing with the movie subject.
 * @type {focus}
 */
'use strict';

var movieStore = new Focus.store.CoreStore({
    definition: {
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
'use strict';

var peopleStore = new Focus.store.CoreStore({
    definition: {
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
'use strict';

var referenceStore = new Focus.store.CoreStore({
    definition: {
        'reference': 'reference'
    }
});
module.exports = referenceStore;

});

require.register("stores/search", function(exports, require, module) {
"use strict";

module.exports = new Focus.store.SearchStore();

});

require.register("views/filter-result/filterResult", function(exports, require, module) {
/*global React, Focus.components */
'use strict';

var Title = Focus.components.common.title.component;
var Button = Focus.components.common.button.action.component;
var action = require('../../action/search/filterSearch');

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [Focus.components.page.search.filterResult.mixin],
  actions: action,
  store: new Focus.store.SearchStore(),
  render: function render() {
    var list = this.isSimpleList() ? this.simpleListComponent({ type: this.props.criteria.scope.toLowerCase() }) : this.groupByListComponent();
    var root = React.createElement('div', { className: 'search-result' }, this.liveFilterComponent(), React.createElement('div', { className: 'resultContainer' }, this.listSummaryComponent(), this.actionBarComponent(), list));
    return root;
  },
  renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
    var buttonSeeMore = React.createElement('div', null);
    if (list.length > this.props.groupMaxRows && maxRows <= this.props.groupMaxRows) {
      buttonSeeMore = React.createElement(Button, { handleOnClick: this.changeGroupByMaxRows(groupKey, 10), label: 'See More', className: 'btn-show-all' });
    }
    return React.createElement(
      'div',
      { className: 'listResultContainer panel' },
      React.createElement(Title, { className: 'results-groupBy-title', title: groupKey }),
      this.simpleListComponent({ type: this.props.criteria.scope.toLowerCase(), list: list, maxRows: maxRows }),
      React.createElement(
        'div',
        { className: 'btn-group-by-container' },
        React.createElement(
          'div',
          { className: 'btn-see-more' },
          buttonSeeMore
        ),
        React.createElement(
          'div',
          { className: 'btn-show-all' },
          React.createElement(Button, { handleOnClick: this.showAllGroupListHandler(groupKey), label: 'Show all' })
        )
      )
    );
  }
});
});

require.register("views/filter-result/index", function(exports, require, module) {
/*global Focus.components, React */
'use strict';

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
    openedFacetList: { Genre: true },
    orderableColumnList: [{ key: 'TITLE_SORT_ONLY', order: 'desc', label: 'Title desc' }, { key: 'TITLE_SORT_ONLY', order: 'asc', label: 'Title asc' }, { key: 'GENRE_IDS', order: 'desc', label: 'Genre desc' }, { key: 'GENRE_IDS', order: 'asc', label: 'Genre asc' }],
    operationList: [],
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

module.exports = React.createClass({
    displayName: 'exports',

    render: function render() {
        config.criteria = {
            scope: this.props.scope,
            searchText: this.props.query
        };
        if (this.props.scope.toLowerCase() === 'movie') {
            config.idField = 'movId';
        } else if (this.props.scope.toLowerCase() === 'people') {
            config.idField = 'peoId';
            config.facetConfig = {
                Profession: 'text',
                Title: 'text'
            };
            config.openedFacetList = { Title: true };
            config.orderableColumnList = [{ key: 'PEO_NAME_SORT_ONLY', order: 'desc', label: 'Name desc' }, { key: 'PEO_NAME_SORT_ONLY', order: 'asc', label: 'Name asc' }];
        }
        return React.createElement(FilterResult, {
            facetConfig: config.facetConfig,
            openedFacetList: config.openedFacetList,
            orderableColumnList: config.orderableColumnList,
            operationList: config.operationList,
            lineMap: { 'movie': MovieLineComponent, 'people': PeopleLineComponent },
            onLineClick: config.onLineClick,
            isSelection: config.isSelection,
            lineOperationList: config.lineOperationList,
            criteria: config.criteria,
            idField: config.idField,
            groupMaxRows: config.groupMaxRows
        });
    }
});
});

require.register("views/header/index", function(exports, require, module) {
//Needed components
'use strict';

var Header = Focus.components.application.header.component;
var Cartridge = Focus.components.application.cartridge.component;
var ContentBar = Focus.components.application.contentBar.component;
var Bar = Focus.components.application.bar.component;
var ContentActions = Focus.components.application.contentActions.component;

module.exports = React.createClass({
  displayName: 'AppHeader',
  render: function renderApplicationHeader() {
    return React.createElement(
      Header,
      null,
      React.createElement(
        ContentBar,
        null,
        React.createElement(Bar, { appName: 'FOCUS' }),
        React.createElement(Cartridge, null)
      ),
      React.createElement(ContentActions, null)
    );
  }
});
});

require.register("views/home/index", function(exports, require, module) {
/* global React, Focus.components */
'use strict';

module.exports = React.createClass({
  displayName: 'exports',

  render: function renderPeopleView() {
    return React.createElement(
      'div',
      { className: 'welcome-title' },
      'Welcome page'
    );
  }
});
});

require.register("views/menu/index", function(exports, require, module) {
// Mixins

'use strict';

var menuMixin = Focus.components.application.menu.mixin;

// Components

var Popin = Focus.components.application.popin.component;
var QuickSearch = require('views/search/quick-search');

var Menu = React.createClass({
    displayName: 'Menu',

    mixins: [menuMixin],
    renderContent: function renderContent() {
        if (this.props.type === 'menuLeft') {
            return this.props.links.map(function (link) {
                if (!link.img) {
                    return React.createElement(
                        'a',
                        { href: link.url },
                        'link.title'
                    );
                } else {
                    return React.createElement(
                        'a',
                        { href: link.url },
                        React.createElement('img', { src: link.img })
                    );
                }
            });
        }
        return this.renderLinks();
    }
});

var Wrapper = React.createClass({
    displayName: 'Wrapper',

    _getItems: function _getItems() {
        return [{
            icon: 'home',
            route: 'home',
            onClick: this._closeQuickSearchPopin
        }, {
            icon: 'search',
            onClick: this._toggleQuickSearchPopin
        }, {
            icon: 'video-camera',
            route: '',
            onClick: this._closeQuickSearchPopin
        }, {
            icon: 'user',
            route: '',
            onClick: this._closeQuickSearchPopin
        }, {
            icon: 'cog',
            route: '',
            onClick: this._closeQuickSearchPopin
        }, {
            icon: 'info-circle',
            route: '',
            onClick: this._closeQuickSearchPopin
        }];
    },
    _toggleQuickSearchPopin: function _toggleQuickSearchPopin() {
        this.refs['quick-search-popin'].toggleOpen();
    },
    _closeQuickSearchPopin: function _closeQuickSearchPopin() {
        // for now the popin is controlled this way, maybe a future improvement would be to use the "opened" prop of the popin
        if (this._quickSearchPopinOpened) {
            this._quickSearchPopinOpened = false;
            this._toggleQuickSearchPopin();
        }
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Menu, {
                open: true,
                position: 'left',
                direction: 'vertical',
                title: '',
                items: this._getItems(),
                ref: 'menu'
            }),
            React.createElement(
                Popin,
                { 'data-focus': 'quick-search-popin', ref: 'quick-search-popin', type: 'from-menu' },
                React.createElement(QuickSearch, { closePopin: this._closeQuickSearchPopin })
            )
        );
    }
});

module.exports = Wrapper;
});

require.register("views/movie/cartridge", function(exports, require, module) {
/*global React*/
'use strict';

var formMixin = Focus.components.common.form.mixin;
var movieActions = require('../../action/movie').movie;
var movieStore = require('../../stores/movie');

var Field = React.createClass({
    displayName: 'Field',

    getDefaultProps: function getDefaultProps() {
        return {
            title: ''
        };
    },
    render: function renderField() {
        return React.createElement(
            'div',
            { className: 'field' },
            React.createElement(
                'div',
                { className: 'title' },
                this.props.title
            ),
            React.createElement(
                'div',
                { className: 'content' },
                this.props.children
            )
        );
    }

});

module.exports = React.createClass({
    definitionPath: 'movie',
    displayName: 'MovieCartridge',
    mixins: [formMixin],
    stores: [{ store: movieStore, properties: ['movie'] }],
    action: movieActions,
    renderContent: function renderMovieCartridge() {
        return React.createElement(
            'div',
            { className: 'cartridge-movie' },
            React.createElement(
                'div',
                { className: 'poster' },
                'Movie Poster'
            ),
            React.createElement(
                'div',
                { className: 'summary' },
                React.createElement(
                    'h1',
                    { className: 'title' },
                    this.state.title
                ),
                React.createElement(
                    'h2',
                    { className: 'year' },
                    this.state.year
                ),
                React.createElement(
                    'h3',
                    { className: 'country' },
                    this.state.countryIds
                )
            )
        );
    }
});
});

require.register("views/movie/castings", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
'use strict';

var formMixin = Focus.components.common.form.mixin;
var movieCastingActions = require('../../action/movie').castings;
var movieStore = require('../../stores/movie');
var Block = Focus.components.common.block.component;
var PeopleCard = require('./component/peopleCard');
var line = React.createClass({
  displayName: 'line',

  definitionPath: 'people',
  mixins: [Focus.components.list.selection.line.mixin],
  renderLineContent: function renderLineContent(data) {
    return React.createElement(PeopleCard, { picture: '', name: data.peoName, subName: 'As (' + data.role + ') ' + (data.characterName !== undefined ? data.characterName : '') });
  }
});
module.exports = React.createClass({
  definitionPath: 'people',
  displayName: 'movieCastings',
  mixins: [formMixin],
  stores: [{ store: movieStore, properties: ['castings'] }],
  action: movieCastingActions,
  renderContent: function renderContentCastings() {
    return React.createElement(
      Block,
      { title: 'movie.detail.cast.title' },
      this.listFor('castings', { LineComponent: line })
    );
  }
});
});

require.register("views/movie/component/peopleCard", function(exports, require, module) {
'use strict';

module.exports = React.createClass({
    displayName: 'exports',

    render: function renderPeopleCard() {
        return React.createElement(
            'div',
            { className: 'people-line' },
            React.createElement(
                'div',
                { className: 'icon' },
                React.createElement('i', { className: 'fa fa-user fa-3x' })
            ),
            React.createElement(
                'div',
                { className: 'name level1' },
                this.props.name
            ),
            React.createElement(
                'div',
                { className: 'subName level2' },
                this.props.subName
            )
        );
    }
});
});

require.register("views/movie/index", function(exports, require, module) {
/*global React, Focus */
//Récupération des dépendances.
'use strict';

var createDetail = Focus.components.page.createDetail;
var Detail = Focus.components.common.detail.component;

//Blocs composants la page.
var MovieDetails = require('./movieDetails');
var Castings = require('./castings');
var MovieProducers = require('./movieProducers');
var MovieDirectors = require('./movieDirectors');
var MoviePictures = require('./moviePictures');
//Composants du cartouche
var SummaryMovie = React.createClass({
  displayName: 'SummaryMovie',

  render: function render() {
    return React.createElement(
      'div',
      null,
      'SUMMARY ',
      this.props.id || 'no Id',
      ' ..............'
    );
  }
});

var CartridgeMovie = require('./cartridge');

/**
 * Page représentant le détail de la fiche d'un film.
 */
module.exports = createDetail({
  displayName: 'MovieView',
  cartridgeConfiguration: function cartridgeConfiguration() {
    var props = { id: this.props.id, hasForm: false };
    return {
      summary: { component: SummaryMovie, props: props },
      cartridge: { component: CartridgeMovie, props: props },
      actions: {
        primary: [{ label: 'imprimer', action: function action() {
            console.log('print primaire');
          }, icon: 'print' }, { label: 'archiver', action: function action() {
            console.log('archiver primaire');
          }, icon: 'archive' }],
        secondary: [{ label: 'imprimer Secondaire', action: function action() {
            console.log('print secondaire');
          }, icon: 'print' }, { label: 'archiver', action: function action() {
            console.log('archiver secondaire');
          }, icon: 'archive' }]
      }
    };
  },
  render: function renderMovieView() {
    return React.createElement(
      Detail,
      null,
      React.createElement(MovieDetails, { id: this.props.id }),
      React.createElement(Castings, { id: this.props.id }),
      React.createElement(MovieProducers, { id: this.props.id }),
      React.createElement(MovieDirectors, { id: this.props.id }),
      React.createElement(MoviePictures, { id: this.props.id })
    );
  }
});
});

require.register("views/movie/movieDetails", function(exports, require, module) {
/*global React, Focus*/
'use strict';

var formMixin = Focus.components.common.form.mixin;
var movieActions = require('../../action/movie').movie;
var movieStore = require('../../stores/movie');
var Block = Focus.components.common.block.component;

module.exports = React.createClass({
  definitionPath: 'movie',
  displayName: 'movieDetails',
  mixins: [formMixin],
  stores: [{ store: movieStore, properties: ['movie'] }],
  action: movieActions,
  renderContent: function renderMovieView() {
    return React.createElement(
      Block,
      { title: 'movie.detail.identity.title', actions: this._renderActions },
      this.fieldFor('title'),
      this.fieldFor('released'),
      this.fieldFor('runtime'),
      this.fieldFor('countryIds'),
      this.fieldFor('languageIds'),
      this.fieldFor('genreIds')
    );
  }
});
/**
 *       <Block title='movie.detail.storyLine'>
         {this.state.description}
       </Block>
 */
});

;require.register("views/movie/movieDirectors", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
'use strict';

var formMixin = Focus.components.common.form.mixin;
var movieDirectorsActions = require('../../action/movie').directors;
var movieStore = require('../../stores/movie');
var Block = Focus.components.common.block.component;
var PeopleCard = require('./component/peopleCard');
var line = React.createClass({
  displayName: 'line',

  definitionPath: 'people',
  mixins: [Focus.components.list.selection.line.mixin],
  renderLineContent: function renderLineContent(data) {
    return React.createElement(PeopleCard, { picture: '', name: data.peoName, subName: '' });
  }
});
module.exports = React.createClass({
  definitionPath: 'people',
  displayName: 'movieDirectors',
  mixins: [formMixin],
  stores: [{ store: movieStore, properties: ['directors'] }],
  action: movieDirectorsActions,
  renderContent: function render() {
    return React.createElement(
      Block,
      { title: 'movie.detail.directors.title' },
      this.listFor('directors', { LineComponent: line })
    );
  }
});
});

require.register("views/movie/moviePictures", function(exports, require, module) {
"use strict";

var Block = Focus.components.common.block.component;
module.exports = React.createClass({
  displayName: "moviePictures",
  render: function render() {
    return React.createElement(Block, { title: "movie.detail.pictures.title" });
  }
});
});

require.register("views/movie/movieProducers", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
'use strict';

var formMixin = Focus.components.common.form.mixin;
var movieProducersActions = require('../../action/movie').producers;
var movieStore = require('../../stores/movie');
var Title = Focus.components.common.title.component;
var PeopleCard = require('./component/peopleCard');
var Block = Focus.components.common.block.component;

var line = React.createClass({
  displayName: 'line',

  definitionPath: 'people',
  mixins: [Focus.components.list.selection.line.mixin],
  renderLineContent: function renderLineContent(data) {
    return React.createElement(PeopleCard, { picture: '', name: data.peoName, subName: '' });
  }
});
module.exports = React.createClass({
  definitionPath: 'people',
  displayName: 'movieProducers',
  mixins: [formMixin],
  stores: [{ store: movieStore, properties: ['producers'] }],
  action: movieProducersActions,
  renderContent: function render() {
    return React.createElement(
      Block,
      { title: 'movie.detail.producers.title' },
      this.listFor('producers', { LineComponent: line })
    );
  }
});
});

require.register("views/people/cartridge", function(exports, require, module) {
'use strict';

var formMixin = Focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
module.exports = React.createClass({
  definitionPath: 'people',
  displayName: 'cartridge',
  mixins: [formMixin],
  stores: [{ store: peopleStore, properties: ['people'] }],
  action: peopleActions,
  renderActions: function renderActions() {},
  renderContent: function renderMovieCartridge() {
    return React.createElement(
      'div',
      { className: 'cartridge' },
      React.createElement(
        'div',
        { className: 'header' },
        React.createElement(
          'div',
          { className: 'picture' },
          React.createElement('img', { src: './static/img/peopleLogo.png', width: '100%', height: '100%' })
        ),
        React.createElement(
          'div',
          { className: 'link' },
          React.createElement(
            'a',
            { href: '' },
            'IMDB'
          )
        ),
        React.createElement(
          'div',
          { className: 'title' },
          this.state.peoName
        ),
        React.createElement(
          'div',
          { className: 'professions' },
          this.state.professions
        )
      ),
      React.createElement(
        'div',
        { className: 'field' },
        React.createElement(
          'div',
          { className: 'title' },
          'PROFESSIONS'
        ),
        React.createElement(
          'div',
          { className: 'content' },
          this.state.professions
        )
      )
    );
  }
});
});

require.register("views/people/index", function(exports, require, module) {
//Get the form mixin.
"use strict";

var SlidingContent = require("./slidingContent");

var StickyNavigation = Focus.components.common.stickyNavigation.component;

module.exports = React.createClass({
    displayName: "exports",

    render: function renderPeopleView() {
        return React.createElement(
            "div",
            { className: "peopleView" },
            React.createElement(StickyNavigation, { contentSelector: "body" }),
            React.createElement(SlidingContent, { id: this.props.id })
        );
    }
});
});

require.register("views/people/movieCard", function(exports, require, module) {
'use strict';

module.exports = React.createClass({
    displayName: 'exports',

    render: function renderMovieCard() {
        return React.createElement(
            'div',
            { className: 'card' },
            React.createElement(
                'div',
                { className: 'picture' },
                React.createElement('img', { src: './static/img/logoMovie.png' })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'name' },
                    this.props.name
                ),
                React.createElement(
                    'div',
                    { className: 'middleName' },
                    this.props.middleName
                ),
                React.createElement(
                    'div',
                    { className: 'subName' },
                    this.props.subName
                )
            )
        );
    }
});
});

require.register("views/people/peopleDetails", function(exports, require, module) {
'use strict';

var formMixin = Focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
var Title = Focus.components.common.title.component;
module.exports = React.createClass({
  definitionPath: 'people',
  displayName: 'peopleIdentification',
  mixins: [formMixin],
  stores: [{ store: peopleStore, properties: ['people'] }],
  action: peopleActions,
  renderActions: function renderActions() {},
  renderContent: function render() {
    if (this.state.isEdit) {
      return React.createElement(
        'div',
        { className: 'slidingBloc' },
        React.createElement(Title, { id: 'identification', title: 'IDENTIFICATION' }),
        this.fieldFor('lastName'),
        this.fieldFor('firstName'),
        this.fieldFor('imdbid')
      );
    }
    return React.createElement(
      'div',
      { className: 'slidingBloc' },
      React.createElement(Title, { id: 'identification', title: 'IDENTIFICATION' }),
      this.displayFor('lastName'),
      this.displayFor('firstName'),
      this.displayFor('imdbid')
    );
  }
});
});

require.register("views/people/peopleFilmography", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
'use strict';

var formMixin = Focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
var Title = Focus.components.common.title.component;
var MovieCard = require('./movieCard');
var FormList = Focus.components.common.list;
var line = React.createClass({
  displayName: 'line',

  definitionPath: 'movie',
  mixins: [Focus.components.list.selection.line.mixin],
  renderLineContent: function renderLineContent(data) {
    return React.createElement(MovieCard, { picture: '', name: data.title, middleName: data.genreIds, subName: data.year });
  }
});
module.exports = React.createClass({
  definitionPath: 'movie',
  displayName: 'peopleFilmography',
  mixins: [formMixin],
  renderActions: function renderActions() {},
  getInitialState: function getInitialState() {
    this.state = {
      filmography: []
    };
    return this.state;
  },
  stores: [{ store: peopleStore, properties: ['filmography'] }],
  action: {
    load: function load(id) {
      peopleActions.loadFilmography(id);
    }
  },
  renderContent: function render() {
    return React.createElement(
      'div',
      { className: 'slidingBloc' },
      React.createElement(Title, { id: 'filmography', title: 'FILMOGRAPHY' }),
      React.createElement(FormList, { data: this.state.filmography, line: line, perPage: 5 })
    );
  }
});
});

require.register("views/people/peoplePictures", function(exports, require, module) {
"use strict";

var Title = Focus.components.common.title.component;
module.exports = React.createClass({
  displayName: "moviePictures",
  render: function render() {
    return React.createElement(
      "div",
      { className: "slidingBloc noBorderBottom" },
      React.createElement(Title, { id: "pictures", title: "PICTURES" })
    );
  }
});
});

require.register("views/people/slidingContent", function(exports, require, module) {
'use strict';

var PeopleDetails = require('./peopleDetails');
var PeopleFilmography = require('./peopleFilmography');
var PeoplePictures = require('./peoplePictures');
var MovieCartridge = require('./cartridge');
module.exports = React.createClass({
    displayName: 'slidingContent',
    render: function renderSlidingContent() {
        return React.createElement(
            'div',
            { className: 'details' },
            React.createElement(MovieCartridge, { id: this.props.id, style: { className: 'catridgeContainer' } }),
            React.createElement(
                'div',
                { id: 'slidingContent' },
                React.createElement(PeopleDetails, { id: this.props.id }),
                React.createElement(PeopleFilmography, { id: this.props.id }),
                React.createElement(PeoplePictures, { id: this.props.id })
            )
        );
    }
});
});

require.register("views/popin/quick-search", function(exports, require, module) {
'use strict';

var Popin = Focus.components.application.popin.component;
var QuickSearch = require('views/search/quick-search');

var QuickSearchPopin = React.createClass({
    displayName: 'QuickSearchPopin',

    render: function render() {
        return React.createElement(
            Popin,
            { 'data-focus': 'quick-search-popin', ref: 'quick-search-popin', type: 'from-menu' },
            React.createElement(QuickSearch, { togglePopin: this.refs['quick-search-popin'].toggleOpen })
        );
    }
});

module.exports = QuickSearchPopin;

});

require.register("views/search-result/index", function(exports, require, module) {
// Components

'use strict';

var MoviePreview = require('./moviePreview');
var MovieLineComponent = require('./movieLineComponent');

var PeoplePreview = require('./peoplePreview');
var PeopleLineComponent = require('./peopleLineComponent');

var SearchResult = require('./searchResult');

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
    if (qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0) {
      qsPreview.click();
    }
  },
  operationList: [{
    label: '', action: function action(data) {
      var Preview = MoviePreview;
      if (!data.movId) {
        Preview = PeoplePreview;
      }
      Focus.application.render(Preview, '#previewModal', {
        props: {
          data: data,
          position: 'right',
          open: true,
          style: { className: 'preview-popin' }
        }
      });
    }, style: { className: 'preview fa fa-eye' }, priority: 1
  }],
  scopes: [{ code: 'ALL', label: 'ALL' }, { code: 'MOVIE', label: 'MOVIE' }, { code: 'PEOPLE', label: 'PEOPLE' }],
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

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [Focus.components.application.popin.mixin],
  renderPopinHeader: function renderPopinHeader(popin) {
    return React.createElement('div', null, React.createElement('div', {
      className: 'quick-search-popin-header'
    }, 'Quick search'));
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');
  },
  renderContent: function renderContent(popin) {
    return qs;
  },
  /** @inheritdoc */
  componentDidMount: function componentDidMount() {
    var source = document.querySelector(this.props.displaySelector);
    var currentView = this;
    if (source !== undefined && source !== null) {
      source.onclick = function () {
        currentView._toggleOpen();
      };
    }
  }
});
});

require.register("views/search-result/searchResult", function(exports, require, module) {
/*global React, Focus.components*/
'use strict';

var action = require('../../action/search/quickSearch');

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [Focus.components.page.search.searchResult.mixin],
  actions: action,
  store: new Focus.store.SearchStore(),
  render: function render() {
    var qs = this.quickSearchComponent();
    var summary = React.createElement('div', null);
    var helpContainer = React.createElement('div', null);
    var scope = this.state.scope;
    var mountedHelp = $('.qs-help-container').html('');
    if (mountedHelp !== undefined && mountedHelp !== null && mountedHelp.length > 0) {
      mountedHelp.html('');
      mountedHelp.toggleClass('qs-help-container');
    }
    if (this.state.totalRecords !== undefined && this.state.totalRecords !== null) {
      var groupKey = 'Movies';
      var faIconClass = 'fa fa-film';
      if (scope !== null && scope !== undefined) {
        if (scope.toLowerCase() === 'people') {
          groupKey = 'People';
          faIconClass = 'fa fa-user';
        }
      } else {
        //TODO Check avec PIERRRE.
        if (this.state.list.length > 0) {
          if (this.state.list[0].peoId !== null && this.state.list[0].peoId !== undefined) {
            scope = 'PEOPLE';
            groupKey = 'People';
            faIconClass = 'fa fa-user';
          }
        }
      }
      var resultsContent = React.createElement(
        'div',
        { className: 'title-group-key' },
        React.createElement('i', { className: faIconClass }),
        ' ',
        groupKey,
        ' (',
        this.state.totalRecords,
        ') '
      );
      if (!this.isSimpleList()) {
        resultsContent = React.createElement(
          'div',
          null,
          'Total records (',
          this.state.totalRecords,
          ')'
        );
      }
      var linkFilterResult = React.createElement('div', null);
      if (this.state.totalRecords > 0) {
        if (scope !== null && scope !== undefined) {
          if (scope.toLowerCase() !== 'all') {
            var url = '#search/advanced/scope/' + scope + '/query/' + this.state.query;
            linkFilterResult = React.createElement(
              'div',
              { className: 'linkAdvancedSearch' },
              ' ',
              React.createElement(
                'a',
                { onClick: this.advancedSearch, 'data-action': url },
                'Advanced search'
              )
            );
          }
        }
        helpContainer = React.createElement(
          'div',
          { className: 'qs-help-container' },
          React.createElement(
            'div',
            null,
            React.createElement('img', { src: './static/img/arrow-help.png' })
          ),
          React.createElement(
            'div',
            null,
            'Hover over a line and click on ',
            React.createElement('i', { className: 'fa fa-eye' }),
            ' to see a preview'
          )
        );
      }
      summary = React.createElement('div', { className: 'group-result-header' }, resultsContent, linkFilterResult);
    }
    var type = 'MOVIE';
    if (scope !== undefined && scope !== null) {
      type = scope;
    } else {
      //TODO Check avec PIERRRE.
      if (this.state.list.length > 0) {
        if (this.state.list[0].peoId !== null && this.state.list[0].peoId !== undefined) {
          type = 'PEOPLE';
        }
      }
    }
    var list = this.isSimpleList() ? this.simpleListComponent({ type: type }) : this.groupByListComponent();
    var qsAffix = React.createElement(
      'div',
      { id: 'qs-affix' },
      ' ',
      qs
    );
    var root = React.createElement('div', { className: 'search-panel' }, qsAffix, summary, list, helpContainer);
    return root;
  },
  renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
    var summary;
    var mostRelevent = React.createElement('div', null);
    var scope = 'PEOPLE';
    var faIconClass = 'fa fa-user';
    if (groupKey.toLowerCase().indexOf('movie') >= 0) {
      scope = 'MOVIE';
      faIconClass = 'fa fa-film';
    }
    var title = React.createElement(
      'div',
      { className: 'title-group-key' },
      React.createElement('i', { className: faIconClass }),
      ' ',
      groupKey
    );
    if (list.length > 3) {
      title = React.createElement(
        'div',
        { className: 'title-group-key' },
        React.createElement('i', { className: faIconClass }),
        ' ',
        groupKey,
        ' (',
        list.length,
        ')'
      );
    }

    var linkFilterResult = React.createElement('div', null);
    var criteria = this.getCriteria();

    if (list.length > 0) {
      var url = '#search/advanced/scope/' + scope + '/query/' + criteria.query;
      linkFilterResult = React.createElement(
        'div',
        { className: 'linkAdvancedSearch' },
        ' ',
        React.createElement(
          'a',
          { onClick: this.advancedSearch, 'data-action': url },
          'Advanced search'
        )
      );
      if (list.length >= 3) {
        mostRelevent = React.createElement(
          'div',
          { className: 'qs-results-most-relevents' },
          'The 3 most relevents'
        );
      }
    }
    summary = React.createElement(
      'div',
      null,
      mostRelevent,
      ' ',
      linkFilterResult
    );
    var goupHeader = React.createElement('div', { className: 'group-result-header' }, title, summary);

    return React.createElement('div', { className: 'listResultContainer panel qs-group-results' }, goupHeader, this.simpleListComponent({ type: groupKey, list: list, maxRows: maxRows }));
  },
  advancedSearch: function advancedSearch(event) {
    event.preventDefault();
    var url = $(event.target).closest('a').attr('data-action');
    Backbone.history.navigate(url, true);
    $('.quick-search-popin .popin-close-btn').click();
  }

});
});

require.register("views/search-result/search/index", function(exports, require, module) {
/*global React, Focus.components*/
'use strict';

var action = require('../../action/search/quickSearch');

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [Focus.components.page.search.searchResult.mixin],
  actions: action,
  store: new Focus.store.SearchStore(),
  render: function render() {
    var qs = this.quickSearchComponent();
    var summary = React.createElement('div', null);
    var helpContainer = React.createElement('div', null);
    var scope = this.state.scope;
    var mountedHelp = $('.qs-help-container').html('');
    if (mountedHelp !== undefined && mountedHelp !== null && mountedHelp.length > 0) {
      mountedHelp.html('');
      mountedHelp.toggleClass('qs-help-container');
    }
    if (this.state.totalRecords !== undefined && this.state.totalRecords !== null) {
      var groupKey = 'Movies';
      var faIconClass = 'fa fa-film';
      if (scope !== null && scope !== undefined) {
        if (scope.toLowerCase() === 'people') {
          groupKey = 'People';
          faIconClass = 'fa fa-user';
        }
      } else {
        //TODO Check avec PIERRRE.
        if (this.state.list.length > 0) {
          if (this.state.list[0].peoId !== null && this.state.list[0].peoId !== undefined) {
            scope = 'PEOPLE';
            groupKey = 'People';
            faIconClass = 'fa fa-user';
          }
        }
      }
      var resultsContent = React.createElement(
        'div',
        { className: 'title-group-key' },
        React.createElement('i', { className: faIconClass }),
        ' ',
        groupKey,
        ' (',
        this.state.totalRecords,
        ') '
      );
      if (!this.isSimpleList()) {
        resultsContent = React.createElement(
          'div',
          null,
          'Total records (',
          this.state.totalRecords,
          ')'
        );
      }
      var linkFilterResult = React.createElement('div', null);
      if (this.state.totalRecords > 0) {
        if (scope !== null && scope !== undefined) {
          if (scope.toLowerCase() !== 'all') {
            var url = '#search/advanced/scope/' + scope + '/query/' + this.state.query;
            linkFilterResult = React.createElement(
              'div',
              { className: 'linkAdvancedSearch' },
              ' ',
              React.createElement(
                'a',
                { onClick: this.advancedSearch, 'data-action': url },
                'Advanced search'
              )
            );
          }
        }
        helpContainer = React.createElement(
          'div',
          { className: 'qs-help-container' },
          React.createElement(
            'div',
            null,
            React.createElement('img', { src: './static/img/arrow-help.png' })
          ),
          React.createElement(
            'div',
            null,
            'Hover over a line and click on ',
            React.createElement('i', { className: 'fa fa-eye' }),
            ' to see a preview'
          )
        );
      }
      summary = React.createElement('div', { className: 'group-result-header' }, resultsContent, linkFilterResult);
    }
    var type = 'MOVIE';
    if (scope !== undefined && scope !== null) {
      type = scope;
    } else {
      //TODO Check avec PIERRRE.
      if (this.state.list.length > 0) {
        if (this.state.list[0].peoId !== null && this.state.list[0].peoId !== undefined) {
          type = 'PEOPLE';
        }
      }
    }
    var list = this.isSimpleList() ? this.simpleListComponent({ type: type }) : this.groupByListComponent();
    var qsAffix = React.createElement(
      'div',
      { id: 'qs-affix' },
      ' ',
      qs
    );
    var root = React.createElement('div', { className: 'search-panel' }, qsAffix, summary, list, helpContainer);
    return root;
  },
  renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
    var summary;
    var mostRelevent = React.createElement('div', null);
    var scope = 'PEOPLE';
    var faIconClass = 'fa fa-user';
    if (groupKey.toLowerCase().indexOf('movie') >= 0) {
      scope = 'MOVIE';
      faIconClass = 'fa fa-film';
    }
    var title = React.createElement(
      'div',
      { className: 'title-group-key' },
      React.createElement('i', { className: faIconClass }),
      ' ',
      groupKey
    );
    if (list.length > 3) {
      title = React.createElement(
        'div',
        { className: 'title-group-key' },
        React.createElement('i', { className: faIconClass }),
        ' ',
        groupKey,
        ' (',
        list.length,
        ')'
      );
    }

    var linkFilterResult = React.createElement('div', null);
    var criteria = this.getCriteria();

    if (list.length > 0) {
      var url = '#search/advanced/scope/' + scope + '/query/' + criteria.query;
      linkFilterResult = React.createElement(
        'div',
        { className: 'linkAdvancedSearch' },
        ' ',
        React.createElement(
          'a',
          { onClick: this.advancedSearch, 'data-action': url },
          'Advanced search'
        )
      );
      if (list.length >= 3) {
        mostRelevent = React.createElement(
          'div',
          { className: 'qs-results-most-relevents' },
          'The 3 most relevents'
        );
      }
    }
    summary = React.createElement(
      'div',
      null,
      mostRelevent,
      ' ',
      linkFilterResult
    );
    var goupHeader = React.createElement('div', { className: 'group-result-header' }, title, summary);

    return React.createElement('div', { className: 'listResultContainer panel qs-group-results' }, goupHeader, this.simpleListComponent({ type: groupKey, list: list, maxRows: maxRows }));
  },
  /**
   * Navigation vers la page de recherche avancée.
   * @param {obejct} event - JS event.
   */
  advancedSearch: function advancedSearch(event) {
    event.preventDefault();
    var url = $(event.target).closest('a').attr('data-action');
    Backbone.history.navigate(url, true);
    $('.quick-search-popin .popin-close-btn').click();
  }

});
});

require.register("views/search/lines/movieLineComponent", function(exports, require, module) {
/*global React, Focus.components */
'use strict';

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [Focus.components.list.selection.line.mixin],
  definitionPath: 'movie',
  renderLineContent: function renderLineContent(data) {
    var id = React.createElement('div', null, data.id);
    var logo = React.createElement('div', { className: 'movie-background fa fa-film' });
    var movieTilte = this.displayFor('title', { style: { className: 'title-level-1' } });
    var genreIds = this.displayFor('genreIds', { style: { className: 'title-level-2' } });
    var released = this.displayFor('released', { style: { className: 'title-level-3' } });
    if (!data.genreIds) {
      genreIds = '';
    }
    if (!data.released) {
      released = '';
    }
    var item = React.createElement(
      'div',
      { className: 'item' },
      movieTilte,
      ' ',
      genreIds,
      ' ',
      released,
      ' '
    );
    var root = React.createElement('div', null, id, logo, item);
    return root;
  }
});
});

require.register("views/search/lines/peopleLineComponent", function(exports, require, module) {
/*global React, Focus.components */
'use strict';

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [Focus.components.list.selection.line.mixin],
  definitionPath: 'people',
  renderLineContent: function renderLineContent(data) {
    var id = React.createElement('div', null, data.id);
    var logo = React.createElement('div', { className: 'movie-background fa fa-user' });
    var userName = this.displayFor('peoName', { style: { className: 'title-level-1' } });
    var item = React.createElement(
      'div',
      { className: 'item' },
      userName
    );
    var root = React.createElement('div', null, id, logo, item);
    return root;
  }
});
});

require.register("views/search/previews/moviePreview", function(exports, require, module) {
/*global React, Focus.components */
'use strict';

var Field = Focus.components.common.field.component;
module.exports = React.createClass({
  displayName: 'exports',

  mixins: [Focus.components.application.popin.mixin, Focus.components.common.mixin.definition, Focus.components.common.mixin.fieldComponentBehaviour],
  definitionPath: 'movie',
  renderPopinHeader: function renderPopinHeader(popin) {
    return React.createElement('div', null, React.createElement('div', {
      className: 'preview-popin-header'
    }, ''));
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');
  },
  renderContent: function renderContent(data) {
    var movieLink = '#movie/' + this.props.data.movId;
    var released = React.createElement('div', null);
    if (this.props.data.released !== undefined && this.props.data.released !== null) {
      var options = {
        isEdit: false,
        hasLabel: false,
        value: this.props.data.released,
        refContainer: this.props.data.released,
        style: { className: 'movie-preview-release-date' }
      };
      var fieldProps = this._buildFieldProps('released', options, this);
      released = React.createElement(Field, fieldProps);
    }

    var root = React.createElement(
      'div',
      null,
      ' ',
      React.createElement(
        'div',
        { className: 'movie-preview-header' },
        React.createElement('div', { className: 'movie-preview-picture' }),
        React.createElement(
          'div',
          { className: 'movie-preview-description' },
          React.createElement(
            'div',
            { className: 'title-level-1' },
            this.props.data.title
          ),
          React.createElement(
            'div',
            { className: 'title-level-3' },
            'IMBD ID ',
            React.createElement(
              'span',
              { className: 'movie-preview-imdb-id' },
              this.props.data.imdbId
            )
          ),
          React.createElement(
            'div',
            { className: 'genres' },
            this.props.data.genreIds
          ),
          React.createElement(
            'div',
            { className: 'description' },
            this.props.data.description
          )
        )
      ),
      React.createElement('div', { className: 'clear' }),
      React.createElement(
        'div',
        { className: 'movie-preview-detail' },
        React.createElement(
          'div',
          { className: 'title' },
          ' Details'
        ),
        React.createElement('div', { className: 'title-line' }),
        React.createElement(
          'div',
          { className: 'movie-detail-line' },
          React.createElement(
            'div',
            { className: 'movie-detail-label' },
            'Country '
          ),
          React.createElement(
            'div',
            null,
            this.props.data.countryIds
          )
        ),
        React.createElement(
          'div',
          { className: 'movie-detail-line' },
          React.createElement(
            'div',
            { className: 'movie-detail-label' },
            'Language '
          ),
          React.createElement(
            'div',
            null,
            this.props.data.languageIds
          )
        ),
        React.createElement(
          'div',
          { className: 'movie-detail-line' },
          React.createElement(
            'div',
            { className: 'movie-detail-label' },
            'Released '
          ),
          React.createElement(
            'div',
            null,
            released
          )
        ),
        React.createElement(
          'div',
          { className: 'movie-detail-line' },
          React.createElement(
            'div',
            { className: 'movie-detail-label' },
            'Runtime '
          ),
          React.createElement(
            'div',
            null,
            this.props.data.runtime
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'movie-preview-detailed-sheet' },
        React.createElement(
          'a',
          { onClick: this.detailedSheet, 'data-action': movieLink },
          'Detailed sheet '
        )
      )
    );

    return root;
  },

  detailedSheet: function detailedSheet(event) {
    event.preventDefault();
    var url = $(event.target).closest('a').attr('data-action');
    Backbone.history.navigate(url, true);
    var qsPopin = $('.quick-search-popin .popin-close-btn');
    if (qsPopin !== undefined && qsPopin !== null && qsPopin.length > 0) {
      qsPopin.click();
    }
    var qsPreview = $('.preview-popin .popin-close-btn');
    if (qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0) {
      qsPreview.click();
    }
  }
});
});

require.register("views/search/previews/peoplePreview", function(exports, require, module) {
/*global React, Focus.components */
'use strict';

var Field = Focus.components.common.field.component;
module.exports = React.createClass({
  displayName: 'exports',

  mixins: [Focus.components.application.popin.mixin, Focus.components.common.mixin.definition, Focus.components.common.mixin.fieldComponentBehaviour],
  definitionPath: 'people',
  renderPopinHeader: function renderPopinHeader(popin) {
    return React.createElement('div', null, React.createElement('div', {
      className: 'preview-popin-header'
    }, ''));
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');
  },
  renderContent: function renderContent(data) {
    var peopleLink = '#people/' + this.props.data.peoId;

    var root = React.createElement(
      'div',
      null,
      ' ',
      React.createElement(
        'div',
        { className: 'movie-preview-header' },
        React.createElement('div', { className: 'movie-preview-picture' }),
        React.createElement(
          'div',
          { className: 'movie-preview-description' },
          React.createElement(
            'div',
            { className: 'title-level-1' },
            this.props.data.peoName
          ),
          React.createElement(
            'div',
            { className: 'title-level-3' },
            'IMBD ID ',
            React.createElement(
              'span',
              { className: 'movie-preview-imdb-id' },
              this.props.data.imdbId
            )
          )
        )
      ),
      React.createElement('div', { className: 'clear' }),
      React.createElement(
        'div',
        { className: 'movie-preview-detailed-sheet' },
        React.createElement(
          'a',
          { onClick: this.detailedSheet, 'data-action': peopleLink },
          'Detailed sheet '
        )
      )
    );

    return root;
  },
  detailedSheet: function detailedSheet(event) {
    event.preventDefault();
    var url = $(event.target).closest('a').attr('data-action');
    Backbone.history.navigate(url, true);
    var qsPopin = $('.quick-search-popin .popin-close-btn');
    if (qsPopin !== undefined && qsPopin !== null && qsPopin.length > 0) {
      qsPopin.click();
    }
    var qsPreview = $('.preview-popin .popin-close-btn');
    if (qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0) {
      qsPreview.click();
    }
  }
});
});

require.register("views/search/quick-search/index", function(exports, require, module) {
// Components

'use strict';

var MoviePreview = require('../previews/moviePreview');
var MovieLineComponent = require('../lines/movieLineComponent');

var PeoplePreview = require('../previews/peoplePreview');
var PeopleLineComponent = require('../lines/peopleLineComponent');

var Title = FocusComponents.common.title.component;
var Button = FocusComponents.common.button.action.component;

// Mixins

var QuickSearchMixin = Focus.components.page.search.quickSearch.mixin;

// Actions

var navigationAction = require('action/navigation');
var searchAction = require('action/search');

// Stores

var searchStore = require('stores/search');

var QuickSearch = React.createClass({
    displayName: 'QuickSearch',

    getDefaultProps: function getDefaultProps() {
        var operationList = [{
            action: function action() {},
            style: { className: 'preview fa fa-eye' },
            priority: 1
        }];
        var scopeList = [];
        return {
            lineMap: {
                'Movie': MovieLineComponent,
                'People': PeopleLineComponent
            },
            onLineClick: this._onLineClick,
            operationList: operationList,
            scopeList: scopeList
        };
    },
    mixins: [QuickSearchMixin],
    actions: searchAction,
    store: searchStore,
    render: function render() {
        var list = this.isSimpleList() ? this.getSimpleListComponent({ type: this._getListType() }) : this.getGroupByListComponent();
        return React.createElement(
            'div',
            { 'data-focus': 'quick-search' },
            this.getSearchBarComponent(),
            list
        );
    },
    renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
        return React.createElement(
            'div',
            { 'data-focus': 'group-result-container' },
            React.createElement(Title, { title: groupKey }),
            React.createElement(
                'a',
                { onClick: this._advancedSearchClickHandler(groupKey) },
                'Advanced search'
            ),
            this.getSimpleListComponent({
                type: this._getListType(list),
                list: list,
                maxRows: maxRows
            }),
            React.createElement(Button, { handleOnClick: this.changeGroupByMaxRows(groupKey, 5), label: 'Show more' })
        );
    },
    _onLineClick: function _onLineClick(line) {
        var route = line.movId ? 'movies/' + line.id : 'people/' + line.id;
        navigationAction.navigate(route);
    },
    _getListType: function _getListType(list) {
        list = list || this.store.getList() || [{ movId: 0 }];
        return this.isSimpleList() && list[0].movId ? 'Movie' : 'People';
    },
    _advancedSearchClickHandler: function _advancedSearchClickHandler(scope) {
        var _this = this;

        return function () {
            var route = 'search/advanced/scope/' + scope + '/query/' + _this.getCriteria().query;
            _this.props.closePopin();
            navigationAction.navigate(route);
        };
    }
});

module.exports = QuickSearch;

//
//
//
//
//
////Configuration des props du composant de vue de recherche.
//let config = {
//    onLineClick: function onLineClick(data) {
//        let url = '';
//        if (data.movId !== undefined && data.movId !== null) {
//            url = '#movie/' + data.movId;
//        } else {
//            if (data.peoId !== undefined && data.peoId !== null) {
//                url = '#people/' + data.peoId;
//            }
//        }
//        Backbone.history.navigate(url, true);
//        $('.quick-search-popin .popin-close-btn').click();
//        //On ferme la popin de preview si elle est affichée.
//        let qsPreview = $('.preview-popin .popin-close-btn');
//        if(qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0){
//            qsPreview.click();
//        }
//    },
//    operationList: [
//        {
//            label: '', action: function (data) {
//            let Preview = MoviePreview;
//            if(!data.movId){
//                Preview = PeoplePreview;
//            }
//            Focus.application.render(Preview, '#previewModal',
//                {
//                    props: {
//                        data: data,
//                        position: 'right',
//                        open: true,
//                        style: {className: 'preview-popin'}
//                    }
//                });
//        }, style: {className: 'preview fa fa-eye'}, priority: 1
//        }
//    ],
//    scopes: [
//        {code: 'ALL', label: 'ALL'},
//        {code: 'MOVIE', label: 'MOVIE'},
//        {code: 'PEOPLE', label: 'PEOPLE'}
//    ],
//    scope: 'ALL',
//    idField: 'movId',
//    groupMaxRows: 3
//};
//
//let qs = React.createElement(SearchResult, {
//    lineMap: {
//        'Movies': MovieLineComponent,
//        'People': PeopleLineComponent,
//        'MOVIE': MovieLineComponent,
//        'PEOPLE': PeopleLineComponent
//    },
//    onLineClick: config.onLineClick,
//    operationList: config.operationList,
//    scopeList: config.scopes,
//    scope: config.scope,
//    idField: config.idField,
//    groupMaxRows: config.groupMaxRows,
//    parentSelector: parentselector
//});

});

