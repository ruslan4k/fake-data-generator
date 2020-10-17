require('./strategies');
const passport = require('passport');
const AuthenticationError = require('../../constants/errors/authenticationError');
const UserService = require('../../services/userService');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(new AuthenticationError('Something went wrong with authentication'), null);
  }
});
