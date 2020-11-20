/* eslint-disable no-console */
require('dotenv').config();
require('./middlewares/passport');
const mongoose = require('mongoose');
const { app } = require('./app');
const { NODE_PORT } = require('./constants/envVariables');

const { ENV } = require('./constants/envVariables');

const { MONGODB_URI, SESSION_KEY } = require('./constants/envVariables');

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

const PORT = NODE_PORT || 3600;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${NODE_PORT}`);
});
