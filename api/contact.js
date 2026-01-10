const connectDB = require('../db');
const Contact = require('../models/Contact');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDB();

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    return res.status(201).json({
      success: true,
      data: newContact,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
