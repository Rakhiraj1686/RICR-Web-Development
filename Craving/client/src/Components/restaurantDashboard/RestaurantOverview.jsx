import React, { useEffect, useMemo, useState } from "react";
import {
  FaCartShopping,
  FaClock,
  FaIndianRupeeSign,
  FaStar,
  FaCircleCheck,
  FaTriangleExclamation,
  FaPlus,
  FaBagShopping,
  FaUserPen,
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import api from "../../Config/Api";

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  preparing: "bg-blue-100 text-blue-700",
  ready: "bg-blue-100 text-blue-700",
  pickedUp: "bg-(--color-accent)/25 text-(--color-primary-hover)",
  onTheWay: "bg-(--color-accent)/25 text-(--color-primary-hover)",
  delivered: "bg-green-100 text-green-700",
  refused: "bg-red-100 text-red-700",
  damaged: "bg-red-100 text-red-700",
  cancelled: "bg-red-100 text-red-700",
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
};

const isToday = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

const RestaurantOverview = ({ setActive }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/restaurant/placedOrders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const todaysOrders = orders.filter((o) => isToday(o.createdAt)).length;
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const deliveredOrders = orders.filter((o) => o.status === "delivered");
    const revenue = deliveredOrders.reduce(
      (sum, o) => sum + (Number(o.orderValue?.total) || 0),
      0,
    );
    const ratedOrders = orders.filter((o) => o.review?.rating);
    const avgRating =
      ratedOrders.length > 0
        ? (
            ratedOrders.reduce((sum, o) => sum + o.review.rating, 0) /
            ratedOrders.length
          ).toFixed(1)
        : null;

    return { totalOrders, todaysOrders, pendingOrders, revenue, avgRating, ratedCount: ratedOrders.length };
  }, [orders]);

  const recentOrders = useMemo(() => orders.slice(0, 6), [orders]);

  // Popular items: derived from real order history (item frequency across
  // all orders' line items), not an invented ranking.
  const popularItems = useMemo(() => {
    const tally = {};
    orders.forEach((order) => {
      (order.items || []).forEach((item) => {
        const key = item._id || item.itemName;
        if (!tally[key]) {
          tally[key] = {
            itemName: item.itemName,
            price: item.price,
            image: item.images?.[0]?.url,
            count: 0,
            revenue: 0,
          };
        }
        tally[key].count += item.quantity || 1;
        tally[key].revenue += (Number(item.price) || 0) * (item.quantity || 1);
      });
    });
    return Object.values(tally)
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }, [orders]);

  const STATS_CARDS = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FaCartShopping />,
      tone: "text-(--color-primary)",
    },
    {
      title: "Today's Orders",
      value: stats.todaysOrders,
      icon: <FaClock />,
      tone: "text-(--color-secondary-hover)",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: <FaTriangleExclamation />,
      tone: "text-yellow-600",
    },
    {
      title: "Revenue (Delivered)",
      value: `₹${stats.revenue}`,
      icon: <FaIndianRupeeSign />,
      tone: "text-green-600",
    },
  ];

  if (stats.avgRating) {
    STATS_CARDS.push({
      title: "Average Rating",
      value: stats.avgRating,
      icon: <FaStar />,
      tone: "text-(--color-primary)",
      supporting: `From ${stats.ratedCount} review${stats.ratedCount === 1 ? "" : "s"}`,
    });
  }

  return (
    <div className="h-full space-y-6 overflow-y-auto rounded-3xl bg-linear-to-br from-(--color-section-light) via-(--color-background) to-(--color-section-light) p-4 sm:p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-(--color-border) bg-white/70 p-5 shadow-xl backdrop-blur-sm sm:p-6">
        <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-(--color-secondary)/25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-(--color-primary)/15 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-(--color-text) sm:text-3xl">
              Good day, {user?.restaurantName || user?.fullName} 👋
            </h1>
            <p className="mt-1 text-sm font-medium text-(--color-text-secondary) sm:text-base">
              Here's what's happening with your restaurant today.
            </p>
          </div>
          {user?.isActive && (
            <span
              className={`flex shrink-0 items-center gap-2 rounded-full border border-(--color-border) bg-white px-4 py-2 text-sm font-semibold ${
                user.isActive === "active" ? "text-green-600" : "text-red-500"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  user.isActive === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {user.isActive === "active" ? "Active" : user.isActive}
            </span>
          )}
        </div>
      </div>

      {error ? (
        <div className="flex flex-col items-center rounded-3xl border border-(--color-border) bg-white/85 py-16 text-center shadow-lg">
          <FaTriangleExclamation className="text-3xl text-(--color-primary)" />
          <h3 className="mt-4 text-xl font-bold text-(--color-text)">
            Unable to load dashboard data
          </h3>
          <p className="mt-1 text-(--color-text-secondary)">Please try again.</p>
          <button
            onClick={fetchOrders}
            className="mt-5 rounded-full bg-(--color-primary) px-6 py-2.5 font-semibold text-white transition hover:bg-(--color-primary-hover)"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-28 animate-pulse rounded-2xl bg-white/70" />
                ))
              : STATS_CARDS.map((stat) => (
                  <div
                    key={stat.title}
                    className="group relative overflow-hidden rounded-2xl border border-(--color-border) bg-white/80 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="pointer-events-none absolute -right-12 -bottom-10 h-32 w-32 rounded-full bg-(--color-section-light) opacity-80 transition-all duration-300 group-hover:scale-110" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                          {stat.title}
                        </p>
                        <p className="mt-2 text-3xl font-black text-(--color-text)">
                          {stat.value}
                        </p>
                        {stat.supporting && (
                          <p className="mt-1 text-xs text-(--color-text-secondary)">
                            {stat.supporting}
                          </p>
                        )}
                      </div>
                      <div className={`rounded-2xl border border-white/70 bg-(--color-background) p-4 text-2xl shadow-sm ${stat.tone}`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-black tracking-tight text-(--color-text) sm:text-2xl">
              Quick Actions
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => setActive?.("menu")}
                className="flex items-center gap-3 rounded-2xl border border-(--color-border) bg-(--color-background) p-4 text-left transition hover:-translate-y-0.5 hover:border-(--color-primary)/40 hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--color-primary) shadow-sm">
                  <FaPlus />
                </span>
                <span className="font-semibold text-(--color-text)">Add Menu Item</span>
              </button>
              <button
                onClick={() => setActive?.("orders")}
                className="flex items-center gap-3 rounded-2xl border border-(--color-border) bg-(--color-background) p-4 text-left transition hover:-translate-y-0.5 hover:border-(--color-primary)/40 hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--color-primary) shadow-sm">
                  <FaBagShopping />
                </span>
                <span className="font-semibold text-(--color-text)">View Orders</span>
              </button>
              <button
                onClick={() => setActive?.("profile")}
                className="flex items-center gap-3 rounded-2xl border border-(--color-border) bg-(--color-background) p-4 text-left transition hover:-translate-y-0.5 hover:border-(--color-primary)/40 hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--color-primary) shadow-sm">
                  <FaUserPen />
                </span>
                <span className="font-semibold text-(--color-text)">Edit Restaurant</span>
              </button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-black tracking-tight text-(--color-text) sm:text-2xl">
              Recent Orders
            </h2>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="h-14 animate-pulse rounded-xl bg-(--color-section-light)" />
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-(--color-border) bg-(--color-section-light) py-10 text-center">
                <p className="font-semibold text-(--color-text)">No Orders Yet</p>
                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  Your new orders will appear here.
                </p>
                <button
                  onClick={() => setActive?.("menu")}
                  className="mt-4 rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
                >
                  Manage Menu
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-160 text-left text-sm">
                  <thead>
                    <tr className="border-b border-(--color-border) text-(--color-text-secondary)">
                      <th className="pb-3 font-semibold">Order</th>
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Items</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-(--color-border) transition hover:bg-(--color-background)"
                      >
                        <td className="py-3 font-semibold text-(--color-text)">
                          #{order.orderNumber}
                        </td>
                        <td className="py-3 text-(--color-text-secondary)">
                          {order.userId?.fullName || "—"}
                        </td>
                        <td className="py-3 text-(--color-text-secondary)">
                          {order.items?.length || 0} item{order.items?.length === 1 ? "" : "s"}
                        </td>
                        <td className="py-3 font-semibold text-(--color-text)">
                          ₹{order.orderValue?.total}
                        </td>
                        <td className="py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                              STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-(--color-text-secondary)">
                          {formatTime(order.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Popular Menu Items — derived from real order history */}
          {popularItems.length > 0 && (
            <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 shadow-lg backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-black tracking-tight text-(--color-text) sm:text-2xl">
                Popular Menu Items
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {popularItems.map((item) => (
                  <div
                    key={item.itemName}
                    className="flex items-center gap-3 rounded-2xl border border-(--color-border) bg-(--color-background) p-4"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                      {item.image ? (
                        <img src={item.image} alt={item.itemName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-(--color-primary)">
                          <FaCircleCheck />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-(--color-text)">{item.itemName}</p>
                      <p className="text-xs text-(--color-text-secondary)">
                        {item.count} sold · ₹{item.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantOverview;