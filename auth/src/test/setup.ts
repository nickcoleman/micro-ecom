import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';

import {app} from '../app';

let mongo: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer(); // create a new instance of mongodb running in memory
  const mongoUri = await mongo.getUri(); // get URI for mongodb running in memory

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// delete any existing colletions before each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// remove the running instances of mongodb and mongoose collections
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
