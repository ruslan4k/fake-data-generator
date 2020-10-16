const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserRepository = require('../../../repositories/userRepositories');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../../../constants/envVariables');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3600/auth/social/google/callback',
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
