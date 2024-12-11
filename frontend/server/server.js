import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./db.js";

import User from "./Schema/userSchema.js";

connectDB();

//rest object 
const server = express();
//middlewares
server.use(cors()); // this enables server to accept data from any port
server.use(express.json()); // basically it enables json type of data being shared btw frontend and backend
server.use(morgan("dev"));
 
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

const formatDatatoSend = (user) => {
  const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return {
    access_token: access_token,
    hospitalname: user.hospitalname,
    email: user.email,
    address: user.address,
    phone: user.phone,
    username: user.username,
  };
};

const generateUserName = async (email) => {
  let username = email.split("@")[0];

  let isUserNameExists = await User.exists({
    username: username,
  }).then((result) => result);

  isUserNameExists ? (username += nanoid().substring(0, 5)) : "";

  return username;
};

server.post("/register", async(req, res) => {
  let { hospitalname, address, phone, email, password } = req.body;

  if (!email.length) {
    return res.status(403).json({ error: "Email is required" });
  }

  if (!emailRegex.test(email)) {
    // cheecking whether email follows a acertain pattern or not
    return res.status(403).json({ error: "Invalid Email Address" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with 1 numeric,1 lowercase and 1 uppercase letters",
    });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let username = await generateUserName(email);

    let user = new User({
      hospitalname,
      email,
      address,
      phone,
      password: hashed_password,
      username,
    });

    await user
      .save()
      .then((u) => {
        return res.status(200).json(formatDatatoSend(u));
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res.status(403).json({ error: "Email or phone already exists" });
        }
        console.log("there is error");
        return res.status(500).json({ error: err.message });
      });

      //console.log(user);
  });
});

server.post("/login",async(req,res)=>{
     
  let {email , password }= req.body;

  await User.findOne({ "email": email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "email does not exist" });
      }

      
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error has occured please login again" });
          }

          if (!result) {
            return res.status(403).json({ error: "Incorrect password" });
          } else {
            return res.status(200).json(formatDatatoSend(user));
          }
        });
      
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
});


//port
const PORT = process.env.PORT || 8000;

//listen
server.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} Mode on port ${process.env.PORT}`
      .bgBlue.white
  );
});
