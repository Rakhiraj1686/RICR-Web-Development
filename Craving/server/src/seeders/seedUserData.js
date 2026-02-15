import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import bcrypt, { genSalt } from "bcrypt";
import { DummyManagers, DummyPartners, DummyUsers } from "./dummy.js";
import User from "../models/userModel.js";

const seedManager = async () => {
  const salt = await bcrypt.genSalt(10);

  console.log("Adding Dummy Restaurants");
  // DummyManagers.forEach(async (manager) => {
  //   await User.create({
  //     ...manager,
  //     password: await bcrypt.hash(manager.password, salt),
  //   });
  // });

  const DummyManagersWithHashedPassword = await Promise.all(
    DummyManagers.map(async (manager) => ({
      ...manager,
      password: await bcrypt.hash(manager.password, salt),
    })),
  );

  await User.insertMany(DummyManagersWithHashedPassword);

  console.log("Dummy Restaurants Added");
};


const seedCustomer = async () => {
  const salt = await bcrypt.genSalt(10);
  console.log("Adding Dummy customer");
  // DummyUsers.forEach(async (customer) => {
  //   await User.create({
  //     ...customer,
  //     password: await bcrypt.hash(customer.password, salt),
  //   });
  // });
  const DummyCustomerWithHashedPassword = await Promise.all(
    DummyManagers.map(async (customer) => ({
      ...customer,
      password: await bcrypt.hash(customer.password, salt),
    })),
  );

  await User.insertMany(DummyCustomerWithHashedPassword);
  console.log("Dummy customer Added");
};


const seedRider = async () => {
  const salt = await bcrypt.genSalt(10);

  console.log("Adding Dummy Rider");
  const DummyRiderWithHashedPassword = await Promise.all(
    DummyPartners.map(async (rider) => ({
      ...rider,
      password: await bcrypt.hash(rider.password, salt),
    })),
  );

  await User.insertMany(DummyRiderWithHashedPassword);

  console.log("Dummy Rider Added");
};


const seedUser = async () => {
  try {
    await connectDB();
    const salt = await bcrypt.genSalt(10);
    const existingUsers = await User.find();
    if (existingUsers) {
      existingUsers.forEach(async (existingUser) => {
        if (existingUser.role !== "admin") {
          await existingUser.deleteOne();
        }
      });
      console.log("All Users Removed Except Admin");
    }
    await seedManager();
    await seedCustomer();
    await seedRider();
  } catch (error) {
    console.log(error);
    console.log("Error in adding Dummy User");
  }
  // process.exit(1);
};

seedUser();
