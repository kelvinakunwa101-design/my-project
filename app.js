console.log('APP.JS LOADED');
const express = require('express');
const path = require('path');

const connectDB = require('./lib/connectDB');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// 🚨 NO app.listen() on Vercel
module.exports = app;
