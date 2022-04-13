const mongoose = require("mongoose");
const validator = require("validator");

const Ordersschema = new mongoose.Schema({
 orderno: {
  type: Number,
  required: [true],
  unique: [true, , "OrderNo already exist"],
 },
 user: {
  type: mongoose.Schema.ObjectId,
  ref: "User",
  // required: [true, 'cart must be belong to a user']
 },
 products: [
  {
   productid: {
    type: String,
   },
   productname: {
    type: String,
   },
   actualprice: {
    type: String,
   },
   quantity: {
    type: Number,
   },
   price: {
    type: String,
   },
   images: {
    type: String,
   },
   discountcode: {
    type: String,
    default: "",
   },
   discountvalue: {
    type: String,
   },
  },
 ],
 totalprice: {
  type: String,
 },
 totaldiscount: {
  type: Number,
 },
 totalquantity: {
  type: Number,
 },
 discountcode: {
  type: String,
 },
 paymentstatus: {
  type: String,
  default: "pending",
 },
 createdat: {
  type: Date,
  default: Date.now,
 },
 fulfilmentstatus: {
  type: String,
  default: "Fullfilled",
 },

 contact: {
  name: {
   type: String,
  },
  email: {
   type: String,
   validate: [validator.isEmail, "Please provide a valid emails"],
  },
  phone: {
   type: Number,
  },
  address: {
   type: String,
  },
  postalcode: {
   type: String,
  },
 },
 shipping: {
  shippingname: {
   type: String,
  },
  shippingemail: {
   type: String,
   validate: [validator.isEmail, "Please provide a valid emails"],
  },
  shippingphone: {
   type: Number,
  },
  shippingaddress: {
   type: String,
  },
  shippingpostal: {
   type: Number,
  },
 },
});

Ordersschema.pre("save", async function (next) {
 this.populate("user");
 next();
});

Ordersschema.pre(/^find/, async function (next) {
 this.populate("user");
 next();
});

const Orderschema = mongoose.model("Orderschema", Ordersschema);

module.exports = Orderschema;
