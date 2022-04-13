const mongoose = require("mongoose");

const cartchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: [true, 'cart must be belong to a user']
  },
  discount: {
    type: String,
    default: "",
  },

  product: [
    {
      productid: {
        type: mongoose.Schema.ObjectId,
        ref: "Prouct",
        required: [true, "cart must have a product"],
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

cartchema.pre(/^find/, async function (next) {
  this.populate("product.productid");
  this.populate("user");

  next();
});

cartchema.pre("save", async function (next) {
  this.populate("product.productid");
  this.populate("user");
  next();
});

const Cart = mongoose.model("Cart", cartchema);

module.exports = Cart;
