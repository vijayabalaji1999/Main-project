import React, { useContext, useEffect, useState } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { Link } from "react-router-dom";

export const Collection = () => {
  const [products, setproducts] = useState();
  const { getallproduct } = useContext(Usercontext);

  const getall = async () => {
    const allproducts = await getallproduct();
    setproducts(allproducts.allproduct);
  };

  useEffect(() => {
    getall();
  }, []);

  return (
    <div className="main-content">
      <section>
        <div className="container">
          <div className="product-collection page-content">
            <h2>Collections</h2>
            <div className="products-grid row">
              {products &&
                products.map((product) => {
                  return (
                    <div className="grid-item" key={btoa(product.sku)}>
                      <div className="product-item">
                        <div className="product-image">
                          <Link to={`/productdetail/${product.sku}`}>
                            <img
                              src={`/images/${product.images}`}
                              alt="productimage"
                            />
                          </Link>
                        </div>
                        <div className="product-content">
                          <Link to={`/productdetail/${product.sku}`}>
                            <h3>{product.name} </h3>
                          </Link>
                          <div className="price">
                            <div className="regular-price">
                              <span>
                                <span className="money">{product.price}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
