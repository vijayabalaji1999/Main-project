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
  const expired = discount.enddate >= new Date().toISOString();

  if (!expired) {
    card.product.error = "Card expired please try another coupon";
    const data = await setdiscount(card.user._id);

    let totalprice = 0;
    let quantity = 0;
    card.product.forEach((e) => {
      const amount = Number(e.productid.price.replace("$", ""));
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
      e.productid.dicountprice = `$${price - price * (value / 100)}`;
      e.productid.discount = `$${price * (value / 100)}`;
      discounttotalprice += price - price * (value / 100);
      discounttotal += price * (value / 100);
      totalprice += price;
      quantity += e.quantity;
    });

    product.totalprice = totalprice;
    product.discounttotalprice = discounttotalprice;
    product.discounttotal = discounttotal;
    product.code = code;
    product.quantity = quantity;

    const data = await setdiscount(card.user._id, code);
    return product;
  } else if (expired && !discount.appliesforall) {
    let totalprice = 0;
    let discounttotalprice = 0;
    let discounttotal = 0;
    let quantity = 0;

    const discountproduct = discount.product;

    let result = product.filter((o1) =>
      discountproduct.some((o2) => o1.productid._id === o2.productid._id)
    );

    if (result.length === 0) {
      card.product.error =
        "No product are valid for this coupon please try nother product";
      const data = await setdiscount(userid);
      return card.product;
    }

    result.forEach((e) => {
      const prices = Number(e.productid.price.replace("$", ""));
      const price = e.quantity * prices;
      e.productid.fullprice = `${price}`;
      e.productid.discountprice = `${price - price * (value / 100)}`;
      e.productid.discount = `${price * (value / 100)}`;
    });

    product.forEach((e1) => {
      result.forEach((e2) => {
        if (e1.productid._id === e2.productid._id) {
          e1.productid.fullprice = `$${e2.productid.fullprice}`;
          e1.productid.discountprice = `$${e2.productid.discountprice}`;
          e1.productid.discount = `$${e2.productid.discount}`;
        }
      });
    });

    product.forEach((e) => {
      const prices = Number(e.productid.price.replace("$", ""));
      const price = e.quantity * prices;
      if (!e.productid.fullprice) e.productid.fullprice = `$${price}`;
      if (e.productid.discountprice && e.productid.discount) {
        const discountprices = Number(
          e.productid.discountprice.replace("$", "")
        );
        const discount = Number(e.productid.discount.replace("$", ""));

        discounttotalprice += discountprices;
        discounttotal += discount;
      }
      totalprice += price;
      quantity += e.quantity;
    });
    product.quantity = quantity;
    product.totalprice = totalprice;
    product.discounttotalprice = totalprice - discounttotal;
    product.discounttotal = discounttotal;
    product.code = code;

    const data = await setdiscount(card.user._id, code);

    return product;
  }
};
