/* eslint-disable no-console */
require('dotenv').config();
require('./services/userService');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('./middlewares/session');
const router = require('./routes');

const { NODE_PORT, MONGODB_URI } = require('./constants/envVariables');

(async () => {
  if (!MONGODB_URI) throw (new Error('Please add MONGODB_URI to .env'));
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
app.use(bodyParser.json());
app.use(session);
app.use(router);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${PORT}`);
});
