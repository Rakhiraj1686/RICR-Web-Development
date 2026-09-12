import React, { useEffect, useMemo, useState } from "react";
import {
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUtensils,
  FaPhoneAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../Config/Api";
import { SkeletonRow, EmptyState, ErrorState, StatusBadge, Button } from "../ui";

const TABS = ["All", "Pending", "Accepted", "Preparing", "Ready", "Completed", "Cancelled"];

// What a restaurant is allowed to move an order to from its current status.
// pickedUp/onTheWay/delivered are the rider's job once food leaves the
// kitchen, so those transitions aren't offered here.
const NEXT_ACTIONS = {
  pending: [
    { label: "Accept", status: "accepted", variant: "primary" },
    { label: "Refuse", status: "refused", variant: "outline" },
  ],
  accepted: [{ label: "Start Preparing", status: "preparing", variant: "primary" }],
  preparing: [{ label: "Mark Ready", status: "ready", variant: "primary" }],
};

const matchesTab = (order, tab) => {
  if (tab === "All") return true;
  if (tab === "Completed") return order.status === "delivered";
  if (tab === "Cancelled") return ["cancelled", "refused", "damaged"].includes(order.status);
  return order.status?.toLowerCase() === tab.toLowerCase();
};

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await api.get("/restaurant/placedOrders");
      setOrders(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (error) {
      console.log(error);
      setLoadError(true);
      toast.error(error?.response?.data?.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const completed = orders.filter((o) => o.status === "delivered").length;
    const cancelled = orders.filter((o) =>
      ["cancelled", "refused", "damaged"].includes(o.status)
    ).length;
    return { total, pending, completed, cancelled };
  }, [orders]);

  const tabCounts = useMemo(
    () => Object.fromEntries(TABS.map((tab) => [tab, orders.filter((o) => matchesTab(o, tab)).length])),
    [orders]
  );

  const visibleOrders = useMemo(
    () => orders.filter((o) => matchesTab(o, activeTab)),
    [orders, activeTab]
  );

  const handleUpdateStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const res = await api.patch(`/restaurant/orders/${orderId}/status`, { status });
      toast.success(res?.data?.message || "Order updated.");
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Couldn't update this order.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statCards = [
    { title: "Total Orders", value: stats.total, icon: FaShoppingBag, iconBg: "bg-red-50", iconColor: "text-(--color-primary)" },
    { title: "Pending", value: stats.pending, icon: FaClock, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { title: "Completed", value: stats.completed, icon: FaCheckCircle, iconBg: "bg-green-50", iconColor: "text-green-600" },
    { title: "Cancelled", value: stats.cancelled, icon: FaTimesCircle, iconBg: "bg-red-50", iconColor: "text-red-500" },
  ];

  return (
    <div className="min-h-full overflow-y-auto bg-(--color-background)">
      <div className="mx-auto max-w-400 p-4 sm:p-6 lg:p-8">
        {/* HEADER */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary)">
              <FaShoppingBag />
              Order Management
            </div>
            <h1 className="text-3xl font-black tracking-tight text-(--color-text) sm:text-4xl">Orders</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-(--color-text-secondary) sm:text-base">
              Manage incoming orders, track their status and keep your customers updated.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => (
            <div key={stat.title} className="rounded-[22px] border border-(--color-border) bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-(--color-text-secondary)">{stat.title}</p>
                  <p className="mt-2 text-3xl font-black text-(--color-text)">{loading ? "—" : stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor} text-lg`}>
                  <stat.icon />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN PANEL */}
        <div className="rounded-[28px] border border-(--color-border) bg-white shadow-sm">
          <div className="border-b border-(--color-border) p-5 sm:p-6">
            <h2 className="text-xl font-extrabold tracking-tight text-(--color-text)">Order List</h2>
            <p className="mt-1 text-sm text-(--color-text-secondary)">
              View and manage all your restaurant orders.
            </p>

            <div className="mt-6 -mb-5 overflow-x-auto pb-1 scrollbar-hide">
              <div className="flex min-w-max gap-1">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? "bg-(--color-primary) text-white shadow-md"
                          : "text-(--color-text-secondary) hover:bg-(--color-background) hover:text-(--color-text)"
                      }`}
                    >
                      {tab}
                      <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-(--color-section-light) text-(--color-text-secondary)"}`}>
                        {tabCounts[tab] ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonRow key={i} columns={5} />
                ))}
              </div>
            ) : loadError ? (
              <ErrorState
                title="Unable to load orders"
                description="Please check your connection and try again."
                onRetry={fetchOrders}
              />
            ) : visibleOrders.length === 0 ? (
              <EmptyState
                icon={<FaShoppingBag />}
                title={`No ${activeTab === "All" ? "" : activeTab.toLowerCase()} orders`}
                description={
                  activeTab === "All"
                    ? "When customers place orders, they'll appear here."
                    : `There are currently no ${activeTab.toLowerCase()} orders.`
                }
              />
            ) : (
              <div className="space-y-3">
                {visibleOrders.map((order) => {
                  const actions = NEXT_ACTIONS[order.status] || [];
                  return (
                    <div
                      key={order._id}
                      className="flex flex-col gap-4 rounded-2xl border border-(--color-border) p-4 transition hover:border-(--color-primary)/30 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-section-light) text-(--color-primary)">
                          <FaUtensils />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-bold text-(--color-text)">
                            {order.orderNumber || `#${order._id?.slice(-8)}`}
                          </p>
                          <p className="truncate text-sm text-(--color-text-secondary)">
                            {order.userId?.fullName || "Customer"}
                            {order.userId?.mobileNumber && (
                              <span className="ml-2 inline-flex items-center gap-1 text-(--color-text-muted)">
                                <FaPhoneAlt size={9} /> {order.userId.mobileNumber}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-(--color-text-muted)">
                            {order.items?.length || 0} items · ₹{order.orderValue?.total || 0}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <StatusBadge status={order.status} />
                        {actions.map((action) => (
                          <Button
                            key={action.status}
                            size="sm"
                            variant={action.variant}
                            loading={updatingId === order._id}
                            onClick={() => handleUpdateStatus(order._id, action.status)}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOrders;
