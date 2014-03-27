var Nipple = require("nipple");
var Url = require("url");
var Boom = require("boom");
var Jpath = require('json-path');

var internals = {};

internals.buildUrl = function(query, type){
    var formUrl ={
	protocol: 'https',
	host:'www.googleapis.com',
	pathname:'/youtube/v3/search',
	query:  {
	    part:"snippet",
	    key:"AIzaSyAY2jNk6xt1xiFhajpRc3hBxFD1MlgvV7Y"
	}
    };


    switch(type){
    case 'search':
	formUrl.query.q = query; //request.url.query.q;
	break;
    case 'get':
	formUrl.query.id = query;
	formUrl.pathname = '/youtube/v3/channels';
	break;
    case 'videos':
	formUrl.query.channelId = query; //request.params.channelId;
	break;
    }
    return formUrl;
}

internals.search = function (request, reply) {
    if(request.url.query.q == undefined) return reply(Boom.badRequest('parameter q missing'));

    urlRequest = Url.format(internals.buildUrl(request.url.query.q, 'search'));
    Nipple.request('GET', urlRequest, {},  function(err, response){
	Nipple.read(response, function (err, body) {
	    var contentType = response.headers['content-type'];
	    items = Jpath.resolve(JSON.parse(body),"../snippet");
	    var res = reply({channels: items})
	    	.header('Access-Control-Allow-Origin','*')
	    	.header('Access-Control-Expose-Headers','link,ETag,Access-Control-Allow-Headers,Access-Control-Allow-Methods')
		.header('Access-Control-Allow-Headers','link,ETag,Access-Control-Allow-Headers,Access-Control-Allow-Methods');
	    ;
	    
            if (contentType) {
                res.type(contentType);
            }
        });
    });
}

internals.get = function (request,reply){
    if(request.params.channelId == undefined) return reply(Boom.badRequest('parameter channelId missing'));
    urlRequest = Url.format(internals.buildUrl(request.params.channelId, 'get'));
    Nipple.request('GET', urlRequest, {},  function(err, response){
	Nipple.read(response, function (err, body) {
	    var contentType = response.headers['content-type'];
	    items = Jpath.resolve(JSON.parse(body),"../snippet");
	    var res = reply({channels: items});
	    
            if (contentType) {
                res.type(contentType);
            }
        });
    });
    
}

internals.videos = function (request,reply){
    if(request.params.channelId == undefined) return reply(Boom.badRequest('parameter channelId missing'));

    urlRequest = Url.format(internals.buildUrl(request.params.channelId, 'videos'));
    Nipple.request('GET', urlRequest, {},  function(err, response){
	Nipple.read(response, function (err, body) {
	    var contentType = response.headers['content-type'];
	    items = Jpath.resolve(JSON.parse(body),"../snippet");
	    var res = reply({videos: items});
	    
            if (contentType) {
                res.type(contentType);
            }
        });
    });
}

exports.search1 = function search (request, reply) {

// 	var params = { part: 'snippet',q:"xoom.com",type:"channel", key:"AIzaSyAY2jNk6xt1xiFhajpRc3hBxFD1MlgvV7Y" };
	Nipple.get('https://www.youtube.com',{}, function(err, response){
	    console.log(response.statusCode);
	    status = response.statusCode;
	    Nipple.read(response, function (err, body) {
		console.log(err,'eerrr');
//		var jsonResponse = JSON.parse(body);
                console.log(body,'response');
		reply(body);
            });
	});
}

exports.search = internals.search;
exports.get = internals.get;
exports.videos = internals.videos;
exports.topics = internals.videos;
