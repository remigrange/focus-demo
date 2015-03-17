var root = "./movies/";
var url = focus.util.url.builder;
module.exports = {
  getAll: url(root, 'GET'),
  update: url(root + "${id}/",'PUT'),
  create: url(root, 'POST'),
  get: url(root + "${id}/", 'GET')
};
