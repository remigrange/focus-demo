var express = require('express');
var _ = require('lodash');

var database = require('./database');

var staticFolder = '../../api/src/main/webapp/static';

var app = express();
app.use(express.static(staticFolder));

// Common

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