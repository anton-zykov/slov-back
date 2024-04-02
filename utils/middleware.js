const requestLogger = require('./middlewares/requestLogger');
const unknownEndpoint = require('./middlewares/unknownEndpoint');
const errorHandler = require('./middlewares/errorHandler');

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
