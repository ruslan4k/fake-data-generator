class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

module.exports = CustomError;
