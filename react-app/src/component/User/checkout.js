// import { useState, useEffect } from "react";
// import { useContext } from "react";
// import { Usercontext } from "../../context/User-context/Authcontext";
// import {
//   discountcal,
//   order,
// } from "../../context/User-context/discountcalculate";
// import { useForm } from "react-hook-form";
// import { Link, useParams } from "react-router-dom";
// import { stripesessionApi } from "../../context/User-context/apicalls";
// import { useStripe } from "@stripe/react-stripe-js";
// import { getdiscount } from "../../context/User-context/helper";
// import { orderdetail } from "../../context/User-context/discountcalculate";

// // const updateallquan = async (userid, id, qua) => {
// //   const data = await addtocart(userid, id, qua, "update");

// //   if (data.code) {
// //     // seterrorallupdate(data.status);
// //     // setallupdate(true);
// //     setTimeout(() => {
// //       // setallupdate(false);
// //     }, 1000);
// //   }
// //   return data;
// // };

// //   // const checkouthandler = async () => {
// //   let contents;
// //   let code;
// //   let product;
// //   const data = await Promise.all(
// //     allcart.productadded.map(async (e, i) => {
// //       contents = await updateallquan(userid, e.productid._id, e.quantity);
// //       if (contents.code) {
// //         code = contents.code;
// //         product = e.productid._id;
// //       }
// //     })
// //   );

// //   if (code) {
// //   }

// export const Checkout = () => {
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

//     if (data.code) {
//       // seterrorallupdate(data.status);
//       // setallupdate(true);
//       setTimeout(() => {
//         // setallupdate(false);
//       }, 1000);
//     }
//     return data;
//   };

//   const data = async () => {
//     if (orderid !== "0000") {
//       const data = await orderdetail(orderid);
//       reset(data.orderdetails[0].contact);
//       reset(data.orderdetails[0].shipping);
//     }

//     const allcart = await getallcart(userid);

//     if (allcart.productadded.length === 0) {
//       return console.log("discount deleted redirect here");
//     }

//     const discount = allcart.cartdetail[0].discount;

//     if (discount !== "") {
//       const data1 = await getdiscount(allcart.cartdetail[0].discount);
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
//       setcart(allcart.productadded);
//     } else {
//       const data = await discountcal(
//         allcart.cartdetail[0].discount,
//         allcart.cartdetail[0]
//       );
//       setcart(data);
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
//     data();
//   }, []);

//   const contact = async (data) => {
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
//     console.log(cart);
//     cart.forEach((e) => {
//       const obj = {};
//       obj.productid = e.productid.sku;
//       obj.productname = e.productid.name;
//       console.log(e.productid.discountprice);
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
//     // console.log(total, quantity);

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
//     console.log(data1);

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

///////////////////////////////////////////////////////
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import {
  discountcal,
  order,
  status,
} from "../../context/User-context/discountcalculate";
import { set, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { stripesessionApi } from "../../context/User-context/apicalls";
import { useStripe } from "@stripe/react-stripe-js";
import { getdiscount } from "../../context/User-context/helper";
import { orderdetail } from "../../context/User-context/discountcalculate";
import { deleteitemcartApi } from "../../context/User-context/apicalls";
import { setdiscount } from "../../context/User-context/helper";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "./loading";
import { Header } from "./header";
export const Checkout = () => {
  const toastList = new Set();
  const MAX_TOAST = 1;

  const navigate = useNavigate();
  const [error, seterror] = useState();
  const [visible, setVisible] = useState(false);
  const stripe = useStripe();
  let { orderid } = useParams();

  const { register, handleSubmit, reset } = useForm();
  const { addtocart } = useContext(Usercontext);

  let subtotal;
  let quantity;
  // let discountcode;
  const { values } = useContext(Usercontext);
  const [cart, setcart] = useState();
  const [dis, setdis] = useState();
  const { getallcart } = useContext(Usercontext);
  const [cartss, setcartss] = useState();

  const userid = values.user._id;

  const updateallquan = async (userid, id, qua) => {
    const data = await addtocart(userid, id, qua, "update");
    return data;
  };
  let status;
  let code;

  const checkouthandler = async (data1 = null) => {
    let all = await getallcart(userid);
    console.log(all);
    let products = all.productadded;
    let contents;

    let product = [];
    const data = await Promise.all(
      products.map(async (e) => {
        contents = await addtocart(userid, e.productid._id, e.quantity);
        if (contents.code) {
          code = contents.code;
          status = e.productid.name;
          product.push(e.productid._id);
        }
      })
    );
    if (code) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.error(
          `Can't buy this ${status} in this quantity please try another quantity`,
          {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => {
              toastList.delete(id);
              // navigate("/usercart");
            },
          }
        );
        toastList.add(id);
      }
    }

    const run = await maindata(data1);
  };

  const maindata = async (data1) => {
    if (orderid !== "0000") {
      const data = await orderdetail(orderid);
      reset(data.orderdetails[0].contact);
      reset(data.orderdetails[0].shipping);
    }

    const allcart = await getallcart(userid);

    if (allcart.productadded.length === 0) {
      const data = await setdiscount(values.user._id);
      if (toastList.size < MAX_TOAST) {
        const id = toast.error(
          "No product are valid for payment Please go to cart and change ",
          {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => toastList.delete(id),
          }
        );
        toastList.add(id);
      }
      return console.log("discount deleted redirect here");
    }

    const discount = allcart.cartdetail[0].discount;

    if (discount !== "") {
      const data1 = await getdiscount(allcart.cartdetail[0].discount);
      setdis(data1.discount[0].discountvalue);
    }

    setcartss(allcart);

    if (discount === "") {
      let totalprice = 0;
      let quantity = 0;
      allcart.productadded.forEach((e) => {
        const amount = Number(e.productid.price.replace("$", ""));
        const price = e.quantity * amount;
        e.productid.fullprice = `$${price}`;
        totalprice += price;
        quantity += e.quantity;
        allcart.productadded.totalprice = totalprice;
        allcart.productadded.quantity = quantity;
      });
      setcart(allcart.productadded);

      console.log(allcart.productadded);

      if (data1 !== null) contact(data1, allcart.productadded);
    } else {
      const data = await discountcal(
        allcart.cartdetail[0].discount,
        allcart.cartdetail[0]
      );
      setcart(data);

      if (data1 !== null) contact(data1, data);
    }
  };

  if (cart && cart.discounttotalprice !== undefined) {
    subtotal = cart.discounttotalprice;
  } else if (cart && cart.totalprice) {
    subtotal = cart.totalprice;
  }

  if (cart && cart.quantity !== undefined) {
    quantity = cart.quantity;
  } else if (cart) {
    quantity = cart.length;
  }
  useEffect(() => {
    checkouthandler();
  }, []);

  const contact = async (data, product) => {
    let shippingobj = {};
    let contactobj = {};
    let result1 = [];
    let total = 0;
    let quantity = 0;
    let discount;
    let totaldiscount = 0;
    let result = Object.keys(data).filter((e) => {
      if (e.includes("shipping")) {
        return true;
      } else {
        result1.push(e);
      }
    });
    result.forEach((e) => {
      if (data[e]) {
        shippingobj[e] = data[e];
      }
    });
    result1.forEach((e) => {
      if (data[e]) {
        contactobj[e] = data[e];
      }
    });
    const item = [];
    product.forEach((e) => {
      const obj = {};
      obj.productid = e.productid.sku;
      obj.productname = e.productid.name;
      obj.price = `$${Number(
        e.productid.discountprice
          ? e.productid.discountprice.replace("$", "")
          : e.productid.fullprice.replace("$", "")
      )}`;
      obj.discountvalue = e.productid.discountprice
        ? `${Number(dis.replace("%", ""))}%`
        : "";
      obj.actualprice = e.productid.price;

      obj.quantity = e.quantity;
      obj.images = e.productid.images;

      totaldiscount = cartss.cartdetail[0].product.discounttotal;
      item.push(obj);
      total += Number(e.productid.fullprice.replace("$", ""));
      discount = cartss.cartdetail[0].discount
        ? cartss.cartdetail[0].discount
        : "";
      quantity += e.quantity;
    });
    // console.log(total, quantity);
    console.log(item, "-----------------------");

    const data2 = await order(
      item,
      contactobj,
      shippingobj,
      total,
      quantity,
      userid,
      totaldiscount,
      discount
    );

    if (code) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.error(
          `Can't buy this ${status} in this quantity please try another quantity`,
          {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => {
              toastList.delete(id);
              // navigate("/usercart");
            },
          }
        );
        toastList.add(id);
      }
    } else if (data2 && !code) {
      paymenthandler(data2, product);
    }
  };

  const paymenthandler = async (orderno, product) => {
    console.log(product, "==============================");
    const item = [];
    product.forEach((e) => {
      const obj = {};
      obj.name = e.productid.name;
      obj.description = e.productid.description;
      // obj.images = e.productid.images;
      obj.amount = Number(
        e.productid.discount
          ? parseFloat(
              (e.productid.discountprice.replace("$", "") * 100) / e.quantity
            ).toFixed(2)
          : parseFloat(
              (e.productid.fullprice.replace("$", "") * 100) / e.quantity
            ).toFixed(2)
      );
      obj.currency = "usd";
      obj.quantity = e.quantity;

      item.push(obj);
    });

    const session = await stripesessionApi(item, orderno);
    const sessionid = session.session.id;
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionid,
    });
    if (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <ToastContainer />
      {/* {!cart && <Loading />} */}
      {/* {cart && ( */}
      <div className="main-content">
        <section>
          <div className="container">
            <div className="checkout-template page-content">
              <h2>Checkout</h2>
              <div className="checkout-details row">
                <div className="checkout-wrap">
                  <div className="checkout-section">
                    <div className="contact-info">
                      <form onSubmit={handleSubmit(checkouthandler)}>
                        <div className="fieldset">
                          <h3>Contact information</h3>
                          <div className="field-input">
                            <label htmlFor="name">Name</label>
                            <span>
                              <input
                                type="text"
                                className="input-text"
                                placeholder="Enter your name"
                                {...register("name", {
                                  required: true,
                                })}
                                // {...register("name", {
                                //   value: `${
                                //     Object.keys(cancel).length ? "hellow" : "hi"
                                //   }`,
                                // })}
                              />
                            </span>
                          </div>
                          <div className="field-input">
                            <label htmlFor="name">Email Id</label>
                            <span>
                              <input
                                type="email"
                                className="input-text"
                                placeholder="Enter your email id"
                                {...register("email", {
                                  required: true,
                                })}
                              />
                            </span>
                          </div>
                          <div className="field-input">
                            <label htmlFor="name">Phone</label>
                            <span>
                              <input
                                type="text"
                                className="input-text"
                                placeholder="Enter your phone no."
                                {...register("phone", { required: true })}
                              />
                            </span>
                          </div>
                          <div className="field-input">
                            <label htmlFor="name">Address</label>
                            <span>
                              <input
                                type="text"
                                className="input-text"
                                placeholder="Enter your address"
                                {...register("address", { required: true })}
                              />
                            </span>
                          </div>
                          <div className="field-input">
                            <label htmlFor="name">Postal Code</label>
                            <span>
                              <input
                                type="text"
                                className="input-text"
                                placeholder="Enter your postal code"
                                {...register("postalcode", {
                                  required: true,
                                })}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="fieldset">
                          <h3>Shipping Address</h3>

                          <div className="field-input">
                            <label htmlFor="name">Name</label>
                            <span>
                              <input
                                type="text"
                                className="input-text"
                                placeholder="Enter your name"
                                {...register("shippingname", {
                                  required: true,
                                })}
                              />
                            </span>
                          </div>
                          <div className="field-input">
                            <label htmlFor="name">Email Id</label>
                            <span>
                              <input
                                type="email"
                                className="input-text"
                                placeholder="Enter your email id"
                                {...register("shippingemail", {
                                  required: true,
                                })}
                              />
                            </span>
                          </div>
                          <div className="field-input">
                            <label htmlFor="name">Phone</label>
                            <span>
                              <input
                                type="text"
                                className="input-text"
                                placeholder="Enter your phone no."
                                {...register("shippingphone", {
                                  required: true,
                                })}
                              />
                            </span>
                          </div>
                          <div className="field-input">
                            <label htmlFor="name">Address</label>
                            <span>
                              <input
                                type="text"
                                className="input-text"
                                placeholder="Enter your address"
                                {...register("shippingaddress", {
                                  required: true,
                                })}
                              />
                            </span>
                          </div>
                          <div className="field-input">
                            <label htmlFor="name">Postal Code</label>
                            <span>
                              <input
                                type="text"
                                className="input-text"
                                placeholder="Enter your postal code"
                                {...register("shippingpostal", {
                                  required: true,
                                })}
                              />
                            </span>
                          </div>
                        </div>
                        <div className="action-btn">
                          <button
                            className="button button--hollow"
                            type="submit"
                          >
                            Proceed to Payment
                          </button>
                          <Link to="/usercart" className="button secondary-btn">
                            Return to Cart
                          </Link>
                        </div>
                      </form>
                    </div>

                    <div className="order-summary-right">
                      <div className="order-summary__sections">
                        <div className="">
                          <div className="order-summary__section__content">
                            <table className="product-table">
                              <thead className="product-table__header">
                                <tr>
                                  <th>
                                    <span className="visually-hidden">
                                      Image
                                    </span>
                                  </th>
                                  <th>
                                    <span className="visually-hidden">
                                      Description
                                    </span>
                                  </th>
                                  <th>
                                    <span className="visually-hidden">
                                      Quantity
                                    </span>
                                  </th>
                                  <th>
                                    <span className="visually-hidden">
                                      Price
                                    </span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {cart &&
                                  cart.map((e) => {
                                    return (
                                      <tr
                                        className="product"
                                        key={btoa(e.productid.sku)}
                                      >
                                        <td className="product__image">
                                          <div className="product-thumbnail">
                                            <div className="product-thumbnail__wrapper">
                                              <img
                                                alt="Basic Green T-Shirt"
                                                className="product-thumbnail__image"
                                                src={`/images/${e.productid.images}`}
                                              />
                                            </div>
                                            <span className="product-thumbnail__quantity">
                                              {e.quantity}
                                            </span>
                                          </div>
                                        </td>
                                        <td
                                          className="product__description"
                                          scope="row"
                                        >
                                          <span className="product__description__name discounts">
                                            {e.productid.name}
                                          </span>

                                          <span
                                            className={
                                              "product__description__variant " +
                                              (e.productid.discount
                                                ? "discountamount"
                                                : "")
                                            }
                                          >
                                            {e.productid.discount
                                              ? `Discount amount -${Number(
                                                  e.productid.discount.replace(
                                                    "$",
                                                    ""
                                                  )
                                                )}`
                                              : ""}
                                          </span>
                                        </td>
                                        <td className="product__quantity">
                                          <span className="visually-hidden">
                                            1
                                          </span>
                                        </td>
                                        <td className="product__price">
                                          <span className="order-summary__emphasis">
                                            {e.productid.discount ? (
                                              <del className="dele">
                                                {e.productid.fullprice}
                                              </del>
                                            ) : (
                                              e.productid.fullprice
                                            )}{" "}
                                          </span>
                                          <p className="order-summary__emphasis discountcut">
                                            {e.productid.discount
                                              ? e.productid.discountprice
                                              : ""}{" "}
                                          </p>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                          <p className="no-margin evenly-align mt-20">
                            <span className="cart-total-quantity">
                              {quantity ? quantity : 0} items
                            </span>
                            <span className="cart-total-price">
                              <span>${cart ? cart.totalprice : 0}</span>
                            </span>
                          </p>
                          <div className="cart-subtotal evenly-align cart__total">
                            <span className="cart-subtotal__title">
                              Discount
                            </span>
                            <strong>
                              <span className="cart-subtotal__price">
                                {cart && cart.discounttotal
                                  ? `$${cart.discounttotal}`
                                  : "$0"}
                              </span>
                            </strong>
                          </div>
                          <div className="cart-subtotal evenly-align cart__total">
                            <span className="cart-subtotal__title">
                              Subtotal
                            </span>
                            <strong>
                              <span className="cart-subtotal__price">
                                ${subtotal ? subtotal : 0}
                              </span>
                            </strong>
                          </div>
                          <div className="cart__total evenly-align separator">
                            <span className="cart__total-text">Total:</span>
                            <strong className="cart__total-price text-lg">
                              <span>{subtotal ? subtotal : 0}</span>
                              <span> USD</span>
                            </strong>
                          </div>
                        </div>
                      </div>
                      {visible ? <p className="error-msg">{error}</p> : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* // )} */}
    </>
  );
};
