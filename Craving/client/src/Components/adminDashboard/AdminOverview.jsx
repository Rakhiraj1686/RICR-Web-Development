import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaStore,
  FaMotorcycle,
  FaShoppingBag,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaBan,
} from "react-icons/fa";
import api from "../../Config/Api";
import { SkeletonText, ErrorState } from "../ui";

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/admin/stats");
      setStats(res?.data?.data || null);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    { title: "Customers", value: stats?.totalCustomers, icon: FaUsers, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { title: "Restaurants", value: stats?.totalRestaurants, icon: FaStore, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { title: "Riders", value: stats?.totalRiders, icon: FaMotorcycle, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
    { title: "Total Orders", value: stats?.totalOrders, icon: FaShoppingBag, iconBg: "bg-red-50", iconColor: "text-(--color-primary)" },
    { title: "Platform Revenue", value: stats ? `₹${stats.totalRevenue.toLocaleString("en-IN")}` : undefined, icon: FaRupeeSign, iconBg: "bg-green-50", iconColor: "text-green-600" },
    { title: "Active Orders", value: stats?.pendingOrders, icon: FaClock, iconBg: "bg-amber-50", iconColor: "text-amber-600" },
    { title: "Delivered Orders", value: stats?.deliveredOrders, icon: FaCheckCircle, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { title: "Blocked Accounts", value: stats?.blockedAccounts, icon: FaBan, iconBg: "bg-gray-100", iconColor: "text-gray-600" },
  ];

  if (error) {
    return (
      <div className="min-h-full bg-(--color-background) p-4 sm:p-6 lg:p-8">
        <ErrorState
          title="Unable to load platform stats"
          description="Please check your connection and try again."
          onRetry={fetchStats}
          className="rounded-3xl border border-(--color-border) bg-white"
        />
      </div>
    );
  }

  return (
    <div className="min-h-full overflow-y-auto bg-(--color-background)">
      <div className="mx-auto max-w-400 p-4 sm:p-6 lg:p-8">
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary)">
            <FaUsers />
            Platform Overview
          </div>
          <h1 className="text-3xl font-black tracking-tight text-(--color-text) sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-(--color-text-secondary) sm:text-base">
            A real-time snapshot of everyone and everything on Craving.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-[22px] border border-(--color-border) bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-(--color-text-secondary)">{card.title}</p>
                  {loading ? (
                    <SkeletonText className="mt-3 w-16" />
                  ) : (
                    <p className="mt-3 text-3xl font-black tracking-tight text-(--color-text)">
                      {card.value ?? 0}
                    </p>
                  )}
                </div>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor} text-lg`}>
                  <card.icon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
