import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "partner", "customer"],
      required: true,
      default: "customer",
      // default: "N/A",
    },
    dob: {
      type: String,
      required: false,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "others", ""],
      required: false,
      default: "",
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    pin: {
      type: String,
      required: false,
      default: "",
    },
    photo: {
      url: {
        type: String,
        default: "",
      },
      publicID: {
        type: String,
        default: "",
      },
    },
    geolocation: {
      lat: {
        type: String,
        required: false,
        default: "",
      },
      lon: {
        type: String,
        required: false,
        default: "",
      },
    },
    paymentDetails: {
      UPI: {
        type: String,
        required: false,
        default: "",
      },
      account_number: {
        type: String,
        required: false,
        default: "",
      },
      IFSC: {
        type: String,
        required: false,
        default: "",
      },
    },
    restaurantName: {
      type: String,
      required() {
        return this.role === "manager";
      },
      default: "",
    },
    cuisine: {
      type: String,
      required() {
        return this.role === "manager";
      },
      default: "",
    },
    document: {
      gst: {
        type: String,
        required: false,
        default: "",
      },
      dl: {
        type: String,
        required: false,
        default: "",
      },
      fssai: {
        type: String,
        required: false,
        default: "",
      },
      uidai: {
        type: String,
        required: false,
        default: "",
      },
      pan: {
        type: String,
        required: false,
        default: "",
      },
    },
    isActive: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      required: true,
      default: "active",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
