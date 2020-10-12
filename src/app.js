const express = require('express');
const swaggerUI = require('swagger-ui-express');
const morgan = require('morgan');
const path = require('path');
const YAML = require('yamljs');
const routes = require('./routes');
const errorHandler = require('./middleware/error.middleware');
const info = require('./middleware/info.middleware');
const { connectToDb } = require('./db/db.client');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app
  .use(express.json())
  .use(morgan('dev'))
  .use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  .use('/', info)
  .use('/', routes)
  .use(errorHandler);

connectToDb(app);
