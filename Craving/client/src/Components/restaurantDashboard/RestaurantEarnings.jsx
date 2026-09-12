import React, { useEffect, useMemo, useState } from "react";
import {
  FaWallet,
  FaClock,
  FaCheckCircle,
  FaReceipt,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../Config/Api";
import { SkeletonText, EmptyState, ErrorState } from "../ui";

const DAY_MS = 24 * 60 * 60 * 1000;

const RestaurantEarnings = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/restaurant/placedOrders");
      setOrders(Array.isArray(res?.data?.data) ? res.data.data : []);
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

  // Every number below is derived from real orders. There is no payout/
  // settlement model on the backend yet, so this intentionally does not
  // show a "next settlement date" or payout status — that would have to be
  // invented.
  const { totalEarnings, weekEarnings, avgOrderValue, billedCount, chartDays, paidOrders, inFlightValue } =
    useMemo(() => {
      const paid = orders.filter((o) => o?.orderValue?.paymentStatus === "paid");
      const delivered = paid.filter((o) => o.status === "delivered");
      const total = delivered.reduce((sum, o) => sum + Number(o.orderValue?.total || 0), 0);

      const now = Date.now();
      const weekOrders = delivered.filter((o) => now - new Date(o.createdAt).getTime() <= 7 * DAY_MS);
      const week = weekOrders.reduce((sum, o) => sum + Number(o.orderValue?.total || 0), 0);

      const inFlight = paid
        .filter((o) => !["delivered", "cancelled", "refused", "damaged"].includes(o.status))
        .reduce((sum, o) => sum + Number(o.orderValue?.total || 0), 0);

      const avg = delivered.length > 0 ? Math.round(total / delivered.length) : 0;

      // Last 7 days of revenue, oldest first, for the bar chart.
      const days = Array.from({ length: 7 }).map((_, i) => {
        const dayStart = new Date(now - (6 - i) * DAY_MS);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = dayStart.getTime() + DAY_MS;
        const dayTotal = delivered
          .filter((o) => {
            const t = new Date(o.createdAt).getTime();
            return t >= dayStart.getTime() && t < dayEnd;
          })
          .reduce((sum, o) => sum + Number(o.orderValue?.total || 0), 0);
        return { label: dayStart.toLocaleDateString("en-IN", { weekday: "short" }), value: dayTotal };
      });

      return {
        totalEarnings: total,
        weekEarnings: week,
        avgOrderValue: avg,
        billedCount: delivered.length,
        chartDays: days,
        paidOrders: delivered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8),
        inFlightValue: inFlight,
      };
    }, [orders]);

  const maxDayValue = Math.max(...chartDays.map((d) => d.value), 1);

  const stats = [
    { title: "Total Earnings", value: `₹${totalEarnings.toLocaleString("en-IN")}`, subtitle: "From delivered & paid orders", icon: FaWallet, iconBg: "bg-red-50", iconColor: "text-(--color-primary)" },
    { title: "This Week", value: `₹${weekEarnings.toLocaleString("en-IN")}`, subtitle: "Last 7 days", icon: FaChartLine, iconBg: "bg-green-50", iconColor: "text-green-600" },
    { title: "In Progress", value: `₹${inFlightValue.toLocaleString("en-IN")}`, subtitle: "Paid orders not yet delivered", icon: FaClock, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { title: "Avg. Order Value", value: `₹${avgOrderValue.toLocaleString("en-IN")}`, subtitle: `Across ${billedCount} delivered order${billedCount === 1 ? "" : "s"}`, icon: FaCheckCircle, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  ];

  if (error) {
    return (
      <div className="min-h-full bg-(--color-background) p-4 sm:p-6 lg:p-8">
        <ErrorState title="Unable to load earnings" description="Please check your connection and try again." onRetry={fetchOrders} className="rounded-3xl border border-(--color-border) bg-white" />
      </div>
    );
  }

  return (
    <div className="min-h-full overflow-y-auto bg-(--color-background)">
      <div className="mx-auto max-w-400 p-4 sm:p-6 lg:p-8">
        {/* HEADER */}
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary)">
            <FaWallet />
            Financial Dashboard
          </div>
          <h1 className="text-3xl font-black tracking-tight text-(--color-text) sm:text-4xl">
            Earnings & Transactions
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-(--color-text-secondary) sm:text-base">
            Revenue calculated from your restaurant's delivered and paid orders.
          </p>
        </div>

        {/* STATS */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.title} className="rounded-[22px] border border-(--color-border) bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-(--color-text-secondary)">{stat.title}</p>
                  {loading ? (
                    <SkeletonText className="mt-3 w-20" />
                  ) : (
                    <p className="mt-3 text-3xl font-black tracking-tight text-(--color-text)">{stat.value}</p>
                  )}
                  <p className="mt-2 text-xs font-medium text-(--color-text-muted)">{stat.subtitle}</p>
                </div>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor} text-lg`}>
                  <stat.icon />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* REVENUE CHART — real last-7-days data, simple inline bars */}
          <section className="rounded-[26px] border border-(--color-border) bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
                <FaChartLine />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-(--color-text) sm:text-xl">Last 7 Days</h2>
                <p className="mt-0.5 text-xs text-(--color-text-secondary)">Revenue from delivered orders, by day</p>
              </div>
            </div>

            {loading ? (
              <SkeletonText lines={4} className="mt-8" />
            ) : totalEarnings === 0 && weekEarnings === 0 ? (
              <div className="mt-6 flex min-h-52 items-center justify-center rounded-[22px] bg-(--color-background) text-center">
                <div className="max-w-sm px-5">
                  <p className="font-bold text-(--color-text)">No revenue yet</p>
                  <p className="mt-2 text-sm text-(--color-text-secondary)">
                    Your revenue chart will fill in as orders are delivered and paid.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-8 flex h-52 items-end justify-between gap-3 px-2">
                {chartDays.map((day) => (
                  <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-40 w-full items-end justify-center">
                      <div
                        className="w-full max-w-10 rounded-t-lg bg-(--color-primary) transition-all"
                        style={{ height: `${Math.max((day.value / maxDayValue) * 100, day.value > 0 ? 6 : 2)}%` }}
                        title={`₹${day.value}`}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-(--color-text-secondary)">{day.label}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SETTLEMENT — honest about what isn't tracked yet */}
          <section className="rounded-[26px] border border-(--color-border) bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <FaClock />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-(--color-text)">Payouts</h2>
                <p className="mt-0.5 text-xs text-(--color-text-secondary)">Settlement information</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-(--color-background) p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-(--color-text-muted)">
                Value tied up in active orders
              </p>
              <p className="mt-2 text-2xl font-black text-(--color-text)">
                ₹{inFlightValue.toLocaleString("en-IN")}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-(--color-text-secondary)">
                <FaCalendarAlt />
                From orders paid but not yet delivered
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-(--color-text-muted)">
              Automatic payout scheduling isn't set up for your account yet — reach out through
              the Help Desk for questions about a specific settlement.
            </p>
          </section>
        </div>

        {/* TRANSACTIONS — real delivered orders */}
        <section className="mt-6 rounded-[26px] border border-(--color-border) bg-white shadow-sm">
          <div className="border-b border-(--color-border) p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaReceipt />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-(--color-text) sm:text-xl">Recent Transactions</h2>
                <p className="mt-0.5 text-xs text-(--color-text-secondary)">Your most recently delivered, paid orders</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {loading ? (
              <SkeletonText lines={5} />
            ) : paidOrders.length === 0 ? (
              <EmptyState
                icon={<FaReceipt />}
                title="No transactions yet"
                description="Completed, paid orders will be listed here once your restaurant starts receiving payments."
              />
            ) : (
              <div className="divide-y divide-(--color-border)">
                {paidOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-(--color-text)">
                        {order.orderNumber || `#${order._id?.slice(-8)}`}
                      </p>
                      <p className="text-xs text-(--color-text-secondary)">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <p className="shrink-0 font-bold text-green-600">
                      +₹{Number(order.orderValue?.total || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FOOTER NOTE */}
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-(--color-border) bg-white p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
            <FaWallet className="text-sm" />
          </div>
          <p className="text-xs text-(--color-text-secondary)">
            Earnings are calculated from your delivered, paid restaurant orders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantEarnings;
