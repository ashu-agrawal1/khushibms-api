const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate tax names
    trim: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 0, // Tax percentage should be 0 or greater
    max: 100, // Tax percentage should not exceed 100
  },
});

module.exports = mongoose.model("Tax", taxSchema);