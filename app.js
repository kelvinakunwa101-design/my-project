require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));


const { connect } = require('./db');
connect();

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

if (require.main === module) 

module.exports = app;

