// // import { useParams } from "react-router";
// // import { useEffect, useState } from "react";
// // import { getoneproductadmin } from "../../context/Admin-context/apicallsadmin";
// // import { useDropzone } from "react-dropzone";
// // import { useForm } from "react-hook-form";
// // import { editproduct } from "../../context/Admin-context/apicallsadmin";
// // import { Header } from "../User/header";
// // import { useNavigate } from "react-router";
// // import { Link } from "react-router-dom";

// // export const Editproduct = () => {
// //   const { register, handleSubmit } = useForm();
// //   const [product, setproduct] = useState({});
// //   const [files, setFiles] = useState([]);
// //   const navigate = useNavigate();

// //   let { id } = useParams();

// //   // useEffect(() => {
// //   //   if (performance.navigation.type === 1) {
// //   //     console.log("This page is reloaded");
// //   //   } else {
// //   //     console.log("This page is not reloaded");
// //   //   }
// //   // });

// //   const oneproduct = async (id) => {
// //     const products = await getoneproductadmin(id);
// //     setproduct(products[0]);
// //   };

// //   useEffect(() => {
// //     oneproduct(id);
// //   }, []);

// //   ///////////
// //   const { getRootProps, getInputProps } = useDropzone({
// //     accept: "image/*",
// //     onDrop: (acceptedFiles) => {
// //       setFiles(
// //         acceptedFiles.map((file) =>
// //           Object.assign(file, {
// //             preview: URL.createObjectURL(file),
// //           })
// //         )
// //       );
// //     },
// //   });

// //   const images = files.map((file) => (
// //     <img key={file.name} src={file.preview} alt="preview" />
// //   ));

// //   const submithandle = async (data) => {
// //     data.price = `$${data.price}`;
// //     const added = await editproduct(data, files);
// //   };

// //   return (
// //     <>
// //       <Header />
// //       <div className="main-content">
// //         {Object.keys(product).length && (
// //           <section className="flex">
// //             <div className="container-fluid">
// //               <div className="admin-content">
// //                 <div className="admin-left-nav mt-20">
// //                   <ul>
// //                     <li>
// //                       <Link to="/admindashboard" className="active">
// //                         Products
// //                       </Link>
// //                     </li>
// //                     <li>
// //                       <a href="admin-orders.html">Orders</a>
// //                     </li>
// //                     <li>
// //                       <Link to="/admindiscount">Discount</Link>
// //                     </li>
// //                   </ul>
// //                 </div>
// //                 <div className="admin-right page-content">
// //                   <div className="products-list">
// //                     <div className="actions flex items-center">
// //                       <h3>{product.name}</h3>
// //                       {/* <a
// //                         href="admin-collection.html"
// //                         className="button button--hollow justify-end inline-block"
// //                       >
// //                         Update
// //                       </a> */}
// //                     </div>
// //                     <div className="edit-product">
// //                       <div className="flex">
// //                         <div className="product-lineitems form-section">
// //                           <form onSubmit={handleSubmit(submithandle)}>
// //                             <div className="form-control">
// //                               <label htmlFor="product-name">Product Name</label>
// //                               <input
// //                                 type="text"
// //                                 defaultValue={product.name}
// //                                 {...register("name", {
// //                                   required: true,
// //                                 })}
// //                               />
// //                             </div>
// //                             <div className="form-control">
// //                               <label htmlFor="sku">SKU</label>
// //                               <input
// //                                 type="text"
// //                                 defaultValue={product.sku}
// //                                 {...register("sku", {
// //                                   required: true,
// //                                 })}
// //                               />
// //                             </div>
// //                             <div className="flex">
// //                               <div className="form-control pr-10">
// //                                 <label htmlFor="price">Price ($)</label>
// //                                 <input
// //                                   type="text"
// //                                   defaultValue={Number(
// //                                     product.price.replace("$", "")
// //                                   )}
// //                                   {...register("price", {
// //                                     required: true,
// //                                   })}
// //                                 />
// //                               </div>
// //                               <div className="form-control pl-10">
// //                                 <label htmlFor="inventory">Inventory</label>
// //                                 <input
// //                                   type="text"
// //                                   defaultValue={product.inventory}
// //                                   {...register("inventory", {
// //                                     required: true,
// //                                   })}
// //                                 />
// //                               </div>
// //                             </div>
// //                             <div className="form-control">
// //                               <label htmlFor="status">Product Status</label>
// //                               <div className="mt-10">
// //                                 <span className="pr-20">
// //                                   <input
// //                                     type="radio"
// //                                     defaultChecked={
// //                                       product.status === "available"
// //                                         ? true
// //                                         : false
// //                                     }
// //                                     value="available"
// //                                     {...register("status")}
// //                                   />{" "}
// //                                   Active
// //                                 </span>
// //                                 <span>
// //                                   <input
// //                                     type="radio"
// //                                     defaultChecked={
// //                                       product.status === "available"
// //                                         ? false
// //                                         : true
// //                                     }
// //                                     value="unavailable"
// //                                     {...register("status")}
// //                                     //{...register("inactive")}
// //                                   />{" "}
// //                                   Inactive
// //                                 </span>
// //                               </div>
// //                             </div>
// //                             <div className="form-control">
// //                               <label htmlFor="description">Description</label>
// //                               <textarea
// //                                 cols="5"
// //                                 rows="10"
// //                                 defaultValue={product.description}
// //                                 {...register("description", {
// //                                   required: true,
// //                                 })}
// //                               />
// //                             </div>
// //                             <button
// //                               className="button button--hollow justify-end inline-block"
// //                               type="submit"
// //                             >
// //                               Update
// //                             </button>
// //                           </form>
// //                         </div>
// //                         <div className="product-imageitem">
// //                           <div id="wrapper">
// //                             <label htmlFor="description">Product Image</label>
// //                             <div className="mt-10" {...getRootProps()}>
// //                               <input {...getInputProps()} />
// //                               <div className="drop-zone">
// //                                 {images.length === 0 && (
// //                                   <span className="drop-zone__prompt">
// //                                     Drop file here or click to upload
// //                                   </span>
// //                                 )}
// //                                 {images.length !== 0 && (
// //                                   <div className="drop-zone__thumb1">
// //                                     {images}
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </section>
// //         )}
// //       </div>
// //     </>
// //   );
// // };
// /////////////////
// import { useParams } from "react-router";
// import { useEffect, useState } from "react";
// import { getoneproductadmin } from "../../context/Admin-context/apicallsadmin";
// import { useDropzone } from "react-dropzone";
// import { useForm } from "react-hook-form";
// import { editproduct } from "../../context/Admin-context/apicallsadmin";
// import { Header } from "../User/header";
// import { useNavigate } from "react-router";
// import { useRef } from "react";
// import { Link } from "react-router-dom";

// export const Editproduct = () => {
//   const { register, handleSubmit } = useForm();
//   const [product, setproduct] = useState({});
//   const [files, setFiles] = useState([]);
//   const navigate = useNavigate();

//   let { id } = useParams();

//   const oneproduct = async (id) => {
//     const products = await getoneproductadmin(id);
//     setproduct(products[0]);
//   };

//   useEffect(() => {
//     oneproduct(id);
//   }, []);

//   ///////////
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       );
//     },
//   });

//   const images = files.map((file) => (
//     <img key={file.name} src={file.preview} alt="preview" />
//   ));

//   const [radio, setradio] = useState(false);
//   const available = (e) => {
//     setradio(e.target.value);
//   };
//   // console.log(radio);

//   const name = useRef();
//   const sku = useRef();
//   const price = useRef();
//   const inventory = useRef();
//   const description = useRef();
//   // const radio = useRef();

//   const submithandle = async (e) => {
//     const product = {};
//     product.name = name.current.value;
//     product.sku = sku.current.value;
//     product.price = price.current.value;
//     product.inventory = inventory.current.value;
//     product.description = description.current.value;
//     product.status = radio;

//     const result = await editproduct(product, files);
//     return;
//   };

//   return (
//     <>
//       <Header />
//       <div className="main-content">
//         {Object.keys(product).length && (
//           <section className="flex">
//             <div className="container-fluid">
//               <div className="admin-content">
//                 <div className="admin-left-nav mt-20">
//                   <ul>
//                     {" "}
//                     <li>
//                       <Link to="/admindashboard" className="active">
//                         Products
//                       </Link>
//                     </li>
//                     <li>
//                       <a href="admin-orders.html">Orders</a>
//                     </li>
//                     <li>
//                       <Link to="/admindiscount">Discount</Link>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="admin-right page-content">
//                   <div className="products-list">
//                     <div className="actions flex items-center">
//                       <h3>{product.name}</h3>
//                       <button
//                         className="button button--hollow justify-end inline-block"
//                         onClick={submithandle}
//                       >
//                         Update
//                       </button>
//                     </div>
//                     <div className="edit-product">
//                       <div className="flex">
//                         <div className="product-lineitems form-section">
//                           <form onSubmit={handleSubmit(submithandle)}>
//                             <div className="form-control">
//                               <label htmlFor="product-name">Product Name</label>
//                               <input
//                                 type="text"
//                                 defaultValue={product.name}
//                                 ref={name}
//                               />
//                             </div>
//                             <div className="form-control">
//                               <label htmlFor="sku">SKU</label>
//                               <input
//                                 type="text"
//                                 defaultValue={product.sku}
//                                 ref={sku}
//                               />
//                             </div>
//                             <div className="flex">
//                               <div className="form-control pr-10">
//                                 <label htmlFor="price">Price ($)</label>
//                                 <input
//                                   type="text"
//                                   defaultValue={product.price}
//                                   ref={price}
//                                 />
//                               </div>
//                               <div className="form-control pl-10">
//                                 <label htmlFor="inventory">Inventory</label>
//                                 <input
//                                   type="text"
//                                   defaultValue={product.inventory}
//                                   ref={inventory}
//                                 />
//                               </div>
//                             </div>
//                             <div className="form-control">
//                               <label htmlFor="status">Product Status</label>
//                               <div
//                                 className="mt-10"
//                                 onChange={(e) => {
//                                   available(e);
//                                 }}
//                               >
//                                 <span className="pr-20">
//                                   <input
//                                     type="radio"
//                                     value="available"
//                                     name="radAnswer"
//                                     checked={
//                                       product.status === "available"
//                                         ? true
//                                         : false
//                                     }

//                                     //////working in radio
//                                   />{" "}
//                                   Active
//                                 </span>
//                                 <span>
//                                   <input
//                                     type="radio"
//                                     value="unavailable"
//                                     name="radAnswer"
//                                     checked={
//                                       product.status === "unavailable"
//                                         ? true
//                                         : false
//                                     }

//                                     // value="unavailable"
//                                     // {...register("status")}
//                                   />{" "}
//                                   Inactive
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="form-control">
//                               <label htmlFor="description">Description</label>
//                               <textarea
//                                 cols="5"
//                                 rows="10"
//                                 defaultValue={product.description}
//                                 ref={description}
//                               />
//                             </div>
//                             <button
//                               className="button button--hollow justify-end inline-block"
//                               onClick={submithandle}
//                             >
//                               Update
//                             </button>
//                           </form>
//                         </div>
//                         <div className="product-imageitem">
//                           <div id="wrapper">
//                             <label htmlFor="description">Product Image</label>
//                             <div className="mt-10" {...getRootProps()}>
//                               <input {...getInputProps()} />
//                               <div className="drop-zone">
//                                 {/* {images.length === 0 && (
//                                   <span className="drop-zone__prompt">
//                                     Drop file here or click to upload
//                                   </span>
//                                 )} */}
//                                 {images.length !== 0 ? (
//                                   <div className="drop-zone__thumb1">
//                                     {images}
//                                   </div>
//                                 ) : (
//                                   <img
//                                     src={`/images/${product.images}`}
//                                     alt="preview"
//                                     style={{ width: 476, height: 317 }}
//                                   />
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}
//       </div>
//     </>
//   );
// };
/////////////////////////////////
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getoneproductadmin } from "../../context/Admin-context/apicallsadmin";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { editproduct } from "../../context/Admin-context/apicallsadmin";
import { Header } from "../User/header";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Editproduct = () => {
  const toastList = new Set();
  const MAX_TOAST = 1;

  const { register, handleSubmit } = useForm();
  const [product, setproduct] = useState({});
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  let { id } = useParams();

  // useEffect(() => {
  //   if (performance.navigation.type === 1) {
  //     console.log("This page is reloaded");
  //   } else {
  //     console.log("This page is not reloaded");
  //   }
  // });

  const oneproduct = async (id) => {
    const products = await getoneproductadmin(id);
    setproduct(products[0]);
  };

  useEffect(() => {
    oneproduct(id);
  }, []);

  ///////////
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
    data._id = product._id;
    const added = await editproduct(data, files);
    if (added.status === "success") {
      if (toastList.size < MAX_TOAST) {
        const id = toast.success("Product-Updated", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            toastList.delete(id);
            navigate("/admindashboard");
          },
        });
        toastList.add(id);
      }
    } else {
      if (toastList.size < MAX_TOAST) {
        const id = toast.error("SKU Already exist", {
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
        {Object.keys(product).length && (
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
                      <h3>{product.name}</h3>
                      {/* <a
                        href="admin-collection.html"
                        className="button button--hollow justify-end inline-block"
                      >
                        Update
                      </a> */}
                    </div>
                    <div className="edit-product">
                      <div className="flex">
                        <div className="product-lineitems form-section">
                          <form onSubmit={handleSubmit(submithandle)}>
                            <div className="form-control">
                              <label htmlFor="product-name">Product Name</label>
                              <input
                                type="text"
                                defaultValue={product.name}
                                {...register("name", {
                                  required: true,
                                })}
                              />
                            </div>
                            <div className="form-control">
                              <label htmlFor="sku">SKU</label>
                              <input
                                type="text"
                                defaultValue={product.sku}
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
                                  defaultValue={Number(
                                    product.price.replace("$", "")
                                  )}
                                  {...register("price", {
                                    required: true,
                                  })}
                                />
                              </div>
                              <div className="form-control pl-10">
                                <label htmlFor="inventory">Inventory</label>
                                <input
                                  type="text"
                                  defaultValue={product.inventory}
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
                                    defaultChecked={
                                      product.status === "available"
                                        ? true
                                        : false
                                    }
                                    value="available"
                                    {...register("status")}
                                  />{" "}
                                  Active
                                </span>
                                <span>
                                  <input
                                    type="radio"
                                    defaultChecked={
                                      product.status === "available"
                                        ? false
                                        : true
                                    }
                                    value="unavailable"
                                    {...register("status")}
                                    //{...register("inactive")}
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
                                defaultValue={product.description}
                                {...register("description", {
                                  required: true,
                                })}
                              />
                            </div>
                            <button
                              className="button button--hollow justify-end inline-block"
                              type="submit"
                            >
                              Update
                            </button>
                          </form>
                        </div>
                        <div className="product-imageitem">
                          <div id="wrapper">
                            <label htmlFor="description">Product Image</label>
                            <div className="mt-10" {...getRootProps()}>
                              <input {...getInputProps()} />
                              <div className="drop-zone">
                                {/* {images.length === 0 && (
                                  // <span className="drop-zone__prompt">
                                  //   Drop file here or click to upload
                                  // </span>
                                )} */}
                                {images.length !== 0 ? (
                                  <div className="drop-zone__thumb1">
                                    {images}
                                  </div>
                                ) : (
                                  <img
                                    src={`/images/${product.images}`}
                                    alt="preview"
                                    style={{ width: 476, height: 317 }}
                                  />
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
        )}
      </div>
    </>
  );
};
///////////////
// import { useParams } from "react-router";
// import { useEffect, useState } from "react";
// import { getoneproductadmin } from "../../context/Admin-context/apicallsadmin";
// import { useDropzone } from "react-dropzone";
// import { useForm } from "react-hook-form";
// import { editproduct } from "../../context/Admin-context/apicallsadmin";
// import { Header } from "../User/header";
// import { useNavigate } from "react-router";
// import { useRef } from "react";
// import { Link } from "react-router-dom";

// export const Editproduct = () => {
//   const { register, handleSubmit } = useForm();
//   const [product, setproduct] = useState({});
//   const [files, setFiles] = useState([]);
//   const navigate = useNavigate();
//   const inputfile = useRef();

//   let { id } = useParams();

//   const oneproduct = async (id) => {
//     const products = await getoneproductadmin(id);
//     setproduct(products[0]);
//   };

//   useEffect(() => {
//     oneproduct(id);
//   }, []);

//   ///////////

//   const [radio, setradio] = useState(false);
//   const available = (e) => {
//     setradio(e.target.value);
//   };
//   // console.log(radio);

//   const name = useRef();
//   const sku = useRef();
//   const price = useRef();
//   const inventory = useRef();
//   const description = useRef();
//   // const radio = useRef();

//   const submithandle = async (e) => {
//     const product = {};
//     product.name = name.current.value;
//     product.sku = sku.current.value;
//     product.price = price.current.value;
//     product.inventory = inventory.current.value;
//     product.description = description.current.value;
//     product.status = radio;

//     console.log(files);

//     const result = await editproduct(product, files);
//   };

//   const handleFileSelected = (e) => {
//     const files = Array.from(e.target.files);
//     // let formData = new FormData();
//     // formData.append("images", files[0], files.name);
//     setFiles(files);
//   };

//   return (
//     <>
//       <Header />
//       <div className="main-content">
//         {Object.keys(product).length && (
//           <section className="flex">
//             <div className="container-fluid">
//               <div className="admin-content">
//                 <div className="admin-left-nav mt-20">
//                   <ul>
//                     {" "}
//                     <li>
//                       <Link to="/admindashboard" className="active">
//                         Products
//                       </Link>
//                     </li>
//                     <li>
//                       <a href="admin-orders.html">Orders</a>
//                     </li>
//                     <li>
//                       <Link to="/admindiscount">Discount</Link>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="admin-right page-content">
//                   <div className="products-list">
//                     <div className="actions flex items-center">
//                       <h3>{product.name}</h3>
//                       <button
//                         className="button button--hollow justify-end inline-block"
//                         onClick={submithandle}
//                       >
//                         Update
//                       </button>
//                     </div>
//                     <div className="edit-product">
//                       <div className="flex">
//                         <div className="product-lineitems form-section">
//                           <form onSubmit={handleSubmit(submithandle)}>
//                             <div className="form-control">
//                               <label htmlFor="product-name">Product Name</label>
//                               <input
//                                 type="text"
//                                 defaultValue={product.name}
//                                 ref={name}
//                               />
//                             </div>
//                             <div className="form-control">
//                               <label htmlFor="sku">SKU</label>
//                               <input
//                                 type="text"
//                                 defaultValue={product.sku}
//                                 ref={sku}
//                               />
//                             </div>
//                             <div className="flex">
//                               <div className="form-control pr-10">
//                                 <label htmlFor="price">Price ($)</label>
//                                 <input
//                                   type="text"
//                                   defaultValue={product.price}
//                                   ref={price}
//                                 />
//                               </div>
//                               <div className="form-control pl-10">
//                                 <label htmlFor="inventory">Inventory</label>
//                                 <input
//                                   type="text"
//                                   defaultValue={product.inventory}
//                                   ref={inventory}
//                                 />
//                               </div>
//                             </div>
//                             <div className="form-control">
//                               <label htmlFor="status">Product Status</label>
//                               <div
//                                 className="mt-10"
//                                 onChange={(e) => {
//                                   available(e);
//                                 }}
//                               >
//                                 <span className="pr-20">
//                                   <input
//                                     type="radio"
//                                     value="available"
//                                     name="radAnswer"
//                                     checked={
//                                       product.status === "available"
//                                         ? true
//                                         : false
//                                     }

//                                     //////working in radio
//                                   />{" "}
//                                   Active
//                                 </span>
//                                 <span>
//                                   <input
//                                     type="radio"
//                                     value="unavailable"
//                                     name="radAnswer"
//                                     checked={
//                                       product.status === "unavailable"
//                                         ? true
//                                         : false
//                                     }

//                                     // value="unavailable"
//                                     // {...register("status")}
//                                   />{" "}
//                                   Inactive
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="form-control">
//                               <label htmlFor="description">Description</label>
//                               <textarea
//                                 cols="5"
//                                 rows="10"
//                                 defaultValue={product.description}
//                                 ref={description}
//                               />
//                             </div>
//                             <button
//                               className="button button--hollow justify-end inline-block"
//                               onClick={submithandle}
//                             >
//                               Update
//                             </button>
//                           </form>
//                         </div>
//                         <div class="product-imageitem">
//                           <div id="wrapper">
//                             <label htmlFor="description">Product Image</label>
//                             <div class="mt-10">
//                               <div>
//                                 <label htmlFor="files" class="drop-zone">
//                                   Drop file here or click to upload
//                                   <input
//                                     type="file"
//                                     name="myFile"
//                                     id="files"
//                                     class="drop-zone__input"
//                                     accept=".gif,.jpg,.jpeg,.png,.doc,.docx"
//                                     onChange={handleFileSelected}
//                                     //  style={{ display: "none" }}
//                                   />
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}
//       </div>
//     </>
//   );
// };
