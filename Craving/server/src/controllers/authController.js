import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const UserRegister = async (req,res ,next) => {
  try {
    const { fullName, email, mobileNumber, password } = req.body;

    if (!fullName || !email || !mobileNumber || !password) {
      const error = new error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    // console.log({ fullName, email, mobileNumber, password } );
    
    //check for duplicate user before registration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new error("Email already registered");
      error.statusCode = 409;
      console.log(email);
      return next(error);
    }

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //save data to database
    const newUser = await User.create({
      fullName,
      email,
      mobileNumber,
      password: hashPassword,
    });

    //send response to frontend
    console.log(newUser);
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    next(error);
  }
};

export const UserLogin = async (res, req, next) => {
  try {
    //fetch data from frontend
    const { email, password } = req.body;

    //verify that all data exist
    if (!email || !password) {
      const error = new error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    //check for if user is registred or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new error("Email not registered");
      error.statusCode = 402;
      return next(error);
    }

    //verify password
    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new error("Password didn't match");
      error.statusCode = 402;
      return next(error);
    }

    //send message to frontend
    res.status(200).json({ message: "Login Successfull", data: existingUser });
  } catch (error) {
    next(error);
  }
};

export const UserLogout = async (res, req, next) => {
  try {
    res.status(200).json({ message: "Logout Successfull", data: existingUser });
  } catch (error) {
    next(error);
  }
};
