const CustomError = require('./customError');

class NotFoundError extends CustomError {
  constructor() {
    super('Route not found', 404);
    this.message = 'Not Found';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = NotFoundError;
