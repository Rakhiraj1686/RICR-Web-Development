import Order from "../models/orderModel.js";
import { calculateDistance } from "../utils/riderUtility.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";

export const RiderGetAvailableOrder = async (req, res, next) => {
  try {
    //console.log("RiderGetAvailableOrder called with body: ", req.body);
    const { lat, lon } = req.body;
    // console.log("Latitude: ", lat, "Longitude: ", lon);

    const availableOrders = await Order.find({
      riderId: null,
      // A plain object literal can only keep the LAST key with a given
      // name — { $ne: a, $ne: b, $ne: c } silently collapses to just the
      // last $ne, so this used to only exclude "rejected" orders and let
      // pending/cancelled/delivered orders show up as "available" to
      // riders. $nin with an array actually excludes all four.
      status: { $nin: ["pending", "cancelled", "delivered", "refused"] },
    })
      .populate("userId")
      .populate("restaurantId");

    // console.log("Available Orders before distance calculation: ", availableOrders);

    const AvailableOrdersWithDistance = await calculateDistance(
      availableOrders,
      lat,
      lon,
    );

    // console.log("Available Orders With Distance: ", AvailableOrdersWithDistance);

    res.status(200).json({
      message: "Available Orders Fetched Successfully",
      data: AvailableOrdersWithDistance,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderGetOngoingOrder = async (req, res, next) => {
  try {
    const currentuser = req.user;
    const ongoingOrders = await Order.find({
      riderId: currentuser._id,
      status: {
        $in: ["accepted", "preparing", "ready", "pickedUp", "onTheWay"],
      }, // $in means "is in". It Include orders that are accepted, preparing, ready, pickedUp, or onTheWay
    })
      .populate("userId")
      .populate("restaurantId");

    res.status(200).json({
      message: "Ongoing Orders Fetched Successfully",
      data: ongoingOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderGetCompletedOrder = async (req, res, next) => {
  try {
    const currentuser = req.user;
    const completedOrders = await Order.find({
      riderId: currentuser._id,
      status: {
        $in: ["delivered", "refused", "damaged", "cancelled", "rejected"],
      }, // $in means "is in". It Include orders that are delivered, refused, damaged, cancelled, or rejected
    })
      .populate("userId")
      .populate("restaurantId");

    res.status(200).json({
      message: "Completed Orders Fetched Successfully",
      data: completedOrders,
    });
  } catch (error) {
    next(error);
  }
};

// A rider claims an unassigned order. Only orders that are ready for
// pickup and have no rider yet can be accepted, to avoid two riders
// grabbing the same delivery.
export const RiderAcceptOrder = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { id } = req.params;

    const order = await Order.findOne({ _id: id, riderId: null, status: "ready" });
    if (!order) {
      return res
        .status(404)
        .json({ message: "This order is no longer available to accept." });
    }

    order.riderId = currentUser._id;
    order.status = "pickedUp";
    await order.save();

    res.status(200).json({ message: "Order accepted successfully", data: order });
  } catch (error) {
    next(error);
  }
};

// Once accepted, a rider can only move their own order forward through
// pickedUp -> onTheWay -> delivered.
const RIDER_ALLOWED_STATUSES = ["onTheWay", "delivered"];

export const RiderUpdateOrderStatus = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { id } = req.params;
    const { status } = req.body;

    if (!RIDER_ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status for a rider to set." });
    }

    const order = await Order.findOne({ _id: id, riderId: currentUser._id });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully", data: order });
  } catch (error) {
    next(error);
  }
};

export const RiderUpdate = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, gender, dob, address, pin, documents, paymentDetails, geolocation } =
      req.body;
    const currentUser = req.user;

    if (!fullName || !email || !mobileNumber) {
      const error = new Error("Full Name, Email, and Mobile Number are required");
      error.statusCode = 400;
      return next(error);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const error = new Error("Invalid email format");
      error.statusCode = 400;
      return next(error);
    }

    if (!/^\d{10}$/.test(mobileNumber.replace(/\D/g, ""))) {
      const error = new Error("Mobile number must be 10 digits");
      error.statusCode = 400;
      return next(error);
    }

    currentUser.fullName = fullName;
    currentUser.email = email.toLowerCase();
    currentUser.mobileNumber = mobileNumber;
    currentUser.gender = gender || currentUser.gender;
    currentUser.dob = dob || currentUser.dob;
    currentUser.address = address || currentUser.address;
    currentUser.pin = pin || currentUser.pin;

    if (documents) {
      currentUser.document = {
        ...currentUser.document,
        dl: documents.dl || currentUser.document?.dl || "N/A",
        uidai: documents.uidai || currentUser.document?.uidai || "N/A",
      };
    }

    if (paymentDetails) {
      currentUser.paymentDetails = {
        UPI: paymentDetails.UPI || currentUser.paymentDetails?.UPI || "N/A",
        account_number:
          paymentDetails.account_number || currentUser.paymentDetails?.account_number || "N/A",
        IFSC: paymentDetails.IFSC || currentUser.paymentDetails?.IFSC || "N/A",
      };
    }

    if (geolocation) {
      currentUser.geolocation = {
        lat: geolocation.lat || currentUser.geolocation?.lat || "N/A",
        lon: geolocation.lon || currentUser.geolocation?.lon || "N/A",
      };
    }

    await currentUser.save();

    res.status(200).json({ message: "Rider Updated Successfully", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const RiderChangePhoto = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const dp = req.file;

    if (!dp) {
      const error = new Error("Profile Picture required");
      error.statusCode = 400;
      return next(error);
    }

    if (currentUser.photo?.publicID) {
      await cloudinary.uploader.destroy(currentUser.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");
    const dataURI = `data:${dp.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "Cravings/User",
      width: 500,
      height: 500,
      crop: "fill",
    });

    currentUser.photo = { url: result.secure_url, publicID: result.public_id };
    await currentUser.save();

    res.status(200).json({ message: "Photo Updated Successfully", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const RiderResetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const currentUser = req.user;

    if (!oldPassword || !newPassword) {
      const error = new Error("All fields required");
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
    currentUser.password = await bcrypt.hash(newPassword, salt);
    await currentUser.save();

    res.status(200).json({ message: "Password Reset Successful" });
  } catch (error) {
    next(error);
  }
};

// Toggles between "active" (online, can receive deliveries) and
// "inactive" (offline). Does not allow toggling out of "blocked".
export const RiderToggleAvailability = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (currentUser.isActive === "blocked") {
      return res.status(403).json({ message: "Your account is blocked. Contact support." });
    }

    currentUser.isActive = currentUser.isActive === "active" ? "inactive" : "active";
    await currentUser.save();

    res.status(200).json({
      message: `You are now ${currentUser.isActive === "active" ? "online" : "offline"}.`,
      data: currentUser,
    });
  } catch (error) {
    next(error);
  }
};