/**
 * These metadatas are generated automatically.
 * @type {Object}
 */
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
				"required": false
			},		
			"firstName": {
				"domain": "DO_FIRSTNAME",
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
