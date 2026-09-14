import React, { useCallback, useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBoxOpen,
  FaClock,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaPhoneAlt,
  FaRedoAlt,
  FaRupeeSign,
  FaShoppingBag,
  FaStore,
  FaUser,
  FaWifi,
} from "react-icons/fa";

import api from "../../Config/Api";
import Loading from "../Loading";
import ViewDetailsModal from "./modals/ViewDetailsModal";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Button } from "../ui";

const RiderCurrentOrder = () => {
  const { user } = useAuth();

  const [currentOrder, setCurrentOrder] = useState([]);
  const [availableOrder, setAvailableOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshingLocation, setIsRefreshingLocation] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [actionOrderId, setActionOrderId] = useState(null);
  const [riderLocation, setRiderLocation] = useState(
    user?.geoLocation || null,
  );

  const statusBadgeClass = (status = "") => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "delivered") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (
      ["cancelled", "rejected", "refused", "damaged"].includes(
        normalizedStatus,
      )
    ) {
      return "bg-red-50 text-red-700 border-red-200";
    }

    if (
      ["ready", "pickedup", "ontheway", "picked_up", "on_the_way"].includes(
        normalizedStatus,
      )
    ) {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const statusDotClass = (status = "") => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "delivered") {
      return "bg-emerald-500";
    }

    if (
      ["cancelled", "rejected", "refused", "damaged"].includes(
        normalizedStatus,
      )
    ) {
      return "bg-red-500";
    }

    if (
      ["ready", "pickedup", "ontheway", "picked_up", "on_the_way"].includes(
        normalizedStatus,
      )
    ) {
      return "bg-blue-500";
    }

    return "bg-amber-500";
  };

  const formatStatus = (status = "pending") => {
    const formatted = String(status)
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .trim();

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const getOrderNumber = (order) => {
    return order?.orderNumber || order?._id?.substring(0, 8) || "N/A";
  };

  const getCustomerName = (order) => {
    return order?.userId?.fullName || "Unknown Customer";
  };

  const getRestaurantName = (order) => {
    return (
      order?.restaurantId?.restaurantName ||
      order?.restaurantId?.fullName ||
      "Unknown Restaurant"
    );
  };

  const refreshLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    setIsRefreshingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        setRiderLocation(location);
        setIsRefreshingLocation(false);
      },
      (error) => {
        console.error("Error fetching rider location:", error);
        setIsRefreshingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  const fetchOngoingOrder = useCallback(async () => {
    setIsLoading(true);

    try {
      let response = await api.get("/rider/ongoingOrder");

      const ongoingOrders = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      if (ongoingOrders.length > 0) {
        setCurrentOrder(ongoingOrders);
        setAvailableOrder([]);
      } else {
        setCurrentOrder([]);

        if (riderLocation) {
          response = await api.post("/rider/availableOrder", riderLocation);

          setAvailableOrder(
            Array.isArray(response?.data?.data) ? response.data.data : [],
          );
        } else {
          setAvailableOrder([]);
        }
      }
    } catch (error) {
      console.error("Error fetching current order:", error);
      setCurrentOrder([]);
      setAvailableOrder([]);
    } finally {
      setIsLoading(false);
    }
  }, [riderLocation]);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  useEffect(() => {
    fetchOngoingOrder();

    const interval = setInterval(() => {
      fetchOngoingOrder();
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, [fetchOngoingOrder]);

  const handleAcceptOrder = async (orderId) => {
    setActionOrderId(orderId);
    try {
      const res = await api.patch(`/rider/orders/${orderId}/accept`);
      toast.success(res?.data?.message || "Order accepted");
      fetchOngoingOrder();
    } catch (error) {
      toast.error(error?.response?.data?.message || "This order is no longer available.");
      fetchOngoingOrder();
    } finally {
      setActionOrderId(null);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    setActionOrderId(orderId);
    try {
      const res = await api.patch(`/rider/orders/${orderId}/status`, { status });
      toast.success(res?.data?.message || "Order updated");
      setCurrentOrder((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Couldn't update this order.");
    } finally {
      setActionOrderId(null);
    }
  };

  // What a rider can do next, based on the order's current status.
  const getNextAction = (status) => {
    if (status === "pickedUp") return { label: "Mark On The Way", nextStatus: "onTheWay" };
    if (status === "onTheWay") return { label: "Mark Delivered", nextStatus: "delivered" };
    return null;
  };

  if (isLoading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="h-full overflow-y-auto bg-(--color-background) p-4 sm:p-6">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          {/* ================= HEADER ================= */}
          <section className="relative overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-sm">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-(--color-primary)/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-(--color-secondary)/10 blur-3xl" />

            <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--color-primary)/10 text-(--color-primary)">
                    <FaMotorcycle />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                      Rider Dashboard
                    </p>

                    <h1 className="text-2xl font-black tracking-tight text-(--color-text) sm:text-3xl">
                      Current Orders
                    </h1>
                  </div>
                </div>

                <p className="max-w-2xl text-sm text-(--color-text-secondary) sm:text-base">
                  Manage your active delivery and discover nearby orders
                  available for pickup.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-(--color-border) bg-(--color-section-light) px-4 py-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>

                  <span className="text-sm font-semibold text-(--color-text)">
                    Online
                  </span>
                </div>

                <button
                  type="button"
                  onClick={refreshLocation}
                  disabled={isRefreshingLocation}
                  className="inline-flex items-center gap-2 rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaRedoAlt
                    className={isRefreshingLocation ? "animate-spin" : ""}
                  />
                  {isRefreshingLocation
                    ? "Updating..."
                    : "Refresh Location"}
                </button>
              </div>
            </div>
          </section>

          {/* ================= SUMMARY ================= */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-(--color-text-secondary)">
                    Active Delivery
                  </p>

                  <p className="mt-1 text-2xl font-black text-(--color-text)">
                    {currentOrder.length}
                  </p>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <FaMotorcycle />
                </div>
              </div>

              <p className="mt-3 text-xs text-(--color-text-secondary)">
                Currently assigned to you
              </p>
            </div>

            <div className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-(--color-text-secondary)">
                    Nearby Orders
                  </p>

                  <p className="mt-1 text-2xl font-black text-(--color-text)">
                    {availableOrder.length}
                  </p>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-xl bg-(--color-section-light) text-(--color-secondary)">
                  <FaBoxOpen />
                </div>
              </div>

              <p className="mt-3 text-xs text-(--color-text-secondary)">
                Orders available for pickup
              </p>
            </div>

            <div className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-(--color-text-secondary)">
                    Location Status
                  </p>

                  <p className="mt-1 text-2xl font-black text-emerald-600">
                    {riderLocation ? "Active" : "Unavailable"}
                  </p>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FaMapMarkerAlt />
                </div>
              </div>

              <p className="mt-3 text-xs text-(--color-text-secondary)">
                Used to find nearby deliveries
              </p>
            </div>
          </section>

          {/* ================= ACTIVE ORDER ================= */}
          {currentOrder.length > 0 && (
            <section className="space-y-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-(--color-text)">
                    Active Delivery
                  </h2>

                  <p className="text-sm text-(--color-text-secondary)">
                    Your currently assigned delivery orders.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-(--color-text-secondary)">
                  <FaWifi className="text-emerald-500" />
                  Live updates enabled
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {currentOrder.map((order, index) => (
                  <article
                    key={order?._id || index}
                    className="overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {/* Card Header */}
                    <div className="border-b border-(--color-border) bg-(--color-section-light) p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                            Order Number
                          </p>

                          <h3 className="mt-1 text-lg font-black text-(--color-text)">
                            #{getOrderNumber(order)}
                          </h3>
                        </div>

                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${statusBadgeClass(
                            order?.status,
                          )}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${statusDotClass(
                              order?.status,
                            )}`}
                          />

                          {formatStatus(order?.status)}
                        </span>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="p-5">
                      <div className="relative space-y-5">
                        <div className="absolute left-5 top-8 bottom-8 w-px border-l border-dashed border-(--color-border)" />

                        <div className="relative flex items-start gap-4">
                          <div className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
                            <FaStore />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                              Pickup
                            </p>

                            <p className="mt-1 truncate font-bold text-(--color-text)">
                              {getRestaurantName(order)}
                            </p>

                            <p className="mt-0.5 text-sm text-(--color-text-secondary)">
                              Restaurant
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-start gap-4">
                          <div className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-(--color-secondary)/10 text-(--color-secondary)">
                            <FaMapMarkerAlt />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                              Delivery
                            </p>

                            <p className="mt-1 font-bold text-(--color-text)">
                              {getCustomerName(order)}
                            </p>

                            <p className="mt-0.5 text-sm text-(--color-text-secondary)">
                              Customer
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Information */}
                      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-(--color-border) bg-(--color-section-light) p-3">
                          <div className="flex items-center gap-2 text-(--color-text-secondary)">
                            <FaRupeeSign className="text-xs" />
                            <span className="text-xs font-semibold">
                              Total
                            </span>
                          </div>

                          <p className="mt-1 font-black text-(--color-text)">
                            {formatAmount(order?.orderValue?.total)}
                          </p>
                        </div>

                        <div className="rounded-xl border border-(--color-border) bg-(--color-section-light) p-3">
                          <div className="flex items-center gap-2 text-(--color-text-secondary)">
                            <FaShoppingBag className="text-xs" />
                            <span className="text-xs font-semibold">
                              Items
                            </span>
                          </div>

                          <p className="mt-1 font-black text-(--color-text)">
                            {order?.items?.length || 0}
                          </p>
                        </div>

                        <div className="rounded-xl border border-(--color-border) bg-(--color-section-light) p-3">
                          <div className="flex items-center gap-2 text-(--color-text-secondary)">
                            <FaCreditCardIcon />
                            <span className="text-xs font-semibold">
                              Payment
                            </span>
                          </div>

                          <p className="mt-1 truncate font-black capitalize text-(--color-text)">
                            {order?.orderValue?.paymentMethod || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-xl border border-(--color-border) p-3">
                          <div className="grid h-9 w-9 place-items-center rounded-lg bg-(--color-section-light) text-(--color-primary)">
                            <FaClock />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs text-(--color-text-secondary)">
                              Placed On
                            </p>

                            <p className="truncate text-sm font-semibold text-(--color-text)">
                              {formatDate(order?.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-(--color-border) p-3">
                          <div className="grid h-9 w-9 place-items-center rounded-lg bg-(--color-section-light) text-(--color-secondary)">
                            <FaUser />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs text-(--color-text-secondary)">
                              Customer
                            </p>

                            <p className="truncate text-sm font-semibold text-(--color-text)">
                              {getCustomerName(order)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        {order?.userId?.mobileNumber && (
                          <a
                            href={`tel:${order.userId.mobileNumber}`}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-(--color-border) px-4 py-3 text-sm font-bold text-(--color-text) transition hover:bg-(--color-section-light)"
                          >
                            <FaPhoneAlt />
                            Call Customer
                          </a>
                        )}

                        {getNextAction(order?.status) && (
                          <Button
                            size="md"
                            className="flex-1"
                            loading={actionOrderId === order._id}
                            onClick={() =>
                              handleUpdateStatus(order._id, getNextAction(order.status).nextStatus)
                            }
                          >
                            {getNextAction(order.status).label}
                          </Button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setViewDetailsModalOpen(true);
                          }}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-(--color-border) px-4 py-3 text-sm font-bold text-(--color-text) transition hover:bg-(--color-section-light)"
                        >
                          View Full Details
                          <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ================= AVAILABLE ORDERS ================= */}
          {currentOrder.length === 0 && availableOrder.length > 0 && (
            <section className="space-y-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-(--color-text)">
                    Available Near You
                  </h2>

                  <p className="text-sm text-(--color-text-secondary)">
                    Pick a delivery that works best for you.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-(--color-section-light) px-3 py-1 text-xs font-bold text-(--color-primary)">
                  {availableOrder.length}{" "}
                  {availableOrder.length === 1 ? "Order" : "Orders"} Available
                </span>
              </div>

              {/* Desktop Table */}
              <div className="hidden overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-sm lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-237.5 border-collapse">
                    <thead>
                      <tr className="border-b border-(--color-border) bg-(--color-section-light)">
                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                          Order
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                          Customer
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                          Restaurant
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                          Amount
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                          Items
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                          Distance
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                          Status
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {availableOrder.map((order, index) => (
                        <tr
                          key={order?._id || index}
                          className="border-b border-(--color-border) last:border-b-0 transition hover:bg-(--color-section-light)/60"
                        >
                          <td className="px-5 py-4">
                            <p className="font-bold text-(--color-text)">
                              #{getOrderNumber(order)}
                            </p>

                            <p className="mt-1 text-xs text-(--color-text-secondary)">
                              {formatDate(order?.createdAt)}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <span className="grid h-9 w-9 place-items-center rounded-full bg-(--color-section-light) text-(--color-primary)">
                                <FaUser className="text-xs" />
                              </span>

                              <span className="text-sm font-semibold text-(--color-text)">
                                {getCustomerName(order)}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <span className="grid h-9 w-9 place-items-center rounded-full bg-(--color-secondary)/10 text-(--color-secondary)">
                                <FaStore className="text-xs" />
                              </span>

                              <span className="max-w-45 truncate text-sm font-semibold text-(--color-text)">
                                {getRestaurantName(order)}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="font-black text-(--color-text)">
                              {formatAmount(order?.orderValue?.total)}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-(--color-text-secondary)">
                            {order?.items?.length || 0}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-(--color-text)">
                              <FaMapMarkerAlt className="text-(--color-primary)" />
                              {order?.distanceFromRider || 0} km
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${statusBadgeClass(
                                order?.status,
                              )}`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${statusDotClass(
                                  order?.status,
                                )}`}
                              />

                              {formatStatus(order?.status)}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                loading={actionOrderId === order._id}
                                onClick={() => handleAcceptOrder(order._id)}
                              >
                                Accept
                              </Button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setViewDetailsModalOpen(true);
                                }}
                                className="inline-flex items-center gap-2 rounded-xl border border-(--color-border) px-4 py-2.5 text-sm font-bold text-(--color-text) transition hover:bg-(--color-section-light)"
                              >
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile / Tablet Cards */}
              <div className="grid grid-cols-1 gap-4 lg:hidden">
                {availableOrder.map((order, index) => (
                  <article
                    key={order?._id || index}
                    className="rounded-2xl border border-(--color-border) bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                          Order
                        </p>

                        <h3 className="mt-1 font-black text-(--color-text)">
                          #{getOrderNumber(order)}
                        </h3>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${statusBadgeClass(
                          order?.status,
                        )}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusDotClass(
                            order?.status,
                          )}`}
                        />

                        {formatStatus(order?.status)}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-(--color-section-light) text-(--color-primary)">
                          <FaUser className="text-xs" />
                        </span>

                        <div className="min-w-0">
                          <p className="text-xs text-(--color-text-secondary)">
                            Customer
                          </p>

                          <p className="truncate text-sm font-bold text-(--color-text)">
                            {getCustomerName(order)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-(--color-secondary)/10 text-(--color-secondary)">
                          <FaStore className="text-xs" />
                        </span>

                        <div className="min-w-0">
                          <p className="text-xs text-(--color-text-secondary)">
                            Restaurant
                          </p>

                          <p className="truncate text-sm font-bold text-(--color-text)">
                            {getRestaurantName(order)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-(--color-section-light) p-3">
                        <p className="text-[11px] text-(--color-text-secondary)">
                          Amount
                        </p>

                        <p className="mt-1 text-sm font-black text-(--color-text)">
                          {formatAmount(order?.orderValue?.total)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-(--color-section-light) p-3">
                        <p className="text-[11px] text-(--color-text-secondary)">
                          Items
                        </p>

                        <p className="mt-1 text-sm font-black text-(--color-text)">
                          {order?.items?.length || 0}
                        </p>
                      </div>

                      <div className="rounded-xl bg-(--color-section-light) p-3">
                        <p className="text-[11px] text-(--color-text-secondary)">
                          Distance
                        </p>

                        <p className="mt-1 text-sm font-black text-(--color-text)">
                          {order?.distanceFromRider || 0} km
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button
                        size="md"
                        className="flex-1"
                        loading={actionOrderId === order._id}
                        onClick={() => handleAcceptOrder(order._id)}
                      >
                        Accept
                      </Button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOrder(order);
                          setViewDetailsModalOpen(true);
                        }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-(--color-border) px-4 py-3 text-sm font-bold text-(--color-text) transition hover:bg-(--color-section-light)"
                      >
                        Details
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ================= EMPTY STATE ================= */}
          {currentOrder.length === 0 && availableOrder.length === 0 && (
            <section className="flex min-h-105 items-center justify-center rounded-3xl border border-dashed border-(--color-border) bg-white p-8">
              <div className="max-w-md text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-(--color-section-light) text-(--color-primary)">
                  <FaMotorcycle className="text-3xl" />
                </div>

                <h2 className="mt-5 text-xl font-black text-(--color-text)">
                  No Orders Available
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--color-text-secondary)">
                  There are no active or nearby delivery orders right now.
                  Keep your location enabled and check again shortly.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    refreshLocation();
                    fetchOngoingOrder();
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-(--color-primary) px-5 py-3 text-sm font-bold text-white transition hover:bg-(--color-primary-hover)"
                >
                  <FaRedoAlt />
                  Check Again
                </button>
              </div>
            </section>
          )}

          {/* ================= LOCATION FOOTER ================= */}
          <div className="flex flex-col gap-3 rounded-2xl border border-(--color-border) bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <FaMapMarkerAlt />
              </div>

              <div>
                <p className="text-sm font-bold text-(--color-text)">
                  Location Tracking
                </p>

                <p className="text-xs text-(--color-text-secondary)">
                  {riderLocation
                    ? "Your current location is being used to find nearby orders."
                    : "Location unavailable. Please enable location access."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={refreshLocation}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-(--color-border) px-4 py-2 text-sm font-semibold text-(--color-text) transition hover:bg-(--color-section-light)"
            >
              <FaRedoAlt
                className={isRefreshingLocation ? "animate-spin" : ""}
              />
              Update Location
            </button>
          </div>
        </div>
      </div>

      {/* ================= VIEW DETAILS MODAL ================= */}
      {viewDetailsModalOpen && selectedOrder && (
        <ViewDetailsModal
          order={selectedOrder}
          onClose={() => {
            setViewDetailsModalOpen(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </>
  );
};

/* Small local icon wrapper so the payment section remains consistent */
const FaCreditCardIcon = () => (
  <span className="text-xs">₹</span>
);

export default RiderCurrentOrder;