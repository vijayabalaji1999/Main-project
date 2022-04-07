import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getoneproductadmin } from "../../context/Admin-context/apicallsadmin";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { addproduct } from "../../context/Admin-context/apicallsadmin";
import { Header } from "../User/header";
import { Link } from "react-router-dom";
import { toast ,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

export const Addproduct = () => {
  const navigate = useNavigate();
  const toastList = new Set();
  const MAX_TOAST = 1;
  const { register, handleSubmit, reset } = useForm();
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const images = files.map((file) => (
    <img key={file.name} src={file.preview} alt="preview" />
  ));

  const submithandle = async (data) => {
    data.price = `$${data.price}`;

    if (files.length === 0) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.info("Please add a Product Image", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
    } else {
      const added = await addproduct(data, files);
      if (added.status === "success") {
        if (toastList.size < MAX_TOAST) {
          const id = toast.success("Product Added", {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => {
              toastList.delete(id);
              // navigate("/admindashboard");
            },
          });
          toastList.add(id);
        }
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
                    <h3>Add Product</h3>
                    <button
                      type="submit"
                      className="button button--hollow justify-end inline-block"
                    >
                      Save
                    </button>
                  </div>
                  <div className="edit-product">
                    <div className="flex">
                      <div className="product-lineitems form-section">
                        <form onSubmit={handleSubmit(submithandle)}>
                          <div className="form-control">
                            <label htmlFor="product-name">Product Name</label>
                            <input
                              type="text"
                              placeholder=""
                              {...register("name", {
                                required: true,
                              })}
                            />
                          </div>
                          <div className="form-control">
                            <label htmlFor="sku">SKU</label>
                            <input
                              type="text"
                              placeholder=""
                              {...register("sku", {
                                required: true,
                              })}
                            />
                          </div>
                          <div className="flex">
                            <div className="form-control pr-10">
                              <label htmlFor="price">Price ($)</label>
                              <input
                                type="text"
                                placeholder=""
                                {...register("price", {
                                  required: true,
                                })}
                              />
                            </div>
                            <div className="form-control pl-10">
                              <label htmlFor="inventory">Inventory</label>
                              <input
                                type="text"
                                placeholder=""
                                {...register("inventory", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>
                          <div className="form-control">
                            <label htmlFor="status">Product Status</label>
                            <div className="mt-10">
                              <span className="pr-20">
                                <input
                                  type="radio"
                                  value="available"
                                  {...register("status")}
                                />{" "}
                                Active
                              </span>
                              <span>
                                <input
                                  type="radio"
                                  value="unavailable"
                                  {...register("status")}
                                />{" "}
                                Inactive
                              </span>
                            </div>
                          </div>
                          <div className="form-control">
                            <label htmlFor="description">Description</label>
                            <textarea
                              cols="5"
                              rows="10"
                              {...register("description", {
                                required: true,
                              })}
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            className="button button--hollow justify-end inline-block"
                          >
                            Save
                          </button>
                        </form>
                      </div>
                      <div className="product-imageitem">
                        <div id="wrapper">
                          <label htmlFor="description">Product Image</label>
                          <div className="mt-10" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="drop-zone">
                              {images.length === 0 && (
                                <span className="drop-zone__prompt">
                                  Drop file here or click to upload
                                </span>
                              )}
                              {images.length !== 0 && (
                                <div className="drop-zone__thumb1">
                                  {images}
                                </div>
                              )}
                            </div>
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
    </>
  );
};
