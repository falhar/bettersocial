const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('./db');

module.exports = {
  app: {
    baseUrl: process.env.API_URL,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    password_salt: 12,
  },
  db,
  directory: {
    avatar: process.env.PATH_AVATAR,
  },
};
