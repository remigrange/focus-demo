//Path to the reference service.
/*global focus */
var serviceReference = require('../services');
var reference = Focus.reference;

module.exports = {
    initialize: function(options, context) {
        reference.config.set({'scopes': serviceReference.refernce.getScopes});
        reference.builder.loadListByName('scopes');
    }
};
