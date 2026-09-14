import React, { useEffect, useMemo, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../Config/Api";
import { SearchInput, SkeletonRow, EmptyState, ErrorState, StatusBadge, PriceDisplay } from "../ui";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/admin/orders");
      setOrders(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (err) {
      console.log(err);
      setError(true);
      toast.error(err?.response?.data?.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter(
      (o) =>
        o.orderNumber?.toLowerCase().includes(term) ||
        o.userId?.fullName?.toLowerCase().includes(term) ||
        o.restaurantId?.restaurantName?.toLowerCase().includes(term)
    );
  }, [orders, search]);

  return (
    <div className="min-h-full overflow-y-auto bg-(--color-background)">
      <div className="mx-auto max-w-400 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-tight text-(--color-text) sm:text-4xl">
            All Orders
          </h1>
          <p className="mt-2 text-sm text-(--color-text-secondary) sm:text-base">
            Every order placed across the platform.
          </p>
        </div>

        <div className="rounded-[28px] border border-(--color-border) bg-white shadow-sm">
          <div className="border-b border-(--color-border) p-5 sm:p-6">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
              placeholder="Search by order #, customer or restaurant..."
              className="sm:max-w-sm"
            />
          </div>

          <div className="p-5 sm:p-6">
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonRow key={i} columns={5} />
                ))}
              </div>
            ) : error ? (
              <ErrorState
                title="Unable to load orders"
                description="Please check your connection and try again."
                onRetry={fetchOrders}
              />
            ) : filtered.length === 0 ? (
              <EmptyState icon={<FaShoppingBag />} title="No orders found" />
            ) : (
              <div className="divide-y divide-(--color-border)">
                {filtered.map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-bold text-(--color-text)">
                        {order.orderNumber || `#${order._id.slice(-8)}`}
                      </p>
                      <p className="truncate text-xs text-(--color-text-secondary)">
                        {order.userId?.fullName || "Customer"} → {order.restaurantId?.restaurantName || "Restaurant"}
                        {order.riderId?.fullName ? ` · Rider: ${order.riderId.fullName}` : ""}
                      </p>
                      <p className="text-xs text-(--color-text-muted)">
                        {new Date(order.createdAt).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <PriceDisplay amount={order.orderValue?.total || 0} />
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
