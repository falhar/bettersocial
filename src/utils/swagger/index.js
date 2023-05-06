const auth = require('./auth');

const documentations = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BetterSocial Test Firman',
      version: '1.0.0',
      description: 'API Documentation for BetterSocial Test',
    },
    servers: [
      {
        url: process.env.API_URL,
      },
    ],
    tags: [auth.tag],
    paths: {
      ...auth.paths,
    },
  },
  apis: ['../routes/*.js'],
};

module.exports = documentations;
