import React, { useRef, useContext, useEffect, useState } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";

export const Signup = () => {
  const { signup } = useContext(Usercontext);
  const { setlogged } = useContext(Usercontext);
  const [error, seterror] = useState();
  const email = useRef();
  const passsword = useRef();
  const passwordConfirm = useRef();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setlogged(false);
  }, []);

  const controller = async (e) => {
    e.preventDefault();
    const data = await signup(
      email.current.value,
      passsword.current.value,
      passwordConfirm.current.value
    );

    if (data) {
      seterror(data.status);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  };

  return (
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
              <input type="password" ref={passsword} placeholder="" required />
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
          {visible && <div className="error-msg">{error}</div>}
        </div>
      </section>
    </div>
  );
};
