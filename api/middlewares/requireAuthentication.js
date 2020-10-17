const AuthenticationError = require('../constants/errors/authenticationError');

const requireAuthentication = async (req, res, next) => {
  try {
    const isLoggedIn = req.isAuthenticated();
    if (!isLoggedIn) throw new AuthenticationError();
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = requireAuthentication;
