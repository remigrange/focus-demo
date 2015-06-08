#!/usr/bin/env node
module.exports = function startServer(port, path, callback) {
  var express = require('express');
  var _ = require('lodash');
  var bodyParser = require('body-parser')

  var database = require('./database');

  var args = process.argv.slice(2);
  var baseDir = './';
  if (args.length > 0) {
      baseDir = args[0];
  }
  var staticFolder = path;

  var app = express();
  app.use(express.static(staticFolder));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(function(req, res, next) {
      console.log(new Date() + ', ' + req.method + ', ' + req.url);
      if (!_.isEmpty(req.body)) {
          console.log(req.body);
      }
      next();
  });

  // Common
  app.post('/searchByScope', function(req, res) {
      var criteria = req.body.criteria;
      var pageInfos = req.body.pageInfos;
      var facets = req.body.facets;
      var clusteringFacetName = req.body.group;

      var movies = _.filter(database.movies, function(movie) {
          return movie.title.search(new RegExp('.*' + criteria.query + '.*')) !== -1;
      });
      res.json({
          list: movies,
          facets: [],
          totalRecords: movies.length
      });
  });

  // Masterdata
  app.get('/scopes', function(req, res) {
      res.json(database.scopes);
  });

  // Movie

  app.get('/movies/:movId/details', function(req, res) {
      res.json(_.find(database.movieDetails, function(details) {
          return details.movId == req.param('movId');
      }));
  });

  // People


  var server = app.listen(port, function() {
      var port = server.address().port;
      console.log('Mocked API listening at http://localhost:%s', port);
      callback();
  });

}
