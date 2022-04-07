import React, { useContext, useEffect, useRef, useState } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { Header } from "./header";

import { toast, ToastContainer } from "react-toastify";
import { logoutApi } from "../../context/User-context/apicalls";

// import { renderToString } from "react-dom/server";

export const Login = () => {
  const toastList = new Set();
  const MAX_TOAST = 1;

  const [error, seterror] = useState();
  const { login } = useContext(Usercontext);
  const { setlogged } = useContext(Usercontext);
  const email = useRef();
  const password = useRef();
  // const notify = () => toast("Wow so easy!");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setlogged(false);
    logoutApi();
  }, []);

  // console.log(renderToString(<Reactcom></Reactcom>));

  // console.log(messageHtml, "===============================");

  const controller = async (e) => {
    e.preventDefault();
    const data = await login(email.current.value, password.current.value);
    if (data) {
      console.log(data, "==================");
      if (toastList.size < MAX_TOAST) {
        const id = toast.error(data.status, {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <section>
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={controller}>
            <h1>Login</h1>
            <div className="form-control">
              <label htmlFor="name">Email Address</label>
              <input type="email" placeholder="" ref={email} required />
            </div>
            <div className="form-control">
              <label htmlFor="name">Enter Password</label>
              <input type="password" placeholder="" ref={password} required />
            </div>
            <button className="button button--hollow justify-end inline-block">
              Login
            </button>
          </form>
          {/* {visible && <div className="error-msg">{error}</div>} */}
        </div>
      </section>
    </>
  );
};
