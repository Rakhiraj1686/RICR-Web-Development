import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import bcrypt from "bcrypt";
import { DummyMenu } from "./dummy.js";
import Menu from "../models/menuSchema.js";
import User from "../models/userModel.js";

const seedMenu = async () => {
  try {
    await connectDB();
    //Delete Old Menu Data
    console.log("Deleting old Menu Data");

    const existingMenudata = await Menu.find();
    if (existingMenudata.length > 0) {
      await Menu.deleteMany({});
    }

    const existingRestaurant = await User.find({ role: "manager" });
    console.log("Managers Found:", existingRestaurant.length);


    console.log("Adding New Menu Data");

    const MenuItems = [];

    existingRestaurant.forEach((restaurant) => {
      DummyMenu.forEach((menuItem) => {
        MenuItems.push({ ...menuItem, restaurantID: restaurant._id });
      });
    });

    console.log("Total MenuItems:", MenuItems.length);

    await Menu.insertMany(MenuItems);
    console.log("Menu Data added Successfully");
  } catch (error) {
    console.log(error);

    console.error("Error Seeding Menu");
  } finally {
    process.exit(0);
  }
};

seedMenu();
