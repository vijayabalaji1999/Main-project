import React, { useState } from "react";
import { Collection } from "../../component/User/collection";
import { Navigate } from "react-router";
import { useContext, useEffect } from "react";
import { Usercontext } from "./Authcontext";
import Axios from "axios";
import { Signup } from "../../component/User/signup";
import { Login } from "../../component/User/login";
import { Loading } from "../../component/User/loading";
import { useNavigate } from "react-router";

export const Authenticateduser = ({ component: ReactComponent }) => {
  const navigate = useNavigate();
  const { values } = useContext(Usercontext);
  const { loading } = useContext(Usercontext);
  const { setlogged } = useContext(Usercontext);
  // const [role, setRole] = useState("");
  // const [loading, setLoading] = useState(false);

  // Axios.defaults.withCredentials = true;

  // const api = async () => {
  //   const result = await fetch("http://localhost:3001/user/login", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // authorization: `Bearer ${cookies}`,
  //     },
  //   });
  // };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/user/login").then((response) => {
  //     console.log(response);
  //     if (response.data.loggedIn === true) {
  //       setRole(response.data.user.role);
  //       setLoading(true);
  //     }
  //   });
  // }, []);

  // if (values && values.user.role) {
  //   const role = values.user.role;
  //   if (role && role === "user") {
  //     return <ReactComponent />;
  //   }
  // }
  // if (values && values.user.role && loading) {
  //   return <ReactComponent />;
  // }

  setTimeout(function () {
    if (values && !values.user) {
      setlogged(false);
      return navigate("/");
    }
  }, 4000);

  if (loading) {
    return <Loading />;
  } else if (values && values.user.role === "user") {
    return <ReactComponent />;
  } else {
    setlogged(false);
    return <Navigate to="/" />;
  }

  // return <Navigate to="/" />;
};
