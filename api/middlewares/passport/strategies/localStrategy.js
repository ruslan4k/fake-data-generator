const passport = require('passport');
const { Strategy } = require('passport-local');
const NotFoundError = require('../../../constants/errors/notFoundError');
const UserService = require('../../../services/userService');

passport.use(new Strategy(
  async (email, password, cb) => {
    try {
      const user = await UserService.getUserByEmailAndPassword(email, password);
      if (!user) throw new NotFoundError('Not Valid Credentials');
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  },
));
