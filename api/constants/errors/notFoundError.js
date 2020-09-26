const CustomError = require('./customError');

class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super('Route not found', 404);
    this.message = message || 'Not Found';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = NotFoundError;
