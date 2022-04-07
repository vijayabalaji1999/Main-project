import { useEffect } from "react";
// import Axios from "axios";

const url = "http://localhost:3001/api/user";

export const loginAPI = async (email, password) => {
  const result = await fetch(`${url}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      // message: message,
    }),
  });
  const data = await result.json();
  return data;
};

export const signupAPI = async (email, password, passwordConfirm) => {
  const result = await fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    }),
  });

  const data = await result.json();
  return data;
};

export const collectionApi = async () => {
  // const cookies = getCookie("login");
  const result = await fetch(`${url}/getallproduct`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${cookies}`,
    },
  });
  const data = await result.json();
  return data;
};

export const getproductdetailApi = async (id) => {
  const result = await fetch(`${url}/productdetail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  const data = await result.json();
  return data;
};

export const addtocartApi = async (userid, productid, quantity, role) => {
  const result = await fetch(`${url}/addtocart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: userid,
      productid: productid,
      quantity: quantity,
      role: role,
    }),
  });
  const data = await result.json();
  return data;
};

export const getcartApi = async (userid) => {
  const result = await fetch(`${url}/getcart`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: userid,
    }),
  });
  const data = await result.json();
  return data;
};

export const deleteitemcartApi = async (userid, productid) => {
  const result = await fetch(`${url}/deleteitemcart`, {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: userid,
      productid: productid,
    }),
  });
  const data = await result.json();
  return data;
};

export const stripesessionApi = async (lineitem, order) => {
  const result = await fetch(`${url}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lineitem,
      order,
    }),
  });
  const data = await result.json();
  return data;
};

// Axios.defaults.withCredentials = true;

export const getsessionApi = async () => {
  const result = await fetch("http://localhost:3001/user/login", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data;
};
// export const getsessionApi = async () => {
//   Axios.get("http://localhost:3001/user/login").then((response) => {
//     if (response.data.loggedIn === true) {
//       // setRole(response.data.user.role);
//       // setLoading(true);
//     }
//     console.log(response);
//   });
// };

// Axios.get("http://localhost:3001/user/login").then((response) => {
//   console.log(response);
//   if (response.data.loggedIn === true) {
//     setRole(response.data.user.role);
//     setLoading(true);
//   }
// });

export const logoutApi = async () => {
  const result = await fetch(`${url}/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const data = await result.json();
  // return data;
};
