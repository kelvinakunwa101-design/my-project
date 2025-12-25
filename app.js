const express = require('express');
const path = require('path');
const { connect, client } = require('./db');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const app = express();
const port = 3000;
const { createorder, readOrders } = require('./models/Orders');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const authMiddleware = require('./middleware/auth');
const { sendSMS } = require('./twilio');
const postRouter = require('./routes/posts');
app.use('/api/posts', postRouter);
app.get('/', (req, res) => {
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});    
  res.send('Sarah\'s Laundry App JS part!');
});  
app.listen(port, () => {
  console.log(`Server on port ${port}`); 
  console.log(`Server runing on http://localhost:${3000}`);
});  

app.post('/orders', (req, res) => {
  const phoneNumber = req.body.phone;
  const message = 'your order has received!';
  sendSMS(phoneNumber, message);
  res.json({ message: 'Order created sucessfully' });
});  

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Hello, authenticated user!' });
});  

app.post('/register', async (req, res) => {
  const { username, password } =req.body;
  const user = new User({ username, password});
  await user.save();
  res.json({ message: 'User created successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username});
  if (!user || !(await user.comparePassword(password))){
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, ProcessingInstruction.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});  

app.use(express.json());

app.post('/orders', async (req, res) => {
  const orderID = await createorder(req.body);
  res.send({orderId});
});

app.get('/orders', async (req, res) => {
  const orders = await readOrders();
  res.send(orders);
});

app.put('/orders/:id', (req, res) => {
});

app.delete('/orders/:id', (req, res) => {
});

app.post('/orders', (req, res) => {
  const { name, phone, service, quantity } = req.body;
  res.json({ message: 'Order created successfully' });
});  
