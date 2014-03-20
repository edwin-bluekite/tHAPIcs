// var requireDirectory = require('require-directory');
var Joi = require('joi');

module.exports =  function(){

    // var controller = requireDirectory(module, './controllers', null);

    var routeTable = [
        {
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
        },
        {
            method: 'GET',
            path: 'v1/channels/{channelId}',
            config:{
                description: 'Get channel detail',
                notes: ['Get channel detail',
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
                    path: Joi.any()
                }
            }
        },
        {
            method: 'GET',
            path: 'v1/channels/{channelId}/videos',
            config:{
                description: 'Get all videos in a channel',
                notes: ['Get all videos in a channel',
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
                    path: Joi.any()
                }
            }
        },
        {
            method: 'GET',
            path: 'v1/channel/{channelId}/topics',
            config:{
                description: 'Get topics for a channel',
                notes: ['Get topics for a channel',
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
                    path: Joi.any()
                }
            }
        }
    ];
    return routeTable;
}
