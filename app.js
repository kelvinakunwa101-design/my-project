const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const { connect, client } = require('./db');
const Posts = require('./models/Posts');
const User = require('./models/User');
const authMiddleware = require('./middleware/auth');
const { sendSMS } = require('./twilio');

// Routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Home route
app.get('/', (req, res) => {
    res.send("Sarah's Laundry App JS part!");
});

// Authentication
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        // Fixed: Use process.env for your secret key
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY || 'your_fallback_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Orders
app.post('/orders', async (req, res) => {
    try {
        const orderID = await createorder(req.body);
        const { phone } = req.body;
        if (phone) {
            sendSMS(phone, 'Your laundry order has been received!');
        }
        res.json({ message: 'Order created successfully', orderId: orderID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await readOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// For local testing
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// CRITICAL FOR VERCEL
module.exports = app;

