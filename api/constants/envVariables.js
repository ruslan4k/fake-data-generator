const config = require('../config');

const {
  PORT, MONGODB_URI, SESSION_KEY, NODE_ENV,
} = process.env;
const ENV = NODE_ENV;

const { APP_URL } = config[ENV];

module.exports = {
  PORT,
  MONGODB_URI,
  SESSION_KEY,
  ENV,
  APP_URL,
};
