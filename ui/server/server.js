var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser')

var database = require('./database');

var staticFolder = '../../api/src/main/webapp/static';

var app = express();
app.use(express.static(staticFolder));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Common
app.post('/searchByScope', function(req, res) {
    var criteria = req.body.criteria;
    var facets = req.body.facets;
    var clusteringFaacetName = req.body.group;
    console.log(criteria);
    req.json([]);
});

// Masterdata
app.get('/scopes', function(req, res) {
    res.json(database.scopes);
});

// Movie

// People


var server = app.listen(8081, function() {
    var port = server.address().port;
    console.log('Mocked API listening at http://localhost:%s', port);
});