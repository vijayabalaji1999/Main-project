import { Link } from "react-router-dom";
import { getalldiscountadmin } from "../../context/Admin-context/apicallsadmin";
import { useState, useEffect } from "react";
import { Header } from "../User/header";
import { useNavigate } from "react-router";
import { toast , ToastContainer } from "react-toastify";

export const Discount = () => {
  const toastList = new Set();
  const MAX_TOAST = 1;
  const [discount, setdiscount] = useState({});
  const [languages, setLanguages] = useState();
  const [check, setcheck] = useState(false);
  const [code, setcode] = useState();
  const navigate = useNavigate();
  const [num, setnum] = useState(false);

  const alldisocunts = async () => {
    const discounts = await getalldiscountadmin();
    setdiscount(discounts);
  };

  const dateformat = (date) => {
    const date1 = new Date(date);
    const month = date1.toLocaleString("default", { month: "short" });
    return `${month} ${date1.getDate()},${date1.getFullYear()}`;
  };

  const expirycheck = (date1, date2) => {
    if (date1 > new Date().toISOString()) {
      return "Scheduled";
    } else if (date2 < new Date().toISOString()) {
      return "Expired";
    } else {
      return "Active";
    }
  };

  const handleCheckboxChecked = (event, code, i) => {
    console.log(code);
    if (languages !== i) {
      setLanguages(i);
      setcheck(true);
      setcode(code);
      setnum(true);
    } else if (languages === i) {
      setLanguages(undefined);
      setcheck(false);
      setnum(false);
      setcode(undefined);
    }
  };

  const editdiscount = () => {
    if (code) {
      navigate(`/admindiscountedit/${code}`);
    } else {
      if (toastList.size < MAX_TOAST) {
        const id = toast.info("Please select a product", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
    }
  };

  useEffect(() => {
    alldisocunts();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="main-content">
        <section className="flex">
          <div className="container-fluid">
            <div className="admin-content">
              <div className="admin-left-nav mt-20">
                <ul>
                  <li>
                    {" "}
                    <Link to="/admindashboard">Products</Link>
                  </li>
                  <li>
                    <Link to="/adminorders">Orders</Link>
                  </li>
                  <li>
                    <Link className="active" to="/admindiscount">
                      Discount
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="admin-right page-content">
                <div className="products-list">
                  <div className="actions flex items-center">
                    <h3>Discounts</h3>
                    <Link
                      to="/adminadddiscount"
                      className="button button--hollow justify-end inline-block"
                    >
                      Create Discount
                    </Link>
                  </div>
                  <div className="actions flex items-center flex-start">
                    <span>
                      <span id="count">{num ? 1 : 0}</span> selected
                    </span>
                    <button
                      // href="edit-product.html"
                      onClick={editdiscount}
                      className="white-btn items-center"
                    >
                      Edit Discount
                    </button>
                  </div>
                  <div className="added-products">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Discount Code</th>
                          <th>Times Used</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(discount).length &&
                          discount.map((e, i) => {
                            return (
                              <tr key={e.discountcode}>
                                <td>
                                  <input
                                    type="checkbox"
                                    // checked
                                    name="discount-item"
                                    onChange={(event) =>
                                      handleCheckboxChecked(event, e._id, i)
                                    }
                                    checked={
                                      check && languages === i ? true : false
                                    }
                                  />
                                </td>
                                <td>
                                  <Link to={`/admindiscountedit/${e._id}`}>
                                    <u>{e.discountcode}</u>
                                  </Link>
                                  <p>
                                    {e.discountvalue} off one-time purchase
                                    products
                                  </p>
                                </td>
                                <td>
                                  <span>{e.timeused}</span> used
                                </td>
                                <td>{dateformat(e.startdate)}</td>
                                <td>{dateformat(e.enddate)}</td>
                                {expirycheck(e.startdate, e.enddate) ===
                                  "Active" && (
                                  <td className="color-green">Active</td>
                                )}
                                {expirycheck(e.startdate, e.enddate) ===
                                  "Expired" && (
                                  <td className="color-red">Expired</td>
                                )}
                                {expirycheck(e.startdate, e.enddate) ===
                                  "Scheduled" && <td>Scheduled</td>}
                              </tr>
                            );
                          })}

                        {/* <tr>
                        <td>
                          <input type="checkbox" name="discount-item" />
                        </td>
                        <td>
                          <a href="edit-discount.html">
                            <u>WELCOME</u>
                          </a>
                          <p>25% off one-time purchase products</p>
                        </td>
                        <td>
                          <span>10</span> used
                        </td>
                        <td>March 01, 2022</td>
                        <td>March 31, 2022</td>
                        <td className="color-green">Active</td>
                      </tr> */}
                        {/* <tr>
                        <td>
                          <input type="checkbox" name="discount-item" />
                        </td>
                        <td>
                          <a href="edit-discount.html">
                            <u>FEB14</u>
                          </a>
                          <p>20% off one-time purchase products</p>
                        </td>
                        <td>
                          <span>48</span> used
                        </td>
                        <td>February 14, 2022</td>
                        <td>February 16, 2022</td>
                        <td className="color-red">Expired</td>
                      </tr>
                      <tr>
                        <td>
                          <input type="checkbox" name="discount-item" />
                        </td>
                        <td>
                          <a href="edit-discount.html">
                            <u>REPUBLIC22</u>
                          </a>
                          <p>15% off one-time purchase products</p>
                        </td>
                        <td>
                          <span>55</span> used
                        </td>
                        <td>January 26, 2022</td>
                        <td>January 26, 2022</td>
                        <td className="color-red">Expired</td>
                      </tr>
                      <tr>
                        <td>
                          <input type="checkbox" name="discount-item" />
                        </td>
                        <td>
                          <a href="edit-discount.html">
                            <u>Pongal2022</u>
                          </a>
                          <p>15% off one-time purchase products</p>
                        </td>
                        <td>
                          <span>56</span> used
                        </td>
                        <td>January 14, 2022</td>
                        <td>January 18, 2022</td>
                        <td className="color-red">Expired</td>
                      </tr>
                      <tr>
                        <td>
                          <input type="checkbox" name="discount-item" />
                        </td>
                        <td>
                          <a href="edit-discount.html">
                            <u>NEWYEAR2022</u>
                          </a>
                          <p>30% off one-time purchase products</p>
                        </td>
                        <td>
                          <span>100</span> used
                        </td>
                        <td>January 01, 2022</td>
                        <td>January 08, 2022</td>
                        <td className="color-red">Expired</td>
                      </tr> */}
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
