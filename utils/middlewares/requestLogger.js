const logger = require('../logger');

const requestLogger = (req, _res, next) => {
  logger.info(req.method, req.path);
  logger.info('Body: ', req.body);
  logger.info('---');
  next();
};

module.exports = requestLogger;
