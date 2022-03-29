import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Userroute } from "./routes/userroute";
import { Authcontextprovider } from "./context/User-context/Authcontext";
import "./css/style.css";

function App() {
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <Authcontextprovider>
        <Userroute />
      </Authcontextprovider>
    </BrowserRouter>
  );
}

export default App;
