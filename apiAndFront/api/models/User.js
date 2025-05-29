const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
});

module.exports = mongoose.model('User', UserSchema);
