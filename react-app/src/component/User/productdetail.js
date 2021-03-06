import { useParams } from "react-router";
import { Usercontext } from "../../context/User-context/Authcontext";
import { useContext, useState, useEffect } from "react";
import { useRef } from "react";
import { Header } from "./header";
import { toast, ToastContainer } from "react-toastify";

export const Productdetail = () => {
  const toastList = new Set();
  const MAX_TOAST = 1;

  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const { values } = useContext(Usercontext);
  const { addtocart } = useContext(Usercontext);
  const userid = values.user._id;
  const { getproductdetail } = useContext(Usercontext);
  let { id } = useParams();
  const quantity = useRef();
  const [products, setproducts] = useState();

  const getdetail = async (id) => {
    const productdetail = await getproductdetail(id);
    setproducts(productdetail.productdetail[0]);
  };

  const handleclick = async () => {
    setloading(true);
    const data = await addtocart(
      userid,
      products._id,
      quantity.current.value,
      "add"
    );
    setloading(false);
    if (data.code) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.error(data.status, {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
    } else if (data) {
      if (toastList.size < MAX_TOAST) {
        const id = toast.success("Product Added", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });

        toastList.add(id);
      }
    }
  };

  useEffect(() => {
    getdetail(id);
  }, []);

  if (!products) return "";

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="main-content">
        <section>
          <div className="container">
            <div className="product-template page-content">
              <h2>Product Details</h2>
              <div className="product-details row">
                <div className="product-wrap">
                  <div className="product-single">
                    <div className="product-media">
                      <a href="#">
                        <img
                          src={`/images/${products.images}`}
                          key={btoa(products.sku)}
                          alt="hi"
                        />
                      </a>
                    </div>
                    <div className="product-info">
                      <div className="right-side">
                        <span className="product-sku">SKU: {products.sku}</span>
                        <h3 className="product-title main-title">
                          {products.name}
                        </h3>
                        <div className="price">
                          <div className="regular-price">
                            <span>
                              <span
                                className="money"
                                data-currency-usd="$200.00"
                              >
                                {products.price}
                              </span>
                            </span>
                          </div>
                        </div>
                        {products.inventory > 0 ? (
                          <div className="line-item-quantity">
                            <span className="line-item__quantity-text">
                              Quantity:
                            </span>
                            <input
                              type="number"
                              name=""
                              size="4"
                              id=""
                              defaultValue="1"
                              ref={quantity}
                            />
                          </div>
                        ) : (
                          console.log("")
                        )}
                        <div className="product-add">
                          {products.inventory > 0 ? (
                            <button
                              className="button button--alt"
                              name="add"
                              id="add"
                              type="submit"
                              onClick={handleclick}
                              disabled={loading ? true : false}
                            >
                              {loading ? "Adding..." : "Add to Bag"}
                            </button>
                          ) : (
                            <p
                              className="error-msg"
                              name="add"
                              id="add"
                              disabled={true}
                            >
                              Out Of Stock
                            </p>
                          )}
                        </div>
                        {/* {added && (
                          <div className="success-msg">Product Added</div>
                        )}
                        {visible && <div className="error-msg">{error}</div>} */}
                      </div>
                    </div>
                  </div>
                  <div className="desc-wrap">
                    <h4>Description</h4>
                    <div className="detail-desc">
                      <p>{products.description}</p>
                      <p>
                        <strong>Composition & Washing</strong>
                      </p>
                      <p>
                        Jersey fabric: 100% cotton; woven fabric: 100%
                        polyester, exclusive of embroideries. Wash by hand in
                        water. Do not bleach. Iron at max. 110 ??C using a damp
                        cloth between the iron and the fabric. Do not dry clean.
                        Do not tumble dry. Flat drying in the shade.
                      </p>
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
