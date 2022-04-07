import { Loading } from "./loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  increment,
  removeallcart,
  status,
  decrement,
} from "../../context/User-context/discountcalculate";
import { useContext } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { setdiscount } from "../../context/User-context/helper";
import { orderdetail } from "../../context/User-context/discountcalculate";
import { Header } from "./header";
import { orderconfirmApi } from "../../context/User-context/discountcalculate";
import ReactDOMServer from "react-dom/server";
import { Reactcom } from "./email";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";

export const Inventory = () => {
  const navigate = useNavigate();
  let { orderid } = useParams();
  const { values } = useContext(Usercontext);
  const [load, setload] = useState(true);

  const removeall = async () => {
    const data = await removeallcart(values.user._id);
    const data1 = await setdiscount(values.user._id);
    const statusupdate = await status(orderid);
    const order = await orderdetail(orderid);
    const discount = order.orderdetails[0].discountcode;
    if (discount) {
      const increment1 = await increment(discount);
    }
    const datadecre = await Promise.all(
      order.orderdetails[0].products.map(async (e) => {
        const contents = await decrement(e.productid, e.quantity);
      })
    );

    setload(false);

    const messageHtml = ReactDOMServer.renderToString(
      <Reactcom order={order.orderdetails[0]}></Reactcom>
    );
    const renders = await orderconfirmApi(messageHtml, values.user.email);

    // navigate(`/userordersucess/${orderid}`);
  };

  console.log(load);

  useEffect(() => {
    removeall();
  }, []);

  if (load) {
    return <Loading />;
  } else {
    return <Navigate to={`/userordersucess/${orderid}`} />;
  }
};
