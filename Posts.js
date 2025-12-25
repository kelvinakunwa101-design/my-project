const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema. Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});
Module.exports = mongoose.model('Post', PostSchema);  