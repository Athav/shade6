// Dependency for mongoose
const mongoose = require('mongoose');

// Schema for doctor
const Customer = new mongoose.Schema({
  customerId: {
    type: Number,
    required: true,
    unique: true
  },
  customerCode: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true,
  },
  customerCategory: {
    type: String,
    required: true
  },
  customerAge: {
    type: Number,
    required: true
  },
  customerAddress: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  loyaltyCustomer: {
    type: Boolean,
    required: true,
    default: false
  },
});

//Model export  for schema
module.exports = mongoose.model('customer', Customer);
