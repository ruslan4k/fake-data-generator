require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
require('../middlewares/passport');

let mongo;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  const promises = collections.map((collectionItem) => collectionItem.deleteMany({}));
  await Promise.all(promises);
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
