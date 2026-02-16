import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import bcrypt, { genSalt } from "bcrypt";
import Menu from "../models/menuSchema.js";
import { DummyMenus } from "./dummy.js";

const seedMenu = async () => {
  try {
    await connectDB();
    //Delete old Menu Data
    console.log("Deleting old Menu Data");

    const existingMenuData = await Menu.find();
    if (existingMenuData.length > 0) {
      await Menu.deleteMany({});
    }
    const existingRestaurant = await User.find({ role: "manager" });

    console.log("Adding New Menu Data");

    const MenuItems = [];

    existingRestaurant.forEach((restaurant) => {
      DummyMenus.forEach((menuItems) => {
        MenuItems.push({ ...menuItems, restaurantID: restaurant._id });
      });
    });

    await Menu.insetMany(MenuItems);
    console.log("Menu data added Successfull");
  } catch (error) {
    console.log(error);
    console.log("Error sending Menu");
  } finally {
    process.exit(1);
  }

  //   await Promise.all(()=>{
  //     existingRestaurant.map
  //   })
};

seedMenu();
