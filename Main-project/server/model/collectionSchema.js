const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: [true],
  },
  price: {
    type: String,
    required: [true],
  },
  inventory: {
    type: String,
    required: [true],
  },
  images: {
    type: String,
    default: "default.jpg",
  },
  status: {
    type: String,
    default: "active",
  },
  description: {
    type: String,
  },
});

const Product = mongoose.model("Prouct", productschema);

module.exports = Product;
