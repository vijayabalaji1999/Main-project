import React, { useState } from "react";
import { Collection } from "../../component/User/collection";
import { Navigate } from "react-router";
import { useContext, useEffect } from "react";
import { Usercontext } from "./Authcontext";
import Axios from "axios";
import { Signup } from "../../component/User/signup";

export const Authenticateduser = ({ component: ReactComponent }) => {
  const { values } = useContext(Usercontext);
  // const [role, setRole] = useState("");
  // const [loading, setLoading] = useState(false);

  // Axios.defaults.withCredentials = true;

  // // const api = async () => {
  // //   const result = await fetch("http://localhost:3001/user/login", {
  // //     method: "GET",
  // //     headers: {
  // //       "Content-Type": "application/json",
  // //       // authorization: `Bearer ${cookies}`,
  // //     },
  // //   });
  // // };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/user/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setRole(response.data.user.role);
  //       setLoading(true);
  //     }
  //   });
  // }, []);

  if (values && values.user.role) {
    const role = values.user.role;
    if (role && role === "user") {
      return <ReactComponent />;
    }
  }
  // if (role && role === "user" && loading) {
  //   return <ReactComponent />;
  // }
  // if (!loading) {
  //   return <Signup />;
  // } else {
  //   return <ReactComponent />;
  // }

  return <Navigate to="/" />;
};
