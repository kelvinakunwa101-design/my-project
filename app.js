require('dotenv').config();

const express = require('express');
const path = require('path');

// 1. App setup
const app = express();
const port = process.env.PORT || 3000;

// 2. Middleware
app.use(express.json());
app.use(express.static('public'));

// 3. Database
const { connect } = require('./db');
connect();

// 4. Route imports
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

// 5. API routes
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

// 6. Frontend route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 7. Health check (optional but useful on Vercel)
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// 8. Start server (local only)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
