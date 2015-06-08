//Path to the reference service.
/*global focus */
var referenceService = require('../services/reference');
var reference = Focus.reference;


module.exports = {
    initialize: function(options, context) {
        reference.config.set({'scopes': referenceService.getScopes});
    }
};
