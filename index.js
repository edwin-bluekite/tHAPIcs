var Hapi = require("hapi");
var Googleapis = require('googleapis');

// Declare internals
var internals = {};

internals.main = function () {
    var server = new Hapi.Server(3000,"localhost");

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
		    console.log('Channel results', response);
		    });
	});
	//Log the route table if there is one
        console.log(server.table());
    });
}

internals.main();
