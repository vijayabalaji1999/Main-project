const Product = require("../model/collectionSchema");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const Discount = require("../model/discountschema");
const Orderschema = require("../model/schema");
const fs = require("fs");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
 if (file.mimetype.startsWith("image")) {
  cb(null, true);
 } else {
  cb(console.log("hi"), false);
 }
};

const upload = multer({
 storage: multerStorage,
 fileFilter: multerFilter,
});

exports.productphoto = upload.single("images");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
 // console.log(req.body, "=============================");
 if (!req.file) return next();
 console.log(req.file);

 req.file.originalname = `${req.file.fieldname}-product-${Date.now()}.jpg`;

 await sharp(req.file.buffer)
  .toFormat("jpeg")
  .resize(711, 474)
  .toFile(`../react-app/public/images/${req.file.originalname}`);

 next();
});

exports.addproduct = catchAsync(async (req, res, next) => {
 console.log(req.body.data);
 const product = await Product.create(req.body.data);
 console.log(product);
 return res.status(200).send({
  status: "success",
  product,
 });
});

exports.editproduct = catchAsync(async (req, res, next) => {
 const file = req.file.originalname;
 console.log(req.file);

 return res.status(200).send({
  status: "success",
  file,
 });
});

exports.updateproduct = catchAsync(async (req, res, next) => {
 const request = req.body.data;
 console.log(request);
 const product = await Product.findOneAndUpdate(
  { _id: req.body.data._id },
  {
   $set: {
    ...request,
   },
  },
  { new: true }
 );

 return res.status(200).send({
  status: "success",
  product,
 });
});

exports.getallproductadmin = catchAsync(async (req, res, next) => {
 const products = await Product.find();

 return res.status(200).send({
  status: "success",
  products,
 });
});

exports.getallordersadmin = catchAsync(async (req, res, next) => {
 const orders = await Orderschema.find({ paymentstatus: "Paid" }).sort([
  ["createdat", -1],
 ]);

 return res.status(200).send({
  status: "success",
  orders,
 });
});

exports.getorderdetails = catchAsync(async (req, res, next) => {
 const orderid = req.body.orderid;
 const orders = await Orderschema.find({ orderno: orderid });

 return res.status(200).send({
  status: "success",
  orders,
 });
});

exports.addDiscount = catchAsync(async (req, res, next) => {
 const discount = await Discount.create(req.body.data);

 return res.status(200).send({
  status: "success",
  discount,
 });
});

exports.getoneproduct = catchAsync(async (req, res, next) => {
 const sku = req.body.sku;
 const product = await Product.find({ _id: sku });

 return res.status(200).send({
  status: "success",
  product,
 });
});
exports.getoneproductsku = catchAsync(async (req, res, next) => {
 const sku = req.body.sku;
 const product = await Product.find({ sku: sku });

 return res.status(200).send({
  status: "success",
  product,
 });
});

exports.getalldiscount = catchAsync(async (req, res, next) => {
 const discounts = await Discount.find();

 return res.status(200).send({
  status: "success",
  discounts,
 });
});

exports.getonediscount = catchAsync(async (req, res, next) => {
 const code = req.body.code;
 const discount = await Discount.find({ _id: code });

 return res.status(200).send({
  status: "success",
  discount,
 });
});

exports.editdiscount = catchAsync(async (req, res, next) => {
 const dis = req.body.data;
 const code = dis.discountcode;
 console.log(req.body);
 const discount = await Discount.findOneAndUpdate(
  { _id: dis._id },
  {
   $set: {
    ...dis,
   },
  },
  { new: true }
 );
 console.log(discount, "================");
 return res.status(200).send({
  status: "success",
  discount,
 });
});

exports.numberoforder = catchAsync(async (req, res, next) => {
 const id = req.body.userid;
 const number = await Orderschema.find({
  user: id,
  paymentstatus: "Paid",
 }).count();

 return res.status(200).send({
  status: "success",
  number,
 });
});

exports.deletediscount = catchAsync(async (req, res, next) => {
 const deleted = await Discount.deleteOne({
  _id: req.body.id,
 }).remove();

 return res.status(200).send({
  status: "success",
  deleted,
 });
});
