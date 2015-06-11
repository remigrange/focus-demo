/*global moment*/
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
    DO_DATE: {
        "type": "text",
        "style": "date right",
        'InputComponent': Focus.components.common.input.date.component,
        formatter: function dateFormatter(date){
            return moment(date).format('L');
        },
        unformatter: function dateUnformatter(data){
            return moment(data).toDate();
        }
    },
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
    "DO_EMAIL": {
        "type": "email",
        "inputMaxLength": 150,
        "validator": [{
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
		"validator": [{
			"type": "number",
            "options": {"min": 0}
		}]
	},
    "DO_ID": {
        "type": "text"
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
    "DO_COMMENTAIRE": {
        "type": "textarea",
        "validator": [{
            "type": "string",
            "options": {
                "maxLength": 3000
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
    "DO_TIMESTAMP": {
        "type": "text",
        "decorator": "datePicker",
        "style": "date right",
        "format": {
            "value": function(data){return data;}
        }
    },
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
};
