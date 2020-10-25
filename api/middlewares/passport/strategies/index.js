const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy } = require('passport-local');
const NotFoundError = require('../../../constants/errors/notFoundError');
const UserService = require('../../../services/userService');
const { API_URL } = require('../../../constants/envVariables');

const {
  GIT_CLIENT_ID,
  GIT_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = require('../../../constants/envVariables');

const socialSignInService = require('../../../services/socialSignInService');

// facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: `${API_URL}/auth/social/facebook/callback`,
    },
    (accessToken, refreshToken, profile, cb) => socialSignInService.handlePassportSocialSignIn(profile, cb)
  )
);

// github
passport.use(
  new GitHubStrategy(
    {
      clientID: GIT_CLIENT_ID,
      clientSecret: GIT_CLIENT_SECRET,
      callbackURL: `${API_URL}/auth/social/github/callback`,
    },
    (accessToken, refreshToken, profile, cb) => socialSignInService.handlePassportSocialSignIn(profile, cb)
  )
);

// google
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${API_URL}/auth/social/google/callback`,
    },
    (accessToken, refreshToken, profile, cb) => socialSignInService.handlePassportSocialSignIn(profile, cb)
  )
);

// local
passport.use(
  new Strategy(async (email, password, cb) => {
    try {
      const user = await UserService.getUserByEmailAndPassword(email, password);
      if (!user) throw new NotFoundError('Not Valid Credentials');
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
