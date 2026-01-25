import User from "../models/userModel.js";

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
