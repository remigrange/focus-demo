let referenceService = require('../../services/reference');

module.exports = {
    getAll(callback) {
        referenceService.getScopes().then((scopes) => {
            callback(scopes);
        });
    }
};
