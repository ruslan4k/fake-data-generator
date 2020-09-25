/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { NODE_PORT, MONGODB_URI } = require('./constants/envVariables');

(async () => {
  if (!MONGODB_URI) throw (new Error('Please add MONGODB_URI to .env'));
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Successfully connected to MongoDB instance');
})();

const app = express();
const PORT = NODE_PORT || 3600;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${PORT}`);
});
