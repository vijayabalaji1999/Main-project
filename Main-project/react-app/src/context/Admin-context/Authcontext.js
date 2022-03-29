import React, { useState } from "react";

export const Admincontext = React.createContext({
  values: [],
});

export const Authcontextprovideradmin = (props) => {
  const [data, setdata] = useState();

  return (
    <Admincontext.Provider
      value={{
        values: data,
      }}
    >
      {props.children}
    </Admincontext.Provider>
  );
};
