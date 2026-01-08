const express = require('express');
const path = require('path');

console.log('APP.JS LOADED');

const connectDB = require('./db');

const app = express();

// connect once (safe on Vercel)
connectDB();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
