const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const UserRepository = require('../../../repositories/userRepositories');
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = require('../../../constants/envVariables');

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:3600/auth/social/facebook/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      const { displayName } = profile;
      const { email } = profile._json;
      let user;
      if (email) {
        user = await UserRepository.getUserByEmail(email);
      }

      if (!user) user = await UserRepository.createUser({ name: displayName, email });

      cb(null, user);
    },
  ),
);
