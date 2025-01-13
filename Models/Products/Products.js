const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate product names
    trim: true,
  },
  taxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tax", // References the tax model
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 0, // Price cannot be negative
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
