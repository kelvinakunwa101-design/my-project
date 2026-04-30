const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));