import React, { useRef, useContext, useEffect, useState } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";
import { Header } from "./header";
import { toast, ToastContainer } from "react-toastify";
import { logoutApi } from "../../context/User-context/apicalls";

export const Signup = () => {
  const toastList = new Set();
  const MAX_TOAST = 1;

  const { signup } = useContext(Usercontext);
  const { setlogged } = useContext(Usercontext);
  const email = useRef();
  const passsword = useRef();
  const passwordConfirm = useRef();

  useEffect(() => {
    setlogged(false);
    logoutApi();
  }, []);

  const controller = async (e) => {
    e.preventDefault();
    const data = await signup(
      email.current.value,
      passsword.current.value,
      passwordConfirm.current.value
    );

    if (data) {
      if (data.status === "Invalid input data.") {
        if (toastList.size < MAX_TOAST) {
          const id = toast.error("Password and Confirm password are not same", {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => toastList.delete(id),
          });
          toastList.add(id);
        }
      }
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
      <div className="main-content">
        <section>
          <div className="form-container sign-up-container">
            <form action="#" onSubmit={controller}>
              <h1>Create Account</h1>
              <div className="form-control">
                <label htmlFor="name">Email Address</label>
                <input type="email" placeholder="" ref={email} required />
              </div>
              <div className="form-control">
                <label htmlFor="name">Enter Password</label>
                <input
                  type="password"
                  ref={passsword}
                  placeholder=""
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="name">Confirm Password</label>
                <input
                  type="password"
                  ref={passwordConfirm}
                  placeholder=""
                  required
                />
              </div>
              <button className="button checkout_btn button--hollow">
                Sign Up
              </button>
            </form>
            {/* {visible && <div className="error-msg">{error}</div>} */}
          </div>
        </section>
      </div>
    </>
  );
};
