console.log('APP.JS LOADED');

const express = require('express');
const path = require('path');
const { connect } = require('./lib/connectDB');

const app = express();

// Connect to MongoDB
connect();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
