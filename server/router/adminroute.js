const express = require("express");
const controller = require("../controller/adminController");

const router = express.Router();

router.post("/addproduct", controller.addproduct);
router.post(
 "/editproduct",
 controller.productphoto,
 controller.resizeUserPhoto,
 controller.editproduct
);

router.post("/addDiscount", controller.addDiscount);
router.get("/getallproductsadmin", controller.getallproductadmin);
router.post("/getoneproductadmin", controller.getoneproduct);
router.get("/getalldiscount", controller.getalldiscount);
router.post("/getonediscount", controller.getonediscount);
router.post("/editdiscount", controller.editdiscount);
router.get("/getallorders", controller.getallordersadmin);
router.post("/getorderdetail", controller.getorderdetails);
router.post("/numberoforders", controller.numberoforder);
router.post("/getoneproductsku", controller.getoneproductsku);
router.post("/deletediscount", controller.deletediscount);
router.post("/updateproduct", controller.updateproduct);

module.exports = router;
