import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getonediscountadmin } from "../../context/Admin-context/apicallsadmin";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getallproductadmin } from "../../context/Admin-context/apicallsadmin";
import { getoneproductadmin } from "../../context/Admin-context/apicallsadmin";
import { adddiscountadmin } from "../../context/Admin-context/apicallsadmin";
import { useNavigate } from "react-router";
import { Header } from "../User/header";
import { editdiscountadmin } from "../../context/Admin-context/apicallsadmin";
import { toast, ToastContainer } from "react-toastify";
import { getoneproductsku } from "../../context/Admin-context/apicallsadmin";

export const Editdiscount = () => {
  const toastList = new Set();
  const MAX_TOAST = 1;
  const [discount, setdiscount] = useState({});
  const [active, setactive] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [product, setproduct] = useState({});
  const [table, settable] = useState(false);
  const [selectedprod, setselectedprod] = useState({});
  const [allproducts, setallproducts] = useState([]);
  const [productid, setproductid] = useState({});

  const navigate = useNavigate();
  let { id } = useParams();

  const onediscount = async (id) => {
    const discount = await getonediscountadmin(id);
    setdiscount(discount[0]);

    if (!discount[0].appliesforall) {
      specificdefault();
      setselectedprod(discount[0].product);
      discount[0].product.map((e1) => {
        if (!allproducts.includes(e1.productid.sku)) {
          setallproducts((oldArray) => [...oldArray, e1.productid.sku]);
        }
      });
    }
  };

  const dateformat = (date) => {
    const dates = new Date(date);
    const month = dates.toLocaleString("default", { month: "short" });
    return `${month} ${dates.getDate()}`;
  };

  const dateformattoback = (date1) => {
    let dates;
    const date = new Date(date1);
    const month = date.getMonth() + 1;
    if (date.getDate() < 10) {
      dates = `${date.getFullYear()}-0${month}-0${date.getDate()}`;
    } else {
      dates = `${date.getFullYear()}-0${month}-${date.getDate()}`;
    }

    return dates;
  };

  useEffect(() => {
    if (Object.keys(discount).length) {
      setValue("discountcode", discount.discountcode);
      setValue("discountvalue", discount.discountvalue.replace("%", ""));
      setValue("status", discount.status);
      setValue("appliesforall", discount.appliesforall ? "all" : "specific");
      setValue("startdate", dateformattoback(discount.startdate));
      setValue("enddate", dateformattoback(discount.enddate));
      setValue("discountcode", discount.discountcode);
    }
  }, [discount]);

  useEffect(() => {
    onediscount(id);
  }, []);

  console.log(discount);

  console.log(selectedprod);
  const expirycheck = (date1, date2) => {
    if (date1 > new Date().toISOString()) {
      return "Scheduled";
    } else if (date2 < new Date().toISOString()) {
      return "Expired";
    } else {
      return "Active";
    }
  };

  const submithandle = async (data) => {
    let result;
    if (Object.keys(productid).length && data.appliesforall === "specific") {
      data.product = productid;
      data.appliesforall = false;
      data.discountvalue = `${data.discountvalue}%`;
      let startdate = new Date(data.startdate);
      data.startdate = startdate.toISOString();

      let enddate = new Date(data.enddate);
      data.enddate = enddate.toISOString();
      data._id = discount._id;

      result = await editdiscountadmin(data);
    } else {
      data.appliesforall = true;
      data.discountvalue = `${data.discountvalue}%`;
      console.log(data);
      data.product = [];
      data._id = discount._id;
      result = await editdiscountadmin(data);
    }

    if (result.discount) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.success("Discount Updated", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            toastList.delete(id);
            navigate("/admindiscount");
          },
        });

        toastList.add(id);
      }
    } else {
      if (toastList.size < MAX_TOAST) {
        const id = toast.error("Discount Code Already Exist", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
    }
  };

  const allproduct = async () => {
    const products = await getallproductadmin();
    setproduct(products);
    console.log(product);
  };

  const removeproduct = (sku) => {
    console.log(sku.target.id);
    console.log(allproducts);
    console.log(allproducts.filter((e) => e !== sku.target.id));
    setallproducts(allproducts.filter((e) => e !== sku.target.id));
  };

  useEffect(() => {
    addproductspecific(); // This is be executed when `loading` state changes
  }, [allproducts]);

  const selected = (e) => {
    //o index not coming]
    const index = allproducts.indexOf(e.target.value);
    console.log(index, e.target.value);

    if (index === -1) {
      setallproducts((oldArray) => [...oldArray, e.target.value]);
    } else {
      console.log("hi");
      setallproducts(allproducts.filter((sku) => sku !== e.target.value));
    }
  };

  const addproductspecific = async () => {
    let products1 = [];
    let product = [];
    const data = await Promise.all(
      allproducts.map(async (e) => {
        const products = await getoneproductsku(e);
        products1.push({ productid: products[0] });
        product.push({ productid: products[0]._id });
      })
    );
    setproductid(product);
    setselectedprod(products1);
  };

  useEffect(() => {
    allproduct();
  }, []);

  const specificdefault = () => {
    setactive(true);
  };

  const specific = () => {
    setactive(true);
    settable(true);
    console.log(allproducts);
  };
  const applies = () => {
    setactive(false);
  };
  const close = () => {
    settable(false);
  };
  return (
    <>
      <Header />
      <ToastContainer />

      {Object.keys(discount).length && (
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
                      <h3>TRYNEW</h3>
                    </div>
                    <div className="view-orders">
                      <div className="main-cart-wrapper">
                        <div className="cart__items cart__block">
                          <form onSubmit={handleSubmit(submithandle)}>
                            <div className="form-inline">
                              <div className="order__details-wrap">
                                <div className="flex">
                                  <div className="w-50 pr-10">
                                    <h4>Discount code</h4>
                                    <input
                                      type="text"
                                      placeholder=""
                                      className=""
                                      {...register("discountcode", {
                                        required: true,
                                      })}
                                    />
                                  </div>
                                  <div className="w-50 pl-10">
                                    <h4>Discount Value (in %)</h4>
                                    <input
                                      type="text"
                                      placeholder=""
                                      className=""
                                      {...register("discountvalue", {
                                        required: true,
                                      })}
                                    />
                                  </div>
                                </div>
                                <div className="mt-10">
                                  <h4>Status</h4>
                                  <div className="">
                                    <label htmlFor="enable">
                                      <input
                                        type="radio"
                                        className="input-text"
                                        id="enable"
                                        name="status"
                                        value="enable"
                                        {...register("status")}
                                      />
                                      Enable
                                    </label>
                                  </div>
                                  <div className="mt-10">
                                    <label htmlFor="disable">
                                      <input
                                        type="radio"
                                        className="input-text"
                                        id="disable"
                                        name="status"
                                        value="disable"
                                        {...register("status")}
                                      />
                                      Disable
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="order__details-wrap mt-20">
                                <div className="">
                                  <h4>Applies to</h4>
                                  <div className="">
                                    <label htmlFor="all">
                                      <input
                                        type="radio"
                                        className="input-text"
                                        id="all"
                                        name="products"
                                        value="all"
                                        onClick={applies}
                                        {...register("appliesforall")}
                                        // onclick="javascript:showModal();"
                                      />
                                      All Products
                                    </label>
                                  </div>
                                  <div className="mt-10">
                                    <label htmlFor="specific">
                                      <input
                                        type="radio"
                                        className="input-text"
                                        id="specific"
                                        name="products"
                                        value="specific"
                                        {...register("appliesforall")}
                                        onClick={specific}
                                        // onclick="javascript:showModal();"
                                      />
                                      Specific products
                                    </label>

                                    {active &&
                                    Object.keys(selectedprod).length ? (
                                      <table className="table">
                                        <tbody>
                                          {Object.keys(selectedprod).length &&
                                            selectedprod.map((e) => {
                                              return (
                                                <tr key={e.productid.sku}>
                                                  <td>
                                                    <span className="admin-list-img">
                                                      <img
                                                        src={`/images/${e.productid.images}`}
                                                        alt="product-images"
                                                      />
                                                    </span>
                                                  </td>
                                                  <td>
                                                    <div className="">
                                                      <a href="edit-product.html">
                                                        <u>
                                                          {e.productid.name}
                                                        </u>
                                                      </a>
                                                    </div>
                                                  </td>
                                                  <td className="text-right">
                                                    <p href="#">
                                                      <u
                                                        id={e.productid.sku}
                                                        onClick={(e) =>
                                                          removeproduct(e)
                                                        }
                                                      >
                                                        Remove
                                                      </u>
                                                    </p>
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </table>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="mt-20 discount-period">
                                  <h4>Active Dates</h4>
                                  <div className="flex">
                                    <div className="w-50 pr-10">
                                      <label htmlFor="">Start Date</label>
                                      <input
                                        type="date"
                                        placeholder=""
                                        className=""
                                        {...register("startdate", {
                                          required: true,
                                        })}
                                      />
                                    </div>
                                    <div className="w-50 pl-10">
                                      <label htmlFor="">End Date</label>
                                      <input
                                        type="date"
                                        placeholder=""
                                        className=""
                                        {...register("enddate", {
                                          required: true,
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-20">
                              <button
                                type="submit"
                                className="button checkout_btn button--hollow"
                              >
                                Save
                              </button>
                              <Link to="/admindiscount">
                                <button className="button update_btn">
                                  Discard
                                </button>
                              </Link>
                            </div>
                          </form>
                        </div>
                        <div className="cart__details cart__block add-margin">
                          <div className="order__details-wrap">
                            <h3>Summary</h3>
                            <div className="border-t mt-10">
                              <div className="flex mt-20">
                                <p>
                                  <strong>Cart Offer</strong>
                                </p>

                                {expirycheck(
                                  discount.startdate,
                                  discount.enddate
                                ) === "Active" && (
                                  <span className="color-green">Active</span>
                                )}
                                {expirycheck(
                                  discount.startdate,
                                  discount.enddate
                                ) === "Expired" && (
                                  <span className="color-red">Expired</span>
                                )}
                                {expirycheck(
                                  discount.startdate,
                                  discount.enddate
                                ) === "Scheduled" && <span>Scheduled</span>}
                              </div>
                            </div>
                            <ul className="list-items">
                              <li>{discount.discountvalue} off products</li>
                              <li>
                                Active from {dateformat(discount.startdate)}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer bg-white">
            <div className="container-fluid">This is footer section</div>
          </footer>
          {/* {active && ( */}
          <div id="show-modal" style={{ display: table ? "flex" : "none" }}>
            <div className="overlay"></div>

            <div className="admin-right page-content">
              <div className="products-list">
                <div className="actions flex items-center">
                  <h3>Add products</h3>
                </div>
                <div className="added-products border-t">
                  <div className="overflow-auto">
                    <table className="table mt-20">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Inventory</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/*  */}
                        {Object.keys(product).length &&
                          product.map((e) => {
                            return (
                              <tr key={e.sku}>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="prod-item"
                                    value={e.sku}
                                    onChange={(e) => {
                                      selected(e);
                                    }}
                                    checked={
                                      allproducts.indexOf(e.sku) !== -1
                                        ? true
                                        : false
                                    }
                                  />
                                </td>
                                <td>
                                  <span className="admin-list-img">
                                    <img src={`/images/${e.images}`} alt="" />
                                  </span>
                                </td>
                                <td>
                                  <div className="">
                                    <a href="edit-product.html">
                                      <u>{e.name}</u>
                                    </a>
                                  </div>
                                  <span>
                                    SKU: <span>{e.sku}</span>
                                  </span>
                                </td>
                                <td>{e.price}</td>
                                <td>{e.inventory}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-20">
                  <button
                    onClick={(e) => addproductspecific()}
                    className="button checkout_btn button--hollow"
                  >
                    Add Products
                  </button>
                  <button
                    className="button update_btn"
                    id="close-modal"
                    type="submit"
                    onClick={close}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      )}
    </>
  );
};
