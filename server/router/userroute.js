const express = require("express");
const controller = require("../controller/userController");
const checkoutcontroller = require("../controller/checkout");

const router = express.Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);
// router.use(controller.protect);
router.get("/getallproduct", controller.getallproduct);
router.post("/productdetail", controller.productdetail);
router.post("/addtocart", controller.addtocart);
router.post("/getcart", controller.getcart);
router.post("/deleteitemcart", controller.deletecart);
router.post("/getdiscount", controller.getdiscount);
router.post("/setdiscount", controller.setdiscount);
router.post("/checkout", checkoutcontroller.createStripeCheckoutSession);
router.post("/addorder", controller.addorderApi);
router.post("/findorder", controller.findorderApi);
router.post("/myorders", controller.myordersApi);
router.post("/removecart", controller.removecartApi);
router.post("/increment", controller.incrementApi);
router.post("/status", controller.paymentstatusApi);
router.post("/decrement", controller.inventoryDecrement);
router.get("/logout", controller.logoutuser);
router.post("/orderconfirmationmail", controller.orderconfirmation);
router.post("/welcome", controller.welcome);

// router.post("/createuserroute", controller.useroute);

module.exports = router;
