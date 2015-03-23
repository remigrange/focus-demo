//Path to the reference service.

var serviceReference = require('../services');
var reference = focus.reference;

module.exports = {
    initialize: function(options, context) {
        reference.config.set({'scopes' : serviceReference.refernce.getScopes});
        reference.builder.loadListByName('scopes');
    }
};