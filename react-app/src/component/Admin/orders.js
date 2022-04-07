import { Header } from "../User/header";

import React, { useEffect, useState } from "react";
import { getallOrdersadmin } from "../../context/Admin-context/apicallsadmin";
import { Link } from "react-router-dom";

export const Orders = () => {
  const [orders, setorders] = useState({});
  const allorders = async () => {
    const products = await getallOrdersadmin();
    setorders(products);
  };

  const dateformat = (date) => {
    const dates = new Date(date);
    const month = dates.toLocaleString("default", { month: "short" });
    return `${month} ${dates.getDate()},${dates.getFullYear()}`;
  };

  useEffect(() => {
    allorders();
  }, []);
  console.log(orders);
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
                <div className="products-list">
                  <div className="actions flex items-center">
                    <h3>Orders</h3>
                  </div>
                  <div className="added-products">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>S. No</th>
                          <th>Order No.</th>
                          <th>Date</th>
                          <th>Payment Status</th>
                          <th>Fulfillment Status</th>
                          <th>Items</th>
                          <th className="text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(orders).length &&
                          orders.map((e, i) => {
                            return (
                              <tr key={e.orderno}>
                                <td>
                                  {i < 9 && "0"}
                                  {i + 1}
                                </td>
                                <td>
                                  <Link to={`/adminorderdetail/${e.orderno}`}>
                                    <u>#{e.orderno}</u>
                                  </Link>
                                </td>
                                <td>{dateformat(e.createdat)}</td>
                                <td>{e.paymentstatus}</td>
                                <td>
                                  {e.paymentstatus === "Paid"
                                    ? "Fullfilled"
                                    : "NotFulfilled"}
                                </td>
                                <td>{e.totalquantity} items</td>
                                <td className="text-right">
                                  {" "}
                                  $
                                  {e.discountcode !== ""
                                    ? Number(e.totalprice) - e.totaldiscount
                                    : e.totalprice}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
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
