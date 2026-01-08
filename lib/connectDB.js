const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
let client;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

module.exports = connectDB;