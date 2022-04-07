import { orderdetail } from "../../context/User-context/discountcalculate";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "./header";

export const Orderdetail = () => {
  let { orderid } = useParams();
  const [datas, setdata] = useState({});
  let dates;
  const order = async () => {
    const data = await orderdetail(orderid);
    console.log(data);
    const date = new Date(data.orderdetails[0].createdat);
    const month = date.toLocaleString("default", { month: "short" });
    dates = `${month} ${date.getDate()},${date.getFullYear()}`;
    data.orderdetails[0].date = dates;
    setdata(data.orderdetails[0]);
  };
  let total;
  useEffect(() => {
    order();
  }, []);
  return (
    <>
      <Header />
      <div className="main-content">
        <section>
          <div className="container">
            {Object.keys(datas).length && (
              <div className="checkout-template page-content">
                <h2>Order #{orderid}</h2>
                <p>Placed on {datas.date}</p>
                <div className="mt-20">
                  <div className="flex">
                    <div className="address">
                      <h3>Billing Address</h3>
                      <p>{datas.contact.name}</p>
                      <p>{datas.contact.address}</p>
                      <p>Pincode: {datas.contact.postalcode}</p>
                      <p className="mt-20">
                        <strong>Payment Status: {datas.paymentstatus}</strong>
                      </p>
                    </div>
                    <div className="address">
                      <h3>Shipping Address</h3>
                      <p>{datas.shipping.shippingname}</p>
                      <p>{datas.shipping.shippingaddress}</p>
                      <p>Pincode: {datas.shipping.shippingpostal}</p>
                      <p className="mt-20">
                        <strong>
                          Fulfillment Status:{" "}
                          {datas.paymentstatus === "pending"
                            ? "NotFullfilled"
                            : "fullfilled"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="my-orders row">
                  <div className="orders-wrap">
                    <div className="orders-list">
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th className="text-right">Price</th>
                            <th>Quantity</th>
                            <th className="text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {datas.products.map((e) => {
                            return (
                              <tr key={e.productid}>
                                <td>{e.productname}</td>
                                <td>{e.productid}</td>
                                <td className="text-right">
                                  {e.discountvalue !== ""
                                    ? `$${Number(
                                        e.actualprice.replace("$", "") -
                                          e.actualprice.replace("$", "") *
                                            (e.discountvalue.replace("%", "") /
                                              100)
                                      )}`
                                    : ""}
                                  {e.discountvalue !== "" ? (
                                    <del>{e.actualprice}</del>
                                  ) : (
                                    <span>{e.actualprice}</span>
                                  )}
                                </td>
                                <td>{e.quantity}</td>
                                <td className="text-right">{e.price}</td>
                              </tr>
                            );
                          })}

                          <tr>
                            <td colSpan="4">Subtotal</td>
                            <td className="text-right">
                              ${datas && datas.totalprice}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="4">Shipping</td>
                            <td className="text-right">$0</td>
                          </tr>
                          <tr>
                            <td colSpan="4">Tax (GST)</td>
                            <td className="text-right">$0</td>
                          </tr>
                          <tr>
                            <td colSpan="4">
                              Discount{" "}
                              <span>
                                (<strong>{datas && datas.discountcode}</strong>)
                              </span>
                            </td>
                            <td className="text-right">
                              {datas.totaldiscount
                                ? `-$${datas.totaldiscount}`
                                : "--"}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="4">
                              <strong>Total</strong>
                            </td>
                            <td className="text-right">
                              <strong>
                                $
                                {datas.discountcode !== ""
                                  ? Number(datas.totalprice) -
                                    datas.totaldiscount
                                  : datas.totalprice}
                                <span>USD</span>
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
