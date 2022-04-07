import React from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { useContext } from "react";
import { Usercontext } from "../User-context/Authcontext";
import { Loading } from "../../component/User/loading";

export const Authenticatedadmin = ({ component: ReactComponent }) => {
  const navigate = useNavigate();
  const { values } = useContext(Usercontext);
  const { loading } = useContext(Usercontext);
  // if (values && values.user.role) {
  //   const role = values.user.role;
  //   if (role && role === "admin") {
  //     return <ReactComponent />;
  //   }
  // }

  setTimeout(function () {
    if (values && !values.user) {
      return navigate("/");
    }
  }, 4000);
  console.log(values);

  if (loading) {
    return <Loading />;
  } else if (values && values.user.role === "admin") {
    return <ReactComponent />;
  } else {
    return <Navigate to="/" />;
  }
};
