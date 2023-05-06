const _ = require('lodash');
const request = require('./request');
const response = require('./response');

const auth = {
  tag: {
    name: 'Auth collections',
    description: 'This collection is going to /auth',
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth collections'],
        summary: 'Create User',
        description: '',
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  ..._.pick(request.auth, ['username']),
                  avatar: {
                    type: 'file',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: response['201_created'],
        },
      },
    },
  },
};

module.exports = auth;
