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
        movieServices.getMovieById(id).then(
            function(data){
                focus.dispatcher.handleServerAction({
                    data: {movie: data},
                    type: "update"
                });
            });
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
var root = "./searchByScope";
var url = focus.util.url.builder;
module.exports = {
    searchByScope: url(root, 'POST')
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
  get: url(root + "${id}", 'GET')
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
        "searchText" : "Field 1"
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
        "rank" : "rank"
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
var Hello = React.createClass({displayName: "Hello",
    render: function() {
        return React.createElement("div", null, "Hello ", this.props.name);
    }
});
//Require dependencies.
require('./initializer');
require("router");
Backbone.history.start();
//setTimeout(focus.application.render(Hello, document.querySelector('#container')), 3000);
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
        return fetch(URL.common.searchByScope({data:criteria}));
    }
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
      'people': 'people'
      }
  });
module.exports = movieStore;

});

require.register("views/filter-result/index", function(exports, require, module) {
var SearchFilterResult = focusComponents.page.search.filterResult.component;
var serviceCommon = require('../../services');

module.exports =  React.createClass({displayName: "exports",
    render:function(){

        var action = {
            search: function(criteria) {
                //TODO handle pageInfo
                serviceCommon.common.searchByScope(criteria).then(
                    function success(data) {

                        var dataRet = {
                            facet: data.facet,
                            list: data.list,
                            pageInfos:{},
                            searchContext:{}
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
             /* if(data.movId !== undefined){
                  return <div>
                      <div className="mov-logo" >
                          <img src="./static/img/logoMovie.png"/>
                      </div>
                      <div>
                          <div className="title-level-1">
                            {data.title}
                          </div>
                          <div className="title-level-2">
                            {data.genreIds}
                          </div>
                          <div className="title-level-3">
                            {data.released}
                          </div>
                      </div>
                  </div>;
               } else {
                  return <div>
                      <div className="user-logo" >
                          <img src="./static/img/logoMovie.png"/>
                      </div>
                      <div>
                          <div className="title-level-1">
                            {data.title}
                          </div>
                          <div className="title-level-3">
                            {data.released}
                          </div>
                      </div>
                  </div>;
               }*/
               return React.createElement("div", null, 
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
            orderableColumnList:{title: "Title", genreIds: "Genre"},
            groupableColumnList:{genreIds: "Genre"},
            operationList: [
                /*{label: "Button1_a", action: function() {alert("Button1a");}, style:undefined, priority: 1},
                {label: "Button1_b",action: function() {alert("Button1b");},style:undefined,priority: 1},
                {label: "Button2_a",action: function() {alert("Button2a");},style:undefined,priority: 2},
                {label: "Button2_b",action: function() {alert("Button2b");},style: undefined,priority: 2},*/
            ],
            action: action,
            lineComponent: Line,
            onLineClick : function onLineClick(line){
                alert('click sur la ligne ' + line.title);
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
                                    onLineClick: function onLineClick(line){ alert('click sur la ligne ' + line.title); }, 
                                    isSelection: true, 
                                    lineOperationList: config.lineOperationList, 
                                    criteria: config.criteria}


        );
        //return <div> Rodolphe Search ROUTE </div>
    }
});
});

require.register("views/movie/detail", function(exports, require, module) {
//Get the form mixin.
var formMixin = focus.components.common.form.mixin;
var Block = focus.components.common.block.component;
var fetch = focus.network.fetch;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
module.exports =  React.createClass({displayName: "exports",
    definitionPath: "movie",
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ["movie"]}],
    action: movieActions,
    renderContent:function renderMovieDetail(){
        return(
            React.createElement(Block, {title: "Fiche de d'un film"}, 
                this.fieldFor("movId"), 
                this.fieldFor("title")
           )
        );
    }
});

});

require.register("views/movie/index", function(exports, require, module) {
var MovieDetail = require('./detail');

module.exports =  React.createClass({
  displayName: "MovieView",
  render:function(){
    return (
      React.createElement("div", {className: "movieView"}, 
        React.createElement("h2", null, "Film"), 
        React.createElement(MovieDetail, {id: this.props.id})
      )
    );
  }
});

});

require.register("views/search-result/index", function(exports, require, module) {
var SearchFilterResult = focusComponents.page.searchfilterResult


module.exports =  React.createClass({displayName: "exports",
    render:function(){

        var returnedData =  {
            facet: {
                FCT_PAYS: {
                    "FRA": {label: "France", count: 5},
                    "GER": {label: "Germany", count: 8}
                },
                FCT_STATUS: {
                    "OPE": {label: "Open", count: 7},
                    "CLO": {label: "Closed", count: 2},
                    "ST1": {label: "Status 1", count: 2},
                    "ST2": {label: "Status 2", count: 2},
                    "ST3": {label: "Status 3", count: 2},
                    "ST4": {label: "Status 4", count: 2},
                    "ST5": {label: "Status 5", count: 2}
                },
                FCT_REGION: {
                    "IDF": {label: "Ile de France", count: 11},
                    "NPC": {label: "Nord - Pas de Calais", count: 6}
                }
            },
            list: [{id:1, title : "toto", body:"ceci est un test"},{id:2, title:"tata",body:"deuxieme test"}, {id:3, title:"titi",body:"troisième test"}],
            pageInfos: {},
            searchContext: {}
        };

        var action = {
            search: function(criteria) {
                window.setTimeout(
                    function() {
                        var data = {
                            facet: returnedData.facet,
                            list: returnedData.list,
                            pageInfos:returnedData.pageInfos,
                            searchContext: returnedData.searchContext
                        };

                        focus.dispatcher.handleServerAction({
                            data: data, type: "update"
                        })
                    },
                    1000);
            }
        };
        var Line = React.createClass({displayName: "Line",
            mixins: [focusComponents.list.selection.line.mixin],
            renderLineContent: function(data){
                var title = React.createElement('div',null,data.title);
                var body = React.createElement('div',null,data.body);
                var root = React.createElement('div',null,title,body);
                return root;
            }
        });

        var config = {
            facetConfig: {
                FCT_PAYS: "text",
                FCT_STATUS: "text",
                FCT_REGION: "text"
            },
            orderableColumnList:{col1: "Colonne 1", col2: "Colonne 2", col3: "Colonne 3"},
            groupableColumnList:{col1: "Colonne 1", col2: "Colonne 2"},
            operationList: [
                {label: "Button1_a", action: function() {alert("Button1a");}, style:undefined, priority: 1},
                {label: "Button1_b",action: function() {alert("Button1b");},style:undefined,priority: 1},
                {label: "Button2_a",action: function() {alert("Button2a");},style:undefined,priority: 2},
                {label: "Button2_b",action: function() {alert("Button2b");},style: undefined,priority: 2},
            ],
            action: action,
            lineComponent: Line,
            onLineClick : function onLineClick(line){
                alert('click sur la ligne ' + line.title);
            },
            isSelection:true,
            lineOperationList:[
                {label: "Button1_a",action: function(data) {alert(data.title);},style: undefined,priority: 1},
                {label: "Button1_b",action: function(data) {alert(data.title);},style: undefined,priority: 1},
                {label: "Button2_a",action: function(data) {alert(data.title);},style: undefined,priority: 2},
                {label: "Button2_b",action: function(data) {alert(data.title);},style: undefined,priority: 2}
            ]

        }

        return React.createElement(SearchFilterResult, {config: config.config, 
                                    orderableColumnList: config.orderableColumnList, 
                                    groupableColumnList: config.groupableColumnList, 
                                    operationList: config.operationList, 
                                    action: config.action, 
                                    lineComponent: Line, 
                                    onLineClick: function onLineClick(line){ alert('click sur la ligne ' + line.title); }, 
                                    isSelection: true, 
                                    lineOperationList: config.lineOperationList}


        );
    }
});
});

