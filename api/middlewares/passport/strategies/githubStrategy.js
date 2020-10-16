const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../../../constants/envVariables');

const UserRepository = require('../../../repositories/userRepositories');

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3600/auth/social/github/callback',
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
