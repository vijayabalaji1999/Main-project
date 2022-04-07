import { setdiscount } from "./helper";
import { getdiscount } from "./helper";

const url = "http://localhost:3001/api/user";

export const discountcal = async (code, card, userid) => {
  const data = await getdiscount(code);

  if (data.code) {
    card.error = data.status;
    return card;
  }

  const discount = data.discount[0];
  const product = card.product;
  const value = parseInt(discount.discountvalue);
  const expired =
    discount.enddate >= new Date().toISOString() &&
    discount.status === "enable";
  const scheduled = discount.startdate <= new Date().toISOString();

  if (!expired || !scheduled) {
    if (!expired) {
      card.product.error = "Card expired please try another coupon";
    } else {
      card.product.error = "Card is in scheduled please try again later";
    }

    const data = await setdiscount(card.user._id);

    let totalprice = 0;
    let quantity = 0;
    card.product.forEach((e) => {
      const amount = parseFloat(
        Number(e.productid.price.replace("$", ""))
      ).toFixed(2);
      const price = e.quantity * amount;
      e.productid.fullprice = `$${price}`;
      totalprice += price;
      quantity += e.quantity;
      card.product.totalprice = totalprice;
      card.product.quantity = quantity;
    });
    return card.product;
  }

  if (expired && discount.appliesforall) {
    let totalprice = 0;
    let discounttotalprice = 0;
    let discounttotal = 0;
    let quantity = 0;

    product.forEach((e) => {
      const prices = Number(e.productid.price.replace("$", ""));
      const price = e.quantity * prices;
      e.productid.fullprice = `$${price}`;
      e.productid.discountprice = `$${parseFloat(
        price - price * (value / 100)
      ).toFixed(2)}`;
      e.productid.discount = `$${parseFloat(price * (value / 100)).toFixed(2)}`;
      discounttotalprice += price - price * (value / 100);
      discounttotal += price * (value / 100);
      totalprice += price;
      quantity += e.quantity;
    });

    product.totalprice = totalprice;
    product.discounttotalprice = parseFloat(discounttotalprice).toFixed(2);
    product.discounttotal = parseFloat(discounttotal).toFixed(2);
    product.code = code;
    product.quantity = quantity;

    const data = await setdiscount(card.user._id, code);
    return product;
  } else if (expired && !discount.appliesforall) {
    let totalprice = 0;
    let discounttotalprice = 0;
    let discounttotal = 0;
    let quantity = 0;
    let coupon;

    const discountproduct = discount.product;

    let result = product.forEach((o1, i) => {
      // discountproduct.some((o2) => o1.productid._id === o2.productid._id)
      discountproduct.forEach((o2) => {
        if (o1.productid._id === o2.productid._id) {
          const prices = Number(o1.productid.price.replace("$", ""));
          const price = o1.quantity * prices;
          o1.productid.fullprice = `$${price}`;
          o1.productid.discountprice = `$${price - price * (value / 100)}`;
          o1.productid.discount = `$${price * (value / 100)}`;
          const discountprices = Number(
            o1.productid.discountprice.replace("$", "")
          );
          const discount = Number(o1.productid.discount.replace("$", ""));

          discounttotalprice += discountprices;
          discounttotal += discount;
          coupon = true;
        }
      });
      const prices = Number(o1.productid.price.replace("$", ""));
      const price = o1.quantity * prices;
      o1.productid.fullprice = `$${price}`;
      console.log("hi");
      totalprice += Number(o1.productid.price.replace("$", "") * o1.quantity);
      quantity += o1.quantity;
      console.log(quantity);
      product.quantity = quantity;
      product.totalprice = totalprice;
      product.discounttotalprice = totalprice - discounttotal;
      product.discounttotal = discounttotal;
      product.code = code;
    });
    console.log(product);

    if (!coupon) {
      console.log(card.product);
      card.product.error =
        "No product are valid for this coupon please try nother product";
      const data = await setdiscount(userid);
      return card.product;
    }

    const data = await setdiscount(card.user._id, code);

    return product;
  }
};

export const order = async (
  cart,
  contact,
  shipping,
  total,
  quantity,
  userid,
  discountotal,
  discount
) => {
  console.log(discount);
  const result = await fetch(`${url}/addorder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: userid,
      products: cart,
      totalprice: total,
      totalquantity: quantity,
      contact: contact,
      shipping: shipping,
      totaldiscount: discountotal,
      discountcode: discount,
    }),
  });
  const data = await result.json();
  return data.orderno;
};

export const orderdetail = async (orderid) => {
  const result = await fetch(`${url}/findorder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderid: orderid,
    }),
  });
  const data = await result.json();
  return data;
};

export const allorders = async (userid) => {
  const result = await fetch(`${url}/myorders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userid: userid,
    }),
  });
  const data = await result.json();
  return data;
};

export const removeallcart = async (userid) => {
  const result = await fetch(`${url}/removecart`, {
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

export const increment = async (code) => {
  const result = await fetch(`${url}/increment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code,
    }),
  });
  const data = await result.json();
  return data;
};

export const status = async (order) => {
  const result = await fetch(`${url}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order: order,
    }),
  });
  const data = await result.json();
  return data;
};

export const decrement = async (sku, quantity) => {
  const result = await fetch(`${url}/decrement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sku: sku,
      quantity: quantity,
    }),
  });
  const data = await result.json();
  return data;
};

export const orderconfirmApi = async (message, to) => {
  const result = await fetch(`${url}/orderconfirmationmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      to: to,
    }),
  });
  console.log(result);
  return result;
};

export const welcome = async (message, to) => {
  const result = await fetch(`${url}/welcome`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      to: to,
    }),
  });
  // const data = await result.json();
  // return data;
};
