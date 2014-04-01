var Joi = require('joi');
var handlers = require('./handler.js');

routes =[
    {
        method: 'GET',
        path: '/v1/channels',
        config:{
            handler: handlers.search,
            description: 'Get a list of channels that match a query string',
            tags: ['api'],
            jsonp: 'callback',
            notes: [
                'Get a list of channels that match a query string',
                'Error status codes',
                '200, Ok',
                '404, Not Found',
                '502, An internal server error occurred'
            ]
        }
    },
    {
        method: 'GET',
        path: '/v1/channels/{channelId}',
        config:{
            handler: handlers.get,
            description: 'Get a list of channels that match a query string',
            tags: ['api'],
            jsonp: 'callback',
            notes: [
                'Get a list of channels that match a query string',
                'Error status codes',
                '200, Ok',
                '404, Not Found',
                '502, An internal server error occurred'
            ],
            validate:{
                path: Joi.any(),
                query: Joi.any()
            }
        }
    },
    {
        method: 'GET',
        path: '/v1/channels/{channelId}/videos',
        config:{
            handler: handlers.videos,
            description: 'Get all videos in a channel',
            tags: ['api'],
            jsonp: 'callback',
            notes: ['Get all videos in a channel',
                    'Error status codes',
                    '200, Ok',
                    '404, Not Found',
                    '502, An internal server error occurred'
                   ],
            validate:{
                path: Joi.any()
            }
        }
    },
    {
        method: 'GET',
        path: '/v1/channel/{channelId}/topics',
        config:{
            handler: handlers.topics,
            description: 'Get topics for a channel',
            tags: ['api'],
            jsonp: 'callback',
            notes: ['Get topics for a channel',
                    'Error status codes',
                    '200, Ok',
                    '404, Not Found',
                    '502, An internal server error occurred'
                   ],
            validate:{
                path: Joi.any()
            }
        }
    },
    {
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: { path: './public', listing: false, index: true }
        }
    }
];

exports.routes = routes;
