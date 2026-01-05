const express = require('express');
const path = require('path');
const { connect, client } = require('./db');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const authMiddleware = require('./middleware/auth');
const { sendSMS } = require('./twilio');
const { createorder, readOrders } = require('./models/Orders');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Homepage Route
app.get('/', (req, res) => {
  res.send("Sarah's Laundry App JS part!");
});

// Authentication Routes
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Fixed "ProcessingInstruction" error here
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Order Routes
app.post('/orders', async (req, res) => {
  try {
    const orderID = await createorder(req.body);
    const phoneNumber = req.body.phone;
    if (phoneNumber) {
      sendSMS(phoneNumber, 'your order has been received!');
    }
    res.json({ message: 'Order created successfully', orderID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/orders', async (req, res) => {
  const orders = await readOrders();
  res.send(orders);
});

// For local development
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// CRITICAL FOR VERCEL:
module.exports = app;
