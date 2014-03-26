var Hapi = require('hapi');

// Create a server with a host and port
var server = Hapi.createServer('0.0.0.0', 8000);

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: '.', listing: false, index: true }
    }
});

server.start();