const express = require('express');
const path = require('path');

console.log('APP.JS LOADED');

const connectDB = require('./db');

const app = express();

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection failed:', err);
    res.status(500).json({ message: 'Database connection error' });
  }
});

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
