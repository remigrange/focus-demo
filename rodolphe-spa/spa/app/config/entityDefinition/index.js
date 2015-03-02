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
