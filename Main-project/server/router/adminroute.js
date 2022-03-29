const express = require("express");
const controller = require("../controller/adminController");

const router = express.Router();

router.post(
  "/addproduct",
  controller.productphoto,
  controller.resizeUserPhoto,
  controller.addproduct
);
router.post("/addDiscount", controller.addDiscount);

module.exports = router;
