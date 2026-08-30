import React, { useState } from "react";
import {
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaUtensils,
} from "react-icons/fa";

const RestaurantOrders = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { name: "All", count: 0 },
    { name: "Pending", count: 0 },
    { name: "Preparing", count: 0 },
    { name: "Ready", count: 0 },
    { name: "Completed", count: 0 },
  ];

  const stats = [
    {
      title: "Total Orders",
      value: "0",
      icon: FaShoppingBag,
      iconBg: "bg-red-50",
      iconColor: "text-[--color-primary]",
    },
    {
      title: "Pending",
      value: "0",
      icon: FaClock,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Completed",
      value: "0",
      icon: FaCheckCircle,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Cancelled",
      value: "0",
      icon: FaTimesCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="min-h-full overflow-y-auto bg-[#FFF8F0]">
      <div className="mx-auto max-w-400 p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[--color-primary]">
              <FaShoppingBag />
              Order Management
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#1F2937] sm:text-4xl">
              Orders
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
              Manage incoming orders, track their status and keep your
              customers updated.
            </p>
          </div>

          {/* Live status */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>

            <div>
              <p className="text-xs font-bold text-[#1F2937]">
                Order system active
              </p>

              <p className="text-[11px] text-[#9CA3AF]">
                Ready to receive orders
              </p>
            </div>
          </div>

        </div>


        {/* =====================================================
            SUMMARY CARDS
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

                <div className="relative flex items-center justify-between">

                  <div>
                    <p className="text-sm font-semibold text-[#6B7280]">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-black text-[#1F2937]">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor} text-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon />
                  </div>

                </div>
              </div>
            );
          })}

        </div>


        {/* =====================================================
            MAIN ORDER PANEL
        ====================================================== */}
        <div className="rounded-[28px] border border-[#E5E7EB] bg-white shadow-sm">

          {/* Panel header */}
          <div className="border-b border-[#E5E7EB] p-5 sm:p-6">

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-[#1F2937]">
                  Order List
                </h2>

                <p className="mt-1 text-sm text-[#6B7280]">
                  View and manage all your restaurant orders.
                </p>
              </div>

              {/* Search + Filter */}
              <div className="flex flex-col gap-3 sm:flex-row">

                <div className="relative">

                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#9CA3AF]" />

                  <input
                    type="text"
                    placeholder="Search order..."
                    className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FFF8F0] pl-10 pr-4 text-sm font-medium text-[#1F2937] outline-none transition focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/10 sm:w-64"
                  />

                </div>

                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-bold text-[#374151] transition hover:border-[--color-primary]/30 hover:bg-[#FFF8F0]"
                >
                  <FaFilter className="text-xs" />
                  Filters
                </button>

              </div>

            </div>


            {/* Tabs */}
            <div className="mt-6 -mb-5 overflow-x-auto pb-1">
              <div className="flex min-w-max gap-1">

                {tabs.map((tab) => {
                  const isActive = activeTab === tab.name;

                  return (
                    <button
                      key={tab.name}
                      type="button"
                      onClick={() => setActiveTab(tab.name)}
                      className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? "bg-[--color-primary] text-white shadow-md"
                          : "text-[#6B7280] hover:bg-[#FFF8F0] hover:text-[#1F2937]"
                      }`}
                    >
                      {tab.name}

                      <span
                        className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#F3F4F6] text-[#6B7280]"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}

              </div>
            </div>

          </div>


          {/* ===================================================
              EMPTY ORDER STATE
          ==================================================== */}
          <div className="p-5 sm:p-8">

            <div className="flex min-h-105 items-center justify-center rounded-3xl border border-dashed border-[#E5E7EB] bg-[#FFF8F0]">

              <div className="max-w-md px-5 text-center">

                {/* Illustration */}
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center">

                  <div className="absolute inset-0 rounded-[28px] bg-white shadow-sm" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0E7] text-[--color-primary]">
                    <FaShoppingBag className="text-2xl" />
                  </div>

                </div>


                <h3 className="mt-6 text-xl font-extrabold text-[#1F2937]">
                  No {activeTab === "All" ? "" : activeTab.toLowerCase()} orders yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  {activeTab === "All"
                    ? "When customers place orders, they will appear here. You can manage, prepare and complete them from this dashboard."
                    : `There are currently no ${activeTab.toLowerCase()} orders. New orders will automatically appear here.`}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">

                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-xl bg-[--color-primary] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[--color-primary-hover] hover:shadow-lg"
                  >
                    <FaUtensils className="text-xs" />
                    Manage Menu
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-bold text-[#374151] transition-all hover:border-[--color-primary]/30 hover:bg-[#FFF8F0]"
                  >
                    Order Settings
                    <FaArrowRight className="text-[10px]" />
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            ORDER MANAGEMENT TIPS
        ====================================================== */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FaClock />
            </div>

            <h3 className="mt-4 text-sm font-extrabold text-[#1F2937]">
              Pending Orders
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#6B7280]">
              Review new orders quickly and start preparing them without
              unnecessary delays.
            </p>

          </div>


          <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaUtensils />
            </div>

            <h3 className="mt-4 text-sm font-extrabold text-[#1F2937]">
              Keep Orders Updated
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#6B7280]">
              Update order status so customers always know what is
              happening with their food.
            </p>

          </div>


          <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FaCheckCircle />
            </div>

            <h3 className="mt-4 text-sm font-extrabold text-[#1F2937]">
              Complete Orders
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#6B7280]">
              Mark completed orders accurately to maintain reliable
              restaurant records.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RestaurantOrders;