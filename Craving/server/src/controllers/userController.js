import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";

export const UserUpdate = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber } = req.body;
    const currentUser = req.user;

    if (!fullName || !email || !mobileNumber) {
      const error = new Error("All Field Required");
      error.statusCode = 400;
      return next(error);
    }

    console.log(currentUser);

    //First way
    // currentUser.fullName = fullName;
    // currentUser.email = email
    // currentUser.mobileNumber = mobileNumber;
    // await currentUser.save();

    // Second way

    const updatedUser = await User.findByIdAndUpdate(
      { _id: currentUser._id },
      {
        fullName,
        email,
        mobileNumber,
      },
      { new: true },
    );

    console.log("newData", updatedUser);
    res
      .status(200)
      .json({ message: "User Updated Successfully", data: updatedUser });

    console.log("Updating the user");
  } catch (error) {
    next(error);
  }
};

export const UserChangePhoto = async (req, res, next) => {
  try {
    // console.log("body :", req.body);

    const currentUser = req.user;
    const dp = req.file;

    if (!dp) {
      const error = new Error("Profile Picture Require");
      error.statusCode = 400;
      return next(error);
    }
    console.log(dp);

    if (currentUser.photo && currentUser.photo.publicID) {
      await cloudinary.uploader.destroy(currentUser.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");
    // console.log(b64.slice(0.100));
    const dataURI = `data:${dp.mimetype}; base64,${b64}`;
    console.log("DataURI :", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "Craving/User",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Uploaded Successfully :", result);
    currentUser.photo.url = result.secure_url;
    currentUser.photo.publicID = result.public_id;

    await currentUser.save();

    res.status(200).json({ message: "Photo Update", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const UserResetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const currentUser = req.user;

    if (!oldPassword || !newPassword) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const isVerified = await bcrypt.compare(oldPassword, currentUser.password);
    if (!isVerified) {
      const error = new Error("Old Password didn't match");
      error.statusCode = 401;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    currentUser.password = hashPassword;

    await currentUser.save();

    res.status(200).json({ message: "Password Reset Successfull" });
  } catch (error) {
    next(error);
  }
};
