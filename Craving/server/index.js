import express from "express";
import cors from "cors";
import morgan from "morgan";
import cloudinary from "./src/config/cloudinary.js";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import PublicRouter from "./src/routers/publicRouter.js";
import UserRouter from "./src/routers/userRouter.js";
import RestaurantRouter from "./src/routers/restaurantRouter.js"
import RiderRouter from "./src/routers/riderRouter.js";
import PaymentRouter from "./src/routers/paymentRouter.js";
import AdminRouter from "./src/routers/adminRouter.js";
import { verifyRazorPayConnect } from "./src/config/razorpay.js";
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/user", UserRouter);
app.use("/restaurant",RestaurantRouter);
app.use("/rider", RiderRouter);
app.use("/payment", PaymentRouter);

app.use("/admin", AdminRouter);

app.get("/", (req, res) => {
  console.log("server is working");
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.log("Error Found", {ErrorMessage,StatusCode});

  // This used to always respond 200, even on error — axios only rejects a
  // request on a non-2xx status, so every catch block across the frontend
  // that expects a failed login/update/etc. to actually throw was silently
  // never triggered by the status code itself (some "worked" only because
  // the response body was missing the expected `data` and the code went on
  // to crash on `undefined`, landing in the catch block by accident).
  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("Server Started at Port: ", port);
  connectDB();
  try {
    const res = await cloudinary.api.ping();
    console.log("Clodinary API is Working :", res);
  } catch (error) {
    console.error("Error Connecting Clodinary API :", error);
  }
});
