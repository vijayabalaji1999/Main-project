export const Addproduct = () => {
  return (
    <div class="main-content">
      <header class="header bg-white" id="header">
        <div class="container-fluid">
          <div class="page-header">
            <div class="header-left">
              <div class="logo-image">
                <a href="../index.html">
                  <img
                    src="../images/wigo-logo-img.png"
                    width="70"
                    height="36"
                    alt="Wigo Store"
                    itemprop="logo"
                  />
                </a>
              </div>
              <div class="header-menu"></div>
            </div>
            <div class="header-right">
              <div class="header-items">
                <span class="sign-in">
                  <svg width="22px" height="22px" viewBox="-1 -1 21 20">
                    <g
                      transform="translate(0.968750, -0.031250)"
                      stroke="none"
                      stroke-width="1"
                      fill="currentColor"
                      fill-rule="nonzero"
                    >
                      <path d="M9,7.5 C10.704,7.5 12.086,6.157 12.086,4.5 C12.086,2.843 10.704,1.5 9,1.5 C7.296,1.5 5.914,2.843 5.914,4.5 C5.914,6.157 7.296,7.5 9,7.5 Z M9,9 C6.444,9 4.371,6.985 4.371,4.5 C4.371,2.015 6.444,0 9,0 C11.556,0 13.629,2.015 13.629,4.5 C13.629,6.985 11.556,9 9,9 Z M1.543,18 L0,18 L0,15 C0,12.377 2.187,10.25 4.886,10.25 L14.143,10.25 C16.273,10.25 18,11.929 18,14 L18,18 L16.457,18 L16.457,14 C16.457,12.757 15.421,11.75 14.143,11.75 L4.886,11.75 C3.04,11.75 1.543,13.205 1.543,15 L1.543,18 Z"></path>
                    </g>
                  </svg>
                  <div class="head-link bg-white">
                    <a class="main-menu-link" href="login.html">
                      Login
                    </a>
                    <a href="register.html">Register</a>
                  </div>
                </span>

                <span class="cart-link">
                  <a href="cart.html">
                    <svg width="24px" height="24px" viewBox="0 -2 37 35">
                      <g
                        transform="translate(0.500000, 0.500000)"
                        stroke="none"
                        fill="currentColor"
                        fill-rule="nonzero"
                      >
                        <path d="M0.2,11 L9.5,29 L26.4,29 L35.7,11 L0.2,11 Z M24.5,26 L11.5,26 L4.8,14 L31.2,14 L24.5,26 L24.5,26 Z M18.5,3 C22.7,3 25.5,6.3 25.5,8.5 L28.5,8.5 C28.5,4.5 24.2,0 18.5,0 C12.8,0 8.5,4.5 8.5,8.5 L11.5,8.5 C11.5,6.3 14.3,3 18.5,3 Z"></path>
                      </g>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="flex">
        <div class="container-fluid">
          <div class="admin-content">
            <div class="admin-left-nav mt-20">
              <ul>
                <li>
                  <a class="active" href="admin-collection.html">
                    Products
                  </a>
                </li>
                <li>
                  <a href="admin-orders.html">Orders</a>
                </li>
                <li>
                  <a href="discount.html">Discount</a>
                </li>
              </ul>
            </div>
            <div class="admin-right page-content">
              <div class="products-list">
                <div class="actions flex items-center">
                  <h3>Add Product</h3>
                  <a
                    href="link"
                    class="button button--hollow justify-end inline-block"
                  >
                    Save
                  </a>
                </div>
                <div class="edit-product">
                  <div class="flex">
                    <div class="product-lineitems form-section">
                      <form action="#">
                        <div class="form-control">
                          <label for="product-name">Product Name</label>
                          <input type="text" placeholder="" />
                        </div>
                        <div class="form-control">
                          <label for="sku">SKU</label>
                          <input type="text" placeholder="" />
                        </div>
                        <div class="flex">
                          <div class="form-control pr-10">
                            <label for="price">Price ($)</label>
                            <input type="text" placeholder="" />
                          </div>
                          <div class="form-control pl-10">
                            <label for="inventory">Inventory</label>
                            <input type="text" placeholder="" />
                          </div>
                        </div>
                        <div class="form-control">
                          <label for="status">Product Status</label>
                          <div class="mt-10">
                            <span class="pr-20">
                              <input type="radio" checked name="status" />{" "}
                              Active
                            </span>
                            <span>
                              <input type="radio" name="status" /> Inactive
                            </span>
                          </div>
                        </div>
                        <div class="form-control">
                          <label for="description">Description</label>
                          <textarea cols="5" rows="10"></textarea>
                        </div>
                        <a
                          href="admin-collection.html"
                          class="button button--hollow justify-end inline-block"
                        >
                          Save
                        </a>
                      </form>
                    </div>
                    <div class="product-imageitem">
                      <div id="wrapper">
                        <label for="description">Product Image</label>
                        <div class="mt-10">
                          <div class="drop-zone">
                            <span class="drop-zone__prompt">
                              Drop file here or click to upload
                            </span>
                            <input
                              type="file"
                              name="myFile"
                              class="drop-zone__input"
                            />
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

      {/* <footer class="footer bg-white">
			<div class="container-fluid">
				This is footer section
			</div>
		</footer> */}
    </div>
  );
};
