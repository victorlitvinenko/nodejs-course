const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const routes = require('./routes');
const logger = require('./middleware/logger');
const info = require('./middleware/info');
const { connectToDb } = require('./db/db.client');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
logger(app);

app
  .use(express.json())
  .use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  .use('/', routes)
  .use('/', info);

connectToDb(app);
