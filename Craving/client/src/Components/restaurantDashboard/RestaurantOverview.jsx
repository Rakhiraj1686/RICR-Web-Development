import React from "react";
import {
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
  FaStar,
  FaArrowUp,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaUtensils,
  FaChartLine,
  FaPlus,
} from "react-icons/fa";

const RestaurantOverview = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "0",
      subtitle: "All orders",
      icon: FaShoppingCart,
      iconBg: "bg-red-50",
      iconColor: "text-[--color-primary]",
    },
    {
      title: "Active Orders",
      value: "0",
      subtitle: "Currently processing",
      icon: FaClock,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Total Earnings",
      value: "₹0",
      subtitle: "Total revenue",
      icon: FaRupeeSign,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Restaurant Rating",
      value: "4.5",
      subtitle: "Customer rating",
      icon: FaStar,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="min-h-full overflow-y-auto bg-[#FFF8F0]">
      <div className="mx-auto max-w-400 p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HERO / HEADER
        ====================================================== */}
        <div className="relative mb-7 overflow-hidden rounded-[28px] bg-[#1F2937] px-6 py-7 shadow-xl sm:px-8 lg:px-10 lg:py-9">

          {/* Decorative background */}
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#E63946]/30 blur-3xl" />
          <div className="absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-[#F4A261]/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-xs font-semibold text-white/90">
                  Restaurant Dashboard
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Good morning 👋
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
                Here's what's happening with your restaurant today.
                Keep track of orders, earnings and overall performance
                from one place.
              </p>
            </div>

            {/* Restaurant Status */}
            <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/15">
                    <FaCheckCircle className="text-green-400" />
                  </div>

                  <div>
                    <p className="text-xs text-white/50">
                      Restaurant Status
                    </p>

                    <p className="mt-1 text-sm font-bold text-white">
                      Open
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-green-400/15 px-3 py-1 text-xs font-bold text-green-400">
                  Live
                </span>
              </div>

            </div>
          </div>
        </div>


        {/* =====================================================
            STATISTICS
        ====================================================== */}
        <div className="mb-7">

          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#1F2937]">
                Today's Performance
              </h2>

              <p className="mt-1 text-sm text-[#6B7280]">
                Your restaurant at a glance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Decorative circle */}
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
                        <FaArrowUp className="text-[9px] text-green-500" />

                        <span className="text-xs font-medium text-[#6B7280]">
                          {stat.subtitle}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor} text-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>


        {/* =====================================================
            MAIN DASHBOARD GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ===================================================
              REVENUE
          ==================================================== */}
          <div className="xl:col-span-2 rounded-[26px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-7">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                    <FaChartLine className="text-sm text-[--color-primary]" />
                  </div>

                  <h2 className="text-lg font-extrabold text-[#1F2937] sm:text-xl">
                    Revenue Overview
                  </h2>
                </div>

                <p className="mt-2 text-sm text-[#6B7280]">
                  Monitor your restaurant revenue performance
                </p>
              </div>

              <select
                defaultValue="week"
                className="rounded-xl border border-[#E5E7EB] bg-[#FFF8F0] px-4 py-2.5 text-sm font-semibold text-[#1F2937] outline-none transition focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/10"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

            </div>

            {/* Chart Empty State */}
            <div className="mt-6 flex min-h-75 items-center justify-center rounded-[22px] bg-[#FFF8F0]">

              <div className="max-w-sm px-6 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <FaChartLine className="text-xl text-[--color-primary]" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#1F2937]">
                  Revenue insights are coming
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  Your revenue performance will appear here once
                  sufficient order data is available.
                </p>

              </div>

            </div>
          </div>


          {/* ===================================================
              QUICK ACTIONS
          ==================================================== */}
          <div className="rounded-[26px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-7">

            <div className="mb-5">
              <h2 className="text-lg font-extrabold text-[#1F2937] sm:text-xl">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-[#6B7280]">
                Manage your restaurant
              </p>
            </div>

            <div className="space-y-3">

              {/* Add Menu */}
              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-2xl border border-[#E5E7EB] p-4 text-left transition-all duration-200 hover:border-[--color-primary]/30 hover:bg-[#FFF8F0]"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[--color-primary]">
                    <FaPlus />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#1F2937]">
                      Add Menu Item
                    </p>

                    <p className="mt-0.5 text-xs text-[#6B7280]">
                      Add a new dish
                    </p>
                  </div>

                </div>

                <FaArrowRight className="text-xs text-[#9CA3AF] transition-transform group-hover:translate-x-1" />

              </button>


              {/* Orders */}
              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-2xl border border-[#E5E7EB] p-4 text-left transition-all duration-200 hover:border-[--color-primary]/30 hover:bg-[#FFF8F0]"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <FaShoppingCart />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#1F2937]">
                      View Orders
                    </p>

                    <p className="mt-0.5 text-xs text-[#6B7280]">
                      Manage incoming orders
                    </p>
                  </div>

                </div>

                <FaArrowRight className="text-xs text-[#9CA3AF] transition-transform group-hover:translate-x-1" />

              </button>


              {/* Menu */}
              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-2xl border border-[#E5E7EB] p-4 text-left transition-all duration-200 hover:border-[--color-primary]/30 hover:bg-[#FFF8F0]"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <FaUtensils />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#1F2937]">
                      Manage Menu
                    </p>

                    <p className="mt-0.5 text-xs text-[#6B7280]">
                      Update dishes and prices
                    </p>
                  </div>

                </div>

                <FaArrowRight className="text-xs text-[#9CA3AF] transition-transform group-hover:translate-x-1" />

              </button>

            </div>
          </div>

        </div>


        {/* =====================================================
            RECENT ORDERS
        ====================================================== */}
        <div className="mt-6 rounded-[26px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-7">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-extrabold text-[#1F2937] sm:text-xl">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-[#6B7280]">
                Keep track of your latest customer orders
              </p>
            </div>

            <button
              type="button"
              className="flex w-fit items-center gap-2 text-sm font-bold text-[--color-primary] transition hover:text-[--color-primary-dark]"
            >
              View all
              <FaArrowRight className="text-xs" />
            </button>

          </div>


          {/* Empty State */}
          <div className="mt-6 flex min-h-65 items-center justify-center rounded-[22px] border border-dashed border-[#E5E7EB] bg-[#FFF8F0]">

            <div className="px-6 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                <FaShoppingCart className="text-xl text-[--color-primary]" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#1F2937]">
                No Orders Yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                Your latest customer orders will appear here as soon
                as your restaurant starts receiving orders.
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM INSIGHTS
        ====================================================== */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Order Activity */}
          <div className="rounded-[26px] border border-[#E5E7EB] bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaShoppingCart />
              </div>

              <div>
                <h3 className="font-extrabold text-[#1F2937]">
                  Order Activity
                </h3>

                <p className="mt-0.5 text-xs text-[#6B7280]">
                  Current order breakdown
                </p>
              </div>

            </div>

            <div className="mt-6 grid grid-cols-3 divide-x divide-[#E5E7EB] border-t border-[#E5E7EB] pt-5">

              <div className="px-2 text-center">
                <p className="text-xs text-[#6B7280]">
                  Active
                </p>

                <p className="mt-1 text-2xl font-black text-[#1F2937]">
                  0
                </p>
              </div>

              <div className="px-2 text-center">
                <p className="text-xs text-[#6B7280]">
                  Completed
                </p>

                <p className="mt-1 text-2xl font-black text-[#1F2937]">
                  0
                </p>
              </div>

              <div className="px-2 text-center">
                <p className="text-xs text-[#6B7280]">
                  Cancelled
                </p>

                <p className="mt-1 text-2xl font-black text-[#1F2937]">
                  0
                </p>
              </div>

            </div>

          </div>


          {/* Rating */}
          <div className="rounded-[26px] border border-[#E5E7EB] bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-500">
                <FaStar />
              </div>

              <div>
                <h3 className="font-extrabold text-[#1F2937]">
                  Customer Rating
                </h3>

                <p className="mt-0.5 text-xs text-[#6B7280]">
                  Your restaurant's rating
                </p>
              </div>

            </div>

            <div className="mt-6 flex items-center gap-5 border-t border-[#E5E7EB] pt-5">

              <div>
                <p className="text-4xl font-black text-[#1F2937]">
                  4.5
                </p>
              </div>

              <div>

                <div className="flex gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="text-gray-200" />
                </div>

                <p className="mt-2 text-xs text-[#6B7280]">
                  Overall customer experience
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RestaurantOverview;