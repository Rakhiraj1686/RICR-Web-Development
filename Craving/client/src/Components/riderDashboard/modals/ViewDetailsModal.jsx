import React from "react";
import {
  FaTimes,
  FaReceipt,
  FaUser,
  FaStore,
  FaRupeeSign,
  FaCreditCard,
  FaCalendarAlt,
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const ViewDetailsModal = ({ order, onClose }) => {
  const status = order?.status?.toLowerCase() || "pending";
  const paymentStatus =
    order?.orderValue?.paymentStatus?.toLowerCase() || "pending";

  const getStatusStyle = () => {
    if (status === "completed" || status === "delivered") {
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: <FaCheckCircle />,
      };
    }

    if (status === "cancelled") {
      return {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: <FaTimesCircle />,
      };
    }

    return {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: <FaClock />,
    };
  };

  const statusStyle = getStatusStyle();

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const items = Array.isArray(order?.items) ? order.items : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden border-b border-(--color-border) bg-(--color-section-light) px-5 py-5 sm:px-6">
          <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-(--color-primary)/10" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-(--color-primary) text-white shadow-md">
                <FaReceipt />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                  Order Details
                </p>

                <h2 className="mt-1 text-xl font-black text-(--color-text) sm:text-2xl">
                  #{order?.orderNumber || order?._id?.substring(0, 8) || "N/A"}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-(--color-text-secondary) shadow-sm transition hover:bg-red-50 hover:text-red-600"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="overflow-y-auto p-5 sm:p-6">
          <div className="space-y-5">

            {/* ================= STATUS ================= */}
            <div
              className={`flex flex-col gap-3 rounded-2xl border ${statusStyle.border} ${statusStyle.bg} p-4 sm:flex-row sm:items-center sm:justify-between`}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                  Order Status
                </p>

                <div
                  className={`mt-1 flex items-center gap-2 text-base font-black capitalize ${statusStyle.text}`}
                >
                  {statusStyle.icon}
                  {status}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                  Order Date
                </p>

                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-(--color-text)">
                  <FaCalendarAlt className="text-(--color-primary)" />
                  {formatDate(order?.createdAt)}
                </p>
              </div>
            </div>

            {/* ================= INFORMATION CARDS ================= */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Customer */}
              <div className="rounded-2xl border border-(--color-border) bg-[#fafafa] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <FaUser />
                  </div>

                  <h3 className="font-bold text-(--color-text)">
                    Customer
                  </h3>
                </div>

                <p className="text-sm font-semibold text-(--color-text)">
                  {order?.userId?.fullName || "Unknown Customer"}
                </p>

                {order?.userId?.email && (
                  <p className="mt-1 text-xs text-(--color-text-secondary)">
                    {order.userId.email}
                  </p>
                )}
              </div>

              {/* Restaurant */}
              <div className="rounded-2xl border border-(--color-border) bg-[#fafafa] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-50 text-orange-600">
                    <FaStore />
                  </div>

                  <h3 className="font-bold text-(--color-text)">
                    Restaurant
                  </h3>
                </div>

                <p className="text-sm font-semibold text-(--color-text)">
                  {order?.restaurantId?.restaurantName ||
                    order?.restaurantId?.fullName ||
                    "Unknown Restaurant"}
                </p>
              </div>
            </div>

            {/* ================= PAYMENT ================= */}
            <div className="rounded-2xl border border-(--color-border) bg-white p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FaCreditCard />
                  </div>

                  <h3 className="font-bold text-(--color-text)">
                    Payment Information
                  </h3>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                    paymentStatus === "paid"
                      ? "bg-emerald-100 text-emerald-700"
                      : paymentStatus === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {paymentStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-(--color-section-light) p-3">
                  <p className="text-xs text-(--color-text-secondary)">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-bold capitalize text-(--color-text)">
                    {order?.orderValue?.paymentMethod || "N/A"}
                  </p>
                </div>

                <div className="rounded-xl bg-(--color-section-light) p-3">
                  <p className="text-xs text-(--color-text-secondary)">
                    Total Amount
                  </p>

                  <p className="mt-1 flex items-center text-lg font-black text-(--color-primary)">
                    <FaRupeeSign className="mr-1 text-sm" />
                    {Number(order?.orderValue?.total || 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= ORDER ITEMS ================= */}
            <div className="rounded-2xl border border-(--color-border) bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-purple-50 text-purple-600">
                    <FaBoxOpen />
                  </div>

                  <h3 className="font-bold text-(--color-text)">
                    Order Items
                  </h3>
                </div>

                <span className="rounded-full bg-(--color-section-light) px-3 py-1 text-xs font-bold text-(--color-text-secondary)">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-(--color-border) bg-(--color-section-light) py-8 text-center">
                  <FaBoxOpen className="mx-auto text-2xl text-(--color-text-secondary)" />

                  <p className="mt-2 text-sm font-medium text-(--color-text-secondary)">
                    No item details available
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((item, index) => {
                    const itemName =
                      item?.foodName ||
                      item?.name ||
                      item?.foodId?.foodName ||
                      item?.foodId?.name ||
                      "Food Item";

                    const quantity = item?.quantity || 1;

                    const price =
                      item?.price ||
                      item?.amount ||
                      item?.foodId?.price ||
                      0;

                    return (
                      <div
                        key={item?._id || index}
                        className="flex items-center justify-between gap-4 rounded-xl border border-(--color-border) bg-[#fafafa] p-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-xs font-black text-(--color-primary) shadow-sm">
                            {quantity}×
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-(--color-text)">
                              {itemName}
                            </p>

                            <p className="mt-0.5 text-xs text-(--color-text-secondary)">
                              Quantity: {quantity}
                            </p>
                          </div>
                        </div>

                        <p className="shrink-0 text-sm font-bold text-(--color-text)">
                          ₹
                          {Number(price * quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ================= TOTAL ================= */}
            <div className="rounded-2xl bg-(--color-primary) p-5 text-white shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white/75">
                    Grand Total
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    ₹
                    {Number(
                      order?.orderValue?.total || 0
                    ).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-xl">
                  <FaRupeeSign />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-end border-t border-(--color-border) bg-[#fafafa] px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-(--color-text) px-5 py-2.5 text-sm font-bold text-white transition duration-300 hover:bg-(--color-primary)"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;