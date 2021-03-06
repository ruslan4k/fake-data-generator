const { development } = require('../config');
const config = require('../config');

const {
  MONGODB_URI,
  SESSION_KEY,
  NODE_ENV,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GIT_CLIENT_ID,
  GIT_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  NODE_PORT,
} = process.env;
const ENV = NODE_ENV;

const LOCAL = 'local';
const DEVELOP = 'develop';

const { APP_URL, API_URL } = config[ENV];

module.exports = {
  NODE_PORT,
  MONGODB_URI,
  SESSION_KEY,
  ENV,
  APP_URL,
  API_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GIT_CLIENT_ID,
  GIT_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  LOCAL,
  DEVELOP,
};
