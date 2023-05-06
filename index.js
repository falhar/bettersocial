const app = require('./app');
const config = require('./src/config');
const { sequelize } = require('./src/models');
const { logger } = require('./src/tools/logger');

const port = config.app.port || 3000;

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error);
  });

app.listen(port, () => {
  logger.info(`Checkified API listening at port ${port}`);
});
