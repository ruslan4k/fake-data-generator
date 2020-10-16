const UserService = require('../services/userService');

const authenticate = async (req, res, next) => {
  try {
    const id = (req.session.user && req.session.user.id) || (req.session.passport && req.session.passport.user);
    if (id) {
      const dbUser = await UserService.getUserById(id);
      if (!dbUser) req.session.user = null;
      req.user = dbUser;
      req.userId = dbUser._id;
    } else {
      req.user = null;
      req.userId = null;
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authenticate;
