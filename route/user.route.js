const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { name, password, email, age } = req.body;
  try {
     const isEmail = await UserModel.findOne({ email });
     if(isEmail){
       res.status(400).send({ msg: "User is already registered" });
     }
      const hashed = await bcrypt.hash(password, 5) 
      const user = new UserModel({ name, email, password: hashed, age });
      await user.save();
      res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ err: "something went wrong" });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "login successful",
            token: jwt.sign({"userID":user._id}, "superman", {
              expiresIn: "1h",
            }),
          });
        } else {
          res.status(400).send({ msg: "wrong credential" });
        }
      });
    } else {
      res.status(400).send({ err: "user not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});


module.exports = {
  userRoute,
};
