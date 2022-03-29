const Product = require("../model/collectionSchema");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.productphoto = upload.single("images");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.originalname = `product-${req.body.sku}.jpeg`;

  await sharp(req.file.buffer)
    .toFormat("jpeg")
    .resize(711, 474)
    .toFile(`../react-app/public/images/${req.file.originalname}`);

  next();
});

exports.addproduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({
    name: req.body.name,
    sku: req.body.sku,
    price: req.body.price,
    inventory: req.body.inventory,
    images: req.file.originalname,
    status: req.body.status,
    description: req.body.description,
  });
  return res.status(200).send({
    status: "success",
    product,
  });
});

exports.addDiscount = catchAsync(async (req, res, next) => {
  const discount = await Discount.create(req.body);

  return res.status(200).send({
    status: "success",
    discount,
  });
});
