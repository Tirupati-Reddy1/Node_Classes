const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs").promises;
const bcrypt = require("bcrypt");


const userNameValidator = (req, res, next) => {
  try {
    let userName = req.body.username;
    let userRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{3,15}$/;
    if (!userName) {
      res.status(400).send("Username length should not be emplty");
    } else {
      if (userRegex.test(userName)) {
        next();
      } else {
        res.status(400).send("User name format is wrong");
      }
    }
  } catch (err) {
    if (err) {
      res.send("error at username module");
    }
  }
};

const passwardValidator = (req, res, next) => {
  try {
    let Passw = req.body.password;
    let passRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;

    if (!Passw) {
      res.status(400).send("Password should not be empty");
    } else {
      if (passRegex.test(Passw)) {
        next();
      } else {
        res.status(400).send("your password format is wrong");
      }
    }
  } catch (err) {
    if (err) {
      res.send("error at password module");
    }
  }
};

const emailValidator = (req, res, next) => {
  try {
    let email = req.body.email;
    emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      res.status(400).send("email should not be empty");
    } else {
      if (emailRegex.test(email)) {
        next();
      } else {
        res.status(400).send("email format is wrong...!");
      }
    }
  } catch (err) {
    if (err) {
      res.send("error at email module");
    }
  }
};

const checkingUser = async (req, res, next) => {
  try {
      let { username, password, email } = req.body;
      const existingData = JSON.parse(await fs.readFile("./user.json", "utf8"));

      const user = existingData.find((x) => x.username === username);

      if (user) {
          const pwValid = await bcrypt.compare(password, user.password);

          if (pwValid && user.email === email) {
              return res.status(200).send("Login Successful");
          } else {
              return res.status(400).json({ message: "Invalid credentials" });
          }
      } else {
          return res.status(400).send("You dont have an account... Please Register");
      }
  } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal server error" });
  }
};

app.post("/signup",userNameValidator,
  passwardValidator,
  emailValidator, async (req, res) => {
  let { username, email, password } = req.body;

  let encryptedPw = await bcrypt.hash(password, 10)
    existingData = JSON.parse(await fs.readFile("./user.json", "utf8"));
    let result=existingData.find((x)=>{
      return x.username==username && x.email==email
    })
    if(!result){

      let newData = { "username": username, "password": encryptedPw, "email": email };
    existingData.push(newData);
    await fs.writeFile("./user.json", JSON.stringify(existingData));
    res.status(200).send("You are registered successfully");
    }
    else{
      res.status(400).send("Accont Already Exists.... please login")
    }
    
});
app.post(
  "/login",
  userNameValidator,
  passwardValidator,
  emailValidator,
  checkingUser,
  (req, res) => {
    res.send("data updated successfully");
  }
);

app.listen(3009, () => {
  console.log("server runni ng on piort number 3009");
});
