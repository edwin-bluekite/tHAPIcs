var Hapi = require("hapi");

// Declare internals
var internals = {};

internals.main = function () {
    var server = new Hapi.Server(3000,"localhost");

    server.start(function () {
        console.log('tHAPICs Server started at: ' + server.info.uri);
	//Log the route table if there is one
        console.log(server.table());
    });
}

internals.main();
