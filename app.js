const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mainRouter = require('./controllers/main');
const genitiveRouter = require('./controllers/genitive/genitive');
const stressRouter = require('./controllers/stresses/stresses');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use((req, res, next) => {
  res.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.append('Pragma', 'no-cache');
  res.append('Expires', '0');
  next();
});
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/main', mainRouter);
app.use('/api/genitive', genitiveRouter);
app.use('/api/stress', stressRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
