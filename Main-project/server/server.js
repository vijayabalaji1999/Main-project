const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userroute = require("./router/userroute");
const globalErrorHandler = require("./controller/errorController");
const adminrouter = require("./router/adminroute");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const session = require("express-session");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    // methods: ["GET", "POST"],
    // credentials: true,
  })
);
// app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config({ path: "./config.env" });

// app.use(
//   session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 90,
//     },
//   })
// );

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

app.use("/images", express.static(`../react-app/public`));

app.use("/api/user", userroute);

// app.get("/user/login", (req, res) => {
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

app.use("/api/admin", adminrouter);

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

app.use(globalErrorHandler);
