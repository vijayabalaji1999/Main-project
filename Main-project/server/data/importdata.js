const User = require("../model/schema");
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const users = JSON.parse(fs.readFileSync("./user.json", "utf-8"));
dotenv.config({ path: "../config.env" });

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.create(users);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
console.log(process.argv[2]);

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
