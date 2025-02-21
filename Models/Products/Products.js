const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true, // Ensures no duplicate product names
    trim: true,
  },
  taxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tax", // References the tax model
    required: true,
  },
  brandName: {
    type: String,
    required: false,
    trim: true,
  },
  hsn: {
    type: String,
    required: false,
    trim: true,
  },
  uniqueId: {
    type: String,
    required: false,
    trim: true,
  },
  category: {
    type: String,
    required: false,
    trim: true,
  },
  supplier: {
    type: String,
    required: false,
    trim: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 0, // Price cannot be negative
  },
  purchasePrice: {
    type: Number,
    required: true,
    min: 0, // Price cannot be negative
    default: 0,
  },
  mrp: {
    type: Number,
    required: true,
    min: 0, // Price cannot be negative
  },
  weight: {
    type: Number,
    required: false,
    min: 0,
  },
  unit: {
    type: String,
    trim: true,
    required: false,
  },
  description: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0, // Default stock is 0
  },
  status: {
    type: String,
    required: true,
    default: "Active", // Default stock is 0
  },
});

module.exports = mongoose.model("Product", productSchema);
