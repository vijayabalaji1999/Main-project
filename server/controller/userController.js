const Product = require("../model/collectionSchema");
const User = require("../model/signupSchema");
const Cart = require("../model/cartSchema");
const catchAsync = require("../utils/catchAsync");
const Discount = require("../model/discountschema");
const Orderschema = require("../model/schema");
const Email = require("./email");
// import { Welcome } from "../../react-app/src/component/User/welcome";
// import ReactDOMServer from "react-dom/server";

// const {
//   Orderdetail,
// } = require("../../react-app/src/component/User/orderdetail");

exports.login = catchAsync(async (req, res, next) => {
 const { email, password, message } = req.body;

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

 //user.password = undefined;
 req.session.user = user;
 // console.log(req.session.user);

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

 req.session.user = user;

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

 console.log(req.session.user);

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
 const productavailable = addedproduct[0].status === "available";
 const usercanby = inventory >= quantity && quantity >= 0;
 if (!productavailable) {
  return res.status(400).send({
   status: `Product is not available now`,
   code: 401,
  });
 }

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
    status: `Cannot buy this quantity please try another quantity`,
    code: 401,
   });
  }
 } else if (!usercanby || quantity === 0) {
  return res.status(400).send({
   status: `Cannot buy this quantity please try another quantity`,
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
exports.checkoutApi = catchAsync(async (req, res, next) => {
 const session = await createStripeCheckoutSession(req.body.line_items);
 console.log(session);
 return res.status(200).send({
  status: "success",
  session,
 });
});

exports.addorderApi = catchAsync(async (req, res, next) => {
 const filter = await Orderschema.find({}).sort({ orderno: -1 }).limit(1);
 const orderno = filter.length !== 0 ? filter[0].orderno + 1 : 1000;

 const productdetail = await Orderschema.create({
  orderno: orderno,
  ...req.body,
 });
 console.log(productdetail);

 return res.status(200).send({
  status: "success",
  orderno,
 });
});

exports.findorderApi = catchAsync(async (req, res, next) => {
 const orderid = req.body.orderid;
 const orderdetails = await Orderschema.find({
  orderno: orderid,
 });
 console.log(orderdetails);

 return res.status(200).send({
  status: "success",
  orderdetails,
 });
});

exports.myordersApi = catchAsync(async (req, res, next) => {
 const userid = req.body.userid;
 const allorders = await Orderschema.find({ user: userid }).sort([
  ["createdat", -1],
 ]);
 // ]);

 return res.status(200).send({
  status: "success",
  allorders,
 });
});

exports.removecartApi = catchAsync(async (req, res, next) => {
 const updated = await Cart.updateMany(
  { user: req.body.user },
  { $set: { product: [] } }
 );

 return res.status(200).send({
  status: "success",
  updated,
 });
});

exports.incrementApi = catchAsync(async (req, res, next) => {
 const code = req.body.code;
 const inc = await Discount.findOneAndUpdate(
  { discountcode: code },
  { $inc: { timeused: 1 } },
  { new: true }
 );
 res.send(inc);
});

exports.paymentstatusApi = catchAsync(async (req, res, next) => {
 const orderno = req.body.order;
 const status = await Orderschema.findOneAndUpdate(
  { orderno: orderno },
  { $set: { paymentstatus: "Paid" } },
  { new: true }
 );
 res.send(status);
});

exports.inventoryDecrement = catchAsync(async (req, res, next) => {
 const id = req.body.sku;
 const qua = Number(req.body.quantity);
 console.log(id, qua);
 console.log(typeof qua);
 const dec = await Product.findOneAndUpdate(
  { sku: id },
  { $inc: { inventory: -qua } },
  { new: true }
 );
 res.send(dec);
});
const { MongoClient } = require("mongodb");

exports.logoutuser = catchAsync(async (req, res, next) => {
 MongoClient.connect(process.env.DATABASE, function (err, client) {
  console.log("Logged out 1");
  if (err) console.log(err);
  console.log(req.session);

  var db = client.db("Main-Project");
  if (req.session && req.session.user) {
   const datas = db
    .collection("mySessions")
    .deleteOne({ _id: req.session.user._id });
  }

  req.session.destroy(() => {
   console.log("Logged out 2");
   res
    .clearCookie("userId", {
     path: "/",
     httpOnly: true,
    })
    .sendStatus(200);
  });
 });
});

exports.check = catchAsync((req, res) => {});

exports.orderconfirmation = catchAsync(async (req, res, next) => {
 const message = req.body.message;
 const to = req.body.to;
 await new Email(message, to).sendOrder();
});

exports.welcome = catchAsync(async (req, res, next) => {
 const message = req.body.message;
 const to = req.body.to;
 await new Email(message, to).sendWelcome();
});


