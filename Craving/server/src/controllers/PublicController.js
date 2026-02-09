import Contact from "../models/contactModel.js";
import User from "../models/userModel.js";
import Menu from "../models/menuSchema.js";

export const NewContact = async (req, res, next) => {
  try {
    const { fullName, email, subject, query } = req.body;

    if (!fullName || !email || !subject || !query) {
      const error = new Error("All Field Required");
      error.statusCode = 400;
      return;
    }

    //save data to database
    const newContact = await Contact.create({
      fullName,
      email,
      subject,
      query,
    });

    //send response to frontend
    console.log(newContact);
    res.status(201).json({
      message: "Thanks for Contacting us. We will Get Back to you in 24 Hours",
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await User.find({ role: "manager" }).select(
      "-password",
    );
    res
      .status(200)
      .json({ message: "Restaurants fetched successfully", data: restaurants });
  } catch (error) {
    next(error);
  }
};

export const GetAllRestaurantMenuData = async (req, res, next) => {
  try {
    const { id, page } = req.params;
    console.log(page);

    if (!id) {
      const error = new Error("All Fields required");
      error.statusCode = 400;
      return next(error);
    }

    const restaurantMenuData = await Menu.find({
      restaurantID: id,
    })
      .sort({ updateAt: -1 })
      .skip(1)
      .limit(2)
      .populate("restaurantID");

    res.status.json({
      message: "Menu fetched Successfully",
      data: restaurantMenuData,
    });
  } catch (error) {
    next(error);
  }
};
