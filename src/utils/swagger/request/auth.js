const crypto = require('crypto');

const user = {
  id: {
    type: 'string',
    format: 'uuid',
    example: crypto.randomUUID(),
  },
  username: {
    type: 'string',
    example: 'user1',
  },
  avatar: {
    type: 'string',
    example: 'user1.jpg',
  },
  createdAt: {
    type: 'string',
    example: new Date().toISOString(),
  },
  updatedAt: {
    type: 'string',
    example: new Date().toISOString(),
  },
};

module.exports = user;
