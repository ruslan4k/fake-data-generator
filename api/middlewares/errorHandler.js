/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const CustomError = require('../constants/errors/customError');

const errorHandler = (
  err,
  req,
  res,
  next,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.error('errorHandler', err);
  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

module.exports = errorHandler;
