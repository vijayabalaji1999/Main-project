import axios from "axios";
const url = "http://localhost:3001/api/admin";

// let formData = new FormData();

export const getallproductadmin = async () => {
  const result = await fetch(`${url}/getallproductsadmin`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data.products;
};

export const getoneproductadmin = async (sku) => {
  const result = await fetch(`${url}/getoneproductadmin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sku: sku,
    }),
  });
  const data = await result.json();
  return data.product;
};

export const getoneproductsku = async (sku) => {
  const result = await fetch(`${url}/getoneproductsku`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sku: sku,
    }),
  });
  const data = await result.json();
  return data.product;
};

export const addproduct = async (product, file1) => {
  let formData = new FormData();

  formData.append("name", product.name);
  formData.append("sku", product.sku);
  formData.append("price", product.price);
  formData.append("inventory", product.inventory);
  formData.append("images", file1[0], file1.name);
  formData.append("status", product.status);
  formData.append("description", product.description);

  // // formData.append("File", file);
  const result = await fetch(`${url}/addproduct`, {
    method: "POST",
    // mode: "no-cors",
    // credentials: "include",
    // headers: {
    //   "Content-Type":
    //     "multipart/form-data; boundary=<calculated when request is sent>",
    // },
    body: formData,
  });
  const data = await result.json();
  return data;
};

export const editproduct = async (product, file1) => {
  let formData1 = new FormData();
  formData1.append("name", product.name);
  formData1.append("sku", product.sku);
  formData1.append("_id", product._id);
  formData1.append("price", product.price);
  formData1.append("inventory", product.inventory);
  if (file1.length !== 0) {
    formData1.append("images", file1[0], file1.name);
  }

  formData1.append("status", product.status);
  formData1.append("description", product.description);

  // // formData.append("File", file);

  const result = await fetch(`${url}/editproduct`, {
    method: "POST",
    body: formData1,

    // mode: "no-cors",

    // headers: {
    //   "Content-Type":
    //     "multipart/form-data; boundary=<calculated when request is sent>",
    // },
  });

  const data = await result.json();
  return data;
  // const config = {
  //   headers: {
  //     "Content-Type":
  //       "multipart/form-data; boundary=<calculated when request is sent>",
  //   },
  // };

  // axios
  //   .post(`${url}/editproduct`, formData1, config)
  //   .then((response) => {
  //     alert("The file is successfully uploaded");
  //   })
  //   .catch((error) => {});
};

export const getalldiscountadmin = async () => {
  const result = await fetch(`${url}/getalldiscount`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data.discounts;
};

export const adddiscountadmin = async (data1) => {
  const result = await fetch(`${url}/addDiscount`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: data1,
    }),
  });
  const data = await result.json();
  return data;
};

export const getonediscountadmin = async (code) => {
  const result = await fetch(`${url}/getonediscount`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code,
    }),
  });
  const data = await result.json();
  return data.discount;
};

export const editdiscountadmin = async (data1) => {
  const result = await fetch(`${url}/editdiscount`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: data1,
    }),
  });
  const data = await result.json();
  console.log(data);
  return data;
};

export const getallOrdersadmin = async () => {
  const result = await fetch(`${url}/getallorders`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data.orders;
};

export const getorderdetail = async (orderid) => {
  const result = await fetch(`${url}/getorderdetail`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderid: orderid,
    }),
  });
  const data = await result.json();
  return data.orders;
};

export const numberoforders = async (userid) => {
  const result = await fetch(`${url}/numberoforders`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userid: userid,
    }),
  });

  const data = await result.json();
  return data.number;
};
