var express = require( 'express' );
var router = express.Router();
var mongodb = require( 'mongodb' );
var controller = require('../controllers/imageSearchController.js');
var path = require('path');

router.get( '/', function( req, res ) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views/') });
});

router.get( '/api/imagesearch/:SEARCH', controller.searchImage );

router.get( '/api/latest/imagesearch', controller.findQuery );

module.exports = router;