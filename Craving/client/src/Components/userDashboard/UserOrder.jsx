import React, { useEffect, useMemo, useState } from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaShoppingBag,
  FaTruck,
  FaTimesCircle,
  FaChevronRight,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../Config/Api";
import toast from "react-hot-toast";
import Loading from "../Loading";

const UserOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchAllPlacedOrder = async () => {
    setIsLoading(true);

    try {
      const res = await api.get("/user/placedorders");

      setOrders(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (error) {
      console.log(error);
      setOrders([]);
      toast.error(
        error?.response?.data?.message || "Unable to fetch your orders"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlacedOrder();

    const interval = setInterval(() => {
      fetchAllPlacedOrder();
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const orderStats = useMemo(() => {
    const total = orders.length;

    const completed = orders.filter(
      (order) => order?.status === "completed"
    ).length;

    const pending = orders.filter(
      (order) =>
        order?.status === "pending" ||
        order?.status === "confirmed" ||
        order?.status === "preparing"
    ).length;

    const cancelled = orders.filter(
      (order) => order?.status === "cancelled"
    ).length;

    return {
      total,
      completed,
      pending,
      cancelled,
    };
  }, [orders]);

  const getStatusConfig = (status) => {
    const normalizedStatus = status?.toLowerCase();

    switch (normalizedStatus) {
      case "completed":
      case "delivered":
        return {
          label: status,
          className: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <FaCheckCircle />,
        };

      case "cancelled":
      case "canceled":
        return {
          label: status,
          className: "bg-red-50 text-red-700 border-red-200",
          icon: <FaTimesCircle />,
        };

      case "pending":
        return {
          label: status || "Pending",
          className: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <FaClock />,
        };

      case "confirmed":
      case "preparing":
      case "out for delivery":
        return {
          label: status,
          className: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <FaTruck />,
        };

      default:
        return {
          label: status || "Pending",
          className:
            "bg-(--color-section-light) text-(--color-text-secondary) border-(--color-border)",
          icon: <FaClock />,
        };
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-(--color-background)">
      <div className="min-h-full p-4 sm:p-6 lg:p-8">

        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-(--color-text) p-6 sm:p-8 shadow-xl">
          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-(--color-primary)/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-(--color-secondary)/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                <FaShoppingBag />
                Order History
              </div>

              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                My Orders
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                Track your orders, check delivery progress, and view your
                complete order history in one place.
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-4xl text-white backdrop-blur-md">
              <FaBoxOpen />
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                  Total Orders
                </p>
                <p className="mt-2 text-3xl font-black text-(--color-text)">
                  {orderStats.total}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-section-light) text-(--color-primary)">
                <FaShoppingBag />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                  Active
                </p>
                <p className="mt-2 text-3xl font-black text-blue-600">
                  {orderStats.pending}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaTruck />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                  Completed
                </p>
                <p className="mt-2 text-3xl font-black text-emerald-600">
                  {orderStats.completed}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FaCheckCircle />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                  Cancelled
                </p>
                <p className="mt-2 text-3xl font-black text-red-600">
                  {orderStats.cancelled}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <FaTimesCircle />
              </div>
            </div>
          </div>

        </div>

        {/* ================= ORDERS ================= */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-sm">

          <div className="flex flex-col gap-2 border-b border-(--color-border) p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-black text-(--color-text) sm:text-2xl">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-(--color-text-secondary)">
                Your latest food orders and delivery status
              </p>
            </div>

            <span className="w-fit rounded-full bg-(--color-section-light) px-3 py-1.5 text-xs font-semibold text-(--color-primary)">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>

          {/* EMPTY STATE */}
          {!orders || orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-(--color-section-light) text-3xl text-(--color-primary)">
                <FaShoppingBag />
              </div>

              <h3 className="mt-5 text-xl font-bold text-(--color-text)">
                No orders yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-(--color-text-secondary)">
                You haven't placed any orders yet. Once you order something,
                your order history will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[850px] border-collapse">
                  <thead>
                    <tr className="border-b border-(--color-border) bg-(--color-section-light)">
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                        Order
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                        Items
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                        Date
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order, idx) => {
                      const status = getStatusConfig(order?.status);

                      return (
                        <tr
                          key={order?._id || idx}
                          className="group border-b border-(--color-border) transition hover:bg-(--color-section-light)/50"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-section-light) text-(--color-primary)">
                                <FaBoxOpen />
                              </div>

                              <div>
                                <p className="font-bold text-(--color-text)">
                                  {order?.orderNumber ||
                                    `#${order?._id?.substring(0, 8)}`}
                                </p>

                                <p className="mt-0.5 text-xs text-(--color-text-secondary)">
                                  Order ID
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${status.className}`}
                            >
                              {status.icon}
                              {status.label}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <span className="font-bold text-(--color-text)">
                              ₹{Number(order?.orderValue?.total || 0).toLocaleString("en-IN")}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <span className="text-sm text-(--color-text-secondary)">
                              {order?.items?.length || 0}{" "}
                              {order?.items?.length === 1 ? "item" : "items"}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                              <FaCalendarAlt className="text-(--color-primary)" />
                              {formatDate(order?.createdAt)}
                            </div>
                          </td>

                          <td className="px-6 py-5 text-right">
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) hover:shadow-md"
                            >
                              Track
                              <FaChevronRight className="text-xs" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE / TABLET CARDS */}
              <div className="grid gap-4 p-4 sm:p-5 lg:hidden">
                {orders.map((order, idx) => {
                  const status = getStatusConfig(order?.status);

                  return (
                    <div
                      key={order?._id || idx}
                      className="rounded-2xl border border-(--color-border) bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3">

                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-section-light) text-(--color-primary)">
                            <FaBoxOpen />
                          </div>

                          <div>
                            <p className="font-bold text-(--color-text)">
                              {order?.orderNumber ||
                                `#${order?._id?.substring(0, 8)}`}
                            </p>

                            <p className="mt-0.5 text-xs text-(--color-text-secondary)">
                              {formatDate(order?.createdAt)}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${status.className}`}
                        >
                          {status.icon}
                          {status.label}
                        </span>
                      </div>

                      <div className="my-4 h-px bg-(--color-border)" />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-(--color-text-secondary)">
                            Total Amount
                          </p>

                          <p className="mt-1 font-bold text-(--color-text)">
                            ₹
                            {Number(
                              order?.orderValue?.total || 0
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-(--color-text-secondary)">
                            Items
                          </p>

                          <p className="mt-1 font-bold text-(--color-text)">
                            {order?.items?.length || 0}{" "}
                            {order?.items?.length === 1 ? "item" : "items"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-4 py-3 text-sm font-bold text-white transition hover:bg-(--color-primary-hover)"
                      >
                        Track Order
                        <FaChevronRight className="text-xs" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ================= BOTTOM INFO ================= */}
        {orders.length > 0 && (
          <div className="mt-6 rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-section-light) text-(--color-primary)">
                <FaTruck />
              </div>

              <div>
                <p className="font-bold text-(--color-text)">
                  Keep an eye on your active orders
                </p>

                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  Your order status is automatically refreshed so you can stay
                  updated on delivery progress.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserOrders;