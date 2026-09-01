import React, { useEffect, useMemo, useState } from "react";
import {
FaClipboardList,
FaCheckCircle,
FaTimesCircle,
FaRupeeSign,
FaSearch,
FaFilter,
FaEye,
FaMotorcycle,
FaCalendarAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../../Config/Api";
import Loading from "../Loading";
import ViewDetailsModal from "./modals/ViewDetailsModal";

const RiderOrderHistory = () => {
const [orders, setOrders] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("all");

const [selectedOrder, setSelectedOrder] = useState(null);
const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);

const fetchOrderHistory = async () => {
setIsLoading(true);
try {
  const res = await api.get("/rider/orderHistory");

  const data = Array.isArray(res?.data?.data) ? res.data.data : [];

  setOrders(data);
} catch (error) {
  console.error("Error fetching rider order history:", error);

  setOrders([]);

  toast.error(
    error?.response?.data?.message ||
      "Unable to fetch order history"
  );
} finally {
  setIsLoading(false);
}
};

useEffect(() => {
fetchOrderHistory();
}, []);

const getStatusClass = (status = "") => {
const normalizedStatus = status.toLowerCase();

if (
  ["completed", "delivered"].includes(normalizedStatus)
) {
  return "bg-green-100 text-green-800";
}

if (
  ["cancelled", "rejected", "refused", "damaged"].includes(
    normalizedStatus
  )
) {
  return "bg-red-100 text-red-800";
}

if (
  ["ready", "pickedup", "ontheway", "processing"].includes(
    normalizedStatus
  )
) {
  return "bg-blue-100 text-blue-800";
}

return "bg-yellow-100 text-yellow-800";


};

const formatStatus = (status = "pending") => {
const formatted = status
.replace(/([A-Z])/g, " $1")
.replace(/[_-]/g, " ");


return formatted.charAt(0).toUpperCase() + formatted.slice(1);


};

const formatAmount = (value) => {
return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const formatDate = (date) => {
if (!date) return "N/A";

```
const parsedDate = new Date(date);

if (Number.isNaN(parsedDate.getTime())) {
  return "N/A";
}

return parsedDate.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
```

};

const filteredOrders = useMemo(() => {
return orders.filter((order) => {
const orderNumber =
order?.orderNumber ||
order?._id?.substring(0, 8) ||
"";


  const customer =
    order?.userId?.fullName ||
    "";

  const restaurant =
    order?.restaurantId?.restaurantName ||
    order?.restaurantId?.fullName ||
    "";

  const status =
    order?.status ||
    "";

  const searchValue = searchTerm.toLowerCase().trim();

  const matchesSearch =
    !searchValue ||
    orderNumber.toLowerCase().includes(searchValue) ||
    customer.toLowerCase().includes(searchValue) ||
    restaurant.toLowerCase().includes(searchValue);

  const matchesStatus =
    statusFilter === "all" ||
    status.toLowerCase() === statusFilter.toLowerCase();

  return matchesSearch && matchesStatus;
});


}, [orders, searchTerm, statusFilter]);

const historyStats = useMemo(() => {
const deliveredOrders = orders.filter((order) =>
["delivered", "completed"].includes(
order?.status?.toLowerCase()
)
);

const cancelledOrders = orders.filter((order) =>
  ["cancelled", "rejected", "refused", "damaged"].includes(
    order?.status?.toLowerCase()
  )
);

const totalEarnings = deliveredOrders.reduce(
  (sum, order) =>
    sum + Number(order?.orderValue?.total || 0),
  0
);

return {
  totalOrders: orders.length,
  deliveredOrders: deliveredOrders.length,
  cancelledOrders: cancelledOrders.length,
  totalEarnings,
};


}, [orders]);

if (isLoading) {
return ( <div className="h-full w-full"> <Loading /> </div>
);
}

return ( <div className="h-full overflow-y-auto rounded-[22px] bg-[radial-gradient(circle_at_5%_5%,rgba(246,189,96,0.3)_0%,transparent_38%),radial-gradient(circle_at_100%_0%,rgba(244,162,97,0.22)_0%,transparent_32%),linear-gradient(135deg,#FFF8F0,#FEF1E6)] p-4 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-(--color-text) sm:p-6">


  {/* Header */}
  <section className="relative overflow-hidden rounded-[22px] border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)] sm:p-6">

    <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-(--color-primary)/10 blur-3xl" />

    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-section-light) px-3 py-1 text-xs font-bold uppercase tracking-wide text-(--color-primary)">
          <FaMotorcycle />
          Rider Activity
        </p>

        <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">
          Order History
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-(--color-text-secondary) sm:text-base">
          Review your previous deliveries, earnings, customers,
          and order activity.
        </p>
      </div>

      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-(--color-border) bg-(--color-section-light) text-2xl text-(--color-primary)">
        <FaClipboardList />
      </div>
    </div>
  </section>

  {/* Stats */}
  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

    <div className="rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-(--color-text-secondary)">
            Total Orders
          </p>

          <p className="mt-2 text-3xl font-extrabold">
            {historyStats.totalOrders}
          </p>
        </div>

        <div className="grid h-12 w-12 place-items-center rounded-xl bg-(--color-section-light) text-xl text-(--color-primary)">
          <FaClipboardList />
        </div>
      </div>
    </div>

    <div className="rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-(--color-text-secondary)">
            Delivered
          </p>

          <p className="mt-2 text-3xl font-extrabold">
            {historyStats.deliveredOrders}
          </p>
        </div>

        <div className="grid h-12 w-12 place-items-center rounded-xl bg-green-50 text-xl text-green-700">
          <FaCheckCircle />
        </div>
      </div>
    </div>

    <div className="rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-(--color-text-secondary)">
            Cancelled
          </p>

          <p className="mt-2 text-3xl font-extrabold">
            {historyStats.cancelledOrders}
          </p>
        </div>

        <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-xl text-red-700">
          <FaTimesCircle />
        </div>
      </div>
    </div>

    <div className="rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-(--color-text-secondary)">
            Total Value
          </p>

          <p className="mt-2 text-3xl font-extrabold">
            {formatAmount(historyStats.totalEarnings)}
          </p>
        </div>

        <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-xl text-emerald-700">
          <FaRupeeSign />
        </div>
      </div>
    </div>
  </div>

  {/* Orders Section */}
  <section className="mt-4 rounded-2xl border border-(--color-border) bg-white/90 p-4 shadow-[0_18px_32px_rgba(125,76,46,0.1)] sm:p-5">

    {/* Section Header */}
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <h2 className="text-xl font-extrabold">
          Delivery History
        </h2>

        <p className="mt-1 text-sm text-(--color-text-secondary)">
          {filteredOrders.length} order
          {filteredOrders.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">

        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-(--color-text-secondary)" />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search orders..."
            className="w-full rounded-xl border border-(--color-border) bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-(--color-primary) sm:w-60"
          />
        </div>

        <div className="relative">
          <FaFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-(--color-text-secondary)" />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="w-full appearance-none rounded-xl border border-(--color-border) bg-white py-2.5 pl-9 pr-8 text-sm outline-none transition focus:border-(--color-primary) sm:w-44"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </div>

    {/* Table */}
    {filteredOrders.length === 0 ? (
      <div className="mt-5 rounded-2xl border border-dashed border-(--color-border) bg-(--color-section-light) px-4 py-14 text-center">

        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-xl text-(--color-primary) shadow-sm">
          <FaClipboardList />
        </div>

        <h3 className="mt-4 text-lg font-bold">
          {orders.length === 0
            ? "No order history yet"
            : "No matching orders"}
        </h3>

        <p className="mx-auto mt-1 max-w-md text-sm text-(--color-text-secondary)">
          {orders.length === 0
            ? "Your completed delivery orders will appear here once you start accepting and delivering orders."
            : "Try changing your search term or status filter to find an order."}
        </p>

        {orders.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
            className="mt-4 rounded-xl bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
          >
            Clear Filters
          </button>
        )}
      </div>
    ) : (
      <div className="mt-5 overflow-x-auto rounded-2xl border border-(--color-border)">

        <table className="w-full min-w-262.5 border-collapse">

          <thead>
            <tr className="border-b border-(--color-border) bg-(--color-section-light)">

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                Order
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                Customer
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                Restaurant
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                Amount
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                Status
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                Date
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                Action
              </th>

            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order, index) => {

              const orderNumber =
                order?.orderNumber ||
                order?._id?.substring(0, 8) ||
                "N/A";

              const customer =
                order?.userId?.fullName ||
                "Unknown";

              const restaurant =
                order?.restaurantId?.restaurantName ||
                order?.restaurantId?.fullName ||
                "Unknown";

              const status =
                order?.status ||
                "pending";

              return (
                <tr
                  key={order?._id || index}
                  className="border-b border-(--color-border) transition last:border-b-0 hover:bg-(--color-background)"
                >

                  {/* Order */}
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-bold text-(--color-text)">
                        {orderNumber}
                      </p>

                      <p className="mt-1 text-xs text-(--color-text-secondary)">
                        {order?.items?.length || 0} item
                        {order?.items?.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-4">
                    <p className="font-medium text-(--color-text)">
                      {customer}
                    </p>
                  </td>

                  {/* Restaurant */}
                  <td className="px-4 py-4">
                    <p className="font-medium text-(--color-text)">
                      {restaurant}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-4">
                    <p className="font-bold text-(--color-text)">
                      {formatAmount(
                        order?.orderValue?.total
                      )}
                    </p>

                    <p className="mt-1 text-xs capitalize text-(--color-text-secondary)">
                      {order?.orderValue?.paymentMethod ||
                        "N/A"}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                        status
                      )}`}
                    >
                      {formatStatus(status)}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                      <FaCalendarAlt className="text-(--color-secondary)" />
                      {formatDate(order?.createdAt)}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(order);
                        setViewDetailsModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-(--color-primary) px-3 py-2 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
                    >
                      <FaEye />
                      Details
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    )}
  </section>

  {/* Modal */}
  {viewDetailsModalOpen && selectedOrder && (
    <ViewDetailsModal
      order={selectedOrder}
      onClose={() => {
        setViewDetailsModalOpen(false);
        setSelectedOrder(null);
      }}
    />
  )}
</div>
);
};

export default RiderOrderHistory;
