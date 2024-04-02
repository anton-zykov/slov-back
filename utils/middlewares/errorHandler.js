const logger = require('../logger');

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'malformatted id',
    });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({
      error: error.message,
    });
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({
      error: 'invalid token',
    });
  } else {
    next(error);
  }
};

module.exports = errorHandler;
