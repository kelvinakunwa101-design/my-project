const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
let client;

async function connect() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client;
}

module.exports = { connect };


