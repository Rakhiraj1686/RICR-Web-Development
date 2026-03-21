
import React, { useEffect, useState } from "react";
import api from "../../Config/Api";
import toast from "react-hot-toast";
import Loading from "../Loading";

const UserOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState();

  const fetchAllPlacedOrder = async () => {
    setIsLoading(true);
    console.log("Fetching User Placed Orders...");
    try {
      const res = await api.get("/user/placedorders");
      setOrders(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlacedOrder();
    const interval = setInterval(() => {
      fetchAllPlacedOrder();
    }, 1000 * 10); // Refresh every 1 minutes
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-linear-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-4 sm:p-6">
      <div className="relative overflow-hidden rounded-3xl border border-[#dbe3ec] bg-white/85 p-5 shadow-xl backdrop-blur-sm sm:p-6">
        <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-[#93c5fd]/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-[#a5b4fc]/15 blur-3xl" />

        <div className="relative">
          <h2 className="text-2xl font-black tracking-tight text-[#4f3838] sm:text-3xl">
            My Orders
          </h2>
          <p className="mt-1 text-sm font-medium text-[#7d6666] sm:text-base">
            Track your recent orders and delivery progress.
          </p>
        </div>

        <div className="mt-4 h-px rounded-full bg-[#e9d7c4]" />

        {!orders || orders.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[#d6bba0] bg-[#fff6eb] py-12 text-center text-[#8a725e]">
            <p className="text-lg font-semibold">No orders placed yet</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e6d2bf] bg-white/75">
            <table className="w-full min-w-170 border-collapse">
              <thead>
                <tr className="border-b border-[#dcc7b3] bg-[#fff7ed]">
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[#886f5b] uppercase sm:text-sm">
                    Order Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[#886f5b] uppercase sm:text-sm">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[#886f5b] uppercase sm:text-sm">
                    Total Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[#886f5b] uppercase sm:text-sm">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[#886f5b] uppercase sm:text-sm">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[#886f5b] uppercase sm:text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#efe2d3] transition hover:bg-[#fff8f0]"
                  >
                    <td className="px-4 py-3 font-semibold text-[#4f3a3a]">
                      {order.orderNumber || order._id?.substring(0, 8)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize sm:text-sm ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#4f3a3a]">
                      ₹{order.orderValue.total || 0}
                    </td>
                    <td className="px-4 py-3 text-[#7c6354]">
                      {order.items?.length || 0} item
                      {order.items?.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-4 py-3 text-[#7c6354]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 ps-4 text-[#7c6354]">
                      <button className="rounded-lg bg-(--color-secondary) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-secondary-hover)">
                        Track Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
