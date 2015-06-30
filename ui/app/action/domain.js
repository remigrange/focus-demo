//Dependencies
let domainServices = require('../services').domain;
let actionBuilder = Focus.application.actionBuilder;

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
