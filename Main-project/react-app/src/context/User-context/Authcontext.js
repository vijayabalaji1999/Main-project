import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  addtocartApi,
  deleteitemcartApi,
  getproductdetailApi,
  loginAPI,
} from "./apicalls";
import { signupAPI } from "./apicalls";
import { collectionApi } from "./apicalls";
import { getcartApi } from "./apicalls";

export const Usercontext = React.createContext({
  values: [],
  login: () => {},
  signup: () => {},
  loading: undefined,
  getallproduct: () => {},
  logged: undefined,
  addtocart: () => {},
  getallcart: () => {},
  deleteitemcart: () => {},
});

export const Authcontextprovider = (props) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(false);
  const [logged, setlogged] = useState(false);
  const navigate = useNavigate();

  const loginDetials = async (email, password) => {
    setloading(true);
    const data = await loginAPI(email, password);
    if (!data.code) {
      setdata(data);
      navigate("/dashboard");
      setlogged(true);
    }
    setloading(false);
    if (data.code) return data;
  };

  const signupDetials = async (email, password, passwordConfirm) => {
    setloading(true);
    const data = await signupAPI(email, password, passwordConfirm);
    if (!data.code) {
      setdata(data);
      navigate("/dashboard");
      setlogged(true);
    }
    setloading(false);
    if (data.code) return data;
  };

  const getallproduct = async () => {
    setloading(true);
    const data = await collectionApi();
    if (!data.code) {
      setlogged(true);
    }
    setloading(false);
    if (data) return data;
  };

  const getproductdetail = async (id) => {
    setloading(true);
    const data = await getproductdetailApi(id);
    if (!data.code) {
      setlogged(true);
    }
    setloading(false);
    if (data) return data;
  };

  const addtocart = async (userid, productid, quantity, role) => {
    setloading(true);
    const data = await addtocartApi(userid, productid, quantity, role);
    if (!data.code) {
      setlogged(true);
    }
    setloading(false);
    if (data) return data;
  };

  const getallcart = async (userid) => {
    setloading(true);
    const data = await getcartApi(userid);
    if (!data.code) {
      setlogged(true);
    }
    setloading(false);
    if (data) return data;
  };

  const deleteitemcart = async (userid, productid) => {
    setloading(true);
    const data = await deleteitemcartApi(userid, productid);
    if (!data.code) {
      setlogged(true);
    }
    setloading(false);
    if (data) return data;
  };

  return (
    <Usercontext.Provider
      value={{
        values: data,
        login: loginDetials,
        signup: signupDetials,
        setlogged: setlogged,
        getallproduct: getallproduct,
        getproductdetail: getproductdetail,
        logged: logged,
        addtocart: addtocart,
        getallcart: getallcart,
        deleteitemcart: deleteitemcart,
      }}
    >
      {props.children}
    </Usercontext.Provider>
  );
};
