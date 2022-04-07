import React from "react";
import { Login } from "../component/User/login";
import { Authenticateduser } from "../context/User-context/Authenticated-user ";
import { Routes, Route } from "react-router";
import { Signup } from "../component/User/signup";
import { Collection } from "../component/User/collection";
import { Productdetail } from "../component/User/productdetail";
import { Cart } from "../component/User/cart";
import { Checkout } from "../component/User/checkout";
import { Ordersucess } from "../component/User/ordersuccess";
import { Orderdetail } from "../component/User/orderdetail";
import { Myorders } from "../component/User/orders";
import { Welcome } from "../component/User/welcome";
import { Inventory } from "../component/User/inventory";

export const Userroute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route
          path="/userdashboard"
          element={<Authenticateduser component={Collection} />}
        />
        <Route
          path="/userproductdetail/:id"
          element={<Authenticateduser component={Productdetail} />}
        />
        <Route
          path="/usercart"
          element={<Authenticateduser component={Cart} />}
        />
        <Route
          path="/usercheckout/:orderid"
          element={<Authenticateduser component={Checkout} />}
        />
        <Route
          path="/inventoryreduce/:orderid"
          element={<Authenticateduser component={Inventory} />}
        />
        <Route
          path="/userordersucess/:orderid"
          element={<Authenticateduser component={Ordersucess} />}
        />
        <Route
          path="/userorderdetail/:orderid"
          element={<Authenticateduser component={Orderdetail} />}
        />
        <Route
          path="/usermyorders"
          element={<Authenticateduser component={Myorders} />}
        />
        <Route
          path="/usertest"
          element={<Authenticateduser component={Welcome} />}
        />
      </Routes>
    </>
  );
};
