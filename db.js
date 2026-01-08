const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing');
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error; // VERY IMPORTANT for Vercel
  }
};

module.exports = connectDB;


