const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");


const register = async (req, res) => {
  const data = req.body;
  const salt = await bcrypt.genSalt(5);

  const newUser = new userModel({
    userName: data.userName,
    email: data.email,
    password: await bcrypt.hash(data.password, salt),
  });

  try {
    //findOne to check if a user with the same userName exists
  const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      console.log("User already exists!");
      return res.status(400).json({ message: "Account exist with same email" });
    }
    // If no existing user is found, save the new user
    await newUser.save();

    console.log("User created successfully!");
    res.status(201).json({message: "new user created"});
  } 
  catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
  
    const user = await userModel.findOne({email: data.email});

    if (!user) { 
      console.log("user not found"); 
      return res.status(400).json({ message: "incorrect username or password" });}

    const pass_matched = await bcrypt.compare(data.password, user.password);

    if (pass_matched) {
      const token = jwt.sign(
        { 
          email: user.email,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET_KEY 
      );
      const userData = {...user._doc};
      delete userData.password;
      return res.status(201).json({ message: "successfully logged in", token: token , userData});
    } 
    else {
      return res.status(400).json({ message: "incorrect username or password" });
    }
  } 
  catch (err) {
    console.log("following error occured", err);
    res.status(501).json({ message: "internal server error" });
  }
};


module.exports = {
  register,
  login,
};
