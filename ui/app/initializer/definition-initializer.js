/*global focus*/
Focus.definition.entity.container.setEntityConfiguration(require('../config/entityDefinition'));

//Display domaines utilisés
var entityDef = require('../config/entityDefinition');
var arr = [];
for (var node in entityDef){for(var sub in entityDef[node]){arr.push(entityDef[node][sub].domain)} };
var appDomains = _.uniq(arr);
var domains = Object.keys(require('../config/domain'));
console.info('########################## DOMAINS ##############################');
console.info('Entity definitions domains: ', appDomains);
console.info('Domains with a definition',domains);
console.warn('Missing domain\'s definition', _.difference(appDomains, domains));
console.info('####################################################################');
