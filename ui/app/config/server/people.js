var root = "./people/";
var url = Focus.util.url.builder;
module.exports = {
  getAll: url(root, 'GET'),
  update: url(root + "${id}/",'PUT'),
  create: url(root, 'POST'),
  get: url(root + "${id}/", 'GET'),
  peopleView: url(root + "${id}/" + 'details', 'GET'),
  movies: url(root + "${id}/" + 'movies', 'GET'),
  filmography: url(root + "${id}/" + 'filmography', 'GET')
};
