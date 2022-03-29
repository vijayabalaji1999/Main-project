const url = "http://localhost:3001/api/user";

export const setdiscount = async (userid, code) => {
  const updated = await fetch(`${url}/setdiscount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userid: userid,
      discountcode: code,
    }),
  });
  const data = await updated.json();
  return data;
};

export const getdiscount = async (code) => {
  const result = await fetch(`${url}/getdiscount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      discountcode: code,
    }),
  });
  const data = await result.json();
  return data;
};

export const handleChangehelp = (qua, id, cart) => {
  let updatedproduct = cart.filter((e) => {
    if (e.productid._id === id) {
      e.quantity = Number(qua.target.value);
    }
    return true;
  });
  return updatedproduct;
};
