// import { useEffect, useContext, useState, useRef } from "react";
// import { Usercontext } from "../../context/User-context/Authcontext";
// import { discountcal } from "../../context/User-context/discountcalculate";
// import { handleChangehelp } from "../../context/User-context/helper";
// import { setdiscount } from "../../context/User-context/helper";
// import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
// import { Navigate } from "react-router";
// import { Header } from "./header";

// import Toast from "../toster";
// import { toast } from "react-toastify";
// export const Cart = () => {
//   const toastList = new Set();
//   const MAX_TOAST = 1;

//   let subtotal;
//   let quantity;
//   // let code;
//   const { addtocart } = useContext(Usercontext);
//   const [error, seterror] = useState();
//   const { deleteitemcart } = useContext(Usercontext);
//   const { getallcart } = useContext(Usercontext);
//   const { values } = useContext(Usercontext);
//   const userid = values.user._id;
//   const [cart, setcart] = useState();
//   const [cartss, setcartss] = useState();
//   const [errorcoupon, seterrorcoupon] = useState();
//   const [errorcouponvisible, seterrorcouponvisible] = useState();
//   const [coupon, setcoupon] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [listIndex, setListIndex] = useState(undefined);
//   let code;
//   const [allupdate, setallupdate] = useState(false);
//   const [noproduct, setnoproduct] = useState();
//   const [errorallupdate, seterrorallupdate] = useState();
//   const [loading, setloading] = useState(true);

//   const promo = useRef();
//   let updatedproduct;

//   const getcart = async (userid) => {
//     // setloading(true);
//     const allcart = await getallcart(userid);
//     // setloading(false);

//     if (allcart.statusCode) {
//       setnoproduct(true);
//       return;
//     }

//     if (allcart.productadded.length === 0) {
//       setnoproduct(true);
//       const data = await setdiscount(userid);
//       return console.log("discount deleted redirect here");
//     }

//     setnoproduct(false);

//     const discount = allcart.cartdetail[0].discount;
//     const valid = await checkouthandler(allcart.productadded);
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
//       // setcoupon(false);
//     } else {
//       const data = await discountcal(
//         allcart.cartdetail[0].discount,
//         allcart.cartdetail[0]
//       );
//       if (data.code) {
//         // setcode(data.code);
//         setcoupon(true);
//       }
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

//   if (cartss && cartss.cartdetail[0].discount !== undefined) {
//     code = cartss.cartdetail[0].discount;
//   }

//   const handleChange = (qua, id, cart) => {
//     updatedproduct = handleChangehelp(qua, id, cart);
//   };

//   const deletediscount = async () => {
//     const data = await setdiscount(values.user._id);
//     setcoupon(false);
//     getcart(userid);
//   };

//   const singleupdate = async (userid, productid) => {
//     setcart(updatedproduct ? updatedproduct : cart);
//     // setloading(false);
//     console.log(cart, "=======================================");

//     const finded = cart.filter((e) => {
//       if (e.productid._id === productid) {
//         return true;
//       }
//       return false;
//     });
//     const data = await addtocart(
//       userid,
//       finded[0].productid._id,
//       finded[0].quantity,
//       "update"
//     );

//     if (data.code) {
//       seterror(data.status);
//       setVisible(true);
//       setTimeout(() => {
//         setVisible(false);
//       }, 2000);
//     }
//     getcart(userid);
//   };

//   const updateallquan = async (userid, id, qua) => {
//     const data = await addtocart(userid, id, qua, "update");
//     getcart(userid);

//     if (data.code) {
//       seterrorallupdate(data.status);
//       setallupdate(true);
//       setTimeout(() => {
//         setallupdate(false);
//       }, 2000);
//     }
//     return data;
//   };

//   const updateallquantity = () => {
//     setcart(updatedproduct ? updatedproduct : cart);
//     // setloading(false);
//     cart.forEach((e) => {
//       const data = updateallquan(userid, e.productid._id, e.quantity);
//     });
//   };

//   const deleteitem = async (userid, productid) => {
//     const data = await deleteitemcart(userid, productid);
//     getcart(userid);
//   };

//   const discounthandler = async () => {
//     // const data1 = await setdiscount(values.user._id);
//     const data = await discountcal(promo.current.value, cartss.cartdetail[0]);
//     !data.error ? setcart(data) : seterrorcoupon(data.error);
//     // setloading(false);
//     !data.error ? setcoupon(true) : console.log(data.error);
//     if (data.error) {
//       seterrorcouponvisible(true);
//       setTimeout(() => {
//         seterrorcouponvisible(false);
//       }, 2000);
//     }
//     // setloading(false);
//     getcart(userid);
//     ///error setted
//   };

//   const checkouthandler = async (products) => {
//     let contents;
//     let code;
//     let product = [];
//     let status;
//     const data = await Promise.all(
//       products.map(async (e) => {
//         const contents = await addtocart(
//           userid,
//           e.productid._id,
//           e.quantity,
//           "update"
//         );
//         if (contents.code) {
//           code = contents.code;
//           product.push(e.productid._id);
//           status = e.productid.name;
//         }
//       })
//     );
//     if (code) {
//       seterrorallupdate(
//         `Can't buy this ${status} in this quantity please try another quantity`
//       );
//       setallupdate(true);
//       setTimeout(() => {
//         setallupdate(false);
//       }, 3000);
//       const data1 = await Promise.all(
//         product.map(async (e) => {
//           const deletepro = await deleteitem(userid, e);
//         })
//       );
//       // getcart(userid);
//     }
//   };

//   useEffect(() => {
//     getcart(userid);
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="main-content">
//         {!noproduct && (
//           <section>
//             <div className="container">
//               <div className="cart-template page-content">
//                 <h2>Cart</h2>
//                 <div className="cart-count-price">
//                   <p className="no-margin">
//                     <span className="cart-total-quantity">
//                       TOTAL: {quantity ? quantity : ""} items
//                     </span>
//                     <strong className="cart-total-price">
//                       (
//                       <span>
//                         ${subtotal ? subtotal : ""}
//                         <span id="revy-cart-subtotal-price"></span>
//                       </span>
//                       )
//                     </strong>
//                   </p>
//                 </div>
//                 <div className="main-cart-wrapper">
//                   <div className="cart__items cart__block">
//                     {cart &&
//                       cart.map((e, i) => {
//                         return (
//                           <div
//                             className="line-items"
//                             key={btoa(e.productid.sku)}
//                           >
//                             <div className="line-item">
//                               <div className="line-item__left">
//                                 <div className="line-item__image-wrapper">
//                                   <img
//                                     className="line-item__image"
//                                     src={`/images/${e.productid.images}`}
//                                     alt=""
//                                   />
//                                 </div>
//                               </div>
//                               <div className="line-item__right">
//                                 <div className="line-item__details">
//                                   <h2 className="line-item-title">
//                                     <Link
//                                       className="cart__product-title"
//                                       to={`/userproductdetail/${e.productid.sku}`}
//                                     >
//                                       {e.productid.name}
//                                     </Link>
//                                   </h2>
//                                   <p
//                                     title="Remove item"
//                                     className="line-item__remove deleteicon"
//                                     onClick={() =>
//                                       deleteitem(userid, e.productid._id)
//                                     }
//                                   >
//                                     <svg
//                                       aria-hidden="true"
//                                       viewBox="0 0 448 512"
//                                       className="svg-inline--fa fa-trash-alt fa-w-14 fa-3x"
//                                     >
//                                       <path
//                                         fill="currentColor"
//                                         d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
//                                         className=""
//                                       ></path>
//                                     </svg>
//                                   </p>
//                                 </div>

//                                 <div className="line-item__price">
//                                   <span>
//                                     <strong>Price:</strong>
//                                   </span>
//                                   {e.productid.price}
//                                 </div>

//                                 <div className="line-item__total-amount-price">
//                                   <span>
//                                     <strong>Total Price:</strong>
//                                   </span>
//                                   {e.productid.fullprice}
//                                 </div>

//                                 <div className="line-item__quantity">
//                                   <span className="line-item__quantity-text">
//                                     Quantity:
//                                   </span>
//                                   <input
//                                     type="number"
//                                     name="updates[]"
//                                     size="4"
//                                     defaultValue={e.quantity}
//                                     onChange={(evt) =>
//                                       handleChange(evt, e.productid._id, cart)
//                                     }
//                                   />
//                                   <button
//                                     className="button update_btn"
//                                     type="submit"
//                                     onClick={() => {
//                                       listIndex === i
//                                         ? setListIndex(listIndex)
//                                         : setListIndex(i);
//                                       singleupdate(userid, e.productid._id);
//                                     }}
//                                   >
//                                     Update Quantity
//                                   </button>
//                                 </div>
//                                 {i === listIndex && visible && (
//                                   <div className="cart">{error}</div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                   </div>
//                   <div className="cart__details cart__block">
//                     <div className="cart__details-wrap">
//                       <h5>ORDER SUMMARY</h5>
//                       <p className="no-margin evenly-align">
//                         <span className="cart-total-quantity">
//                           {quantity ? quantity : ""} items
//                         </span>
//                         <span className="cart-total-price">
//                           <span> ${cart ? cart.totalprice : ""} USD</span>
//                         </span>
//                       </p>
//                       <div className="cart-subtotal evenly-align cart__total">
//                         <span className="cart-subtotal__title">Subtotal</span>
//                         <strong>
//                           <span className="cart-subtotal__price">
//                             {subtotal ? `$${subtotal}` : ""} USD
//                           </span>
//                         </strong>
//                       </div>
//                       <div className="cart__total evenly-align">
//                         <span className="cart__total-text">Total:</span>
//                         <strong className="cart__total-price">
//                           <span> {subtotal ? `$${subtotal}` : ""}</span>
//                           <span> USD</span>
//                         </strong>
//                       </div>
//                       <button
//                         className="button update_btn"
//                         type="submit"
//                         onClick={updateallquantity}
//                       >
//                         Update Quantity
//                       </button>
//                       {allupdate ? (
//                         <p className="error-msg update">{errorallupdate}</p>
//                       ) : (
//                         ""
//                       )}
//                       <Link to="/usercheckout/0000">
//                         <button className="checkout button">Checkout</button>
//                       </Link>
//                       {coupon ? (
//                         <div className="cart-promo">
//                           <h5>COUPON APPLIED</h5>
//                           <h2>{code ? code : ""}</h2>
//                           <p className="promo" onClick={deletediscount}>
//                             REMOVE COUPON
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="cart-promo">
//                           <h5>ENTER A PROMO CODE</h5>
//                           <input type="text" id="devPromo" ref={promo} />
//                           <p className="promo" onClick={discounthandler}>
//                             Apply Coupon
//                           </p>
//                           {errorcouponvisible ? (
//                             <p className="error-msg">{errorcoupon}</p>
//                           ) : (
//                             ""
//                           )}
//                         </div>
//                       )}

//                       <div className="text-center mt-20">
//                         <Link className="link-text-line" to="/userdashboard">
//                           Continue shopping
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}
//         {noproduct && (
//           <div className="cart-template page-content noproduct">
//             <h1>NO PRODUCT AVAILABLE</h1>
//             <Link to="/userdashboard">
//               <button className="button button--alt collect">
//                 Go to collection
//               </button>
//             </Link>
//             <div className="top">
//               {allupdate ? (
//                 <p className="error-msg update">{errorallupdate}</p>
//               ) : (
//                 ""
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
//////////////////////////////////
import { useEffect, useContext, useState, useRef } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { discountcal } from "../../context/User-context/discountcalculate";
import { handleChangehelp } from "../../context/User-context/helper";
import { setdiscount } from "../../context/User-context/helper";
import { Link } from "react-router-dom";
import { Header } from "./header";
import { Loading } from "../../component/User/loading";
import { toast, ToastContainer } from "react-toastify";
export const Cart = () => {
  const toastList = new Set();
  const MAX_TOAST = 1;

  let subtotal;
  let quantity;
  // let code;
  const { addtocart } = useContext(Usercontext);
  const { deleteitemcart } = useContext(Usercontext);
  const { getallcart } = useContext(Usercontext);
  const { values } = useContext(Usercontext);
  const userid = values.user._id;
  const [cart, setcart] = useState();
  const [cartss, setcartss] = useState();
  const [coupon, setcoupon] = useState(false);
  const [noproduct, setnoproduct] = useState();

  const promo = useRef();

  let code;
  let updatedproduct;

  const getcart = async (userid) => {
    // setloading(true);
    const allcart = await getallcart(userid);
    // setloading(false);

    if (allcart.statusCode) {
      setnoproduct(true);
      return;
    }

    if (allcart.productadded.length === 0) {
      setnoproduct(true);
      const data = await setdiscount(userid);
      return console.log("discount deleted redirect here");
    }

    setnoproduct(false);

    const discount = allcart.cartdetail[0].discount;
    const valid = await checkouthandler(allcart.productadded);
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
      // setcoupon(false);
    } else {
      const data = await discountcal(
        allcart.cartdetail[0].discount,
        allcart.cartdetail[0]
      );
      console.log(data);
      if (data.code && !data.error) {
        setcoupon(true);
      } else if (data.error) {
        setcoupon(false);
        const data = await setdiscount(values.user._id);
        if (toastList.size < MAX_TOAST) {
          const id = toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => toastList.delete(id),
          });
          toastList.add(id);
        }
      }
      setcart(data);
    }
  };

  if (cart && cart.discounttotalprice !== undefined) {
    subtotal = cart.discounttotalprice;
  } else if (cart && cart.totalprice) {
    subtotal = cart.totalprice;
  }

  if (cart && cart.quantity !== undefined) {
    quantity = cart.quantity;
  }

  if (cartss && cartss.cartdetail[0].discount !== undefined) {
    code = cartss.cartdetail[0].discount;
  }

  const handleChange = (qua, id, cart) => {
    updatedproduct = handleChangehelp(qua, id, cart);
  };

  const deletediscount = async () => {
    const data = await setdiscount(values.user._id);
    setcoupon(false);
    getcart(userid);
  };

  const singleupdate = async (userid, productid) => {
    // setcart(updatedproduct ? updatedproduct : cart);
    let carts = updatedproduct ? updatedproduct : cart;
    // setloading(false);
    const finded = carts.filter((e) => {
      if (e.productid._id === productid) {
        return true;
      }
      return false;
    });
    const data = await addtocart(
      userid,
      finded[0].productid._id,
      finded[0].quantity,
      "update"
    );

    if (data.code) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.error(data.status, {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
    }
    if (!data.code) {
      getcart(userid);
    }

    //
  };

  const updateallquantity = async () => {
    console.log(updatedproduct);
    let carts = updatedproduct ? updatedproduct : cart;
    let code;
    let status;

    const data = await Promise.all(
      carts.map(async (e) => {
        const contents = await addtocart(
          userid,
          e.productid._id,
          e.quantity,
          "update"
        );
        if (contents.code) {
          code = contents.code;
          status = contents.status;
        }
      })
    );
    // const data = await addtocart(userid, id, qua, "update");

    if (code) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.error(status, {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
    }
    if (!code) {
      getcart(userid);
    }
    return data;
  };

  const deleteitem = async (userid, productid) => {
    const data = await deleteitemcart(userid, productid);
    getcart(userid);
  };

  const discounthandler = async () => {
    // const data1 = await setdiscount(values.user._id);
    const data = await discountcal(promo.current.value, cartss.cartdetail[0]);
    !data.error ? setcart(data) : console.log(data.error);
    // setloading(false);
    !data.error ? setcoupon(true) : console.log(data.error);
    if (data.error) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
    }
    // setloading(false);
    getcart(userid);
    ///error setted
  };

  const checkouthandler = async (products) => {
    let code;
    let product = [];
    let status;
    const data = await Promise.all(
      products.map(async (e) => {
        const contents = await addtocart(
          userid,
          e.productid._id,
          e.quantity,
          "update"
        );
        if (contents.code) {
          code = contents.code;
          product.push(e.productid._id);
          status = e.productid.name;
        }
      })
    );
    if (code) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.error(
          `Can't buy this ${status} in this quantity please try another quantity`,
          {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => toastList.delete(id),
          }
        );
        toastList.add(id);
      }
      const data1 = await Promise.all(
        product.map(async (e) => {
          const deletepro = await deleteitem(userid, e);
        })
      );

      getcart(userid);
    }
  };

  useEffect(() => {
    getcart(userid);
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />

      <div className="main-content">
        {!cart && !noproduct && <Loading />}
        {!noproduct && cart && (
          <section>
            <div className="container">
              <div className="cart-template page-content">
                <h2>Cart</h2>
                <div className="cart-count-price">
                  <p className="no-margin">
                    <span className="cart-total-quantity">
                      TOTAL: {quantity ? quantity : ""} items
                    </span>
                    <strong className="cart-total-price">
                      (
                      <span>
                        ${subtotal ? subtotal : ""}
                        <span id="revy-cart-subtotal-price"></span>
                      </span>
                      )
                    </strong>
                  </p>
                </div>
                <div className="main-cart-wrapper">
                  <div className="cart__items cart__block">
                    {/* {!cart} */}

                    {cart &&
                      cart.map((e, i) => {
                        return (
                          <div
                            className="line-items"
                            key={btoa(e.productid.sku)}
                          >
                            <div className="line-item">
                              <div className="line-item__left">
                                <div className="line-item__image-wrapper">
                                  <img
                                    className="line-item__image"
                                    src={`/images/${e.productid.images}`}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="line-item__right">
                                <div className="line-item__details">
                                  <h2 className="line-item-title">
                                    <Link
                                      className="cart__product-title"
                                      to={`/userproductdetail/${e.productid.sku}`}
                                    >
                                      {e.productid.name}
                                    </Link>
                                  </h2>
                                  <p
                                    title="Remove item"
                                    className="line-item__remove deleteicon"
                                    onClick={() =>
                                      deleteitem(userid, e.productid._id)
                                    }
                                  >
                                    <svg
                                      aria-hidden="true"
                                      viewBox="0 0 448 512"
                                      className="svg-inline--fa fa-trash-alt fa-w-14 fa-3x"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                        className=""
                                      ></path>
                                    </svg>
                                  </p>
                                </div>

                                <div className="line-item__price">
                                  <span>
                                    <strong>Price:</strong>
                                  </span>
                                  {e.productid.price}
                                </div>

                                <div className="line-item__total-amount-price">
                                  <span>
                                    <strong>Total Price:</strong>
                                  </span>
                                  {e.productid.fullprice}
                                </div>

                                <div className="line-item__quantity">
                                  <span className="line-item__quantity-text">
                                    Quantity:
                                  </span>
                                  <input
                                    type="number"
                                    name="updates[]"
                                    size="4"
                                    defaultValue={e.quantity}
                                    onChange={(evt) =>
                                      handleChange(evt, e.productid._id, cart)
                                    }
                                  />
                                  <button
                                    className="button update_btn"
                                    type="submit"
                                    onClick={() => {
                                      // listIndex === i
                                      //   ? setListIndex(listIndex)
                                      //   : setListIndex(i);
                                      singleupdate(userid, e.productid._id);
                                    }}
                                  >
                                    Update Quantity
                                  </button>
                                </div>
                                {/* {i === listIndex && visible && (
                                  <div className="cart">{error}</div>
                                )} */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="cart__details cart__block">
                    <div className="cart__details-wrap">
                      <h5>ORDER SUMMARY</h5>
                      <p className="no-margin evenly-align">
                        <span className="cart-total-quantity">
                          {quantity ? quantity : ""} items
                        </span>
                        <span className="cart-total-price">
                          <span>${cart ? cart.totalprice : ""} USD</span>
                        </span>
                      </p>
                      <div className="cart-subtotal evenly-align cart__total">
                        <span className="cart-subtotal__title">Subtotal</span>
                        <strong>
                          <span className="cart-subtotal__price">
                            {subtotal ? `$${subtotal}` : ""} USD
                          </span>
                        </strong>
                      </div>
                      <div className="cart__total evenly-align">
                        <span className="cart__total-text">Total:</span>
                        <strong className="cart__total-price">
                          <span> {subtotal ? `$${subtotal}` : ""}</span>
                          <span> USD</span>
                        </strong>
                      </div>
                      <button
                        className="button update_btn"
                        type="submit"
                        onClick={updateallquantity}
                      >
                        Update Quantity
                      </button>
                      <Link to="/usercheckout/0000">
                        <button className="checkout button">Checkout</button>
                      </Link>
                      {coupon ? (
                        <div className="cart-promo">
                          <h5>COUPON APPLIED</h5>
                          <h2>{code ? code : ""}</h2>
                          <p className="promo" onClick={deletediscount}>
                            REMOVE COUPON
                          </p>
                        </div>
                      ) : (
                        <div className="cart-promo">
                          <h5>ENTER A PROMO CODE</h5>
                          <input type="text" id="devPromo" ref={promo} />
                          <p className="promo" onClick={discounthandler}>
                            Apply Coupon
                          </p>
                          {/* {errorcouponvisible ? (
                            <p className="error-msg">{errorcoupon}</p>
                          ) : (
                            ""
                          )} */}
                        </div>
                      )}

                      <div className="text-center mt-20">
                        <Link className="link-text-line" to="/userdashboard">
                          Continue shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {noproduct && (
          <div className="cart-template page-content noproduct">
            <h1>NO PRODUCT AVAILABLE</h1>
            <Link to="/userdashboard">
              <button className="button button--alt collect">
                Go to collection
              </button>
            </Link>
            <div className="top"></div>
          </div>
        )}
      </div>
    </>
  );
};
