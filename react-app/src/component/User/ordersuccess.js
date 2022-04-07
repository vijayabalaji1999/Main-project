import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  increment,
  removeallcart,
  status,
  decrement,
} from "../../context/User-context/discountcalculate";
import { useContext } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { setdiscount } from "../../context/User-context/helper";
import { orderdetail } from "../../context/User-context/discountcalculate";
import { Header } from "./header";
import { orderconfirmApi } from "../../context/User-context/discountcalculate";
import ReactDOMServer from "react-dom/server";
import { Reactcom } from "./email";

export const Ordersucess = () => {
  let { orderid } = useParams();
  // const { values } = useContext(Usercontext);

  // const removeall = async () => {
  //   const data = await removeallcart(values.user._id);
  //   const data1 = await setdiscount(values.user._id);
  //   const statusupdate = await status(orderid);
  //   const order = await orderdetail(orderid);
  //   const discount = order.orderdetails[0].discountcode;
  //   if (discount) {
  //     const increment1 = await increment(discount);
  //   }
  //   const datadecre = await Promise.all(
  //     order.orderdetails[0].products.map(async (e) => {
  //       const contents = await decrement(e.productid, e.quantity);
  //     })
  //   );

  //   const messageHtml = ReactDOMServer.renderToString(
  //     <Reactcom order={order.orderdetails[0]}></Reactcom>
  //   );
  //   const renders = await orderconfirmApi(messageHtml, values.user.email);
  // };

  // useEffect(() => {
  //   removeall();
  // }, []);

  return (
    <>
      <Header />
      <div className="main-content">
        <section>
          <div className="container">
            <div className="checkout-template page-content">
              <h2>Thank you</h2>
              <div className="checkout-details row">
                <div className="checkout-wrap">
                  <div className="checkout-section">
                    <div className="contact-info">
                      <div className="fieldset">
                        <h3>Order Placed</h3>
                        <p className="mt-20">
                          Thank you for placing your order.
                        </p>
                        <p className="mt-20">
                          Your order no.:
                          <Link to={`/userorderdetail/${orderid}`}>
                            {" "}
                            <u>{orderid}</u>
                          </Link>
                          . You can check your order{" "}
                          <Link to={`/userorderdetail/${orderid}`}>
                            <u>details</u>
                          </Link>{" "}
                          here.
                        </p>
                      </div>

                      <div className="action-btn">
                        <Link
                          to="/usermyorders"
                          className="button button--hollow"
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/userdashboard"
                          className="button secondary-btn"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
