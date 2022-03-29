import { useState, useEffect } from "react";
import { useContext } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { discountcal } from "../../context/User-context/discountcalculate";

export const Checkout = () => {
  let subtotal;
  let quantity;
  const { values } = useContext(Usercontext);
  const [cart, setcart] = useState();
  const [oneproduct, setnoproduct] = useState();
  const { getallcart } = useContext(Usercontext);
  const [cartss, setcartss] = useState();

  const userid = values.user._id;

  const data = async () => {
    const allcart = await getallcart(userid);

    if (allcart.productadded.length === 0) {
      setnoproduct(true);
      return console.log("discount deleted redirect here");
    }
    setnoproduct(false);

    const discount = allcart.cartdetail[0].discount;
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
    } else {
      const data = await discountcal(
        allcart.cartdetail[0].discount,
        allcart.cartdetail[0]
      );
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
  } else if (cart) {
    quantity = cart.length;
  }
  useEffect(() => {
    data();
  }, []);

  return (
    <div className="main-content">
      <section>
        <div className="container">
          <div className="checkout-template page-content">
            <h2>Checkout</h2>
            <div className="checkout-details row">
              <div className="checkout-wrap">
                <div className="checkout-section">
                  <div className="contact-info">
                    <div className="fieldset">
                      <h3>Contact information</h3>
                      <div className="field-input">
                        <label htmlFor="name">Name</label>
                        <span>
                          <input
                            type="text"
                            className="input-text"
                            placeholder="Enter your name"
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
                          />
                        </span>
                      </div>
                    </div>
                    <div className="action-btn">
                      <a href="payment.html" className="button button--hollow">
                        Proceed to Payment
                      </a>
                      <a href="cart.html" className="button secondary-btn">
                        Return to Cart
                      </a>
                    </div>
                  </div>
                  <div className="order-summary-right">
                    <div className="order-summary__sections">
                      <div className="">
                        <div className="order-summary__section__content">
                          <table className="product-table">
                            <thead className="product-table__header">
                              <tr>
                                <th>
                                  <span className="visually-hidden">Image</span>
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
                                  <span className="visually-hidden">Price</span>
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
                                        <span className="product__description__name">
                                          {e.productid.name}
                                        </span>
                                      </td>
                                      <td className="product__description__variant">
                                        {e.productid.discount
                                          ? `Discount amount -${e.productid.discount}`
                                          : ""}
                                      </td>
                                      <td className="product__quantity">
                                        <span className="visually-hidden">
                                          1
                                        </span>
                                      </td>
                                      <td className="product__price">
                                        <span className="order-summary__emphasis">
                                          {e.productid.discount ? (
                                            <del>{e.productid.fullprice}</del>
                                          ) : (
                                            e.productid.fullprice
                                          )}{" "}
                                        </span>
                                        <p className="order-summary__emphasis">
                                          {e.productid.discount
                                            ? e.productid.discount
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
                          <span className="cart-subtotal__title">Discount</span>
                          <strong>
                            <span className="cart-subtotal__price">
                              {cart && cart.discounttotal
                                ? `$${cart.discounttotal}`
                                : "$0"}
                            </span>
                          </strong>
                        </div>
                        <div className="cart-subtotal evenly-align cart__total">
                          <span className="cart-subtotal__title">Subtotal</span>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
