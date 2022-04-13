const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userroute = require("./router/userroute");
const globalErrorHandler = require("./controller/errorController");
const adminrouter = require("./router/adminroute");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

app.use(express.json());
dotenv.config({ path: "./config.env" });
app.use(cookieParser());

app.use(
 cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
 })
);

app.use(bodyParser.urlencoded({ extended: false }));

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

let store = new MongoDBStore({
 uri: DB,
 collection: "mySessions",
 expires: 1000 * 60 * 60 * 24 * 30,
});

app.use(
 session({
  key: "userId",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
   maxAge: 1000 * 60 * 60 * 24 * 7,
   secure: false,
  },
  store: store,
 })
);

app.get("/user/sessions", (req, res) => {
 // console.log("Hello " + JSON.stringify(req.session));
 console.log(req.session.user);
 if (req.session.user) {
  res.send({ loggedIn: true, user: req.session.user });
 } else {
  res.send({ loggedIn: false });
 }
});

app.use("/images", express.static(`../react-app/public`));

app.use("/api/admin", adminrouter);

app.use("/api/user", userroute);

// const stripe = new Stripe(process.env.STRIPE_SECRET, {
//   apiVersion: "2020-08-27",
// });

const port = 3001;
app.listen(port, () => {
 console.log(`App running on port ${port}...`);
});

app.use(globalErrorHandler);

/////////////////////////////////////////////////////
// import { useState, useEffect } from "react";
// import { useContext } from "react";
// import { useNavigate } from "react-router";
// import { Usercontext } from "../../context/User-context/Authcontext";
// import {
//   discountcal,
//   order,
// } from "../../context/User-context/discountcalculate";
// import { useForm } from "react-hook-form";
// import { Link, useParams } from "react-router-dom";
// import {
//   deleteitemcartApi,
//   stripesessionApi,
// } from "../../context/User-context/apicalls";
// import { useStripe } from "@stripe/react-stripe-js";
// import { getdiscount } from "../../context/User-context/helper";
// import { orderdetail } from "../../context/User-context/discountcalculate";

// export const Checkout = () => {
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   let { orderid } = useParams();

//   const { register, handleSubmit, reset } = useForm();
//   const { addtocart } = useContext(Usercontext);

//   let subtotal;
//   let quantity;
//   // let discountcode;
//   const { values } = useContext(Usercontext);
//   const [cart, setcart] = useState();
//   const [dis, setdis] = useState();
//   const { getallcart } = useContext(Usercontext);
//   const [cartss, setcartss] = useState();

//   const userid = values.user._id;

//   const updateallquan = async (userid, id, qua) => {
//     const data = await addtocart(userid, id, qua, "update");
//     return data;
//   };

//   const checkouthandler = async (allcart, discount) => {
//     let contents;
//     let code;
//     let product = [];
//     let cart_items = [];
//     const data = await Promise.all(
//       allcart.productadded.map(async (e, i) => {
//         contents = await updateallquan(userid, e.productid._id, e.quantity);
//         if (contents.code) {
//           code = contents.code;
//           product.push(e.productid._id);
//         } else {
//           cart_items.push(e);
//         }
//       })
//     );

//     if (cart_items.length === 0) {
//       navigate("/cart");
//     } else {
//       setcart(cart_items);
//       delete allcart.productadded
//       allcart.productadded = cart_items

//     // if (code) {
//     //   allcart.productadded.forEach((e, i) => {
//     //     if (e.productid._id.includes(product)) {
//     //       allcart.productadded.slice(i, 1);
//     //     }
//     //   });
//     //   const data1 = await Promise.all(
//     //     product.map(async (e) => {
//     //       const deletepro = await deleteitemcartApi(userid, e);
//     //     })
//     //   );
//     //   // const data = await deleteitemcartApi(userid, productid);
//     //   if (allcart.productadded.length === 0) {
//     //     //navigate("/cart");
//     //     console.log(allcart.productadded);
//     //   }
//     // }

//     if (discount !== "") {
//       const data1 = await getdiscount(discount);
//       setdis(data1.discount[0].discountvalue);
//     }

//     setcartss(allcart);

//     if (discount === "") {
//       let totalprice = 0;
//       let quantity = 0;
//       allcart.productadded.forEach((e) => {
//         const amount = Number(e.productid.price.replace("$", ""));
//         const price = e.quantity * amount;
//         e.productid.fullprice = `$${price}`;
//         totalprice += price;
//         quantity += e.quantity;
//         allcart.productadded.totalprice = totalprice;
//         allcart.productadded.quantity = quantity;
//       });
//       console.log(cart);
//       setcart(allcart.productadded);
//     } else {
//       const data = await discountcal(
//         allcart.cartdetail[0].discount,
//         allcart.cartdetail[0]
//       );
//       setcart(data);
//     }
//   }
//   };

//   const datamain = async () => {
//     if (orderid !== "0000") {
//       const data = await orderdetail(orderid);
//       reset(data.orderdetails[0].contact);
//       reset(data.orderdetails[0].shipping);
//     }

//     const allcart = await getallcart(userid);
//     console.log(allcart);
//     if (allcart.productadded.length === 0) {
//       return console.log("discount deleted redirect here");
//     } else {
//       const discount = allcart.cartdetail[0].discount;
//       console.log(allcart.productadded);
//       const datas = await checkouthandler(allcart, discount);
//     }
//   };

//   if (cart && cart.discounttotalprice !== undefined) {
//     subtotal = cart.discounttotalprice;
//   } else if (cart && cart.totalprice) {
//     subtotal = cart.totalprice;
//   }

//   if (cart && cart.quantity !== undefined) {
//     quantity = cart.quantity;
//   } else if (cart) {
//     quantity = cart.length;
//   }
//   useEffect(() => {
//     datamain();
//   }, []);

//   const contact = async (data) => {
//     const validate = await datamain();
//     let shippingobj = {};
//     let contactobj = {};
//     let result1 = [];
//     let total = 0;
//     let quantity = 0;
//     let discount;
//     let totaldiscount = 0;
//     let result = Object.keys(data).filter((e) => {
//       if (e.includes("shipping")) {
//         return true;
//       } else {
//         result1.push(e);
//       }
//     });
//     result.forEach((e) => {
//       if (data[e]) {
//         shippingobj[e] = data[e];
//       }
//     });
//     result1.forEach((e) => {
//       if (data[e]) {
//         contactobj[e] = data[e];
//       }
//     });
//     const item = [];

//     cart.forEach((e) => {
//       const obj = {};
//       obj.productid = e.productid.sku;
//       obj.productname = e.productid.name;
//       obj.price = `$${Number(
//         e.productid.discountprice
//           ? e.productid.discountprice.replace("$", "")
//           : e.productid.fullprice.replace("$", "")
//       )}`;
//       obj.discountvalue = e.productid.discountprice
//         ? `${Number(dis.replace("%", ""))}%`
//         : "";
//       obj.actualprice = e.productid.price;

//       obj.quantity = e.quantity;

//       console.log(discount);
//       totaldiscount = cartss.cartdetail[0].product.discounttotal;
//       item.push(obj);
//       total += Number(e.productid.fullprice.replace("$", ""));
//       discount = cartss.cartdetail[0].discount
//         ? cartss.cartdetail[0].discount
//         : "";
//       console.log(discount, cartss.cartdetail[0].discount);
//       quantity += e.quantity;
//     });
//     console.log(item);

//     const data1 = await order(
//       item,
//       contactobj,
//       shippingobj,
//       total,
//       quantity,
//       userid,
//       totaldiscount,
//       discount
//     );
//     if (data1) {
//       paymenthandler(data1);
//     }
//   };

//   const paymenthandler = async (orderno) => {
//     const item = [];
//     cart.forEach((e) => {
//       const obj = {};
//       obj.name = e.productid.name;
//       obj.description = e.productid.description;
//       // obj.images = e.productid.images;
//       obj.amount = Number(
//         e.productid.discount
//           ? (e.productid.discountprice.replace("$", "") * 100) / e.quantity
//           : (e.productid.fullprice.replace("$", "") * 100) / e.quantity
//       );
//       obj.currency = "usd";
//       obj.quantity = e.quantity;

//       item.push(obj);
//     });
//     console.log(item);

//     const session = await stripesessionApi(item, orderno);
//     const sessionid = session.session.id;
//     const { error } = await stripe.redirectToCheckout({
//       sessionId: sessionid,
//     });
//     if (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="main-content">
//       <section>
//         <div className="container">
//           <div className="checkout-template page-content">
//             <h2>Checkout</h2>
//             <div className="checkout-details row">
//               <div className="checkout-wrap">
//                 <div className="checkout-section">
//                   <div className="contact-info">
//                     <form onSubmit={handleSubmit(contact)}>
//                       <div className="fieldset">
//                         <h3>Contact information</h3>
//                         <div className="field-input">
//                           <label htmlFor="name">Name</label>
//                           <span>
//                             <input
//                               type="text"
//                               className="input-text"
//                               placeholder="Enter your name"
//                               {...register("name", {
//                                 required: true,
//                               })}
//                               // {...register("name", {
//                               //   value: `${
//                               //     Object.keys(cancel).length ? "hellow" : "hi"
//                               //   }`,
//                               // })}
//                             />
//                           </span>
//                         </div>
//                         <div className="field-input">
//                           <label htmlFor="name">Email Id</label>
//                           <span>
//                             <input
//                               type="email"
//                               className="input-text"
//                               placeholder="Enter your email id"
//                               {...register("email", {
//                                 required: true,
//                               })}
//                             />
//                           </span>
//                         </div>
//                         <div className="field-input">
//                           <label htmlFor="name">Phone</label>
//                           <span>
//                             <input
//                               type="text"
//                               className="input-text"
//                               placeholder="Enter your phone no."
//                               {...register("phone", { required: true })}
//                             />
//                           </span>
//                         </div>
//                         <div className="field-input">
//                           <label htmlFor="name">Address</label>
//                           <span>
//                             <input
//                               type="text"
//                               className="input-text"
//                               placeholder="Enter your address"
//                               {...register("address", { required: true })}
//                             />
//                           </span>
//                         </div>
//                         <div className="field-input">
//                           <label htmlFor="name">Postal Code</label>
//                           <span>
//                             <input
//                               type="text"
//                               className="input-text"
//                               placeholder="Enter your postal code"
//                               {...register("postalcode", { required: true })}
//                             />
//                           </span>
//                         </div>
//                       </div>

//                       <div className="fieldset">
//                         <h3>Shipping Address</h3>

//                         <div className="field-input">
//                           <label htmlFor="name">Name</label>
//                           <span>
//                             <input
//                               type="text"
//                               className="input-text"
//                               placeholder="Enter your name"
//                               {...register("shippingname", { required: true })}
//                             />
//                           </span>
//                         </div>
//                         <div className="field-input">
//                           <label htmlFor="name">Email Id</label>
//                           <span>
//                             <input
//                               type="email"
//                               className="input-text"
//                               placeholder="Enter your email id"
//                               {...register("shippingemail", {
//                                 required: true,
//                               })}
//                             />
//                           </span>
//                         </div>
//                         <div className="field-input">
//                           <label htmlFor="name">Phone</label>
//                           <span>
//                             <input
//                               type="text"
//                               className="input-text"
//                               placeholder="Enter your phone no."
//                               {...register("shippingphone", {
//                                 required: true,
//                               })}
//                             />
//                           </span>
//                         </div>
//                         <div className="field-input">
//                           <label htmlFor="name">Address</label>
//                           <span>
//                             <input
//                               type="text"
//                               className="input-text"
//                               placeholder="Enter your address"
//                               {...register("shippingaddress", {
//                                 required: true,
//                               })}
//                             />
//                           </span>
//                         </div>
//                         <div className="field-input">
//                           <label htmlFor="name">Postal Code</label>
//                           <span>
//                             <input
//                               type="text"
//                               className="input-text"
//                               placeholder="Enter your postal code"
//                               {...register("shippingpostal", {
//                                 required: true,
//                               })}
//                             />
//                           </span>
//                         </div>
//                       </div>
//                       <div className="action-btn">
//                         <button className="button button--hollow" type="submit">
//                           Proceed to Payment
//                         </button>
//                         <Link to="/cart" className="button secondary-btn">
//                           Return to Cart
//                         </Link>
//                       </div>
//                     </form>
//                   </div>

//                   <div className="order-summary-right">
//                     <div className="order-summary__sections">
//                       <div className="">
//                         <div className="order-summary__section__content">
//                           <table className="product-table">
//                             <thead className="product-table__header">
//                               <tr>
//                                 <th>
//                                   <span className="visually-hidden">Image</span>
//                                 </th>
//                                 <th>
//                                   <span className="visually-hidden">
//                                     Description
//                                   </span>
//                                 </th>
//                                 <th>
//                                   <span className="visually-hidden">
//                                     Quantity
//                                   </span>
//                                 </th>
//                                 <th>
//                                   <span className="visually-hidden">Price</span>
//                                 </th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {cart &&
//                                 cart.map((e) => {
//                                   return (
//                                     <tr
//                                       className="product"
//                                       key={btoa(e.productid.sku)}
//                                     >
//                                       <td className="product__image">
//                                         <div className="product-thumbnail">
//                                           <div className="product-thumbnail__wrapper">
//                                             <img
//                                               alt="Basic Green T-Shirt"
//                                               className="product-thumbnail__image"
//                                               src={`/images/${e.productid.images}`}
//                                             />
//                                           </div>
//                                           <span className="product-thumbnail__quantity">
//                                             {e.quantity}
//                                           </span>
//                                         </div>
//                                       </td>
//                                       <td
//                                         className="product__description"
//                                         scope="row"
//                                       >
//                                         <span className="product__description__name discounts">
//                                           {e.productid.name}
//                                         </span>

//                                         <span
//                                           className={
//                                             "product__description__variant " +
//                                             (e.productid.discount
//                                               ? "discountamount"
//                                               : "")
//                                           }
//                                         >
//                                           {e.productid.discount
//                                             ? `Discount amount -${e.productid.discount}`
//                                             : ""}
//                                         </span>
//                                       </td>
//                                       <td className="product__quantity">
//                                         <span className="visually-hidden">
//                                           1
//                                         </span>
//                                       </td>
//                                       <td className="product__price">
//                                         <span className="order-summary__emphasis">
//                                           {e.productid.discount ? (
//                                             <del className="dele">
//                                               {e.productid.fullprice}
//                                             </del>
//                                           ) : (
//                                             e.productid.fullprice
//                                           )}{" "}
//                                         </span>
//                                         <p className="order-summary__emphasis discountcut">
//                                           {e.productid.discount
//                                             ? e.productid.discountprice
//                                             : ""}{" "}
//                                         </p>
//                                       </td>
//                                     </tr>
//                                   );
//                                 })}
//                             </tbody>
//                           </table>
//                         </div>
//                         <p className="no-margin evenly-align mt-20">
//                           <span className="cart-total-quantity">
//                             {quantity ? quantity : 0} items
//                           </span>
//                           <span className="cart-total-price">
//                             <span>${cart ? cart.totalprice : 0}</span>
//                           </span>
//                         </p>
//                         <div className="cart-subtotal evenly-align cart__total">
//                           <span className="cart-subtotal__title">Discount</span>
//                           <strong>
//                             <span className="cart-subtotal__price">
//                               {cart && cart.discounttotal
//                                 ? `$${cart.discounttotal}`
//                                 : "$0"}
//                             </span>
//                           </strong>
//                         </div>
//                         <div className="cart-subtotal evenly-align cart__total">
//                           <span className="cart-subtotal__title">Subtotal</span>
//                           <strong>
//                             <span className="cart-subtotal__price">
//                               ${subtotal ? subtotal : 0}
//                             </span>
//                           </strong>
//                         </div>
//                         <div className="cart__total evenly-align separator">
//                           <span className="cart__total-text">Total:</span>
//                           <strong className="cart__total-price text-lg">
//                             <span>{subtotal ? subtotal : 0}</span>
//                             <span> USD</span>
//                           </strong>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
