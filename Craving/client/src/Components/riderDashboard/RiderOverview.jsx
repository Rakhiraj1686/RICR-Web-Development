import React, { useEffect, useMemo, useState } from "react";
import {
  FaMotorcycle,
  FaClipboardList,
  FaCheckCircle,
  FaRupeeSign,
  FaBolt,
  FaArrowRight,
  FaPowerOff,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../Config/Api";
import { useAuth } from "../../context/AuthContext";
import { SkeletonText, Button } from "../ui";

const isToday = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

const RiderOverview = ({ onNavigateTab }) => {
  const { user, setUser } = useAuth();
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingAvailability, setTogglingAvailability] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const [ongoingRes, completedRes] = await Promise.all([
        api.get("/rider/ongoingOrder"),
        api.get("/rider/completedOrder"),
      ]);
      setOngoing(Array.isArray(ongoingRes?.data?.data) ? ongoingRes.data.data : []);
      setCompleted(Array.isArray(completedRes?.data?.data) ? completedRes.data.data : []);
    } catch {
      setOngoing([]);
      setCompleted([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = useMemo(() => {
    const deliveredToday = completed.filter(
      (o) => o.status === "delivered" && isToday(o.createdAt)
    );
    const earningsToday = deliveredToday
      .filter((o) => o?.orderValue?.paymentStatus === "paid")
      .reduce((sum, o) => sum + Number(o.orderValue?.total || 0), 0);

    return {
      deliveredToday: deliveredToday.length,
      activeOrders: ongoing.length,
      earningsToday,
    };
  }, [ongoing, completed]);

  const recentDeliveries = useMemo(
    () =>
      [...completed]
        .filter((o) => o.status === "delivered")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4),
    [completed]
  );

  const isOnline = user?.isActive === "active";

  const handleToggleAvailability = async () => {
    setTogglingAvailability(true);
    try {
      const res = await api.patch("/rider/toggleAvailability");
      toast.success(res?.data?.message || "Availability updated");
      if (res?.data?.data) setUser(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Couldn't update your availability.");
    } finally {
      setTogglingAvailability(false);
    }
  };

  const quickActions = [
    { title: "Current Orders", description: "View assigned and available deliveries", icon: <FaMotorcycle />, onClick: () => onNavigateTab?.("current-order") },
    { title: "Delivery History", description: "Check your completed deliveries", icon: <FaClipboardList />, onClick: () => onNavigateTab?.("order-history") },
  ];

  const statCards = [
    { title: "Delivered Today", value: stats.deliveredToday, icon: <FaCheckCircle />, iconClass: "text-green-700" },
    { title: "Active Orders", value: stats.activeOrders, icon: <FaClipboardList />, iconClass: "text-blue-700" },
    { title: "Today's Earnings", value: `₹${stats.earningsToday}`, icon: <FaRupeeSign />, iconClass: "text-emerald-700" },
  ];

  return (
    <div className="h-full overflow-y-auto rounded-[22px] bg-[radial-gradient(circle_at_5%_5%,rgba(246,189,96,0.3)_0%,transparent_38%),radial-gradient(circle_at_100%_0%,rgba(244,162,97,0.22)_0%,transparent_32%),linear-gradient(135deg,#FFF8F0,#FEF1E6)] p-4 text-(--color-text) sm:p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[20px] border border-(--color-border) bg-linear-to-br from-(--color-section-light) to-(--color-background) p-5 shadow-sm md:p-6">
        <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-(--color-primary)/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-(--color-primary)">
              <FaBolt />
              Rider Command Center
            </p>
            <h1 className="mt-3 text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-tight">
              Welcome, {user?.fullName || "Rider"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-(--color-text-secondary) sm:text-base">
              Manage your deliveries, track active orders, and stay updated with your
              rider activity from one place.
            </p>
          </div>

          <Button
            size="lg"
            variant={isOnline ? "danger" : "primary"}
            loading={togglingAvailability}
            onClick={handleToggleAvailability}
            iconLeft={<FaPowerOff />}
          >
            {isOnline ? "Go Offline" : "Go Online"}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statCards.map((stat) => (
          <article key={stat.title} className="rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-sm transition duration-200 hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-(--color-text-secondary)">{stat.title}</p>
                {loading ? (
                  <SkeletonText className="mt-2 w-14" />
                ) : (
                  <p className="mt-2 text-3xl font-extrabold">{stat.value}</p>
                )}
              </div>
              <div className={`grid h-12 w-12 place-items-center rounded-xl border border-(--color-border) bg-(--color-section-light) text-xl ${stat.iconClass}`}>
                {stat.icon}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Main Content */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Quick Actions */}
        <section className="rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-sm">
          <h2 className="text-xl font-extrabold">Quick Actions</h2>
          <p className="mt-1 text-sm text-(--color-text-secondary)">
            Quickly access your most important rider controls.
          </p>

          <div className="mt-4 grid gap-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                type="button"
                onClick={action.onClick}
                className="focus-ring flex items-center justify-between gap-4 rounded-2xl border border-(--color-border) bg-linear-to-b from-white to-(--color-section-light) p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-(--color-secondary) hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-(--color-background) text-lg text-(--color-primary)">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{action.title}</h3>
                    <p className="mt-1 text-sm text-(--color-text-secondary)">{action.description}</p>
                  </div>
                </div>
                <FaArrowRight className="shrink-0 text-(--color-primary)" />
              </button>
            ))}
          </div>
        </section>

        {/* Rider Status */}
        <section className="relative overflow-hidden rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-sm">
          <h2 className="text-xl font-extrabold">Rider Status</h2>
          <p className="mt-1 text-sm text-(--color-text-secondary)">Your current delivery availability.</p>

          <div className="mt-5 rounded-2xl border border-(--color-border) bg-(--color-section-light) p-5">
            <div className="flex items-center gap-3">
              <div className={`grid h-12 w-12 place-items-center rounded-full text-xl ${isOnline ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                <FaCheckCircle />
              </div>
              <div>
                <p className="font-bold">{isOnline ? "Ready for Deliveries" : "You're Offline"}</p>
                <p className="text-sm text-(--color-text-secondary)">
                  {isOnline ? "You can receive new delivery requests." : "Go online to start receiving deliveries."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Activity */}
      <section className="mt-4 rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-sm">
        <h2 className="text-xl font-extrabold">Recent Deliveries</h2>
        <p className="mt-1 text-sm text-(--color-text-secondary)">Your most recently completed deliveries.</p>

        {loading ? (
          <SkeletonText lines={3} className="mt-4" />
        ) : recentDeliveries.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-(--color-border) bg-(--color-section-light) py-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-(--color-primary) shadow-sm">
              <FaClipboardList />
            </div>
            <p className="mt-3 font-semibold">No recent activity</p>
            <p className="mt-1 text-sm text-(--color-text-secondary)">
              Start accepting deliveries to see your activity here.
            </p>
          </div>
        ) : (
          <div className="mt-4 divide-y divide-(--color-border)">
            {recentDeliveries.map((order) => (
              <div key={order._id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{order.orderNumber || `#${order._id?.slice(-8)}`}</p>
                  <p className="text-xs text-(--color-text-secondary)">
                    {order?.restaurantId?.restaurantName || "Restaurant"} → {order?.userId?.fullName || "Customer"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                  Delivered
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default RiderOverview;
