const CustomError = require('./customError');

class AuthenticationError extends CustomError {
  constructor(message = 'Not authenticated') {
    super(message, 401);
    this.message = message;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = AuthenticationError;
