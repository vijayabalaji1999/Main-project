const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  discountcode: {
    type: String,
    required: [true, "Must have a Discount code"],
    unique: [true, "must be unique"],
  },
  discountvalue: {
    type: String,
  },
  status: {
    type: String,
    default: "enable",
  },
  timeused: {
    type: Number,
    default: 0,
  },
  startdate: {
    type: Date,
    default: Date.now,
  },
  enddate: Date,
  appliesforall: Boolean,

  product: [
    {
      productid: {
        type: mongoose.Schema.ObjectId,
        ref: "Prouct",
        required: [true, "cart must have a product"],
      },
    },
  ],
});

discountSchema.pre("save", async function (next) {
  this.populate("product.productid");
  next();
});

discountSchema.pre(/^find/, async function (next) {
  this.populate("product.productid");
  next();
});

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
