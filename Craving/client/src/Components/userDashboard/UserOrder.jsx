
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
    <div className="h-full overflow-y-auto bg-linear-to-b from-(--color-section-light) via-(--color-background) to-(--color-section-light) p-4 sm:p-6">
      <div className="relative overflow-hidden rounded-3xl border border-(--color-border) bg-white/85 p-5 shadow-xl backdrop-blur-sm sm:p-6">
        <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-(--color-primary)/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-(--color-secondary)/20 blur-3xl" />

        <div className="relative">
          <h2 className="text-2xl font-black tracking-tight text-(--color-text) sm:text-3xl">
            My Orders
          </h2>
          <p className="mt-1 text-sm font-medium text-(--color-text-secondary) sm:text-base">
            Track your recent orders and delivery progress.
          </p>
        </div>

        <div className="mt-4 h-px rounded-full bg-(--color-border)" />

        {!orders || orders.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-(--color-border) bg-(--color-section-light) py-12 text-center text-(--color-text-secondary)">
            <p className="text-lg font-semibold">No orders placed yet</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-(--color-border) bg-white/75">
            <table className="w-full min-w-170 border-collapse">
              <thead>
                <tr className="border-b border-(--color-border) bg-(--color-section-light)">
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-(--color-text-secondary) uppercase sm:text-sm">
                    Order Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-(--color-text-secondary) uppercase sm:text-sm">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-(--color-text-secondary) uppercase sm:text-sm">
                    Total Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-(--color-text-secondary) uppercase sm:text-sm">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-(--color-text-secondary) uppercase sm:text-sm">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-(--color-text-secondary) uppercase sm:text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-(--color-border) transition hover:bg-(--color-background)"
                  >
                    <td className="px-4 py-3 font-semibold text-(--color-text)">
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
                    <td className="px-4 py-3 font-semibold text-(--color-text)">
                      ₹{order.orderValue.total || 0}
                    </td>
                    <td className="px-4 py-3 text-(--color-text-secondary)">
                      {order.items?.length || 0} item
                      {order.items?.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-4 py-3 text-(--color-text-secondary)">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 ps-4 text-(--color-text-secondary)">
                      <button className="rounded-lg bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover)">
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
