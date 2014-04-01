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
	    part:"id,snippet",
	    key:"AIzaSyAY2jNk6xt1xiFhajpRc3hBxFD1MlgvV7Y",
	    type:"channel"
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
	formUrl.query.type = 'videos'; //request.params.channelId;
	formUrl.query.maxResults = 50;
	break;
    }
    return formUrl;
}

internals.search = function (request, reply) {

    if(request.url.query.q == undefined) return reply(Boom.badRequest('parameter q missing'));

    urlRequest = Url.format(internals.buildUrl(request.url.query.q, 'search'));
    Nipple.request('GET', urlRequest, {},  function(err, response){
	console.log(urlRequest);
	Nipple.read(response, function (err, body) {
	    console.log(response.headers);
	    var contentType = response.headers['content-type'];
	    items = Jpath.resolve(JSON.parse(body),"../snippet");
	    var res = reply({channels: items})
	    	.header('Access-Control-Allow-Origin','*')
	    	.header('Access-Control-Expose-Headers','link,ETag,Access-Control-Allow-Headers,Access-Control-Allow-Methods')
		.header('Access-Control-Allow-Headers','link,ETag,Access-Control-Allow-Headers,Access-Control-Allow-Methods');
 	    res.statusCode = response.statusCode;
	    res.headers = response.headers;
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
	    var res = reply({channel: items});
	    
            if (contentType) {
                res.type(contentType);
            }
        });
    });
    
}

internals.finalArray = new Array();
videoPagination = function(request,reply,token){
    url = internals.buildUrl(request.params.channelId, 'videos');
    if(token){
	url.query.pageToken = token;
    }
    console.log(url);
    urlRequest = Url.format(url);
    Nipple.request('GET', urlRequest, {},  function(err, response){
	Nipple.read(response, function (err, body) {
	    var contentType = response.headers['content-type'];
	    content = JSON.parse(body);
	    internals.finalArray.push(content);
	    if(content.nextPageToken){
		videoPagination(request,reply,content.nextPageToken);
	    }
	    else
	    {
		items = Jpath.resolve(internals.finalArray,"../id");		
		internals.getVideoTopics(items,reply);
		internals.finalArray = [];
	    }
        });
    });

}

internals.videos = function (request,reply){
    if(request.params.channelId == undefined) return reply(Boom.badRequest('parameter channelId missing'));
    videoPagination(request,reply);
}

internals.topicsObject = {};
internals.itemsCount = 0;
internals.getVideoTopics = function(videos,reply){
    var result = [];
    var finalResult = [];
    var contador = 0;
    for(var i in videos)
    {
	result[i] = videos[i];
	if ((i%50==0 && i!=0) || i==videos.length-1){
	    ids = Jpath.resolve(result,"/videoId");
	    idStrings = ids.join(',');
	    url = {
		protocol: 'https',
		host:'www.googleapis.com',
		pathname:'/youtube/v3/videos',
		query:  {
		    part:"snippet,topicDetails",
		    key:"AIzaSyAY2jNk6xt1xiFhajpRc3hBxFD1MlgvV7Y",
		    id: idStrings
		}
	    };
	    urlRequest = Url.format(url);
	    console.log(urlRequest);
	    contador++;
	    Nipple.request('GET', urlRequest, {},  function(err, response){
		Nipple.read(response, function (err, body) {
		    var contentType = response.headers['content-type'];
		    elements = JSON.parse(body);
		    video = Jpath.resolve(elements,"/items[*]take(/id,/snippet)");
		    items = Jpath.resolve(elements,"/items[*]/topicDetails[*]");
		    internals.itemsCount++;
		    items = items.concat.apply([],items);
		    for (var n in items) {
			internals.topicsObject[items[n]] = {videos:video};
			//console.log(internals.topicsObject[items[n]].videos, items[n]);
		    }
		    //internals.topicsObject = internals.topicsObject.concat.apply(internals.topicsObject, items);
		    if(internals.itemsCount ==contador){
			internals.itemsCount = contador = 0;
			for(var m in internals.topicsObject){
			    
			}
			var res = reply(internals.topicsObject);
			internals.topicsObject = {};
			res.statusCode = response.statusCode;
			//res.headers = response.headers;
			if (contentType) {
    			    res.type(contentType);
			}
		    }
		});
	    });
	    result = [];
	}
    }
    //console.log(internals.topicsObject);
}

internals.storeTopics = function (videos,reply){
    
}
exports.search = internals.search;
exports.get = internals.get;
exports.videos = internals.videos;
exports.topics = internals.videos;
