var combineHelper = require('../lib/combineFunction');

var english = combineHelper.combine(require('./en-GB'), require('./generated/fr-FR.generated'));
//module.exports = {'en-GB': {translation: require('./generated/fr-FR.generated')}};
module.exports = {'en-GB': {translation: english}};