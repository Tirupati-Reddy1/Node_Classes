const express = require("express");
const app = express();
app.use(express.json());
const fs=require("fs");

const userNameValidator = (req, res, next) => {
  try {
    let userName = req.body.username;
    let userRegex = /^[a-zA-Z0-9_]{3,15}$/;
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
  try{let email = req.body.email;
    emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      res.status(400).send("email should not be empty");
    } else {
      if (emailRegex.test(email)) {
        next();
      } else {
        res.status(400).send("email format is wrong...!");
      }
    }}
    catch(err){
        if(err){
            res.send("error at email module")
        }
    }
};

checkingUser=(req,res,next)=>{
  let {username,password,email}=req.body;
  existingData=JSON.parse(fs.readFileSync("./user.json","utf8"));
  let result=existingData.some((x,y)=>{
    return x.username==username && x.password==password && x.email==email;
  });
  if(!result){
    existingData=JSON.parse(fs.readFileSync("./user.json","utf8"));
    newData={username,email,password}=req.body;
    existingData.push(newData)
    fs.writeFileSync("./user.json",JSON.stringify(existingData))
    res.status(200).send("You are registered successfully")
  }
else{
  
res.status("200").send("Login SUccessfull")
}

}
app.post(
  "/data",
  userNameValidator,
  passwardValidator,
  emailValidator,checkingUser,
  (req, res) => {
    res.send("data updated successfully");
  }
);

app.listen(3000, () => {
  console.log("server runni ng on piort number 3100");
});
