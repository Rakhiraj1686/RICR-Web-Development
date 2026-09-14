import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

export const AdminGetStats = async (req, res, next) => {
  try {
    const [totalCustomers, totalRestaurants, totalRiders, allOrders] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "manager" }),
      User.countDocuments({ role: "partner" }),
      Order.find({}),
    ]);

    const totalOrders = allOrders.length;
    const deliveredOrders = allOrders.filter((o) => o.status === "delivered");
    const totalRevenue = deliveredOrders
      .filter((o) => o.orderValue?.paymentStatus === "paid")
      .reduce((sum, o) => sum + Number(o.orderValue?.total || 0), 0);
    const pendingOrders = allOrders.filter((o) =>
      ["pending", "accepted", "preparing", "ready", "pickedUp", "onTheWay"].includes(o.status)
    ).length;
    const blockedAccounts = await User.countDocuments({ isActive: "blocked" });

    res.status(200).json({
      message: "Admin Stats Fetched Successfully",
      data: {
        totalCustomers,
        totalRestaurants,
        totalRiders,
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredOrders: deliveredOrders.length,
        blockedAccounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// role: "customer" | "manager" | "partner". Password is never selected.
export const AdminGetUsersByRole = async (req, res, next) => {
  try {
    const { role } = req.params;
    if (!["customer", "manager", "partner"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    const users = await User.find({ role }).select("-password").sort({ createdAt: -1 });

    res.status(200).json({ message: "Users Fetched Successfully", data: users });
  } catch (error) {
    next(error);
  }
};

export const AdminGetAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("userId")
      .populate("restaurantId")
      .populate("riderId")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Orders Fetched Successfully", data: orders });
  } catch (error) {
    next(error);
  }
};

// Suspend or restore any non-admin account. Admins can't be blocked or
// block themselves through this route.
export const AdminSetUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (!["active", "inactive", "blocked"].includes(isActive)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found." });
    }
    if (targetUser.role === "admin") {
      return res.status(403).json({ message: "Admin accounts can't be modified here." });
    }

    targetUser.isActive = isActive;
    await targetUser.save();

    res.status(200).json({ message: "User status updated successfully", data: targetUser });
  } catch (error) {
    next(error);
  }
};
