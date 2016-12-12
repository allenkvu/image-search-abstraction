const express = require('express');
const app = express();
var imgurImages = require('../services/imgurAPI');

module.exports = function(app) {

    app.get('/api/imagesearch/:search', function(req, res){
        
        var searchString = req.params; //ex "../lolcats%20funny" will be { search: 'lolcats funny' }
        var page = req.query.offset;
       // res.send(dateObj);
        imgurImages.imgurSearch(encodeURIComponent(searchString.search), page, function(result){ //encodeURIComponent helps to url encode ex "lolcats funny" will be "lolcats%20funny"  
           
           res.end(JSON.stringify(result));
        });
    });

};

