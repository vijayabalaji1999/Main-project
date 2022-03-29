import React, { useContext, useEffect, useRef, useState } from "react";
import { Usercontext } from "../../context/User-context/Authcontext";

export const Login = () => {
  const [error, seterror] = useState();
  const { login } = useContext(Usercontext);
  const { setlogged } = useContext(Usercontext);
  const email = useRef();
  const password = useRef();
  // const notify = () => toast("Wow so easy!");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setlogged(false);
  }, []);

  const controller = async (e) => {
    e.preventDefault();
    const data = await login(email.current.value, password.current.value);
    if (data) {
      seterror(data.status);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  };

  return (
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
        {visible && <div className="error-msg">{error}</div>}
      </div>
    </section>
  );
};
