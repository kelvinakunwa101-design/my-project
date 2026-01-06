require('dotenv').config(); 

const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

// 1. Core Config
const app = express();
const port = process.env.PORT || 3000;

// 2. Middleware
app.use(express.json());
app.use(express.static('public'));

// 3. Database
const { connect } = require('./db');
connect(); 

// 4. Imports
const postRouter = require('./routes/posts');
const User = require('./models/User');       
const Post = require('./models/Post');       
const authMiddleware = require('./middleware/auth');
// const { sendSMS } = require('./twilio');   // optional

// 5. Routes
app.use('/api/posts', postRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

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

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Hello, authenticated user!' });
});

app.post('/orders', async (req, res) => {
  try {
    const { phone } = req.body;
    res.json({ message: 'Order created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
