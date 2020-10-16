/* eslint-disable no-console */
require('dotenv').config();
require('./middlewares/passport');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('./middlewares/session');
const router = require('./routes');
const { APP_URL, ENV } = require('./constants/envVariables');
const errorHandler = require('./middlewares/errorHandler');

const NotFoundError = require('./constants/errors/notFoundError');

const { NODE_PORT, MONGODB_URI, SESSION_KEY } = require('./constants/envVariables');

(async () => {
  if (!ENV) throw new Error('Please add NODE_ENV to .env');
  if (!MONGODB_URI) throw new Error('Please add MONGODB_URI to .env');
  if (!SESSION_KEY) throw new Error('Please add SESSION_KEY to .env');
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('Successfully connected to MongoDB instance');
})();

const app = express();
const PORT = NODE_PORT || 3600;

app.use(morgan('dev'));
app.use(cors({
  //  allow cookies (or other user credentials) to be included on cross-origin requests
  credentials: true,
  origin: APP_URL,
}));
app.use(bodyParser.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
