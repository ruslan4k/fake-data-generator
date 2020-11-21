/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const AuthenticationError = require('../constants/errors/authenticationError');
const CustomError = require('../constants/errors/customError');
const { logger } = require('../logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const httpRequest = {
    status: statusCode,
    requestUrl: req.url,
    requestMethod: req.method,
    remoteIp: req.connection.remoteAddress,
  };
  const parameters = {
    params: req.params,
    query: req.query,
    body: req.body,
    user: req.user,
    stack: err.stack,
  };
  if (err instanceof CustomError) {
    if (err instanceof AuthenticationError) req.logout();
    logger.error('errorHandler', { err, message: err.message, isUnhandled: false, httpRequest, parameters });
    return res.status(statusCode).send({ errors: err.serializeErrors() });
  }
  logger.error('errorHandler -> unhandled error', { err, message: err.message, isUnhandled: true, httpRequest, parameters });
  return res.status(statusCode).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

module.exports = errorHandler;
