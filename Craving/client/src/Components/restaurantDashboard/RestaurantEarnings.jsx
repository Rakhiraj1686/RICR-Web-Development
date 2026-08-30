import React, { useState } from "react";
import {
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaClock,
  FaCheckCircle,
  FaReceipt,
  FaChartLine,
  FaCalendarAlt,
  FaDownload,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";

const RestaurantEarnings = () => {
  const [period, setPeriod] = useState("This Week");

  const stats = [
    {
      title: "Total Earnings",
      value: "₹0",
      subtitle: "All-time revenue",
      icon: FaWallet,
      iconBg: "bg-red-50",
      iconColor: "text-[--color-primary]",
    },
    {
      title: "This Week",
      value: "₹0",
      subtitle: "Weekly revenue",
      icon: FaChartLine,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Settlement",
      value: "₹0",
      subtitle: "Awaiting settlement",
      icon: FaClock,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Completed Payouts",
      value: "₹0",
      subtitle: "Successfully settled",
      icon: FaCheckCircle,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="min-h-full overflow-y-auto bg-[#FFF8F0]">
      <div className="mx-auto max-w-400 p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[--color-primary]">
              <FaWallet />
              Financial Dashboard
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#1F2937] sm:text-4xl">
              Earnings & Transactions
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
              Track your restaurant revenue, payouts and settlement
              history from one place.
            </p>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-bold text-[#374151] shadow-sm transition-all duration-200 hover:border-[--color-primary]/30 hover:bg-[#FFF8F0]"
          >
            <FaDownload className="text-xs" />
            Export Report
          </button>

        </div>


        {/* =====================================================
            EARNINGS SUMMARY
        ====================================================== */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group relative overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FFF8F0] transition-transform duration-500 group-hover:scale-150" />

                <div className="relative flex items-start justify-between">

                  <div>
                    <p className="text-sm font-semibold text-[#6B7280]">
                      {stat.title}
                    </p>

                    <p className="mt-3 text-3xl font-black tracking-tight text-[#1F2937]">
                      {stat.value}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-xs font-medium text-[#9CA3AF]">
                        {stat.subtitle}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor} text-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon />
                  </div>

                </div>

              </div>
            );
          })}

        </div>


        {/* =====================================================
            MAIN GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ===================================================
              REVENUE CHART
          ==================================================== */}
          <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div>
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E7] text-[--color-primary]">
                    <FaChartLine />
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold text-[#1F2937] sm:text-xl">
                      Revenue Overview
                    </h2>

                    <p className="mt-0.5 text-xs text-[#6B7280]">
                      Track your earnings over time
                    </p>
                  </div>

                </div>
              </div>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="rounded-xl border border-[#E5E7EB] bg-[#FFF8F0] px-4 py-2.5 text-sm font-semibold text-[#374151] outline-none transition focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/10"
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>

            </div>


            {/* Chart Placeholder */}
            <div className="relative mt-6 flex min-h-82.5 items-center justify-center overflow-hidden rounded-[22px] bg-[#FFF8F0]">

              {/* Decorative chart lines */}
              <div className="absolute inset-x-8 top-12 space-y-12 opacity-40">
                <div className="border-t border-dashed border-[#D1D5DB]" />
                <div className="border-t border-dashed border-[#D1D5DB]" />
                <div className="border-t border-dashed border-[#D1D5DB]" />
                <div className="border-t border-dashed border-[#D1D5DB]" />
              </div>

              <div className="relative z-10 max-w-sm px-6 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <FaChartLine className="text-xl text-[--color-primary]" />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-[#1F2937]">
                  Revenue data will appear here
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  Your earnings chart will automatically display once
                  transaction data becomes available.
                </p>

              </div>

            </div>

          </section>


          {/* ===================================================
              SETTLEMENT CARD
          ==================================================== */}
          <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <FaClock />
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-[#1F2937]">
                  Settlement
                </h2>

                <p className="mt-0.5 text-xs text-[#6B7280]">
                  Payout information
                </p>
              </div>

            </div>


            <div className="mt-6 rounded-2xl bg-[#FFF8F0] p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                Pending Amount
              </p>

              <div className="mt-2 flex items-center gap-1">

                <FaRupeeSign className="text-xl text-[#1F2937]" />

                <span className="text-3xl font-black text-[#1F2937]">
                  0
                </span>

              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-[#6B7280]">
                <FaCalendarAlt />
                No pending settlements
              </div>

            </div>


            <div className="mt-4 space-y-3">

              <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-3">
                <span className="text-xs font-medium text-[#6B7280]">
                  Next settlement
                </span>

                <span className="text-xs font-bold text-[#374151]">
                  No data
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-3">
                <span className="text-xs font-medium text-[#6B7280]">
                  Settlement status
                </span>

                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-500">
                  No transactions
                </span>
              </div>

            </div>

          </section>

        </div>


        {/* =====================================================
            TRANSACTIONS
        ====================================================== */}
        <section className="mt-6 rounded-[26px] border border-[#E5E7EB] bg-white shadow-sm">

          <div className="border-b border-[#E5E7EB] p-5 sm:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FaReceipt />
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold text-[#1F2937] sm:text-xl">
                      Transaction History
                    </h2>

                    <p className="mt-0.5 text-xs text-[#6B7280]">
                      View your earnings and payout transactions
                    </p>
                  </div>

                </div>
              </div>


              <button
                type="button"
                className="flex w-fit items-center gap-2 rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm font-bold text-[#374151] transition hover:bg-[#FFF8F0]"
              >
                <FaFilter className="text-xs" />
                Filter
              </button>

            </div>

          </div>


          {/* Transaction Empty State */}
          <div className="p-5 sm:p-8">

            <div className="flex min-h-70 items-center justify-center rounded-[22px] border border-dashed border-[#E5E7EB] bg-[#FFF8F0]">

              <div className="max-w-md px-5 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <FaReceipt className="text-xl text-[#9CA3AF]" />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-[#1F2937]">
                  No transactions yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  Completed orders and payout transactions will be
                  displayed here once your restaurant starts receiving
                  payments.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            EARNING INSIGHTS
        ====================================================== */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FaArrowUp />
            </div>

            <h3 className="mt-4 text-sm font-extrabold text-[#1F2937]">
              Revenue Growth
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#6B7280]">
              Compare your earnings across different time periods once
              transaction data becomes available.
            </p>

          </div>


          <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FaClock />
            </div>

            <h3 className="mt-4 text-sm font-extrabold text-[#1F2937]">
              Settlement Tracking
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#6B7280]">
              Keep track of pending and completed settlements from your
              restaurant account.
            </p>

          </div>


          <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaReceipt />
            </div>

            <h3 className="mt-4 text-sm font-extrabold text-[#1F2937]">
              Transaction Records
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#6B7280]">
              Your complete transaction history will be available here
              for easy tracking and reporting.
            </p>

          </div>

        </div>


        {/* =====================================================
            FOOTER NOTE
        ====================================================== */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF0E7] text-[--color-primary]">
              <FaWallet className="text-sm" />
            </div>

            <p className="text-xs text-[#6B7280]">
              Earnings are calculated from completed restaurant orders.
            </p>

          </div>

          <button
            type="button"
            className="flex items-center gap-2 text-xs font-bold text-[--color-primary] transition hover:translate-x-0.5"
          >
            Learn more
            <FaArrowRight className="text-[9px]" />
          </button>

        </div>

      </div>
    </div>
  );
};

export default RestaurantEarnings;
