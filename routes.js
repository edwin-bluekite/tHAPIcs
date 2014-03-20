// var requireDirectory = require('require-directory');
validation =  require('schema.js');

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
                handler: {
                    proxy: {
                        // mapUri: controller.accounts.mapper,
                        passThrough: true,
                        // redirects: 2,
                        // onResponse: controller.accounts.onResponse
                    }
                },
                validate:{
                    path: validation.schema.path,
                    query: validation.schema.query
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
                handler: {
                    proxy: {
                        // mapUri: controller.accounts.mapper,
                        passThrough: true,
                        // redirects: 2,
                        // onResponse: controller.accounts.onResponse
                    }
                },
                validate:{
                    path: validation.schema.pathId,
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
                handler: {
                    proxy: {
                        // mapUri: controller.accounts.mapper,
                        passThrough: true,
                        // redirects: 2,
                        // onResponse: controller.accounts.onResponse
                    }
                },
                validate:{
                    path: validation.schema.path,
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
                handler: {
                    proxy: {
                        // mapUri: controller.accounts.mapper,
                        passThrough: true,
                        // redirects: 2,
                        // onResponse: controller.accounts.onResponse
                    }
                },
                validate:{
                    path: validation.schema.path,
                }
            }
        }
    ];
    return routeTable;
}