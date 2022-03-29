const Product = require("../model/collectionSchema");
const User = require("../model/signupSchema");
const Cart = require("../model/cartSchema");
const catchAsync = require("../utils/catchAsync");
const Discount = require("../model/discountschema");

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      status: "Please provide email id and passsword",
      code: 401,
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next({
      status: "No user found",
      code: 401,
    });
  }

  const correct = await user.correctPassword(password, user.password);
  user.password = undefined;
  // req.session.user = user;

  if (!correct) {
    return next({
      status: "Incorrect email or password",
      code: 401,
    });
  }

  return res.status(200).send({
    status: "success",
    user,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  user.password = undefined;
  user.passwordConfirm = undefined;

  return res.status(200).send({
    status: "success",
    user,
  });
});

exports.getallproduct = catchAsync(async (req, res, next) => {
  const allproduct = await Product.find({ status: "available" });

  return res.status(200).send({
    status: "success",
    allproduct,
  });
});

exports.productdetail = catchAsync(async (req, res, next) => {
  const productdetail = await Product.find({ sku: req.body.id });

  return res.status(200).send({
    status: "success",
    productdetail,
  });
});

exports.addtocart = catchAsync(async (req, res, next) => {
  const user = req.body.user;
  const product = req.body.productid;
  const quantity = Number(req.body.quantity);
  const discount = req.body.discount ? req.body.discount : "";
  const role = req.body.role;
  const addeduser = await Cart.find({ user: user });
  const addedproduct = await Product.find({ _id: product });
  const inventory = addedproduct[0].inventory;
  const usercanby = inventory >= quantity && quantity >= 0;

  if (addeduser.length === 0 && usercanby) {
    const cart = await Cart.create({
      user: user,
      product: {
        productid: product,
        quantity: quantity,
      },
      discount: discount,
    });
    return res.status(200).send({
      status: "success",
      cart,
    });
  } else if (addeduser && usercanby) {
    let canupdate = false;
    let hasbutnotvalid = false;
    let noproduct = false;
    const findProduct = await Cart.findOne({ user: req.body.user });
    // if (findProduct.discount !== discount) {
    //   findProduct.discount = discount;
    // }

    const updatedproduct = findProduct.product.map((each) => {
      if (each.productid.id === product) {
        {
          role === "add"
            ? (each.quantity = each.quantity + quantity)
            : (each.quantity = quantity);
        }
        each.productid.id = product;
        if (inventory >= each.quantity && quantity !== 0) {
          canupdate = true;
        } else {
          hasbutnotvalid = true;
        }
      } else {
        noproduct = true;
      }
    });

    if (canupdate) {
      const cart = await findProduct.save();
      return res.status(200).send({
        status: "success",
        cart,
      });
    } else if (
      noproduct &&
      !hasbutnotvalid &&
      quantity !== 0 &&
      findProduct.product.length !== 0
    ) {
      const cart = await Cart.findOneAndUpdate(
        { user: user },
        {
          $push: {
            product: {
              productid: product,
              quantity: quantity,
            },
          },
        },
        { new: true }
      );

      return res.status(200).send({
        status: "success",
        cart,
      });
    } else if (
      !hasbutnotvalid &&
      quantity !== 0 &&
      findProduct.product.length === 0
    ) {
      const cart = await Cart.findOneAndUpdate(
        { user: user },
        {
          $set: {
            product: {
              productid: product,
              quantity: quantity,
            },
          },
        },
        { new: true }
      );

      return res.status(200).send({
        status: "success",
        cart,
      });
    } else if (!usercanby || hasbutnotvalid || quantity === 0) {
      return res.status(400).send({
        status: `Cannot buy this quantity try another quantity`,
        code: 401,
      });
    }
  } else if (!usercanby || quantity === 0) {
    return res.status(400).send({
      status: `Cannot buy this quantity try another quantity`,
      code: 401,
    });
  }
});

exports.getcart = catchAsync(async (req, res, next) => {
  const cartdetail = await Cart.find({ user: req.body.user });
  const productadded = cartdetail[0].product;

  return res.status(200).send({
    status: "success",
    productadded,
    cartdetail,
  });
});

exports.deletecart = catchAsync(async (req, res, next) => {
  const updated = await Cart.findOneAndUpdate(
    { user: req.body.user },
    { $pull: { product: { productid: req.body.productid } } },
    { new: true }
  );

  return res.status(200).send({
    status: "success",
    updated,
  });
});

exports.getdiscount = catchAsync(async (req, res, next) => {
  const discount = await Discount.find({ discountcode: req.body.discountcode });

  if (discount.length === 0) {
    return res.status(400).send({
      status: `Coupon is not valid please try another coupon`,
      code: 401,
    });
  }

  return res.status(200).send({
    status: "success",
    discount,
  });
});

exports.setdiscount = catchAsync(async (req, res, next) => {
  const code = req.body.discountcode ? req.body.discountcode : "";
  const userid = req.body.userid;

  const updated = await Cart.findOneAndUpdate(
    { user: userid },
    { $set: { discount: code } },
    { new: true }
  );

  return res.status(200).send({
    status: "success",
    updated,
  });
});
/////////////////////////////////////////////////////////////////////////
