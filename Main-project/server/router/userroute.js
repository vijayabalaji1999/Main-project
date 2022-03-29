const express = require("express");
const controller = require("../controller/userController");

const router = express.Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);
// router.use(controller.protect);
router.get("/getallproduct", controller.getallproduct);
router.post("/productdetail", controller.productdetail);
router.post("/addtocart", controller.addtocart);
router.post("/getcart", controller.getcart);
router.delete("/deleteitemcart", controller.deletecart);
router.post("/getdiscount", controller.getdiscount);
router.post("/setdiscount", controller.setdiscount);

module.exports = router;
