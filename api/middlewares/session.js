const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const { SESSION_KEY } = require('../constants/envVariables');

const sessionConfig = {
  secret: SESSION_KEY,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
};

module.exports = session(sessionConfig);
