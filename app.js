
require('dotenv').config();

const express = require('express');
const path = require('path');
const connectDB = require('./db');
const contactRoute = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;


connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json());


app.use('/api/contact', contactRoute);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});