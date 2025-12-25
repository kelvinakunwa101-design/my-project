const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();  
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);  
};

Module.exports = mongoose.model('User', userSchema);