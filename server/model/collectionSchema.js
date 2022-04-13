const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 sku: {
  type: String,
  required: true,
  unique: [true, "SKU must be unique"],
 },
 price: {
  type: String,
  required: [true],
 },
 inventory: {
  type: Number,
  required: [true],
 },
 images: {
  type: String,
  default: "default.jpg",
 },
 status: {
  type: String,
  default: "available",
 },
 description: {
  type: String,
 },
});

const Product = mongoose.model("Prouct", productschema);

module.exports = Product;
