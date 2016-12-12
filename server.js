require('dotenv').config();

var express = require('express');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;
var routes = require('./controllers/imageSearchController.js');

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
  res.render('index');
});

routes(app);

app.listen(port, function () {
  console.log('Example app listening on port'  + port + '!')
});