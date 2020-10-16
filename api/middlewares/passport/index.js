require('./strategies');
const passport = require('passport');
const UserService = require('../../services/userService');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = UserService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
