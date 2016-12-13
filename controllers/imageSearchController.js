const express = require('express');
const app = express();

var mongodb = require('mongodb');
var imgurImages = require('../services/imgurAPI');
var mLab = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME;
var MongoClient = mongodb.MongoClient;

module.exports = {

    searchImage: function(req, res){
        
        //ex "../lolcats%20funny" will be { search: 'lolcats funny' } for req.param
        var searchString = req.params.SEARCH;
        var page = req.query.offset;
        
        insertHistory(searchString, req.db)
        imgurImages.imgurSearch(encodeURIComponent(searchString), page, function(result){ //encodeURIComponent helps to url encode ex "lolcats funny" will be "lolcats%20funny"  
           
           res.end(JSON.stringify(result));
        });
    },
    
    findQuery: function(req, res){
        var history = req.db.collection('history');
        
        history.find({} ).toArray(function(err, lists) {
            var recent = lists.reverse();
            var slicedArr = recent.slice(0,10);
            res.end( JSON.stringify( slicedArr ));
        });
    }

};

function insertHistory(searchTerm, db){
    
    var history = db.collection('history');
    var date = new Date();
    var time = date.toISOString();
    history.insert({term: searchTerm, time: time});
    
}