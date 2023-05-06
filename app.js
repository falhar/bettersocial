const cors = require('cors');
const express = require('express');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const ApiError = require('./src/utils/apiError');
const config = require('./src/config');
const morgan = require('./src/tools/morgan');
const router = require('./src/routes');
const errorMw = require('./src/middlewares/error');

const app = express();

const swaggerDocumentations = swaggerJsDoc(require('./src/utils/swagger'));

if (config.app.env !== 'test') {
  app.set('trust proxy', true);
  app.use(morgan.logSuccessRequest);
  app.use(morgan.logErrorRequest);
}

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json({ limit: '3gb' }));

app.use(router);
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocumentations, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

app.use((req, res, next) => {
  next(new ApiError(404, 'Not Found'));
});

app.use(errorMw);

module.exports = app;
