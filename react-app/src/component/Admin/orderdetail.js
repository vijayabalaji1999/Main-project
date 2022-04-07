import { Header } from "../User/header";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { getorderdetail } from "../../context/Admin-context/apicallsadmin";
import { Link } from "react-router-dom";
import { numberoforders } from "../../context/Admin-context/apicallsadmin";

export const Orderdetail = () => {
  let { orderid } = useParams();
  const [orders, setorders] = useState({});
  const order = async (orderid) => {
    const data = await getorderdetail(orderid);
    const number = await numberoforders(data[0].user._id);
    const date = new Date(data[0].createdat);
    const month = date.toLocaleString("default", { month: "short" });

    let milliseconds = date.getTime();
    const timeString12hr = new Date(
      date + milliseconds + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    data[0].settimeString = timeString12hr;
    data[0].setdate = `${month} ${date.getDate()},${date.getFullYear()}`;
    data[0].numberoforders = number;
    setorders(data[0]);
  };

  useEffect(() => {
    order(orderid);
  }, []);
  return (
    <>
      <Header />
      <div className="main-content">
        <section className="flex">
          <div className="container-fluid">
            <div className="admin-content">
              <div className="admin-left-nav mt-20">
                <ul>
                  <li>
                    <Link to="/admindashboard">Products</Link>
                  </li>
                  <li>
                    <Link className="active" to="/adminorders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/admindiscount">Discount</Link>
                  </li>
                </ul>
              </div>
              <div className="admin-right page-content">
                {Object.keys(orders).length && (
                  <div className="products-list">
                    <div className="actions flex items-center">
                      <h3>#{orders.orderno}</h3>
                    </div>
                    <div className="actions flex items-center flex-start">
                      <span>{`${orders.setdate} at ${orders.settimeString}`}</span>
                    </div>
                    <div className="view-orders">
                      <div className="main-cart-wrapper">
                        <div className="cart__items cart__block">
                          <div className="line-items">
                            <table className="table">
                              {orders.products.map((e) => {
                                return (
                                  <tr key={e.productid}>
                                    <td>
                                      <div className="image-wrapper">
                                        <img
                                          className="line-item__image"
                                          src={`/images/${e.images}`}
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <h2 className="line-item-title">
                                        <a
                                          href="product.html"
                                          className="cart__product-title"
                                        >
                                          {e.productname}
                                          {e.quantity > 1 ? "s" : ""}
                                        </a>
                                      </h2>
                                      <label htmlFor="">
                                        SKU: <span>{e.productid}</span>
                                      </label>
                                    </td>
                                    <td>
                                      {e.actualprice} ×{" "}
                                      <span>{e.quantity}</span>
                                    </td>
                                    <td>
                                      ${" "}
                                      {Number(
                                        e.actualprice.replace("$", "") *
                                          e.quantity
                                      )}
                                      .00
                                    </td>
                                  </tr>
                                );
                              })}
                            </table>
                          </div>
                          <div className="order__details-wrap mt-10">
                            <div className="flex">
                              <h4>{orders.paymentstatus}</h4>
                            </div>
                            <div className="flex border-t">
                              <span>Subtotal</span>
                              <span>{orders.totalquantity} item</span>
                              <span>${orders.totalprice}</span>
                            </div>
                            <div className="flex">
                              <span>Shipping</span>
                              <span>Standard (3.0 kg)</span>
                              <span>$0</span>
                            </div>
                            <div className="flex">
                              <span>Tax</span>
                              <span>GST 0%</span>
                              <span>$0</span>
                            </div>
                            <div className="flex">
                              <span>Discount</span>
                              <span>
                                {orders.discountcode ? orders.discountcode : ""}
                              </span>
                              <span>
                                {orders.discountcode
                                  ? `$${orders.totaldiscount}`
                                  : ""}
                                {/* //shipping time to be notted */}
                              </span>
                            </div>
                            <div className="flex">
                              <span>
                                <strong>Total</strong>
                              </span>
                              <span>
                                <strong>
                                  $
                                  {orders.discountcode !== ""
                                    ? Number(orders.totalprice) -
                                      orders.totaldiscount
                                    : orders.totalprice}
                                </strong>
                              </span>
                            </div>
                            <div className="flex border-t">
                              <span>Paid by customer</span>
                              <span>
                                $
                                {orders.discountcode !== ""
                                  ? Number(orders.totalprice) -
                                    orders.totaldiscount
                                  : orders.totalprice}
                              </span>
                            </div>
                            <div className="mt-20">
                              <button
                                className="button update_btn"
                                type="submit"
                              >
                                Fulfill Item
                              </button>
                              <button
                                href="#"
                                className="button checkout_btn button--hollow"
                              >
                                Create Shipping Label
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="cart__details cart__block add-margin">
                          <div className="order__details-wrap">
                            <h4>Customer</h4>
                            <p>
                              <a href="#">{orders.user.email}</a>
                            </p>
                            <p>{orders.numberoforders} orders</p>
                            {/* <!-- <p className="evenly-align">
						                        <span className="cart-total-quantity">3 items</span>
						                        <span className="cart-total-price">
						                        	<span>€204,15</span>
						                        </span>
						                    </p>
						                  	<div className="cart-subtotal evenly-align cart__total">
						                        <span className="cart-subtotal__title">Subtotal</span>
						                        <strong><span className="cart-subtotal__price">€204,15</span></strong>
						                    </div>
						                    <div className="cart__total evenly-align">
						                        <span className="cart__total-text">Total:</span>  
						                        <strong className="cart__total-price">
						                        	<span>€204,15</span>
						                        	<span> EUR</span>
						                        </strong>
						                    </div> --> */}
                          </div>
                          <div className="order__details-wrap mt-10">
                            <div className="flex">
                              <h4>Contact Information</h4>
                              <a href="#">
                                <u>Edit</u>
                              </a>
                            </div>
                            <p>
                              <a href="#">{orders.contact.email}</a>
                            </p>
                            <p>{orders.contact.phone}</p>
                          </div>
                          <div className="order__details-wrap mt-10">
                            <div className="flex">
                              <h4>Shipping Address</h4>
                              <a href="#">
                                <u>Edit</u>
                              </a>
                            </div>
                            <p>{orders.contact.name}</p>
                            <p>{orders.contact.address}</p>
                            <p> {orders.contact.postalcode}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
