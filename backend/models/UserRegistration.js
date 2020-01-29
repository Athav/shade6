// Dependency for mongoose
const mongoose = require('mongoose');

// Schema for doctor
const registerUser = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

//Model export  for schema
module.exports = mongoose.model('registerUser', registerUser);
