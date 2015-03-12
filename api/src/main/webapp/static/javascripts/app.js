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
require.register("application", function(exports, require, module) {
console.log('Application');
});

require.register("config/domain/index", function(exports, require, module) {
var stitchFormatters = require('../../helper/formatter/formatter_helper');
module.exports = {
    "DO_BOOLEEN": {
        "type": "boolean"
    },
    "DO_DATE": {
        "type": "text",
        "decorator": "datePicker",
        "style": "date right",
        "format": {
            "value": Fmk.Helpers.formaters.date
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
            "value": Fmk.Helpers.formaters.currency
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
            "value": stitchFormatters.dateTime
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
			"roleName": {
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
    people: require('./people')
};

});

require.register("config/server/movie", function(exports, require, module) {
var root = require('../../conf.json').url + "movies/";
var url = require('./url-builder');
module.exports = {
  getAll: url(root, 'GET'),
  update: url(root + "${id}/",'PUT'),
  create: url(root, 'POST'),
  get: url(root + "${id}/", 'GET')
};

});

require.register("config/server/people", function(exports, require, module) {
var root = require('../../conf.json').url + "people/";
var url = require('./url-builder');
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
    "searchRet": {
        "type" : "Type of the object",
        "field1" : "Field 1",
        "field2" : "Field 2",
        "field3" : "Field 3",
        "field4" : "Field 4"
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
        "roleName" : "Role Name",
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
//setTimeout(focus.application.render(Hello, document.querySelector('#container')), 3000);
focus.application.render(Hello, '#page', {props: {name: "rodolphe ....."}});

});

require.register("initializer/index", function(exports, require, module) {
global.$ = require('jquery');//(window);
global.Backbone = require('backbone');
Backbone.$ = $;
//React tap event initializer.
var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

});

require.register("router/index", function(exports, require, module) {
//Dependencies.
var Router = require('backbone').Router;
var render = require('../core/render');


var AlertModule = require('../component/alert');
render(AlertModule, '#notification-center');


var AppRouter = Router.extend({
  routes: {
    '': 'home'
  },
  home: function handleHomeRoute(){
    console.log('ROUTE: HOME');
    //Require the applications modules
    /*var UserDetailView = require('../view/user');
    //React.render(<UserDetailView userId="12344"/>, document.querySelector('#page'));
     render(UserDetailView, '#page', {
       props:{userId: "6c4a5d96-dc8a-461d-8b23-d9b5ed2f4883"}
     });*/
  }
});
module.exports = new AppRouter();

});

require.register("views/home", function(exports, require, module) {
module.exports = React.createClass({
  render: function() {
    return "<div>Hello {this.props.name}</div>";
  }
});

});

