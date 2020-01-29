// Dependency for mongoose
const mongoose = require('mongoose');

// Schema for doctor
const addProduct = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  productCode: {
    type: String,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    set: function (v) {
      return Math.round(v);
    },
    required: true
  },
  productStock: {
    type: Number,
    required: true,
  },
  storeCode: {
    type: Number,
    required: true,
  },
});

//Model export  for schema
module.exports = mongoose.model('products', addProduct);
