import React, { useContext } from "react";
import { Addproduct } from "../component/Admin/addProduct";
import { Authenticatedadmin } from "../context/Admin-context/Authenticated-admin";
import { Usercontext } from "../context/User-context/Authcontext";
import { Routes, Route } from "react-router";
import { Admindashboard } from "../component/Admin/adminDashboard";
import { Editproduct } from "../component/Admin/editproduct";
import { Discount } from "../component/Admin/discount";
import { Adddiscount } from "../component/Admin/adddiscount";
import { Editdiscount } from "../component/Admin/editdiscount";
import { Orders } from "../component/Admin/orders";
import { Orderdetail } from "../component/Admin/orderdetail";

export const Adminroute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admindashboard"
          element={<Authenticatedadmin component={Admindashboard} />}
          exact
        />
        <Route
          path="/addproduct"
          element={<Authenticatedadmin component={Addproduct} />}
        />
        <Route
          path="/adminproductdetail/:id"
          element={<Authenticatedadmin component={Editproduct} />}
        />
        <Route
          path="/adminaddproduct"
          element={<Authenticatedadmin component={Addproduct} />}
        />
        <Route
          path="/admindiscount"
          element={<Authenticatedadmin component={Discount} />}
        />
        <Route
          path="/adminadddiscount"
          element={<Authenticatedadmin component={Adddiscount} />}
        />

        <Route
          path="/admindiscountedit/:id"
          element={<Authenticatedadmin component={Editdiscount} />}
        />

        <Route
          path="/adminorders"
          element={<Authenticatedadmin component={Orders} />}
        />
        <Route
          path="/adminorderdetail/:orderid"
          element={<Authenticatedadmin component={Orderdetail} />}
        />
      </Routes>
    </>
  );
};
