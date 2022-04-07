export const Welcome = ({ name }) => {
  const names = name;
  console.log(names);
  return (
    <>
      <p>
        <img
          src="https://cdn.shopify.com/s/files/1/0480/0751/2215/files/wigo-logo-img_70x.png?v=1631849444"
          alt="Wigo"
          style={{ background: "#c5c7d6", color: "#c5c7d6" }}
        />
      </p>
      <br></br>

      <h1 className="h1">Welcome To Wigo Family</h1>
      <br></br>
      <div className="input">
        <h1>{names}</h1>
      </div>
      <br></br>
    </>
  );
};
