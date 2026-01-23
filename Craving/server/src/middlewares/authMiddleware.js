import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const biscut = req.cookie.parleG;
    console.log("Token recived in cookies:", biscut);
    const tea = jwt.verify(biscut, process.env.JWT_SECRET);
    console.log(tea);
    if (!tea) {
      const error = new Error("Unauthorized! Please Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await findByID(tea.id);
    if (!verifiedUser) {
      const error = new Error("Unauthorized! Please Login Again");
      error.statusCode = 401;
      return next(error);
    }
    next();

    req.user = verifiedUser;

  } catch (error) {
    next(error);
  }
};
