import React from "react";
export const Reactcom = ({ order }) => {
  const orders = order;
  console.log(orders);
  return (
    <>
      <div className="main-content">
        <table
          style={{
            height: "100%",
            width: "100%",
            borderSpacing: "0",
            borderCollapse: "collapse",
            fontFamily: "arial",
            background: "#fafafa",
          }}
        >
          <tbody>
            <tr>
              <td>
                <table
                  className="row"
                  style={{
                    width: "100%",
                    borderSpacing: "0",
                    borderCollapse: "collapse",
                    margin: "40px 0 20px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <center>
                          <table
                            className="container"
                            style={{
                              width: "560px",
                              textAlign: "left",
                              borderSpacing: "0",
                              borderCollapse: "collapse",
                              margin: "0 auto",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td className="shop-name__cell">
                                  <img
                                    src="https://cdn.shopify.com/s/files/1/0480/0751/2215/email_settings/wigo-logo_140x.png"
                                    alt="Wigo"
                                    width="100"
                                  />
                                </td>
                                <td
                                  className="order-number__cell"
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: "14px",
                                    color: "#999",
                                  }}
                                  align="right"
                                >
                                  <span
                                    className="order-number__text"
                                    style={{ fontSize: "16px" }}
                                  >
                                    Order {orders.orderno}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className="row"
                  style={{
                    width: "100%",
                    borderSpacing: "0",
                    borderCollapse: "collapse",
                    margin: "40px 0 0",
                  }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <center>
                          <table
                            className="container"
                            style={{
                              width: "560px",
                              textAlign: "left",
                              borderSpacing: "0",
                              borderCollapse: "collapse",
                              margin: "0 auto",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <h2
                                    style={{
                                      fontWeight: "normal",
                                      fontSize: "24px",
                                      margin: "0 0 10px",
                                    }}
                                  >
                                    Thank you for your purchase!{" "}
                                  </h2>
                                  <p
                                    style={{
                                      color: "#777",
                                      lineHeight: "150%",
                                      fontSize: "16px",
                                      margin: "0",
                                    }}
                                  >
                                    Hi {orders.contact.name}, we're getting your
                                    order ready to be shipped. We will notify
                                    you when it has been sent.
                                  </p>
                                  {/* <!-- <table className="row actions" style="width: 100%; border-spacing: 0; border-collapse: collapse; margin-top: 20px;">
					                                                <tbody>
					                                                    <tr>
					                                                        <td className="actions__cell" style="">
					                                                            <table className="button main-action-cell" style="border-spacing: 0; border-collapse: collapse; float: left; margin-right: 15px;">
					                                                                <tbody>
					                                                                    <tr>
					                                                                        <td className="button__cell" style="border-radius: 4px;" bgcolor="#000000" align="center"><a href="#" className="button__text" style="font-size: 16px; text-decoration: none; display: block; color: #fff; padding: 20px 25px;">View your order</a></td>
					                                                                    </tr>
					                                                                </tbody>
					                                                            </table>
					                                                            <table className="link secondary-action-cell" style="border-spacing: 0; border-collapse: collapse; margin-top: 19px;">
					                                                                <tbody>
					                                                                    <tr>
					                                                                        <td className="link__cell" style="">or <a href="#" style="font-size: 16px; text-decoration: none; color: #000000;">Visit our store</a></td>
					                                                                    </tr>
					                                                                </tbody>
					                                                            </table>
					                                                        </td>
					                                                    </tr>
					                                                </tbody>
					                                            </table> --> */}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className="row section"
                  style={{
                    width: "100%",
                    borderSpacing: "0",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        className="section__cell"
                        style={{ padding: "40px 0 0" }}
                      >
                        <center>
                          <table
                            className="container"
                            style={{
                              width: "560px",
                              textAlign: "left",
                              borderSpacing: "0",
                              borderCollapse: "collapse",
                              margin: "0 auto",
                              borderTop: "1px #e5e5e5 solid",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ paddingTop: "35px" }}>
                                  <h3
                                    style={{
                                      fontWeight: "normal",
                                      fontSize: "20px",
                                      margin: "0 0 25px",
                                    }}
                                  >
                                    Order summary
                                  </h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            className="container"
                            style={{
                              width: "560px",
                              textAlign: "left",
                              borderSpacing: "0",
                              borderCollapse: "collapse",
                              margin: "0 auto",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <table
                                    className="row"
                                    style={{
                                      width: "100%",
                                      borderSpacing: "0",
                                      borderCollapse: "collapse",
                                    }}
                                  >
                                    <tbody>
                                      {orders &&
                                        orders.products.map((e) => {
                                          return (
                                            <React.Fragment key={e.productid}>
                                              <tr>
                                                <td>
                                                  {/* <img
                                                    src="/images/men-shirt.jpg"
                                                    className="order-list__product-image"
                                                    style={{
                                                      marginRight: "15px",
                                                      borderRadius: "8px",
                                                      border:
                                                        "1px solid #e5e5e5",
                                                    }}
                                                    alt="img"
                                                    width="75"
                                                    height="50"
                                                    align="left"
                                                  /> */}
                                                </td>
                                                <td
                                                  className="order-list__product-description-cell"
                                                  style={{ width: "100%" }}
                                                >
                                                  <span
                                                    className="order-list__item-title"
                                                    style={{
                                                      fontSize: "16px",
                                                      fontWeight: "600",
                                                      lineHeight: "1.4",
                                                      color: "#555",
                                                    }}
                                                  >
                                                    {e.productname}
                                                    &nbsp;×&nbsp;{e.quantity}
                                                  </span>
                                                  <br></br>
                                                  {/* {e.discountcode === "" ? </td> : ""} */}
                                                  {/*  */}
                                                  {e.discountvalue !== "" && (
                                                    <span
                                                      className="order-list__item-discount-allocation"
                                                      style={{
                                                        fontSize: "14px",
                                                        display: "block",
                                                        lineHeight: "1.4",
                                                        color: "#555",
                                                        margin: "5px 0 0",
                                                      }}
                                                    >
                                                      <span
                                                        style={{
                                                          fontSize: "14px",
                                                          color: "#999",
                                                        }}
                                                      >
                                                        DISCOUNT (-$
                                                        {Number(
                                                          ((e.actualprice.replace(
                                                            "$",
                                                            ""
                                                          ) *
                                                            e.discountvalue.replace(
                                                              "%",
                                                              ""
                                                            )) /
                                                            100) *
                                                            e.quantity
                                                        )}
                                                        )
                                                      </span>
                                                    </span>
                                                  )}

                                                  {/*  */}
                                                </td>
                                                <td
                                                  className="order-list__price-cell"
                                                  style={{
                                                    whiteSpace: "nowrap",
                                                  }}
                                                >
                                                  {e.discountvalue === "" ? (
                                                    <p
                                                      className="order-list__item-price"
                                                      style={{
                                                        color: "#555",
                                                        lineHeight: "150%",
                                                        fontSize: "16px",
                                                        fontWeight: "600",
                                                        margin: "0 0 0 15px",
                                                      }}
                                                      align="right"
                                                    >
                                                      {e.price}
                                                    </p>
                                                  ) : (
                                                    <>
                                                      <del
                                                        className="order-list__item-original-price"
                                                        style={{
                                                          fontSize: "14px",
                                                          display: "block",
                                                          textAlign: "right",
                                                          color: "#999",
                                                        }}
                                                      >
                                                        {Number(
                                                          e.actualprice.replace(
                                                            "$",
                                                            ""
                                                          ) * e.quantity
                                                        )}
                                                      </del>
                                                      <p
                                                        className="order-list__item-price"
                                                        style={{
                                                          color: "#555",
                                                          lineHeight: "150%",
                                                          fontSize: "16px",
                                                          fontWeight: "600",
                                                          margin: "0 0 0 15px",
                                                        }}
                                                        align="right"
                                                      >
                                                        {e.price}
                                                      </p>
                                                    </>
                                                  )}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  colSpan="3"
                                                  style={{ height: "10px" }}
                                                >
                                                  &nbsp;
                                                </td>
                                              </tr>
                                            </React.Fragment>
                                          );
                                        })}
                                      {/*  */}
                                      {/* <tr>
                                        <td>
                                          <img
                                            src="/images/default.jpg"
                                            className="order-list__product-image"
                                            style={{
                                              marginRight: "15px",
                                              borderRadius: "8px",
                                              border: "1px solid #e5e5e5",
                                            }}
                                            width="75"
                                            height="50"
                                            align="left"
                                            alt="img"
                                          />
                                        </td>
                                        <td
                                          className="order-list__product-description-cell"
                                          style={{ width: "100%" }}
                                        >
                                          <span
                                            className="order-list__item-title"
                                            style={{
                                              fontSize: "16px",
                                              fontWeight: "600",
                                              lineHeight: "1.4",
                                              color: "#555",
                                            }}
                                          >
                                            Basic Green Shirt&nbsp;×&nbsp;1
                                          </span>
                                          <br></br>
                                          <span
                                            className="order-list__item-discount-allocation"
                                            style={{
                                              fontSize: "14px",
                                              display: "block",
                                              lineHeight: "1.4",
                                              color: "#555",
                                              margin: "5px 0 0",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontSize: "14px",
                                                color: "#999",
                                              }}
                                            >
                                              DISCOUNT (-$5.00)
                                            </span>
                                          </span>
                                        </td>
                                        <td
                                          className="order-list__price-cell"
                                          style={{ whiteSpace: "nowrap" }}
                                        >
                                          <del
                                            className="order-list__item-original-price"
                                            style={{
                                              fontSize: "14px",
                                              display: "block",
                                              textAlign: "right",
                                              color: "#999",
                                            }}
                                          >
                                            $100.00
                                          </del>
                                          <p
                                            className="order-list__item-price"
                                            style={{
                                              color: "#555",
                                              lineHeight: "150%",
                                              fontSize: "16px",
                                              fontWeight: "600",
                                              margin: "0 0 0 15px",
                                            }}
                                            align="right"
                                          >
                                            $95.00
                                          </p>
                                        </td>
                                      </tr> */}
                                      {/*  */}
                                    </tbody>
                                  </table>
                                  <table
                                    className="row subtotal-lines"
                                    style={{
                                      width: "100%",
                                      borderSpacing: "0",
                                      borderCollapse: "collapse",
                                      marginTop: "15px",
                                      marginBottom: "35px",
                                      borderTop: "1px #e5e5e5 solid",
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          className="subtotal-spacer"
                                          style={{ width: "40%" }}
                                        ></td>
                                        <td>
                                          <table
                                            className="row subtotal-table"
                                            style={{
                                              width: "100%",
                                              borderSpacing: "0",
                                              borderCollapse: "collapse",
                                              marginTop: "20px",
                                            }}
                                          >
                                            <tbody>
                                              <tr className="subtotal-line">
                                                <td
                                                  className="subtotal-line__title"
                                                  style={{ padding: "5px 0" }}
                                                >
                                                  <p
                                                    style={{
                                                      color: "#777",
                                                      lineHeight: "1.2em",
                                                      fontSize: "16px",
                                                      margin: "0",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: "16px",
                                                      }}
                                                    >
                                                      Subtotal
                                                    </span>
                                                  </p>
                                                </td>
                                                <td
                                                  className="subtotal-line__value"
                                                  style={{ padding: "5px 0" }}
                                                  align="right"
                                                >
                                                  <strong
                                                    style={{
                                                      fontSize: "16px",
                                                      color: "#555",
                                                    }}
                                                  >
                                                    ${orders.totalprice}
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr className="subtotal-line">
                                                <td
                                                  className="subtotal-line__title"
                                                  style={{ padding: "5px 0" }}
                                                >
                                                  <p
                                                    style={{
                                                      color: "#777",
                                                      lineHeight: "1.2em",
                                                      fontSize: "16px",
                                                      margin: "0",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: "16px",
                                                      }}
                                                    >
                                                      Shipping
                                                    </span>
                                                  </p>
                                                </td>
                                                <td
                                                  className="subtotal-line__value"
                                                  style={{ padding: "5px 0" }}
                                                  align="right"
                                                >
                                                  <strong
                                                    style={{
                                                      fontSize: "16px",
                                                      color: "#555",
                                                    }}
                                                  >
                                                    $0
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr className="subtotal-line">
                                                <td
                                                  className="subtotal-line__title"
                                                  style={{ padding: "5px 0" }}
                                                >
                                                  <p
                                                    style={{
                                                      color: "#777",
                                                      lineHeight: "1.2em",
                                                      fontSize: "16px",
                                                      margin: "0",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: "16px",
                                                      }}
                                                    >
                                                      Taxes
                                                    </span>
                                                  </p>
                                                </td>
                                                <td
                                                  className="subtotal-line__value"
                                                  style={{ padding: "5px 0" }}
                                                  align="right"
                                                >
                                                  <strong
                                                    style={{
                                                      fontSize: "16px",
                                                      color: "#555",
                                                    }}
                                                  >
                                                    $0.00
                                                  </strong>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table
                                            className="row subtotal-table subtotal-table--total"
                                            style={{
                                              width: "100%",
                                              borderSpacing: "0",
                                              borderCollapse: "collapse",
                                              marginTop: "20px",
                                              borderTopWidth: "2px",
                                              borderTopColor: "#e5e5e5",
                                              borderTopStyle: "solid",
                                            }}
                                          >
                                            <tbody>
                                              <tr className="subtotal-line">
                                                <td
                                                  className="subtotal-line__title"
                                                  style={{
                                                    padding: "20px 0 0",
                                                  }}
                                                >
                                                  <p
                                                    style={{
                                                      color: "#777",
                                                      lineHeight: "1.2em",
                                                      fontSize: "16px",
                                                      margin: "0",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: "16px",
                                                      }}
                                                    >
                                                      Total
                                                    </span>
                                                  </p>
                                                </td>
                                                <td
                                                  className="subtotal-line__value"
                                                  style={{
                                                    padding: "20px 0 0",
                                                  }}
                                                  align="right"
                                                >
                                                  {orders.discountcode ===
                                                  "" ? (
                                                    <strong
                                                      style={{
                                                        fontSize: "24px",
                                                        color: "#555",
                                                      }}
                                                    >
                                                      $
                                                      {Number(
                                                        orders.totalprice
                                                      )}{" "}
                                                      USD
                                                    </strong>
                                                  ) : (
                                                    <strong
                                                      style={{
                                                        fontSize: "24px",
                                                        color: "#555",
                                                      }}
                                                    >
                                                      $
                                                      {Number(
                                                        orders.totalprice -
                                                          orders.totaldiscount
                                                      )}{" "}
                                                      USD
                                                    </strong>
                                                  )}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          {orders.discountcode !== "" && (
                                            <p
                                              className="total-discount"
                                              style={{
                                                color: "#777",
                                                lineHeight: "1.1",
                                                fontSize: "16px",
                                                margin: "10px 0 0",
                                              }}
                                              align="right"
                                            >
                                              You saved{" "}
                                              <span
                                                className="total-discount--amount"
                                                style={{
                                                  fontSize: "16px",
                                                  color: "#555",
                                                }}
                                              >
                                                ${orders.totaldiscount}
                                              </span>
                                            </p>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className="row section"
                  style={{
                    width: "100%",
                    borderSpacing: "0",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        className="section__cell"
                        style={{ padding: "0 0 40px 0" }}
                      >
                        <center>
                          <table
                            className="container"
                            style={{
                              width: "560px",
                              textAlign: "left",
                              borderSpacing: "0",
                              borderCollapse: "collapse",
                              margin: "0 auto",
                              borderTop: "1px #e5e5e5 solid",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ paddingTop: "35px" }}>
                                  <h3
                                    style={{
                                      fontWeight: "normal",
                                      fontSize: "20px",
                                      margin: "0 0 25px",
                                    }}
                                  >
                                    Customer information
                                  </h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            className="container"
                            style={{
                              width: "560px",
                              textAlign: "left",
                              borderSpacing: "0",
                              borderCollapse: "collapse",
                              margin: "0 auto",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <table
                                    className="row"
                                    style={{
                                      width: "100%",
                                      borderSpacing: "0",
                                      borderCollapse: "collapse",
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          className="customer-info__item"
                                          style={{ width: "50%" }}
                                        >
                                          <h4
                                            style={{
                                              fontWeight: "600",
                                              fontSize: "16px",
                                              color: "#555",
                                              margin: "0 0 5px",
                                            }}
                                          >
                                            Shipping address
                                          </h4>
                                          <p
                                            style={{
                                              color: "#777",
                                              lineHeight: "150%",
                                              fontSize: "16px",
                                              margin: "0",
                                            }}
                                          >
                                            {orders.shipping.shippingname}
                                            <br></br>
                                            {orders.shipping.shippingemail}
                                            <br></br>
                                            {orders.shipping.shippingaddress}
                                            {/* <br></br>Shippington KY 40003 */}
                                            <br></br>
                                            {orders.shipping.shippingpostal}
                                          </p>
                                        </td>
                                        <td
                                          className="customer-info__item"
                                          style={{
                                            width: "50%",
                                            verticalAlign: "top",
                                          }}
                                        >
                                          <h4
                                            style={{
                                              fontWeight: "600",
                                              fontSize: "16px",
                                              color: "#555",
                                              margin: "0 0 5px",
                                              verticalAlign: "top",
                                            }}
                                          >
                                            Payment method
                                          </h4>
                                          <p
                                            className="customer-info__item-content"
                                            style={{
                                              color: "#777",
                                              lineHeight: "150%",
                                              fontSize: "16px",
                                              margin: "0",
                                            }}
                                          >
                                            <span style={{ fontSize: "16px" }}>
                                              ending with 1234 —{" "}
                                              <strong
                                                style={{
                                                  fontSize: "16px",
                                                  color: "#555",
                                                }}
                                              >
                                                ${Number(orders.totalprice)}
                                              </strong>
                                            </span>
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className="row footer"
                  style={{
                    width: "100%",
                    borderSpacing: "0",
                    borderCollapse: "collapse",
                    borderTop: "1px #e5e5e5 solid",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        className="footer__cell"
                        style={{ padding: "35px 0" }}
                      >
                        <center>
                          <table
                            className="container"
                            style={{
                              width: "560px",
                              textAlign: "left",
                              borderSpacing: "0",
                              borderCollapse: "collapse",
                              margin: "0 auto",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <p
                                    className="disclaimer__subtext"
                                    style={{
                                      color: "#999",
                                      lineHeight: "150%",
                                      fontSize: "14px",
                                      margin: "0",
                                    }}
                                  >
                                    If you have any questions, reply to this
                                    email or contact us at{" "}
                                    <a
                                      href="mailto:accounts@codem.com"
                                      style={{
                                        fontSize: "14px",
                                        textDecoration: "none",
                                        color: "#000000",
                                      }}
                                    >
                                      accounts@codem.com
                                    </a>
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
