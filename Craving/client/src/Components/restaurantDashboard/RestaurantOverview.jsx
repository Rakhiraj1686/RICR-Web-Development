import React from "react";
import { FaShoppingCart, FaUsers, FaRupeeSign, FaStar } from "react-icons/fa";

const RestaurantOverview = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "0",
      icon: <FaShoppingCart className="text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Orders",
      value: "0",
      icon: <FaUsers className="text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      title: "Total Earnings",
      value: "₹0",
      icon: <FaRupeeSign className="text-yellow-500" />,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Rating",
      value: "4.5",
      icon: <FaStar className="text-orange-500" />,
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <>
      <div className="h-full space-y-6 overflow-y-auto rounded-3xl bg-linear-to-br from-[#f7ecdd] via-[#f2e6d1] to-[#e9d6bc] p-4 sm:p-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#ddc4a8] bg-white/70 p-5 shadow-xl backdrop-blur-sm sm:p-6">
          <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-[#c39898]/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-[#987070]/20 blur-3xl" />
          <div className="relative flex flex-col gap-1">
            <h1 className="text-2xl font-black tracking-tight text-[#4f3838] sm:text-3xl">
              Restaurant Overview
            </h1>
            <p className="text-sm font-medium text-[#7d6666] sm:text-base">
              Snapshot of orders, earnings, and weekly momentum.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-[#e3cebc] bg-white/80 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="pointer-events-none absolute -right-12 -bottom-10 h-32 w-32 rounded-full bg-[#f2e6d5] opacity-80 transition-all duration-300 group-hover:scale-110" />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#8b6f5a]">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-black text-[#4f3838]">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`${stat.bgColor} relative z-10 rounded-2xl border border-white/70 p-4 text-2xl shadow-sm`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Section */}
        <div className="rounded-3xl border border-[#e3cebc] bg-white/85 p-6 shadow-lg backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-black tracking-tight text-[#4f3838] sm:text-2xl">
            Recent Orders
          </h2>
          <div className="rounded-2xl border border-dashed border-[#d4bba2] bg-[#fff6eb] py-10 text-center font-medium text-[#8d7460]">
            No recent orders to display
          </div>
        </div>

        {/* Performance Chart Section */}
        <div className="rounded-3xl border border-[#e3cebc] bg-white/85 p-6 shadow-lg backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-black tracking-tight text-[#4f3838] sm:text-2xl">
            Weekly Performance
          </h2>
          <div className="rounded-2xl border border-dashed border-[#d4bba2] bg-[#fff6eb] py-10 text-center font-medium text-[#8d7460]">
            Performance chart will be displayed here
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantOverview;