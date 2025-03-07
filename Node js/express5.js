const express = require("express");
const app = express();
app.use(express.json())
const usernameValidator = (req, res, next) => {
  let UserName = req.body.username;
  var userRegex = /^[a-zA-Z0-9_]{3,15}$/;
  if (UserName.length <= 0) {
    res.status(400).send("Username should not be empty");
  } else {
    if (userRegex.test(UserName)) {
      next();
    } else {
      res.status(400).send("Username format is wrong");
    }
  }
};
const PasswordValidator = (req, res, next) => {
  const Passw =req.body.password;
  const passregex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
  if (Passw.length <= 0) {
    res.status(400).send("Password length is not in proper format");
  } else {
    if (passregex.test(Passw)) {
      next();
    } else {
      res.status(400), send("Pasword format is wrong");
    }
  }
};
app.post(
  "/data",
  usernameValidator,
  PasswordValidator((req, res) => {
    res.status(200).send("Regestered successfully");
  })
);

app.listen("4131", () => {
  console.log("running bro ");
});
