import React from "react";
import { Login } from "../component/User/login";
import { Authenticateduser } from "../context/User-context/Authenticated-user ";
import { Routes, Route } from "react-router";
import { Signup } from "../component/User/signup";
import { Header } from "../component/User/header";
import { Collection } from "../component/User/collection";
import { Productdetail } from "../component/User/productdetail";
import { Cart } from "../component/User/cart";
import { Checkout } from "../component/User/checkout";

export const Userroute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route
          path="/dashboard"
          element={<Authenticateduser component={Collection} />}
        />
        <Route
          path="/productdetail/:id"
          element={<Authenticateduser component={Productdetail} />}
        />
        <Route path="/cart" element={<Authenticateduser component={Cart} />} />
        <Route
          path="/checkout"
          element={<Authenticateduser component={Checkout} />}
        />
      </Routes>
    </>
  );
};
