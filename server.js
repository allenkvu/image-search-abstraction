require('dotenv').config();

var express = require('express');
var path = require('path');
var app = express();
var mongodb = require( 'mongodb' );
var port = process.env.PORT || 8080;
var routes = require('./routes/routes.js')

var mLab = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME;
var MongoClient = mongodb.MongoClient;

MongoClient.connect( mLab, function( err, db ) {
  if (err) {
    console.log( 'Database connection error' );
    throw err;
  }
  console.log( 'Database connection success' );

  // Pass db with each request
  app.use( function( req, res, next ) {
    req.db = db;
    next();
  });

  // Use the routes specified in the routes file
  app.use( require( './routes/routes.js' ));
  //app.set( 'port', ( process.env.PORT || 5000 ));
  //app.set( 'views', path.join( __dirname, '/views' ));
 // app.set( 'view engine', 'ejs' );
  
  
app.listen(port, function () {
  console.log('Example app listening on port'  + port + '!')
});

});