var Hapi = require("hapi");
var Nipple = require("nipple");
var Googleapis = require('googleapis');
var Jpath = require('json-path');
 var routes = require('./routes.js');

// Declare internals
var internals = {};

var serverOptions = {
    views: {
        path: 'templates',
        engines: { html: 'handlebars' },
        partialsPath: './templates/withPartials',
        helpersPath: './templates/helpers',
        isCached: false
    },
    cors: true
};


internals.main = function () {
    var server = new Hapi.Server("0.0.0.0", 3000);
    server.route(routes.routes);

    server.start(function () {
        console.log('tHAPICs Server started at: ' + server.info.uri);
	// //Get a youtube channel id
	// Googleapis
	//     .discover('youtube', 'v3')
	//     .execute(
	//     function(err,client){
	// 	var params = { part: 'snippet',q:"xoom.com",type:"channel", key:"AIzaSyAY2jNk6xt1xiFhajpRc3hBxFD1MlgvV7Y" };
	// 	var req1 = client.youtube.search.list(params);
	// 	req1.execute(function (err, response) {
	// 	    ids = Jpath.resolve(response,"../snippet");
	// 	    console.log(err)
	// 	    console.log(response);
	// 	    console.log('Channel results', ids);
	// 	    });
	// });
	//Log the route table if there is one
	//console.log(server.table());
    });

};

internals.main();
