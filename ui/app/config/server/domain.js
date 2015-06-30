var root = "./domains/";
let identity = root + 'identity/';
var url = Focus.util.url.builder;
module.exports = {
  identity: {
    get: url(identity + '${id}', 'GET'),
    save: url(identity + '${id}', 'PUT')
  }
};
