import React, { useContext } from "react";
import { Addproduct } from "../component/Admin/addProduct";
import { Authenticatedadmin } from "../context/Admin-context/Authenticated-admin";
import { Usercontext } from "../context/User-context/Authcontext";
import { Routes, Route } from "react-router";
import { Header } from "../component/User/header";

export const Userroute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/addproduct"
          element={<Authenticatedadmin component={Addproduct} />}
        />
      </Routes>
    </>
  );
};
