import React from "react";
import { Collection } from "../../component/User/collection";
import { Navigate } from "react-router";
import { useContext } from "react";
import { Usercontext } from "./Authcontext";

export const Authenticatedadmin = ({ component: ReactComponent }) => {
  const { values } = useContext(Usercontext);

  if (values && values.user.role) {
    const role = values.user.role;
    if (role && role === "admin") {
      return <ReactComponent />;
    }
  }
  return <Navigate to="/" />;
};
