import { Header } from "../User/header";
import { getallproductadmin } from "../../context/Admin-context/apicallsadmin";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const Admindashboard = () => {
  const toastList = new Set();
  const MAX_TOAST = 1;

  const [num, setnum] = useState(false);
  const [product, setproduct] = useState({});
  const [languages, setLanguages] = useState();
  const [check, setcheck] = useState(false);
  const [sku, setsku] = useState();
  const navigate = useNavigate();

  const allproduct = async () => {
    const products = await getallproductadmin();
    setproduct(products);
  };

  useEffect(() => {
    allproduct();
  }, []);

  const handleCheckboxChecked = (event, sku, i) => {
    console.log(languages, "inside");
    if (languages !== i) {
      setLanguages(i);
      setcheck(true);
      setsku(sku);
      setnum(true);
    } else if (languages === i) {
      setLanguages(undefined);
      setcheck(false);
      setnum(false);
      setsku(undefined);
    }
  };

  const editproduct = () => {
    if (sku) {
      navigate(`/adminproductdetail/${sku}`);
    } else {
      if (toastList.size < MAX_TOAST) {
        const id = toast.info("please select a product", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
    }
  };

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
                    <Link to="/admindashboard" className="active">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/adminorders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/admindiscount">Discount</Link>
                  </li>
                </ul>
              </div>
              <div className="admin-right page-content">
                <div className="products-list">
                  <div className="actions flex items-center">
                    <h3>Products</h3>
                    <Link
                      to="/adminaddproduct"
                      className="button button--hollow justify-end inline-block"
                    >
                      Add Product
                    </Link>
                  </div>
                  <div className="actions flex items-center flex-start">
                    <span>
                      <span id="count">{num ? 1 : 0}</span> selected
                    </span>
                    <button
                      // href="edit-product.html"
                      onClick={editproduct}
                      className="white-btn items-center"
                    >
                      Edit Products
                    </button>
                  </div>
                  <div className="added-products">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>SKU</th>
                          <th>Price</th>
                          <th>Inventory</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(product).length &&
                          product.map((e, i) => {
                            return (
                              <React.Fragment key={e.sku}>
                                <tr>
                                  <td>
                                    <input
                                      type="checkbox"
                                      name="prod-item"
                                      onChange={(event) =>
                                        handleCheckboxChecked(event, e._id, i)
                                      }
                                      checked={
                                        check && languages === i ? true : false
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
                                      <Link to={`/adminproductdetail/${e._id}`}>
                                        <u>{e.name}</u>
                                      </Link>
                                    </div>
                                  </td>
                                  <td>{e.sku}</td>
                                  <td>{e.price}</td>
                                  <td>{e.inventory}</td>
                                  {e.status === "available" && (
                                    <td className="color-green">Active</td>
                                  )}
                                  {e.status === "unavailable" && (
                                    <td className="color-red">Inactive</td>
                                  )}
                                </tr>
                              </React.Fragment>
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
