require('dotenv').config();

module.exports = {
  default: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logQueryParameters: process.env.SQL_LOG !== 'false',
    logging: process.env.SQL_LOG !== 'false',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
};
