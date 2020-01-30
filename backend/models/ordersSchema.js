// Dependency for mongoose
const mongoose = require('mongoose');

// Schema for doctor
const Orders = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true
  },
  orderDate: {
    type: Date.now(),
    required: true,
  },
  orderBy: {
    type: String,
    required: true,
  },
  orderCategory: {
    type: String,
    required: true
  },
  deleveryTo: {
    type: String,    
    required: true
  },
  orderAddress: {
    type: String,
    required: true,
  }
});

//Model export  for schema
module.exports = mongoose.model('order', Orders);
