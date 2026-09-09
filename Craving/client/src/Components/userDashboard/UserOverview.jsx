import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaClock,
  FaRupeeSign,
  FaCheckCircle,
  FaUserEdit,
  FaShoppingBag,
  FaCreditCard,
  FaHeadset,
  FaArrowRight,
  FaBolt,
  FaUtensils,
  FaChevronRight,
} from "react-icons/fa";
import api from "../../Config/Api";
import { Card, SkeletonText } from "../ui";

const ACTIVE_STATUSES = ["pending", "accepted", "preparing", "ready", "pickedUp", "onTheWay"];

/**
 * `onNavigateTab` switches this dashboard's active tab (Profile/Orders/
 * Payments/Help). Passed down from UserDashboard so the quick-action
 * cards actually do something instead of being decorative buttons.
 */
const UserOverview = ({ onNavigateTab }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/user/placedorders");
        setOrders(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => ACTIVE_STATUSES.includes(o?.status)).length;
    const delivered = orders.filter((o) => o?.status === "delivered").length;
    const totalSpent = orders
      .filter((o) => o?.orderValue?.paymentStatus === "paid")
      .reduce((sum, o) => sum + Number(o?.orderValue?.total || 0), 0);
    return { total, pending, delivered, totalSpent };
  }, [orders]);

  const activeOrder = useMemo(
    () => orders.find((o) => ACTIVE_STATUSES.includes(o?.status)),
    [orders]
  );

  const overviewStats = [
    {
      title: "Total Orders",
      value: stats.total,
      icon: <FaClipboardList />,
      description: "Orders placed",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Orders",
      value: stats.pending,
      icon: <FaClock />,
      description: "Currently processing",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Total Spent",
      value: `₹${stats.totalSpent.toLocaleString("en-IN")}`,
      icon: <FaRupeeSign />,
      description: "Lifetime spending",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Delivered",
      value: stats.delivered,
      icon: <FaCheckCircle />,
      description: "Successfully delivered",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "Update Profile",
      description: "Manage your personal information",
      icon: <FaUserEdit />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      onClick: () => onNavigateTab("profile"),
    },
    {
      title: "View Orders",
      description: "Track active and previous orders",
      icon: <FaShoppingBag />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      onClick: () => onNavigateTab("order"),
    },
    {
      title: "Payment Methods",
      description: "Manage payments and transactions",
      icon: <FaCreditCard />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      onClick: () => onNavigateTab("payment"),
    },
    {
      title: "Need Help?",
      description: "Get assistance from our support team",
      icon: <FaHeadset />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      onClick: () => onNavigateTab("helpdesk"),
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#f7f8fa] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[1600px] space-y-5">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden rounded-3xl bg-(--color-primary) p-6 text-white shadow-lg sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -left-16 -bottom-24 h-48 w-48 rounded-full bg-black/5" />

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <FaBolt className="text-yellow-300" />
                User Dashboard
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Welcome Back 👋</h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                Manage your orders, profile, payments and support — everything you need in
                one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur-sm">
                  <FaUtensils />
                  Delicious food
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur-sm">
                  <FaShoppingBag />
                  Easy ordering
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/order-now")}
              className="group inline-flex items-center justify-center gap-3 self-start rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-(--color-primary) shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:self-center"
            >
              Order Something Delicious
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((stat, idx) => (
            <Card key={idx} interactive className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-(--color-text-secondary)">
                    {stat.title}
                  </p>
                  {loading ? (
                    <SkeletonText className="mt-2 w-16" />
                  ) : (
                    <p className="mt-2 text-3xl font-black tracking-tight text-(--color-text)">
                      {stat.value}
                    </p>
                  )}
                </div>
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${stat.iconBg} ${stat.iconColor} text-xl`}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-(--color-border) pt-3">
                <span className={`h-2 w-2 rounded-full ${stat.iconColor.replace("text-", "bg-")}`} />
                <p className="text-xs font-medium text-(--color-text-secondary)">
                  {stat.description}
                </p>
              </div>
            </Card>
          ))}
        </section>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          {/* ================= QUICK ACTIONS ================= */}
          <Card className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-(--color-primary)">
                  Shortcuts
                </p>
                <h2 className="mt-1 text-xl font-black text-(--color-text)">Quick Actions</h2>
                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  Access frequently used account options.
                </p>
              </div>
              <div className="hidden h-10 w-10 place-items-center rounded-xl bg-(--color-section-light) text-(--color-primary) sm:grid">
                <FaBolt />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={action.onClick}
                  className="focus-ring group flex items-center justify-between gap-3 rounded-2xl border border-(--color-border) bg-[#fafafa] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-(--color-primary)/30 hover:bg-white hover:shadow-md"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${action.iconBg} ${action.iconColor} text-lg transition duration-300 group-hover:scale-105`}
                    >
                      {action.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-(--color-text)">
                        {action.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-(--color-text-secondary)">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="shrink-0 text-xs text-(--color-text-secondary) transition duration-300 group-hover:translate-x-1 group-hover:text-(--color-primary)" />
                </button>
              ))}
            </div>
          </Card>

          {/* ================= ACTIVE ORDER ================= */}
          <Card className="p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-(--color-secondary)">
                  Right now
                </p>
                <h2 className="mt-1 text-xl font-black text-(--color-text)">Active Order</h2>
                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  Your current order, if one is in progress.
                </p>
              </div>
            </div>

            <div className="mt-6">
              {loading ? (
                <SkeletonText lines={3} />
              ) : activeOrder ? (
                <button
                  type="button"
                  onClick={() => onNavigateTab("order")}
                  className="focus-ring flex w-full items-center justify-between gap-3 rounded-2xl border border-(--color-border) bg-[#fafafa] p-4 text-left transition hover:bg-white hover:shadow-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-(--color-text)">
                      {activeOrder.orderNumber || `Order #${activeOrder._id?.slice(-6)}`}
                    </p>
                    <p className="mt-1 text-xs capitalize text-(--color-text-secondary)">
                      Status: {activeOrder.status}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-(--color-primary-soft) px-3 py-1.5 text-xs font-bold text-(--color-primary)">
                    View
                  </span>
                </button>
              ) : (
                <div className="rounded-2xl border border-dashed border-(--color-border) bg-[#fafafa] p-6 text-center">
                  <p className="text-sm font-semibold text-(--color-text)">
                    No live order right now
                  </p>
                  <p className="mt-1.5 text-xs text-(--color-text-secondary)">
                    Once you place an order, it'll show up here with live status.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* ================= FOOTER CTA ================= */}
        <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-black text-(--color-text)">Ready for your next meal?</h2>
            <p className="mt-1 text-sm text-(--color-text-secondary)">
              Explore restaurants and discover something delicious today.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/order-now")}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-5 py-3 text-sm font-bold text-white transition duration-300 hover:bg-(--color-primary-hover)"
          >
            Explore Restaurants
            <FaArrowRight />
          </button>
        </Card>
      </div>
    </div>
  );
};

export default UserOverview;
