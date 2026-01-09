const express = require('express');
const path = require('path');
const connectDB = require('./db');

console.log('APP.JS LOADED');

const app = express();
const PORT = process.env.PORT || 3000;


connectDB()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });


app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

