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
			"released": {
				"domain": "DO_DATE",
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
			"released": {
				"domain": "DO_DATE",
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
			"imdbid": {
				"domain": "DO_LIBELLE_100",
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

require.register("config/server/common", function(exports, require, module) {
var root = ".";
var url = focus.util.url.builder;
module.exports = {
    searchByScope: url(root+"/searchByScope?${sortedFieldName}&${sortDesc}", 'POST')/*,
    filterResult: url(root+"/filterResult", 'POST')*/
};

});

require.register("config/server/index", function(exports, require, module) {
module.exports= {
    movie: require('./movie'),
    people: require('./people'),
    common: require('./common')
};

});

require.register("config/server/movie", function(exports, require, module) {
var root = "./movies/";
var url = focus.util.url.builder;
module.exports = {
    getAll: url(root, 'GET'),
    update: url(root + "${id}/",'PUT'),
    create: url(root, 'POST'),
    get: url(root + "${id}", 'GET'),
    actors: url(root + "${id}/" + 'actors', 'GET'),
    producers: url(root + "${id}/" + 'producers', 'GET'),
    directors: url(root + "${id}/" + 'directors', 'GET'),
    movieView: url(root + "${id}/" + 'movieView', 'GET')
};

});

require.register("config/server/people", function(exports, require, module) {
var root = "./people/";
var url = focus.util.url.builder;
module.exports = {
  getAll: url(root, 'GET'),
  update: url(root + "${id}/",'PUT'),
  create: url(root, 'POST'),
  get: url(root + "${id}/", 'GET')
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

;require.register("i18n/generated/fr-FR.generated", function(exports, require, module) {
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
        "runtime" : "Runtime",
        "description" : "Description",
        "metadasJson" : "metadas Json",
        "imdbid" : "imdbID",
        "genreIds" : "Movie's genres identifiers",
        "countryIds" : "Movie's contries identifiers",
        "languageIds" : "Movie's languages identifiers"
    },
    "movieCriteria": {
        "movId" : "primary key",
        "title" : "Title",
        "released" : "Released",
        "runtime" : "Runtime",
        "description" : "Description"
    },
    "movieIndex": {
        "movId" : "primary key",
        "title" : "Title",
        "released" : "Released",
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
        "released" : "Released",
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
        "rank" : "rank"
    },
    "peopleResult": {
        "peoId" : "primary key",
        "lastName" : "Last name",
        "firstName" : "First Name",
        "titCd" : "Title",
        "peoName" : "Name",
        "imdbid" : "Id imdb",
        "rank" : "rank"
    },
    "peopleView": {
        "peoId" : "primary key",
        "lastName" : "Last name",
        "firstName" : "First Name",
        "titCd" : "Title",
        "peoName" : "Name",
        "imdbid" : "Id imdb",
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

require.register("index", function(exports, require, module) {
console.log('Application demo rodoplphe');
var Backbone = require('backbone');
//Require dependencies.
require('./initializer');
//Start the application.
require('./router');
Backbone.history.start();
//Render all application modules for the first time.
//React.render(<AlertModule />, document.querySelector('#notification-center'));

});

require.register("initialize", function(exports, require, module) {
/* global focus*/
console.log(focus);
console.log(focusComponents);
focus.components = focusComponents;
//Require dependencies.
require('./initializer');
require("router");
Backbone.history.start();
//focus.application.render(Hello, '#page', {props: {name: "rodolphe ....."}});

});

require.register("initializer/definition-initializer", function(exports, require, module) {
/*global focus*/
focus.definition.entity.container.setEntityConfiguration(require('../config/entityDefinition'));

});

require.register("initializer/domain-initializer", function(exports, require, module) {
/*global focus*/
focus.definition.domain.container.setAll(require('../config/domain'));
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

require("./domain-initializer");
require("./definition-initializer");


});

require.register("router/index", function(exports, require, module) {
//Dependencies.
var Router = Backbone.Router;
var render = focus.application.render;

//var AlertModule = require('../component/alert');
//render(AlertModule, '#notification-center');


var AppRouter = Router.extend({
  routes: {
    '': 'home',
    'filterResult': 'filterResult',
    'searchResult': 'searchResult',
    'movie/:id': 'movie'
  },
  home: function handleHomeRoute(){
      console.log('ROUTE: HOME');
    //Require the applications modules
  },
    movie: function handleMovieRoute(id) {
        console.log('ROUTE: MOVIE');
        //Require the applications modules
        var MovieDetailView = require('../views/movie');
        render(MovieDetailView, '#page', {props: {id: id}});
    },
  filterResult: function handleFilterResult(){
      console.log('ROUTE: FILTER RESULT');
      //Require the applications modules
       var FilterResultView  = require('../views/filter-result');
      //React.render(<TestView test="Test Rodolphe ROUTE"/>, document.querySelector('#page'));
      render(FilterResultView, '#page');
  },
  searchResult: function handleSearchResult(){
      console.log('ROUTE: SEARCH RESULT');
      //Require the applications modules
      var SearchResultView  = require('../views/search-result');
      //React.render(<TestView test="Test Rodolphe ROUTE"/>, document.querySelector('#page'));
      render(SearchResultView, '#page');
    }
});
module.exports = new AppRouter();

});

require.register("services/common", function(exports, require, module) {
var URL = require('../../config/server');
var fetch = focus.network.fetch;
module.exports = {
    searchByScope: function searchByScope(criteria){
        //TODO CHECK AVEC PIERRE
        return fetch(URL.common.searchByScope({urlData : criteria.pageInfos, data:criteria}));
    }/*,
    filterResult: function filterResult(criteria){
        return fetch(URL.common.filterResult({data:criteria}));
    }*/
};
});

require.register("services/index", function(exports, require, module) {
module.exports= {
    common: require('./common'),
    movie: require('./movie')
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
        'movie': 'movie'
    }
  });
module.exports = movieStore;

});

require.register("views/filter-result/index", function(exports, require, module) {
var SearchFilterResult = focusComponents.page.search.filterResult.component;
var serviceCommon = require('../../services');
var lineResume = require('./lineResume');


module.exports =  React.createClass({displayName: "exports",
    render:function(){

        var action = {
            search: function(criteria) {
                //TODO handle pageInfo
                if(criteria.pageInfos.order !== undefined){
                    criteria.pageInfos.sortedFieldName = "TITLE";
                    criteria.pageInfos.sortDesc = criteria.pageInfos.order;
                } else {
                    criteria.pageInfos.sortedFieldName = undefined;
                    criteria.pageInfos.sortDesc = undefined;
                }
                serviceCommon.common.searchByScope(criteria).then(
                    function success(data) {

                        var dataRet = {
                            facet: data.facet,
                            list: data.list,
                            pageInfos:{
                                currentPage: criteria.pageInfos.page,
                                perPage: 50,
                                totalRecords:50
                            },
                            searchContext: {
                                scope: criteria.scope,
                                query: criteria.query
                            }
                        };
                        focus.dispatcher.handleServerAction({data: dataRet, type: "update"});
                    },
                    function error(error) {
                        //TODO
                        console.info("Errrors");
                    }
                );
            }
        };
        var Line = React.createClass({displayName: "Line",
            mixins: [focusComponents.list.selection.line.mixin],
            renderLineContent: function(data){
               return React.createElement("div", {className: "item"}, 
                        React.createElement("div", {className: "mov-logo"}, 
                            React.createElement("img", {src: "./static/img/logoMovie.png"})
                        ), 
                        React.createElement("div", null, 
                            React.createElement("div", {className: "title-level-1"}, 
                            data.title
                            ), 
                            React.createElement("div", {className: "title-level-2"}, 
                            data.genreIds
                            ), 
                            React.createElement("div", {className: "title-level-3"}, 
                            data.released
                            )
                        )
                     );
            }
        });

        var config = {
            facetConfig: {
                Language: "text",
                Genre: "text",
                Country: "text"
            },
            orderableColumnList:{TITLE: "Title", GENRE_IDS: "Genre"},
            groupableColumnList:{GENRE_IDS: "Genre"},
            operationList: [
                /*{label: "Button1_a", action: function() {alert("Button1a");}, style:undefined, priority: 1},
                {label: "Button1_b",action: function() {alert("Button1b");},style:undefined,priority: 1},
                {label: "Button2_a",action: function() {alert("Button2a");},style:undefined,priority: 2},
                {label: "Button2_b",action: function() {alert("Button2b");},style: undefined,priority: 2},*/
            ],
            action: action,
            lineComponent: Line,
            onLineClick : function onLineClick(line){
                var data = line;
                focus.application.render(lineResume, '#lineResume',
                    {props: {
                        title: data.title,
                        description: data.description,
                        released: data.released,
                        countryIds: data.countryIds,
                        languageIds : data.languageIds,
                        runtime: this.runtime }});
                //alert('click sur la ligne ' + line.title);
            },
            isSelection:true,
            lineOperationList:[
                /*{label: "Button1_a",action: function(data) {alert(data.title);},style: undefined,priority: 1},
                {label: "Button1_b",action: function(data) {alert(data.title);},style: undefined,priority: 1},
                {label: "Button2_a",action: function(data) {alert(data.title);},style: undefined,priority: 2},
                {label: "Button2_b",action: function(data) {alert(data.title);},style: undefined,priority: 2}*/
            ],
            criteria: {
                scope: "MOVIE",
                searchText : "Fantastic"
            }
        }


        return React.createElement(SearchFilterResult, {facetConfig: config.facetConfig, 
                                    orderableColumnList: config.orderableColumnList, 
                                    groupableColumnList: config.groupableColumnList, 
                                    operationList: config.operationList, 
                                    action: config.action, 
                                    lineComponent: Line, 
                                    onLineClick: config.onLineClick, 
                                    isSelection: true, 
                                    lineOperationList: config.lineOperationList, 
                                    criteria: config.criteria}


        );
        //return <div> Rodolphe Search ROUTE </div>
    }
});
});

require.register("views/filter-result/lineResume", function(exports, require, module) {
//Get the form mixin.
var Block = focus.components.common.block.component;
var Label = focus.components.common.label.component;
module.exports =  React.createClass({displayName: "exports",
    render:function renderMovieResume(){
        return(
            React.createElement(Block, null, 
                React.createElement("div", {className: "movie-lineResume"}, 
                    React.createElement("div", {className: "movie-resume-logo"}, 
                        React.createElement("img", {src: "./static/img/logoMovie.png"})
                    ), 
                    React.createElement("div", {className: "movie-info"}, 
                        React.createElement("div", {className: "title-level-2"}, 
                         React.createElement(Label, {name: "title", value: this.props.title})
                        ), 
                        React.createElement("div", {className: "title-level-3"}, 
                            this.props.imdbId
                        )
                    ), 
                    React.createElement("div", {className: "movie-link-detailed-sheet"}, 
                        React.createElement("a", {href: "#"}, "Detailed sheet")
                    )
                ), 
                React.createElement("div", {className: "movie-descrition"}, 
                   React.createElement("div", {className: "container-title"}, "Storyline"), 
                   React.createElement("div", null, this.props.description)
                ), 

                React.createElement("div", {className: "movie-details"}, 
                    React.createElement("div", {className: "details-panel-title"}, "Details"), 
                    React.createElement("div", {className: "movie-detail-line"}, 
                        React.createElement("div", {className: "details-label-name"}, 
                            React.createElement("div", null, "Country")
                        ), 
                        React.createElement("div", {className: "details-label-value"}, 
                            React.createElement("div", null, this.props.countryIds)
                        )
                    ), 

                    React.createElement("div", {className: "movie-detail-line"}, 
                        React.createElement("div", {className: "details-label-name"}, 
                            React.createElement("div", null, "Language")
                        ), 
                        React.createElement("div", {className: "details-label-value"}, 
                            React.createElement("div", null, this.props.languageIds)
                        )
                    ), 
                    React.createElement("div", {className: "movie-detail-line"}, 
                        React.createElement("div", {className: "details-label-name"}, 
                            React.createElement("div", null, "Release date")
                        ), 
                        React.createElement("div", {className: "details-label-value"}, 
                            React.createElement("div", null, this.props.released)
                        )
                    ), 
                    React.createElement("div", {className: "movie-detail-line"}, 
                        React.createElement("div", {className: "details-label-name"}, 
                            React.createElement("div", null, "Runtime")
                        ), 
                        React.createElement("div", {className: "details-label-value"}, 
                            React.createElement("div", null, this.props.runtime)
                        )
                    )
                )

            )
        );
    }
});

});

require.register("views/movie/cartridge", function(exports, require, module) {
module.exports = React.createClass({displayName: "exports",
    getInitialState: function () {
        this.props.movie = {actors: [],
            producers: [],
            directors: []};
        return this.state;
    },
    render: function renderMovieDetail() {
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "header"}, 
                    React.createElement("div", {className: "picture"}), 
                    React.createElement("div", {className: "title"}, this.props.movie.title), 
                    React.createElement("div", {className: "year"}, this.props.movie.released)
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "GENRES"), 
                    React.createElement("div", {className: "content"}, 
                        this.props.movie.genreIds
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "DIRECTORS"), 
                    React.createElement("div", {className: "content"}, 
                        this.props.movie.directors.map(function (people) {
                            return (
                                React.createElement("div", null, people.peoName)
                            )
                        })
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "PRODUCERS"), 
                    React.createElement("div", {className: "content"}, 
                        this.props.movie.producers.map(function (people) {
                            return (
                                React.createElement("div", null, people.peoName, " ", people.comment)
                            )
                        })
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "MAIN ACTORS"), 
                    React.createElement("div", {className: "content"}, 
                        this.props.movie.actors.map(function (people) {
                            return (
                                React.createElement("div", null, people.peoName)
                            )
                        })
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "COUNTRIES"), 
                    React.createElement("div", {className: "content"}, 
                        this.props.movie.countryIds
                    )
                ), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("div", {className: "title"}, "LANGUAGES"), 
                    React.createElement("div", {className: "content"}, 
                        this.props.movie.languageIds
                    )
                )
            )
        );
    }
});

});

require.register("views/movie/index", function(exports, require, module) {
//Get the form mixin.
var formMixin = focus.components.common.form.mixin;
var MovieCartridge = require('./cartridge');
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
module.exports = React.createClass({
    definitionPath: "movie",
    displayName: "MovieView",
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ["movie"]}],
    action: movieActions,

    renderContent: function () {
        return (
            React.createElement("div", {className: "movieView"}, 
                React.createElement("div", {className: "slidingContent"}
                ), 
                React.createElement("div", {className: "movieCartridge"}, 
                    React.createElement(MovieCartridge, {movie: this.state})
                )
            )
        );
    }
});

});

require.register("views/movie/peopleCard", function(exports, require, module) {
module.exports = React.createClass({displayName: "exports",
    getInitialState: function () {
        this.props.movie = {actors: [],
            producers: [],
            directors: []};
        return this.state;
    },
    render: function renderMovieDetail() {
        return (
            React.createElement("div", null)
        );
    }
});

});

require.register("views/search-result/index", function(exports, require, module) {
var SearchResult = focusComponents.page.search.searchResult.component;
var serviceCommon = require('../../services');
module.exports =  React.createClass({displayName: "exports",
    render:function(){

        var action = {
            search: function(criteria) {
                //TODO handle pageInfo
                var critere = {
                    criteria : {
                        scope:"MOVIE",
                        query:criteria.query
                    },
                    facets:[]
                }
                serviceCommon.common.searchByScope(critere).then(
                    function success(data) {
                        var list = data;
                        if(data.list!==undefined){
                            list= data.list;
                        }
                        var dataRet = {
                            list: list,
                            facet:{},
                            pageInfos:{
                                currentPage: 2,
                                perPage: 50,
                                totalRecords: 10
                            },
                            searchContext: {
                                scope: criteria.scope,
                                query: criteria.query
                            }
                        };
                        focus.dispatcher.handleServerAction({data: dataRet, type: "update"});
                    },
                    function error(error) {
                        //TODO
                        console.info("Errrors");
                    }
                );
            }
        };

        var Line = React.createClass({displayName: "Line",
            mixins: [focusComponents.list.selection.line.mixin],
            renderLineContent: function(data){
                return React.createElement("div", {className: "item"}, 
                    React.createElement("div", {className: "mov-logo"}, 
                        React.createElement("img", {src: "./static/img/logoMovie.png"})
                    ), 
                    React.createElement("div", null, 
                        React.createElement("div", {className: "title-level-1"}, 
                            data.title
                        ), 
                        React.createElement("div", {className: "title-level-2"}, 
                            data.genreIds
                        ), 
                        React.createElement("div", {className: "title-level-3"}, 
                            data.released
                        )
                    )
                );
            }
        });

        var config = {

            operationList: [
            ],
            action: action,
            lineComponent: Line,
            onLineClick : function onLineClick(line){
                alert('click sur la ligne ' + line.title);
            },
            isSelection:true,
            lineOperationList:[
            ],
            criteria: {
                scope: "MOVIE",
                searchText : "Fantastic"
            }

        }


        var searchResult =  React.createElement(React.createClass({mixins:[focusComponents.page.search.searchResult.mixin],actions: config.action}),
            {
                lineComponent: Line,
                onLineClick : function onLineClick(line){
                    alert('click sur la ligne ' + line.title);
                },
                operationList:config.operationList

            }
        );
        
        return searchResult;
    }
});
});

