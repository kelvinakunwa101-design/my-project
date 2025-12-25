const { MongoClient } = require('mongodb');


const url = 'mongodb+srv://fleshy101:luzane101_112@cluster0.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'mydatabase';

const client = new MongoClient(url);


async function connect() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB'); 
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
  }
}


