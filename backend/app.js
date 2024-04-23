const express = require("express");
const connectionDB = require("./db/dbConnection");
const User = require("./model/userSchema");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const UserExists = await User.findOne({ email: email });

    if (!UserExists) {
      await User.create({ username, email, password });
      res.status(201).json({ message: "Signup successful!" });
    } else {
      res.json({ message: "User already exist with this email" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const UserExists = await User.findOne({ username: username });

    if (UserExists && UserExists.password === password) {
      res.json({ message: "Login successful!" });
    } else {
      res.json({ message: "Invalid Username or password" });
    }
  } catch (error) {
    console.log(error);
  }
});

connectionDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
