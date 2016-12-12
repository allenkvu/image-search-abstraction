"use strict";

module.exports = {
    imgurSearch: function(searchString, page, callback){
        
        var https = require("https");
        if(page == null){
            page = "0";
        }

        var options = {
            protocol:"https:",
            host: 'api.imgur.com',
            path: ["/3/gallery/search/" + page + "?q="+searchString].join("/"),
            headers: {"Authorization" : "Client-ID " + process.env.IMGUR_ID}
        };
        
        var req = https.request(options, function(response) {

            var str = '';
            response.on('data', function (chunk){

                str += chunk;
            });
            response.on('error', function(e) {
                console.error('error');
                console.error(e);
            });
  
            response.on('end', function(){
                var responseJson = JSON.parse(str);

                callback( organizeImgurResult(responseJson));
            });
        });
        
        req.end();
    }
};

function organizeImgurResult(json){
    var props = Object.keys(json.data);
    var result = props.map(function(prop) {
        return {
            title: json.data[prop].title,
            section: json.data[prop].section,
            url: json.data[prop].link
        };
    });
    return result;
}



