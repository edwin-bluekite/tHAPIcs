var Hapi = require("hapi");
var Googleapis = require('googleapis');
var Jpath = require('json-path');
var Joi = require('joi');

// Declare internals
var internals = {};

internals.main = function () {
    var server = new Hapi.Server("localhost", 3000);
    server.on('request', function (request, event, tags) {
        
    });
    
    server.route({
	    method: 'GET',
            path: '/v1/channels/search',
            config:{
                description: 'Get a list of channels that match a query string',
                notes: ['Get a list of channels that match a query string',
                            'Error status codes',
                            '200, Ok',
                            '404, Not Found',
                            '502, An internal server error occurred'
                            ],
                tags: ['api'],
                handler: function (request, reply) {
                    reply('hello world');
                },
                validate:{
                    path: Joi.any(),
                    query: Joi.any()
                }
            }
	});

    var routes = require('./routes.js')(server);

    server.start(function () {
        console.log('tHAPICs Server started at: ' + server.info.uri);

	//Get a youtube channel id
	Googleapis
	    .discover('youtube', 'v3')
	    .execute(
	    function(err,client){
		var params = { part: 'snippet',q:"xoom.com",type:"channel", key:"AIzaSyAY2jNk6xt1xiFhajpRc3hBxFD1MlgvV7Y" };
		var req1 = client.youtube.search.list(params);
		req1.execute(function (err, response) {
		    ids = Jpath.resolve(response,"../snippet");
		    console.log(response);
		    console.log('Channel results', ids);
		    });
	});
	//Log the route table if there is one
      // console.log(server.table());
    });

}

internals.main();
