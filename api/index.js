require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.NODE_PORT || 3600;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${PORT}`);
});
