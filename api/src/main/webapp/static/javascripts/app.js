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
require.register("action/domain", function(exports, require, module) {
//Dependencies
'use strict';

var domainServices = require('../services').domain;
var actionBuilder = Focus.application.actionBuilder;

module.exports = {
    identity: {
        load: actionBuilder({
            service: domainServices.identity.get,
            node: 'identity',
            status: 'loaded'
        }),
        save: actionBuilder({
            service: domainServices.identity.save,
            node: 'identity',
            status: 'saved'
        })
    }
};

});

require.register("action/movie/index", function(exports, require, module) {
'use strict';

var movieServices = require('../../services').movie;
var actionBuilder = Focus.application.actionBuilder;
module.exports = {
    action: {
        group: 'Group by',
        ungroup: 'Ungroup'
    },
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

require.register("action/people/index", function(exports, require, module) {
'use strict';

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

});

require.register("action/search/index", function(exports, require, module) {
// Config

'use strict';

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

var scopeConfig = require('../../config/scopes');

// Services

var services = require('../../services');

// Dependencies

var keys = _.keys;
var assign = _.extend;
var isEqual = _.isEqual;
var clone = _.clone;

var _buildPagination = function _buildPagination(pageInfos) {
    return {
        page: pageInfos.page || 0,
        skip: pageInfos.skip || 0
    };
};

var _buildOrderAndSort = function _buildOrderAndSort(pageInfos) {
    if (pageInfos.order) {
        var result = {};
        result.sortFieldName = pageInfos.order.key;
        if (pageInfos.order.order) {
            result.sortDesc = pageInfos.order.order.toLowerCase() === 'desc';
        }
        return result;
    } else {
        return {
            sortFieldName: '',
            sortDesc: false
        };
    }
};

var _buildFacets = function _buildFacets(facets) {
    return keys(facets).map(function (selectedFacetKey) {
        var selectedFacet = facets[selectedFacetKey];
        return {
            key: selectedFacetKey,
            value: selectedFacet.key
        };
    });
};

var _parseUnscopedResponse = function _parseUnscopedResponse(data, context) {
    return {
        map: data.groups,
        facet: _parseFacets(data.facets),
        pageInfos: _parsePageInfos(data, context)
    };
};

var _parseScopedResponse = function _parseScopedResponse(data, context) {
    return {
        map: data.groups || _defineProperty({}, context.scope, data.list),
        facet: _parseFacets(data.facets),
        pageInfos: _parsePageInfos(data, context)
    };
};

var _dispatchResult = function _dispatchResult(data) {
    Focus.dispatcher.handleServerAction({
        data: data,
        type: 'update'
    });
};

var _parseFacets = function _parseFacets(facets) {
    return keys(facets).reduce(function (formattedFacets, serverFacetKey) {
        var serverFacetData = facets[serverFacetKey];
        formattedFacets[serverFacetKey] = keys(serverFacetData).reduce(function (facetData, serverFacetItemKey) {
            var serverFacetItemValue = serverFacetData[serverFacetItemKey];
            facetData[serverFacetItemKey] = {
                label: serverFacetItemKey,
                count: serverFacetItemValue
            };
            return facetData;
        }, {});
        return formattedFacets;
    }, {});
};

var _parsePageInfos = function _parsePageInfos(data, context) {
    return {
        currentPage: context.page,
        perPage: 50,
        totalRecords: data.totalCount
    };
};

module.exports = {
    search: function search(param) {
        param = clone(param);

        var criteria = param.criteria;

        // Check if query is null, replace with * if so

        if (criteria.query === '') {
            criteria.query = '*';
        }

        // Ordering and pagination
        var urlData = assign(_buildPagination(param.pageInfos), _buildOrderAndSort(param.pageInfos));

        // Fake scope facet check
        if (keys(param.facets).length === 1 && isEqual(keys(param.facets), ['FCT_SCOPE'])) {
            criteria.scope = scopeConfig[param.facets['FCT_SCOPE'].key];
            Focus.search.changeScope(criteria.scope);
            param.facets = {};
        }

        if (param.facets && param.facets['FCT_SCOPE']) {
            delete param.facets['FCT_SCOPE'];
        }

        var postData = { criteria: criteria };

        // Grouping
        if (criteria.scope === 'ALL') {
            postData.group = 'FCT_SCOPE';
            postData.facets = []; // Might be useless
            //Service call
            return services.search.unscopedSearch({
                urlData: urlData,
                data: postData
            }).then(function (data) {
                return _parseUnscopedResponse(data, { page: urlData.page });
            }).then(_dispatchResult);
        }
        //Scope defined
        postData.group = param.pageInfos.group || '';

        // Facets
        postData.facets = _buildFacets(param.facets);

        return services.search.scopedSearch({ urlData: urlData, data: postData }).then(function (data) {
            return _parseScopedResponse(data, { scope: criteria.scope, page: urlData.page });
        }).then(_dispatchResult);
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

require.register("config/domain/do-commentaire-not-analyzed", function(exports, require, module) {
"use strict";

module.exports = {};

});

require.register("config/domain/do-date", function(exports, require, module) {
/* global moment, Focus */
"use strict";

module.exports = {
  "type": "text",
  "style": "date right",
  "InputComponent": Focus.components.common.input.date.component,
  formatter: function dateFormatter(date) {
    return moment(date).format("L");
  },
  unformatter: function dateUnformatter(data) {
    return moment(data).toDate();
  },
  options: {
    dateRangePicker: {
      minDate: "1900-01-01",
      format: "YYYY-MM-DD"
    }
  }
};

});

require.register("config/domain/do-dt-people-dtc", function(exports, require, module) {
"use strict";

module.exports = {};

});

require.register("config/domain/do-identifiant-code", function(exports, require, module) {
"use strict";

module.exports = {};

});

require.register("config/domain/do-libelle-100", function(exports, require, module) {
'use strict';

module.exports = {
  validator: [{
    type: 'string',
    options: {
      maxLength: 100
    }
  }]
};

});

require.register("config/domain/do-libelle-250", function(exports, require, module) {
'use strict';

module.exports = {
  validator: [{
    type: 'string',
    options: {
      maxLength: 250
    }
  }]
};

});

require.register("config/domain/do-libelle-50", function(exports, require, module) {
'use strict';

module.exports = {
  validator: [{ type: 'string', options: {
      maxLength: 50
    } }]
};

});

require.register("config/domain/do-multi-values-field", function(exports, require, module) {
"use strict";

module.exports = {};

});

require.register("config/domain/do-nom", function(exports, require, module) {
"use strict";

module.exports = {};

});

require.register("config/domain/do-password", function(exports, require, module) {
"use strict";

module.exports = {};

});

require.register("config/domain/do-prenom", function(exports, require, module) {
"use strict";

module.exports = {};

});

require.register("config/domain/do-taille-fichier", function(exports, require, module) {
"use strict";

module.exports = {};

});

require.register("config/domain/do-texte", function(exports, require, module) {
'use strict';

module.exports = {
  validator: [{ type: 'string' }]
};

});

require.register("config/domain/index", function(exports, require, module) {
/*global moment*/
'use strict';

module.exports = {
    DO_COMMENTAIRE_NOT_ANALYZED: require('./do-commentaire-not-analyzed'),
    DO_LIBELLE_50: require('./do-libelle-50'),
    DO_LIBELLE_250: require('./do-libelle-250'),
    DO_LIBELLE_100: require('./do-libelle-100'),
    DO_TEXTE: require('./do-texte'),
    DO_TAILLE_FICHIER: require('./do-taille-fichier'),
    DO_IDENTIFIANT_CODE: require('./do-identifiant-code'),
    DO_MULTI_VALUES_FIELD: require('./do-multi-values-field'),
    DO_DT_PEOPLE_DTC: require('./do-dt-people-dtc'),
    DO_NOM: require('./do-nom'),
    DO_PRENOM: require('./do-prenom'),
    DO_PASSWORD: require('./do-password'),
    /*DO_BOOLEEN: {
        "type": "boolean"
    },*/
    DO_DATE: require('./do-date'),
    /*"DO_MONTANT": {
        "type": "number",
        "validator": [{
            "type": "number",
            "options": {"min": 0}
        }],
        "symbol": "\u20AC",
        "format": {
            "value": function(data){return data;}
        }
    },*/
    'DO_EMAIL': {
        'type': 'email',
        'inputMaxLength': 150,
        'validator': [{
            'type': 'email'
        }, {
            'type': 'string',
            'options': {
                'maxLength': 150
            }
        }]
    },
    'DO_ENTIER': {
        'type': 'number',
        'validator': [{
            'type': 'number',
            'options': { 'min': 0 }
        }]
    },
    'DO_ID': {
        'type': 'text'
    },
    /*"DO_ACTIF": {
        "type": "boolean"
    },*/
    /*"DO_ANNEE": {
        "type": "number"
    },*/
    /*"DO_CODE_POSTAL": {
        "type": "text",
        "inputMaxLength": 9,
        "validator": [{
            "type": "string",
            "options": {
                "maxLength": 9
            }
        }]
    },*/
    'DO_COMMENTAIRE': {
        'type': 'textarea',
        'validator': [{
            'type': 'string',
            'options': {
                'maxLength': 3000
            }
        }]
    },
    /*"DO_DATE_INC": {
        "type": "text",
        "validator": [{
            "type": "regex",
            "value": /^((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19[0-9][0-9]|20[0-9][0-9]))|((0[1-9]|1[012])\/(19[0-9][0-9]|20[0-9][0-9]))|(19[0-9][0-9]|20[0-9][0-9])$/,
            "options": {
                "translationKey": "Veuillez saisir une date au format DD/MM/AAAA, MM/AAAA ou AAAA."
            }
        }]
    },*/
    'DO_CHEMIN_ACCES': {
        'type': 'text',
        'inputMaxLength': 250,
        'validation': [{
            'type': 'string',
            'options': {
                'maxLength': 250
            }
        }]
    },
    'DO_TIMESTAMP': {
        'type': 'text',
        'decorator': 'datePicker',
        'style': 'date right',
        'format': {
            'value': function value(data) {
                return data;
            }
        }
    }
};
/*"DO_LIBELLE_COURT": {
    "type": "text",
    "inputMaxLength": 50,
    "validator": [{
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
    "validator": [{
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
    "validator": [{
        "type": "string",
        "options": {
            "maxLength": 250
        }
    }],
    "style": "texte_250"
},"DO_TEL": {
    "type": "text",
    "inputMaxLength": 13,
    "validator": [{
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
    "validator": [{
        "type": "string",
        "options": {
            "maxLength": 50
        }
    }],
    "style": "texte_13"
}*/

});

;require.register("config/entityDefinition/index", function(exports, require, module) {
/**
 * These metadatas are generated automatically.
 * @type {Object}
 */
"use strict";

module.exports = {
	"dummy": {
		"dummyLong": {
			"domain": "DO_ID",
			"required": false
		}
	},

	"searchCriteria": {
		"scope": {
			"domain": "DO_LABEL_SHORT",
			"required": false
		},
		"query": {
			"domain": "DO_COMMENT",
			"required": false
		}
	},
	"selectedFacet": {
		"key": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"facetQuery": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"value": {
			"domain": "DO_LABEL_LONG",
			"required": false
		}
	},
	"tempMovieData": {
		"cleanId": {
			"domain": "DO_ID",
			"required": true
		},
		"title": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"released": {
			"domain": "DO_DATE",
			"required": false
		},
		"year": {
			"domain": "DO_YEAR",
			"required": false
		},
		"plot": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"imdbid": {
			"domain": "DO_LABEL",
			"required": false
		},
		"rated": {
			"domain": "DO_LABEL",
			"required": false
		},
		"movId": {
			"domain": "DO_ID",
			"required": false
		},
		"isUpdated": {
			"domain": "DO_YES_NO",
			"required": true
		},
		"poster": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"type": {
			"domain": "DO_LABEL",
			"required": false
		}
	},
	"fileInfo": {
		"filId": {
			"domain": "DO_ID",
			"required": true
		},
		"fileName": {
			"domain": "DO_FILE_NAME",
			"required": false
		},
		"mimeType": {
			"domain": "DO_FILE_NAME",
			"required": false
		},
		"length": {
			"domain": "DO_FILE_LENGTH",
			"required": true
		},
		"lastModified": {
			"domain": "DO_TIMESTAMP",
			"required": true
		},
		"filePath": {
			"domain": "DO_FILE_PATH",
			"required": false
		}
	},
	"country": {
		"couCd": {
			"domain": "DO_CODE",
			"required": true
		},
		"label": {
			"domain": "DO_LABEL",
			"required": false
		}
	},
	"genre": {
		"genCd": {
			"domain": "DO_CODE",
			"required": true
		},
		"label": {
			"domain": "DO_LABEL",
			"required": false
		}
	},
	"language": {
		"lanCd": {
			"domain": "DO_CODE",
			"required": true
		},
		"label": {
			"domain": "DO_LABEL",
			"required": false
		}
	},
	"roleMovie": {
		"rlmCd": {
			"domain": "DO_CODE",
			"required": true
		},
		"label": {
			"domain": "DO_LABEL",
			"required": false
		}
	},
	"title": {
		"titCd": {
			"domain": "DO_CODE",
			"required": true
		},
		"label": {
			"domain": "DO_LABEL",
			"required": false
		}
	},
	"alias": {
		"alsId": {
			"domain": "DO_ID",
			"required": true
		},
		"title": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"addition": {
			"domain": "DO_COMMENT",
			"required": false
		}
	},
	"movie": {
		"movId": {
			"domain": "DO_ID",
			"required": true
		},
		"title": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"released": {
			"domain": "DO_DATE",
			"required": false
		},
		"year": {
			"domain": "DO_YEAR",
			"required": false
		},
		"runtime": {
			"domain": "DO_DURATION",
			"required": false
		},
		"description": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"metadasJson": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"imdbid": {
			"domain": "DO_LABEL",
			"required": false
		},
		"poster": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"rated": {
			"domain": "DO_LABEL_LONG",
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
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"role": {
			"domain": "DO_LABEL",
			"required": false
		},
		"characterName": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"fileName": {
			"domain": "DO_FILE_NAME",
			"required": false
		},
		"mimeType": {
			"domain": "DO_FILE_NAME",
			"required": false
		},
		"filePath": {
			"domain": "DO_FILE_PATH",
			"required": false
		}
	},
	"movieCriteria": {
		"movId": {
			"domain": "DO_ID",
			"required": true
		},
		"title": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"released": {
			"domain": "DO_DATE",
			"required": false
		},
		"year": {
			"domain": "DO_YEAR",
			"required": false
		},
		"runtime": {
			"domain": "DO_DURATION",
			"required": false
		},
		"description": {
			"domain": "DO_COMMENT",
			"required": false
		}
	},
	"movieIndex": {
		"movId": {
			"domain": "DO_ID",
			"required": true
		},
		"title": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"titleSortOnly": {
			"domain": "DO_TEXT_NOT_ANALYZED",
			"required": false
		},
		"released": {
			"domain": "DO_DATE",
			"required": false
		},
		"year": {
			"domain": "DO_YEAR",
			"required": false
		},
		"runtime": {
			"domain": "DO_DURATION",
			"required": false
		},
		"description": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"metadasJson": {
			"domain": "DO_TEXT_NOT_ANALYZED",
			"required": false
		},
		"imdbid": {
			"domain": "DO_LABEL",
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
			"domain": "DO_COMMENT",
			"required": false
		},
		"titleSortOnly": {
			"domain": "DO_TEXT_NOT_ANALYZED",
			"required": false
		},
		"released": {
			"domain": "DO_DATE",
			"required": false
		},
		"year": {
			"domain": "DO_YEAR",
			"required": false
		},
		"runtime": {
			"domain": "DO_DURATION",
			"required": false
		},
		"description": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"metadasJson": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"imdbid": {
			"domain": "DO_LABEL",
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
			"domain": "DO_LABEL_LONG",
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
			"domain": "DO_CODE",
			"required": true
		}
	},
	"people": {
		"peoId": {
			"domain": "DO_ID",
			"required": true
		},
		"lastName": {
			"domain": "DO_NAME",
			"required": false
		},
		"firstName": {
			"domain": "DO_FIRSTNAME",
			"required": false
		},
		"peoName": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"imdbid": {
			"domain": "DO_LABEL",
			"required": false
		},
		"comment": {
			"domain": "DO_COMMENT",
			"required": false
		},
		"fileName": {
			"domain": "DO_FILE_NAME",
			"required": false
		},
		"mimeType": {
			"domain": "DO_FILE_NAME",
			"required": false
		},
		"filePath": {
			"domain": "DO_FILE_PATH",
			"required": false
		},
		"titCd": {
			"domain": "DO_CODE",
			"required": false
		}
	},
	"peopleCriteria": {
		"peoId": {
			"domain": "DO_ID",
			"required": true
		},
		"lastName": {
			"domain": "DO_LABEL_SHORT",
			"required": false
		},
		"firstName": {
			"domain": "DO_LABEL_SHORT",
			"required": false
		},
		"titCd": {
			"domain": "DO_CODE",
			"required": false
		},
		"peoName": {
			"domain": "DO_LABEL_LONG",
			"required": false
		}
	},
	"peopleIndex": {
		"peoId": {
			"domain": "DO_ID",
			"required": true
		},
		"lastName": {
			"domain": "DO_LABEL_SHORT",
			"required": false
		},
		"firstName": {
			"domain": "DO_LABEL_SHORT",
			"required": false
		},
		"titCd": {
			"domain": "DO_CODE",
			"required": false
		},
		"peoName": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"imdbid": {
			"domain": "DO_LABEL",
			"required": false
		},
		"peoNameSortOnly": {
			"domain": "DO_TEXT_NOT_ANALYZED",
			"required": false
		},
		"professions": {
			"domain": "DO_MULTI_VALUES_FIELD",
			"required": false
		}
	},
	"peopleView": {
		"peoId": {
			"domain": "DO_ID",
			"required": true
		},
		"lastName": {
			"domain": "DO_LABEL_SHORT",
			"required": false
		},
		"firstName": {
			"domain": "DO_LABEL_SHORT",
			"required": false
		},
		"titCd": {
			"domain": "DO_CODE",
			"required": false
		},
		"peoName": {
			"domain": "DO_LABEL_LONG",
			"required": false
		},
		"peoNameSortOnly": {
			"domain": "DO_TEXT_NOT_ANALYZED",
			"required": false
		},
		"imdbid": {
			"domain": "DO_LABEL",
			"required": false
		},
		"professions": {
			"domain": "DO_MULTI_VALUES_FIELD",
			"required": false
		}
	},
	"rolePeople": {
		"rlpId": {
			"domain": "DO_ID",
			"required": true
		},
		"comment": {
			"domain": "DO_COMMENT",
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
			"domain": "DO_CODE",
			"required": true
		}
	},
	"applicationUser": {
		"usrId": {
			"domain": "DO_ID",
			"required": true
		},
		"lastName": {
			"domain": "DO_NAME",
			"required": true
		},
		"firstName": {
			"domain": "DO_FIRSTNAME",
			"required": false
		},
		"email": {
			"domain": "DO_EMAIL",
			"required": true
		},
		"birthDate": {
			"domain": "DO_DATE",
			"required": true
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
			"domain": "DO_LABEL",
			"required": false
		}
	},
	"securityRole": {
		"sroCd": {
			"domain": "DO_CODE",
			"required": true
		},
		"label": {
			"domain": "DO_LABEL",
			"required": false
		}
	},
	"userAuthentification": {
		"authId": {
			"domain": "DO_ID",
			"required": true
		},
		"login": {
			"domain": "DO_LABEL_SHORT",
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

require.register("config/scopes/index", function(exports, require, module) {
'use strict';

module.exports = {
    'Movies': 'MOVIE',
    'People': 'PEOPLE'
};

});

require.register("config/server/domain", function(exports, require, module) {
'use strict';

var root = './domains/';
var identity = root + 'identity/';
var url = Focus.util.url.builder;
module.exports = {
  identity: {
    get: url(identity + '${id}', 'GET'),
    save: url(identity + '${id}', 'PUT')
  }
};

});

require.register("config/server/index", function(exports, require, module) {
'use strict';

module.exports = {
    movie: require('./movie'),
    people: require('./people'),
    search: require('./search'),
    reference: require('./reference'),
    domain: require('./domain')
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
    castings: url(root + "${id}/" + "castings", "GET"),
    poster: url("http://www.omdbapi.com/?i=${imdbId}&plot=short&r=json", "GET")
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
  peopleView: url(root + "${id}/" + "detail", "GET"),
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
    action: {
        group: 'Group by',
        ungroup: 'Ungroup'
    },
    button: {
        edit: 'Edit',
        cancel: 'Cancel',
        save: 'Save',
        advancedSearch: 'Advanced search',
        back: 'Back',
        backTop: 'Top',
        navigateToDetails: 'See details'
    },
    show: {
        all: 'Show all'
    },
    live: {
        filter: {
            title: 'Filter results',
            facets: {
                FCT_MOVIE_COUNTRY: 'Country',
                FCT_MOVIE_LANGUAGE: 'Language',
                FCT_MOVIE_GENRE: 'Genre',
                FCT_PEOPLE_TITLE: 'Title',
                FCT_PEOPLE_PROFESSION: 'Profession',
                FCT_SCOPE: 'Scope'
            }
        }
    },
    result: {
        'for': 'results for',
        'export': 'Export'
    },
    search: {
        advanced: {
            page: {
                title: 'Search'
            }
        },
        bar: {
            help: 'Choose a scope here.'
        },
        cartridge: {
            title: 'What are you looking for ?'
        },
        mostRelevant: 'The 3 most relevant',
        loadingMore: 'Loading more results ...'
    },
    quickSearch: {
        title: 'Quick search'
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
    },
    people: {
        professions: 'Profession',
        rank: 'Rank',
        detail: {
            identity: {
                title: 'Identity'
            },
            filmography: {
                title: 'Filmography'
            }
        }
    },
    'quick-search': {
        title: 'Quick search',
        preview: {
            details: {
                title: 'Details'
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
    "dummy": {
        "dummyLong": "dummy long"
    },
    "searchCriteria": {
        "scope": "The Scope",
        "query": "query"
    },
    "selectedFacet": {
        "key": "Facet Name",
        "facetQuery": "Facet query",
        "value": "Facet key value"
    },
    "tempMovieData": {
        "cleanId": "primary key",
        "title": "Title",
        "released": "Released",
        "year": "Year",
        "plot": "Description",
        "imdbid": "Id imdb",
        "rated": "Rated",
        "movId": "Movie ID",
        "isUpdated": "Updated",
        "poster": "Poster",
        "type": "Type"
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
        "poster": "Poster",
        "rated": "rated",
        "genreIds": "Genres",
        "countryIds": "Countries",
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
        "metadasJson": "Meta Data JSON",
        "imdbid": "Id imdb",
        "genreIds": "Genres",
        "countryIds": "Countries",
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
        "professions": "Professions"
    },
    "peopleView": {
        "peoId": "primary key",
        "lastName": "Last name",
        "firstName": "First Name",
        "titCd": "Title",
        "peoName": "Name",
        "peoNameSortOnly": "Name",
        "imdbid": "Id imdb",
        "professions": "Professions"
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

console.log('Application Focus-démo');

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
/*global Focus, _*/
'use strict';

Focus.definition.entity.container.setEntityConfiguration(require('../config/entityDefinition'));

//Display domaines utilisés
var entityDef = require('../config/entityDefinition');
var arr = [];
for (var node in entityDef) {
    for (var sub in entityDef[node]) {
        arr.push(entityDef[node][sub].domain);
    }
}
var appDomains = _.uniq(arr);
var domains = Object.keys(require('../config/domain'));

console.info('########################## DOMAINS ##############################');
console.info('Entity definitions domains: ', appDomains);
console.info('Domains with a definition', domains);
console.warn('Missing domain\'s definition', _.difference(appDomains, _.intersection(appDomains, domains)));
console.warn('Useless domain\'s definition', _.difference(domains, _.intersection(appDomains, domains)));
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
require("./user-initializer");
//Initialisation des configurations
require("./domain-initializer");
require("./definition-initializer");
require("./reference-list-initializer").initialize();
require("./search-stores-initializer").initialize();
require("./i18n-initializer");

//Initialisation du layout
//
require("./layout-initializer");

$(function () {
  $.material.init();
});

});

require.register("initializer/layout-initializer", function(exports, require, module) {
'use strict';

var render = Focus.application.render;
var Layout = Focus.components.application.layout.component;
var MenuLeft = require('../views/menu');

render(Layout, 'body', {
    props: { MenuLeft: MenuLeft }
});

});

require.register("initializer/reference-list-initializer", function(exports, require, module) {
//Path to the reference service.
'use strict';

var referenceService = require('../services/reference');
var reference = Focus.reference;

module.exports = {
    initialize: function initialize() {
        reference.config.set({ 'scopes': referenceService.getScopes });
    }
};

});

require.register("initializer/search-stores-initializer", function(exports, require, module) {
'use strict';

module.exports = {
    initialize: function initialize() {
        Focus.dispatcher.handleViewAction({
            data: {
                query: '',
                scope: 'ALL'
            },
            type: 'update',
            identifier: Focus.search.builtInStore.advancedSearchStore.identifier
        });
        Focus.dispatcher.handleViewAction({
            data: {
                query: '',
                scope: 'ALL'
            },
            type: 'update',
            identifier: Focus.search.builtInStore.quickSearchStore.identifier
        });
    }
};

});

require.register("initializer/user-initializer", function(exports, require, module) {
'use strict';

Focus.user.setRoles(['DEFAULT_ROLE']);

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

require.register("router/concept-router", function(exports, require, module) {
/*global Focus */
//Dependencies.
'use strict';

var Router = Focus.router;
var resetScroll = require('./reset-scroll');

//Creates the router for the application's key concepts.
var ConceptRouter = Router.extend({
    log: true,
    beforeRoute: function beforeRoute() {
        Focus.application.changeRoute('detail');
    },
    routes: {
        'movie/:id(/:anchor)': 'movie',
        'people/:id(/:anchor)': 'people'
    },
    movie: function movie(id, anchor) {
        var MovieDetailView = require('views/concept/movie');
        resetScroll();
        this._pageContent(MovieDetailView, {
            props: { id: id, anchor: anchor }
        });
    },
    people: function people(id, anchor) {
        var PeopleDetailView = require('views/concept/people');
        resetScroll();
        this._pageContent(PeopleDetailView, { props: { id: id, anchor: anchor } });
    }
});

module.exports = new ConceptRouter();

});

require.register("router/example-router", function(exports, require, module) {
/*global Focus */
//Dependencies.
'use strict';

var Router = Focus.router;

//Creates the router for the application's key concepts.
var ExampleRouter = Router.extend({
    log: true,
    beforeRoute: function beforeRoute() {},
    routes: {
        'example/domain': 'domain'
    },
    fieldError: function fieldError() {
        var FieldErrorView = require('views/example/fieldError');
        this._pageContent(FieldErrorView);
    },
    globalError: function globalError() {
        var GlobalErrorView = require('views/example/globalError');
        this._pageContent(GlobalErrorView);
    },
    domain: function domain() {
        var DomainView = require('views/example/domain');
        this._pageContent(DomainView);
    }
});

module.exports = new ExampleRouter();
//    'response/error/field': 'fieldError',
//    'response/error/global': 'globalError'

});

;require.register("router/home-router", function(exports, require, module) {
/*global Backbone, Focus, Focus.components */
//Dependencies.
'use strict';

var Router = Focus.router;
var HomeRouter = Router.extend({
  log: true,
  beforeRoute: function beforeRoute() {
    Focus.application.changeRoute('search');
  },
  routes: {
    '': 'home',
    'home(/scope/:scope)': 'home'
  },
  home: function home(scope, query) {
    //Focus.application.changeRoute('home');
    console.log('ROUTE: HOME');
    var HomeView = require('../views/home');
    this._pageContent(HomeView, { props: {
        scope: scope || 'ALL', //Scope all by default here?
        position: 'left',
        open: true,
        style: { className: 'home-popin' } } });
  }
});

module.exports = new HomeRouter();

});

require.register("router/index", function(exports, require, module) {
'use strict';

module.exports = {
  conceptRouter: require('./concept-router'),
  searchRouter: require('./search-router'),
  homeRouter: require('./home-router'),
  exampleRouter: require('./example-router')
};

});

require.register("router/reset-scroll", function(exports, require, module) {
'use strict';

module.exports = function () {
    var body = document.querySelector('body');
    body.scrollTop = 0;
};

});

require.register("router/search-router", function(exports, require, module) {
/*global Focus */
//Dependencies.
'use strict';

var Router = Focus.router;
var resetScroll = require('./reset-scroll');

var SearchRouter = Router.extend({
    log: true,
    beforeRoute: function beforeRoute() {
        Focus.application.changeRoute('search');
    },
    routes: {
        'search/advanced': 'advancedSearch'
    },
    advancedSearch: function advancedSearch() {
        var AdvancedSearchView = require('../views/search/advanced-search');
        resetScroll();
        this._pageContent(AdvancedSearchView, {});
    }
});

module.exports = new SearchRouter();

});

require.register("services/domain", function(exports, require, module) {
'use strict';

var URL = require('../../config/server');
var fetch = Focus.network.fetch;
var isLocal = true;
module.exports = {
  identity: {
    get: function get(id) {
      if (isLocal) {
        return Promise.resolve({
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean.dupont@mail.fr',
          birthDate: new Date().toISOString(),
          pseudo: 'jdupont',
          age: 22
        });
      }
      return fetch(URL.domain.identity.get({ urlData: { id: id } }));
    },
    save: function save(json) {
      if (isLocal) {
        return Promise.resolve(json);
      }
      return fetch(URL.domain.identity.save({ urlData: { id: json.id }, data: json }));
    }
  }
};

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
        return fetch(URL.movie.movieView({ urlData: { id: id } })).then(function (data) {
            return new Promise(function (success) {
                if (data.imdbid) {
                    (function () {
                        var xmlhttp = new XMLHttpRequest();
                        var url = URL.movie.poster({ urlData: { imdbId: data.imdbid } });
                        xmlhttp.onload = function () {
                            if (xmlhttp.status == 200) {
                                var poster = JSON.parse(xmlhttp.response).Poster;
                                if (poster != 'N/A') {
                                    data.poster = poster;
                                }
                                success(data);
                            }
                        };
                        xmlhttp.open(url.method, url.url, true);
                        xmlhttp.send();
                    })();
                } else {
                    success(data);
                }
            });
        });
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
    unscoped: function unscoped(ajaxConfig) {
        return fetch(URL.search.searchByScope(ajaxConfig));
    },
    scoped: function scoped(ajaxConfig) {
        return fetch(URL.search.searchByScope(ajaxConfig));
    }
};

});

require.register("stores/domain", function(exports, require, module) {
/**
 * Store dealing with the domain keyConcept.
 * @type {focus}
 */
'use strict';

var movieStore = new Focus.store.CoreStore({
  definition: {
    'identity': 'identity'
  }
});

module.exports = movieStore;

});

require.register("stores/movie", function(exports, require, module) {
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
        'directors': 'people',
        'movieRecords': 'movieRecords'
    }
});

module.exports = movieStore;

});

require.register("stores/people", function(exports, require, module) {
/**
 * Store dealing with the movie subject.
 * @type {focus}
 */
'use strict';

var peopleStore = new Focus.store.CoreStore({
    definition: {
        'people': 'people',
        'filmography': 'filmography',
        'peopleRecords': 'peopleRecords'
    }
});

module.exports = peopleStore;

});

require.register("stores/reference", function(exports, require, module) {
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

require.register("views/common/cartridge-search", function(exports, require, module) {
// Components
'use strict';

var QuickSearch = Focus.components.search.searchBar.component;

// Mixins
var i18nMixin = Focus.components.common.i18n.mixin;

module.exports = React.createClass({
    displayName: 'exports',

    mixins: [i18nMixin],
    render: function render() {
        return React.createElement(
            'div',
            { className: 'cartridge-search' },
            React.createElement(
                'h1',
                null,
                this.i18n('search.cartridge.title')
            ),
            React.createElement(QuickSearch, null)
        );
    }
});
});

require.register("views/common/summary-search", function(exports, require, module) {
"use strict";

var QuickSearch = Focus.components.search.searchBar.component;
module.exports = React.createClass({
    displayName: "exports",

    render: function render() {
        return React.createElement(QuickSearch, null);
    }
});
});

require.register("views/concept/movie/index", function(exports, require, module) {
// Dependencies
'use strict';

var createDetail = Focus.components.page.createDetail;
var Detail = Focus.components.common.detail.component;

// Components

var MovieDetails = require('./movie-identity');
var MovieCastings = require('./movie-castings');
var MovieProducers = require('./movie-producers');
var MovieDirectors = require('./movie-directors');
var MoviePictures = require('./movie-pictures');
var CartridgeMovie = require('./movie-cartridge');

// Composants du cartouche
var SummaryMovie = require('./movie-summary');

/**
 * Page représentant le détail de la fiche d'un film.
 */
module.exports = createDetail({
    displayName: 'MovieView',
    cartridgeConfiguration: function cartridgeConfiguration() {
        var props = { id: this.props.id, hasForm: false };
        return {
            summary: { component: SummaryMovie, props: props },
            barLeft: { component: Focus.components.common.button.back.component },
            cartridge: { component: CartridgeMovie, props: props },
            actions: {
                primary: [{
                    label: 'imprimer',
                    action: function action() {
                        console.log('print primaire');
                    },
                    icon: 'print'
                }, {
                    label: 'archiver',
                    action: function action() {
                        console.log('archiver primaire');
                    },
                    icon: 'archive'
                }],
                secondary: [{
                    label: 'imprimer Secondaire',
                    action: function action() {
                        console.log('print secondaire');
                    },
                    icon: 'print'
                }, {
                    label: 'archiver',
                    action: function action() {
                        console.log('archiver secondaire');
                    },
                    icon: 'archive'
                }]
            }
        };
    },
    render: function render() {
        return React.createElement(
            Detail,
            null,
            React.createElement(MovieDetails, { id: this.props.id }),
            React.createElement(MovieCastings, { id: this.props.id }),
            React.createElement(MovieProducers, { id: this.props.id }),
            React.createElement(MovieDirectors, { id: this.props.id }),
            React.createElement(MoviePictures, { id: this.props.id })
        );
    }
});
});

require.register("views/concept/movie/movie-card", function(exports, require, module) {
'use strict';

module.exports = React.createClass({
    displayName: 'exports',

    render: function render() {
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

require.register("views/concept/movie/movie-cartridge", function(exports, require, module) {
// Stores

'use strict';

var movieStore = require('stores/movie');

// Mixins

var formMixin = Focus.components.common.form.mixin;

// Actions

var movieActions = require('action/movie').movie;

module.exports = React.createClass({
    definitionPath: 'movie',
    displayName: 'MovieCartridge',
    mixins: [formMixin],
    stores: [{ store: movieStore, properties: ['movie'] }],
    action: movieActions,
    renderContent: function renderContent() {
        return React.createElement(
            'div',
            { className: 'cartridge-movie' },
            React.createElement(
                'div',
                { className: 'poster' },
                React.createElement('img', { src: this.state.poster })
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

require.register("views/concept/movie/movie-castings", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être

// Mixins

'use strict';

var formMixin = Focus.components.common.form.mixin;

// Store

var movieStore = require('stores/movie');

// Actions

var movieCastingActions = require('action/movie').castings;

// Components

var Block = Focus.components.common.block.component;
var PeopleCard = require('../people/people-card');

var Line = React.createClass({
    displayName: 'Line',

    definitionPath: 'people',
    mixins: [Focus.components.list.selection.line.mixin],
    renderLineContent: function renderLineContent(data) {
        return React.createElement(PeopleCard, { picture: '', name: data.peoName,
            subName: 'As (' + data.role + ') ' + (data.characterName !== undefined ? data.characterName : '') });
    }
});

module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'movieCastings',
    mixins: [formMixin],
    stores: [{ store: movieStore, properties: ['castings'] }],
    action: movieCastingActions,
    renderContent: function renderContent() {
        return React.createElement(
            Block,
            { title: 'movie.detail.cast.title' },
            this.listFor('castings', { lineComponent: Line })
        );
    }
});
});

require.register("views/concept/movie/movie-directors", function(exports, require, module) {
// TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être

// Mixins

'use strict';

var formMixin = Focus.components.common.form.mixin;

// Stores

var movieStore = require('stores/movie');

// Actions

var movieDirectorsActions = require('action/movie').directors;

// Components

var Block = Focus.components.common.block.component;
var PeopleCard = require('../people/people-card');

var Line = React.createClass({
    displayName: 'Line',

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
    renderContent: function renderContent() {
        return React.createElement(
            Block,
            { title: 'movie.detail.directors.title' },
            this.listFor('directors', { lineComponent: Line })
        );
    }
});
});

require.register("views/concept/movie/movie-identity", function(exports, require, module) {
// Mixins

'use strict';

var formMixin = Focus.components.common.form.mixin;

// Stores

var movieStore = require('stores/movie');

// Actions

var movieActions = require('action/movie').movie;

// Components

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
});

require.register("views/concept/movie/movie-pictures", function(exports, require, module) {
"use strict";

var Block = Focus.components.common.block.component;

module.exports = React.createClass({
    displayName: "moviePictures",
    render: function render() {
        return React.createElement(Block, { title: "movie.detail.pictures.title" });
    }
});
});

require.register("views/concept/movie/movie-producers", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être

// Mixins

'use strict';

var formMixin = Focus.components.common.form.mixin;

// Actions

var movieProducersActions = require('action/movie').producers;

// Stores

var movieStore = require('stores/movie');

// Components

var Title = Focus.components.common.title.component;
var PeopleCard = require('../people/people-card');
var Block = Focus.components.common.block.component;

var Line = React.createClass({
    displayName: 'Line',

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
    renderContent: function renderContent() {
        return React.createElement(
            Block,
            { title: 'movie.detail.producers.title' },
            this.listFor('producers', { lineComponent: Line })
        );
    }
});
});

require.register("views/concept/movie/movie-summary", function(exports, require, module) {


// Stores

'use strict';

var movieStore = require('stores/movie');

// Mixins

var formMixin = Focus.components.common.form.mixin;

// Actions

var movieActions = require('action/movie').movie;

module.exports = React.createClass({
    definitionPath: 'movie',
    displayName: 'MovieSummary',
    mixins: [formMixin],
    stores: [{ store: movieStore, properties: ['movie'] }],
    action: movieActions,
    renderContent: function renderContent() {
        return React.createElement(
            'h1',
            null,
            this.textFor('title')
        );
    }
});
});

require.register("views/concept/people/index", function(exports, require, module) {
'use strict';

var createDetail = Focus.components.page.createDetail;
var Detail = Focus.components.common.detail.component;

var PeopleDetails = require('./people-details');
var PeopleFilmography = require('./people-filmography');
var PeoplePictures = require('./people-pictures');
var PeopleCartrige = require('./people-cartridge');
var PeopleSummary = require('./people-summary');

module.exports = createDetail({
    displayName: 'PeopleView',
    cartridgeConfiguration: function cartridgeConfiguration() {
        var props = { id: this.props.id, hasForm: false };
        return {
            summary: { component: PeopleSummary, props: props },
            cartridge: { component: PeopleCartrige, props: props },
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
    render: function render() {
        return React.createElement(
            Detail,
            null,
            React.createElement(PeopleDetails, { id: this.props.id }),
            React.createElement(PeopleFilmography, { id: this.props.id })
        );
    }
});
});

require.register("views/concept/people/people-card", function(exports, require, module) {
"use strict";

module.exports = React.createClass({
    displayName: "exports",

    render: function render() {
        return React.createElement(
            "div",
            { className: "people-line" },
            React.createElement("div", { "data-focus": "sl-icon", className: "fa fa-user fa-3x" }),
            React.createElement(
                "div",
                { className: "level1" },
                this.props.name
            ),
            React.createElement(
                "div",
                { className: "level2" },
                this.props.subName
            )
        );
    }
});
});

require.register("views/concept/people/people-cartridge", function(exports, require, module) {
// Stores

'use strict';

var peopleStore = require('stores/people');

// Mixins

var formMixin = Focus.components.common.form.mixin;

// Actions

var peopleActions = require('action/people').people;

module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'PeopleCartridge',
    mixins: [formMixin],
    stores: [{ store: peopleStore, properties: ['people'] }],
    action: peopleActions,
    renderContent: function renderContent() {
        return React.createElement(
            'div',
            { className: 'cartridge-people' },
            React.createElement('div', { className: 'photo fa fa-user fa-5x' }),
            React.createElement(
                'div',
                { className: 'summary' },
                React.createElement(
                    'h1',
                    { className: 'title' },
                    this.state.peoName
                ),
                React.createElement(
                    'h2',
                    { className: 'professions' },
                    this.state.professions
                )
            )
        );
    }
});
});

require.register("views/concept/people/people-details", function(exports, require, module) {
// Mixins

'use strict';

var formMixin = Focus.components.common.form.mixin;

// Actions

var peopleActions = require('action/people').people;

// Stores

var peopleStore = require('stores/people');

// Components

var Block = Focus.components.common.block.component;

module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'peopleDetails',
    mixins: [formMixin],
    stores: [{ store: peopleStore, properties: ['people'] }],
    action: peopleActions,
    renderContent: function renderContent() {
        return React.createElement(
            Block,
            { title: 'people.detail.identity.title', actions: this._renderActions },
            this.fieldFor('peoName'),
            this.fieldFor('professions'),
            this.fieldFor('rank')
        );
    }
});
});

require.register("views/concept/people/people-filmography", function(exports, require, module) {
//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être

// Mixins

'use strict';

var formMixin = Focus.components.common.form.mixin;

// Stores

var peopleStore = require('stores/people');

// Actions

var peopleActions = require('action/people').filmography;

// Components

var MovieCard = require('../movie/movie-card');
var Block = Focus.components.common.block.component;

var Line = React.createClass({
    displayName: 'Line',

    definitionPath: 'movie',
    mixins: [Focus.components.list.selection.line.mixin],
    renderLineContent: function renderLineContent(data) {
        return React.createElement(MovieCard, { picture: '', name: data.title, middleName: data.genreIds });
    }
});
module.exports = React.createClass({
    definitionPath: 'movie',
    displayName: 'peopleFilmography',
    mixins: [formMixin],
    stores: [{ store: peopleStore, properties: ['filmography'] }],
    action: peopleActions,
    renderContent: function renderContent() {
        return React.createElement(
            Block,
            { title: 'people.detail.filmography.title' },
            this.listFor('filmography', { lineComponent: Line })
        );
    }
});
});

require.register("views/concept/people/people-pictures", function(exports, require, module) {
'use strict';

var Title = Focus.components.common.title.component;

module.exports = React.createClass({
    displayName: 'moviePictures',
    render: function render() {
        return React.createElement(
            'div',
            { className: 'slidingBloc noBorderBottom' },
            React.createElement(Title, { id: 'pictures', title: 'PICTURES' })
        );
    }
});
});

require.register("views/concept/people/people-summary", function(exports, require, module) {
// Stores

'use strict';

var peopleStore = require('stores/people');

// Mixins

var formMixin = Focus.components.common.form.mixin;

// Actions

var peopleActions = require('action/people').people;

module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'PeopleSummary',
    mixins: [formMixin],
    stores: [{ store: peopleStore, properties: ['people'] }],
    action: peopleActions,
    renderContent: function renderContent() {
        return React.createElement(
            'h1',
            null,
            this.textFor('peoName')
        );
    }
});
});

require.register("views/example/domain/domain-identity", function(exports, require, module) {
// Mixins
'use strict';

var formMixin = Focus.components.common.form.mixin;

// Stores
var domainStore = require('stores/domain');

// Actions
var domainActions = require('action/domain').identity;

// Components
var Block = Focus.components.common.block.component;

module.exports = React.createClass({
    displayName: 'domainDetail',
    definitionPath: 'applicationUser',
    mixins: [formMixin],
    stores: [{ store: domainStore, properties: ['identity'] }],
    action: domainActions,
    renderContent: function renderMovieView() {
        return React.createElement(
            Block,
            { title: 'domain.detail.identity.title', actions: this._renderActions },
            this.fieldFor('firstName'),
            this.fieldFor('lastName'),
            this.fieldFor('email'),
            this.fieldFor('birthDate'),
            this.fieldFor('pseudo'),
            this.fieldFor('age')
        );
    }
});

});

require.register("views/example/domain/index", function(exports, require, module) {
// Dependencies
'use strict';

var createDetail = Focus.components.page.createDetail;
var Detail = Focus.components.common.detail.component;

// Components

var DomainIdentity = require('./domain-identity');

/**
 * Page représentant le détail de la fiche d'un film.
 */
module.exports = createDetail({
    displayName: 'DomainView',
    render: function render() {
        return React.createElement(
            Detail,
            null,
            React.createElement(DomainIdentity, { id: this.props.id })
        );
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
        React.createElement(Bar, null),
        React.createElement(Cartridge, null)
      ),
      React.createElement(ContentActions, null)
    );
  }
});
});

require.register("views/home/index", function(exports, require, module) {
// Mixins

'use strict';

var cartridgeBehaviour = Focus.components.page.mixin.cartridgeBehaviour;

// Service

var service = require('../../services/search');

// Composants du cartouche

var ApplicationTitle = React.createClass({
    displayName: 'ApplicationTitle',

    render: function render() {
        return React.createElement(
            'span',
            { className: 'page-title' },
            'FOCUS'
        );
    }
});

var initializationCallsCount = 4;

var navigateAdvancedSearch = function navigateAdvancedSearch() {
    if (initializationCallsCount === 0) {
        var route = '#search/advanced';
        Backbone.history.navigate(route, true);
    } else {
        initializationCallsCount--;
    }
};

//Creates a View for hehe home page which is
var HomeView = React.createClass({
    displayName: 'HomeView',

    mixins: [cartridgeBehaviour],
    cartridgeConfiguration: function cartridgeConfiguration() {
        var buildProps = {
            service: service,
            onSearchCriteriaChange: navigateAdvancedSearch
        };
        return {
            barLeft: { component: ApplicationTitle },
            summary: {
                component: Focus.components.page.search.searchHeader.summary,
                props: buildProps
            },
            cartridge: {
                component: Focus.components.page.search.searchHeader.cartridge,
                props: buildProps
            },
            actions: {
                primary: [],
                secondary: []
            }
        };
    },
    render: function render() {
        return React.createElement('div', { className: 'homepage' });
    }
});
module.exports = HomeView;
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
            name: 'Home',
            onClick: this._closeQuickSearchPopin
        }, {
            icon: 'search',
            name: 'Search',
            onClick: this._toggleQuickSearchPopin
        }];
    },
    _toggleQuickSearchPopin: function _toggleQuickSearchPopin() {
        this.refs['quick-search-popin'].toggleOpen();
    },
    _closeQuickSearchPopin: function _closeQuickSearchPopin() {
        // for now the popin is controlled this way, maybe a future improvement would be to use the "opened" prop of the popin
        if (this.refs['quick-search-popin'].state.opened) {
            this._toggleQuickSearchPopin();
        }
    },
    _togglePreviewPopin: function _togglePreviewPopin(previewComponent) {
        if (previewComponent) {
            this.setState({ previewComponent: previewComponent });
        }
        this.refs['preview-popin'].toggleOpen();
    },
    _onQuickSearchPopinClose: function _onQuickSearchPopinClose() {
        if (this.refs['preview-popin'].state.opened) {
            this.refs['preview-popin'].toggleOpen();
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
                { 'data-focus': 'quick-search-popin', onPopinClose: this._onQuickSearchPopinClose, ref: 'quick-search-popin', type: 'from-menu' },
                React.createElement(QuickSearch, { closePopin: this._closeQuickSearchPopin, menuRef: this, togglePreviewPopin: this._togglePreviewPopin })
            ),
            React.createElement(
                Popin,
                {
                    overlay: false,
                    type: 'from-menu',
                    level: 1,
                    ref: 'preview-popin'
                },
                this.state && this.state.previewComponent
            )
        );
    }
});

module.exports = Wrapper;
/*
{
  icon: 'video-camera',
  route: '',
  onClick: this._closeQuickSearchPopin
},
{
  icon: 'user',
  route: '',
  onClick: this._closeQuickSearchPopin
},
{
  icon: 'cog',
  route: '',
  onClick: this._closeQuickSearchPopin
},
{
  icon: 'info-circle',
  route: '',
  onClick: this._closeQuickSearchPopin
}*/
});

;require.register("views/search/advanced-search/components/group", function(exports, require, module) {
// Components

"use strict";

var Title = FocusComponents.common.title.component;
var Button = FocusComponents.common.button.action.component;

// Mixins

var i18nMixin = Focus.components.common.i18n.mixin;

// Formatters

var numberFormatter = Focus.definition.formatter.number;

// Config

var scopeConfig = require("../../../../config/scopes");

var Group = React.createClass({
    displayName: "Group",

    mixins: [i18nMixin],
    _getShowAllHandler: function _getShowAllHandler(key) {
        var _this = this;

        if (scopeConfig[key]) {
            key = scopeConfig[key];
        }
        return function () {
            _this.props.showAllHandler(key);
        };
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "listResultContainer panel", "data-focus": "group-result-container" },
            React.createElement(Title, { title: this.props.groupKey + " (" + numberFormatter.format(this.props.count, "(0,0)") + ")" }),
            React.createElement(
                "p",
                null,
                this.i18n("search.mostRelevant")
            ),
            React.createElement(
                "div",
                { className: "resultContainer" },
                this.props.children
            ),
            React.createElement(
                "div",
                { "data-focus": "group-actions" },
                React.createElement(Button, { handleOnClick: this.props.showMoreHandler, label: this.i18n("show.more") }),
                React.createElement(Button, { handleOnClick: this._getShowAllHandler(this.props.groupKey), label: this.i18n("show.all") })
            )
        );
    }
});

module.exports = Group;

});

require.register("views/search/advanced-search/components/page-title", function(exports, require, module) {
// Mixins

"use strict";

var i18nMixin = Focus.components.common.i18n.mixin;

var PageTitle = React.createClass({
    displayName: "PageTitle",

    mixins: [i18nMixin],
    render: function render() {
        return React.createElement(
            "span",
            { className: "page-title" },
            this.i18n("search.advanced.page.title")
        );
    }
});

module.exports = PageTitle;

});

require.register("views/search/advanced-search/config/column-config", function(exports, require, module) {
'use strict';

module.exports = {
    orderableColumnList: [{ key: 'TITLE_SORT_ONLY', order: 'desc', label: 'Title desc' }, { key: 'TITLE_SORT_ONLY', order: 'asc', label: 'Title asc' }, { key: 'GENRE_IDS', order: 'desc', label: 'Genre desc' }, { key: 'GENRE_IDS', order: 'asc', label: 'Genre asc' }]
};

});

require.register("views/search/advanced-search/config/facet-config", function(exports, require, module) {
'use strict';

module.exports = {
    facetConfig: {
        FCT_MOVIE_COUNTRY: 'text',
        FCT_MOVIE_LANGUAGE: 'text',
        FCT_MOVIE_GENRE: 'text'
    },
    openedFacetList: {
        FCT_MOVIE_COUNTRY: true,
        FCT_MOVIE_LANGUAGE: true,
        FCT_MOVIE_GENRE: true,
        FCT_SCOPE: true,
        FCT_PEOPLE_TITLE: true,
        FCT_PEOPLE_PROFESSION: true
    }
};

});

require.register("views/search/advanced-search/config/line-config", function(exports, require, module) {
"use strict";

module.exports = {
    onLineClick: function onLineClick(data) {
        //Should be on the line and not in the config
        var url = data.movId ? "#movie/" + data.movId : "#people/" + data.peoId;
        Backbone.history.navigate(url, true);
    }
};

});

require.register("views/search/advanced-search/index", function(exports, require, module) {
// Dependencies

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var assign = _.assign;

// Components

var AdvancedSearch = FocusComponents.page.search.advancedSearch.component;
var PageTitle = require('./components/page-title');
var Group = require('./components/group');
var MovieLineComponent = require('../lines/movieLineComponent');
var PeopleLineComponent = require('../lines/peopleLineComponent');

// Services

var service = require('../../../services/search');

// Build the props for each configuration.
var props = assign({}, require('./config/facet-config'), require('./config/column-config'), require('./config/line-config'), { scopesConfig: require('../../../config/scopes') });

var cartridgeConfiguration = function cartridgeConfiguration() {
    return {
        summary: {
            component: Focus.components.page.search.searchHeader.summary,
            props: { service: service }
        },
        barLeft: { component: PageTitle },
        cartridge: {
            component: Focus.components.page.search.searchHeader.cartridge,
            props: { service: service }
        },
        actions: {
            primary: [],
            secondary: []
        }
    };
};

var lineComponentMapper = function lineComponentMapper(groupKey, list) {
    if (list.length < 1) {
        return MovieLineComponent;
    } else {
        return list[0].movId ? MovieLineComponent : PeopleLineComponent;
    }
};

module.exports = React.createClass({
    displayName: 'exports',

    render: function render() {
        return React.createElement(AdvancedSearch, _extends({
            cartridgeConfiguration: cartridgeConfiguration,
            groupComponent: Group,
            lineComponentMapper: lineComponentMapper,
            service: service
        }, props));
    }
});
});

require.register("views/search/lines/index", function(exports, require, module) {
'use strict';

module.exports = {
  MovieLineComponent: require('./movieLineComponent'),
  PeopleLineComponent: require('./movieLineComponent')
};

});

require.register("views/search/lines/movieLineComponent", function(exports, require, module) {
/*global React, Focus.components */
"use strict";

module.exports = React.createClass({
    displayName: "exports",

    mixins: [Focus.components.list.selection.line.mixin],
    definitionPath: "movie",
    renderLineContent: function renderLineContent(data) {
        return React.createElement(
            "div",
            { className: "movie-line" },
            React.createElement("div", { "data-focus": "sl-icon", className: "fa fa-film" }),
            React.createElement(
                "div",
                { className: "level1" },
                this.textFor("title")
            ),
            React.createElement(
                "div",
                { className: "level2" },
                this.textFor("genreIds")
            ),
            React.createElement(
                "div",
                { className: "level3" },
                this.textFor("released")
            )
        );
    }
});
});

require.register("views/search/lines/peopleLineComponent", function(exports, require, module) {
/*global React, Focus.components */
"use strict";

module.exports = React.createClass({
  displayName: "exports",

  mixins: [Focus.components.list.selection.line.mixin],
  definitionPath: "people",
  renderLineContent: function renderLineContent(data) {
    return React.createElement(
      "div",
      { className: "people-line" },
      React.createElement("div", { "data-focus": "sl-icon", className: "fa fa-user" }),
      React.createElement(
        "div",
        { className: "level1" },
        this.textFor("peoName")
      ),
      React.createElement(
        "div",
        { className: "level2" },
        this.textFor("userName")
      )
    );
  }
});
});

require.register("views/search/previews/movie-preview", function(exports, require, module) {
// Stores

'use strict';

var movieStore = require('stores/movie');

// Actions

var movieAction = require('action/movie');

// Mixins

var formBehaviour = Focus.components.common.form.mixin;
var i18nBehaviour = Focus.components.common.i18n.mixin;

// Components

var Button = Focus.components.common.button.action.component;

var MoviePreview = React.createClass({
    displayName: 'MoviePreview',

    mixins: [i18nBehaviour, formBehaviour],
    definitionPath: 'movie',
    stores: [{
        store: movieStore,
        properties: ['movie']
    }],
    action: movieAction.movie,
    renderContent: function renderContent() {
        if (this.state && this.state.movId) {
            return React.createElement(
                'div',
                { 'data-focus': 'movie-preview' },
                React.createElement(
                    'div',
                    { 'data-focus': 'head' },
                    React.createElement(
                        'div',
                        { 'data-focus': 'poster' },
                        this.state.poster && React.createElement('img', { src: this.state.poster }),
                        !this.state.poster && React.createElement(
                            'div',
                            { 'data-focus': 'empty' },
                            React.createElement('i', { className: 'fa fa-film' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'data-focus': 'summary' },
                        React.createElement(
                            'h1',
                            null,
                            this.textFor('title')
                        ),
                        React.createElement(
                            'p',
                            null,
                            this.textFor('released')
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'data-focus': 'details' },
                    React.createElement(
                        'h2',
                        null,
                        this.i18n('quick-search.preview.details.title')
                    ),
                    this.displayFor('languageIds'),
                    this.displayFor('genreIds')
                ),
                React.createElement(
                    'div',
                    { 'data-focus': 'footer' },
                    React.createElement(Button, { handleOnClick: this._navigateToDetails,
                        label: 'button.navigateToDetails',
                        shape: 'ghost' })
                )
            );
        } else {
            return React.createElement(
                'div',
                { 'data-focus': 'preview-loader' },
                React.createElement('i', { className: 'fa fa-circle-o-notch fa-spin' })
            );
        }
    },
    _navigateToDetails: function _navigateToDetails() {
        var route = '#movie/' + this.state.movId;
        Backbone.history.navigate(route, true);
        this.props.closePopin();
    }
});

module.exports = MoviePreview;

});

require.register("views/search/previews/people-preview", function(exports, require, module) {
'use strict';

var peopleStore = require('stores/people');
var peopleAction = require('action/people');

var formBehaviour = Focus.components.common.form.mixin;
var i18nBehaviour = Focus.components.common.i18n.mixin;

// Components

var Button = Focus.components.common.button.action.component;

var PeoplePreview = React.createClass({
    displayName: 'PeoplePreview',

    mixins: [i18nBehaviour, formBehaviour],
    definitionPath: 'people',
    stores: [{
        store: peopleStore,
        properties: ['people']
    }],
    action: peopleAction.people,
    renderContent: function renderContent() {
        if (this.state && this.state.peoId) {
            return React.createElement(
                'div',
                { 'data-focus': 'movie-preview' },
                React.createElement(
                    'div',
                    { 'data-focus': 'head' },
                    React.createElement(
                        'div',
                        { 'data-focus': 'poster' },
                        this.state.poster && React.createElement('img', { src: this.state.poster }),
                        !this.state.poster && React.createElement(
                            'div',
                            { 'data-focus': 'empty' },
                            React.createElement('i', { className: 'fa camera-retro' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'data-focus': 'summary' },
                        React.createElement(
                            'h1',
                            null,
                            this.textFor('peoName')
                        ),
                        React.createElement(
                            'p',
                            null,
                            this.textFor('imdbid')
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'data-focus': 'details' },
                    React.createElement(
                        'h2',
                        null,
                        this.i18n('quick-search.preview.details.title')
                    ),
                    this.displayFor('firstName'),
                    this.displayFor('lastName'),
                    this.displayFor('comment')
                ),
                React.createElement(
                    'div',
                    { 'data-focus': 'footer' },
                    React.createElement(Button, { handleOnClick: this._navigateToDetails,
                        label: 'button.navigateToDetails',
                        shape: 'ghost' })
                )
            );
        } else {
            return React.createElement(
                'div',
                { 'data-focus': 'preview-loader' },
                React.createElement('i', { className: 'fa fa-circle-o-notch fa-spin' })
            );
        }
    },
    _navigateToDetails: function _navigateToDetails() {
        var route = '#people/' + this.state.peoId;
        Backbone.history.navigate(route, true);
        this.props.closePopin();
    }
});

module.exports = PeoplePreview;
});

require.register("views/search/quick-search/index", function(exports, require, module) {
// Components

'use strict';

var MoviePreview = require('../previews/movie-preview');
var MovieLineComponent = require('../lines/movieLineComponent');

var PeoplePreview = require('../previews/people-preview');
var PeopleLineComponent = require('../lines/peopleLineComponent');

var Button = Focus.components.common.button.action.component;
var QuickSearch = Focus.components.page.search.quickSearch.component;

// Mixins

var i18nMixin = Focus.components.common.i18n.mixin;

// Formatters

var numberFormatter = Focus.definition.formatter.number;

// Config

// Services

var service = require('../../../services/search');

var scopeConfig = require('../../../config/scopes');

var QuickSearchWrapper = React.createClass({
    displayName: 'QuickSearchWrapper',

    mixins: [Focus.components.common.i18n.mixin],
    _getOperationList: function _getOperationList() {
        var self = this;
        return [{
            action: function action(data) {
                var isPreviewOpened = self.props.menuRef.refs['preview-popin'].state.opened;
                if (self.state && _.isEqual(self.state.previewData, data)) {
                    self.props.togglePreviewPopin();
                } else {
                    var timeout = 0;
                    if (isPreviewOpened) {
                        self.props.togglePreviewPopin();
                        timeout = 100;
                    }
                    setTimeout(function () {
                        var Preview = self._getPreviewType(data);
                        var id = data.movId ? data.movId : data.peoId;
                        var previewComponent = React.createElement(Preview, { closePopin: self.props.menuRef.refs['quick-search-popin'].toggleOpen, hasForm: false, id: id });
                        self.props.togglePreviewPopin(previewComponent);
                        self.setState({ previewData: data });
                    }, timeout);
                }
            },
            style: { className: 'fa fa-eye', shape: 'fab', 'data-focus': 'line-preview' },
            priority: 1
        }];
    },
    _getGroupComponent: function _getGroupComponent() {
        var popinCloser = this.props.closePopin;
        return React.createClass({
            mixins: [i18nMixin],
            _advancedSearchClickHandler: function _advancedSearchClickHandler(scope) {
                return function () {
                    var route = '#search/advanced';
                    var query = Focus.search.builtInStore.quickSearchStore.getQuery();
                    scope = scopeConfig[scope] || scope;
                    Focus.dispatcher.handleViewAction({
                        data: {
                            query: query,
                            scope: scope,
                            selectedFacets: undefined,
                            gorupingKey: undefined
                        },
                        type: 'update',
                        identifier: 'ADVANCED_SEARCH'
                    });
                    popinCloser();
                    Backbone.history.navigate(route, true);
                };
            },
            render: function render() {
                return React.createElement(
                    'div',
                    { 'data-focus': 'group-result-container' },
                    React.createElement(
                        'div',
                        { className: 'title-navigation' },
                        React.createElement(Button, { handleOnClick: this._advancedSearchClickHandler(this.props.groupKey),
                            label: 'button.advancedSearch',
                            shape: 'ghost' }),
                        React.createElement(
                            'h3',
                            null,
                            this.props.groupKey + ' (' + numberFormatter.format(this.props.count, '(0,0)') + ')'
                        ),
                        !this.props.isUnique && React.createElement(
                            'p',
                            null,
                            this.i18n('search.mostRelevant')
                        )
                    ),
                    this.props.children
                );
            }
        });
    },
    _lineComponentMapper: function _lineComponentMapper(groupKey, list) {
        if (list.length > 0) {
            return list[0].movId ? MovieLineComponent : PeopleLineComponent;
        } else {
            return MovieLineComponent;
        }
    },
    _onLineClick: function _onLineClick(data) {
        var route = data.movId ? '#movie/' + data.movId : '#people/' + data.peoId;
        this.props.closePopin();
        Backbone.history.navigate(route, true);
    },
    _getPreviewType: function _getPreviewType(data) {
        return data.movId ? MoviePreview : PeoplePreview;
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                this.i18n('quickSearch.title')
            ),
            React.createElement(QuickSearch, {
                closePopin: this.props.closePopin,
                groupComponent: this._getGroupComponent(),
                lineComponentMapper: this._lineComponentMapper,
                lineOperationList: this._getOperationList(),
                onLineClick: this._onLineClick,
                service: service
            })
        );
    }
});

module.exports = QuickSearchWrapper;
});

