const url = "http://localhost:3001/api/user";

export const loginAPI = async (email, password) => {
  const result = await fetch(`${url}/login`, {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await result.json();
  // localStorage.setItem("userid", data.user._id);
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
    method: "DELETE",
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

// export const getCookie = (login) => {
//   // Construct a RegExp object as to include the variable name
//   const re = new RegExp(`(?<=${login}=)[^;]*`);
//   try {
//     return document.cookie.match(re)[0]; // Will raise TypeError if cookie is not found
//   } catch {
//     return "this-cookie-doesn't-exist";
//   }
// };
