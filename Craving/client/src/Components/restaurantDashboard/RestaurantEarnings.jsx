import React from "react";

const RestaurantEarnings = () => {
  return (
    <>
      <div className="h-full overflow-y-auto rounded-3xl bg-linear-to-br from-[#f7ecde] via-[#f2e5d0] to-[#ead8bf] p-4 sm:p-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#dcc2a7] bg-white/80 p-6 shadow-xl backdrop-blur-sm">
          <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-[#c39898]/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-[#987070]/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-black tracking-tight text-[#4f3838] sm:text-3xl">
              Earnings & Transactions
            </h2>
            <p className="mt-1 text-sm font-medium text-[#7d6666] sm:text-base">
              Track payouts, order revenue, and settlement timeline.
            </p>
          </div>

          <div className="relative mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#ead8c6] bg-[#fff8f0] p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#90735d]">
                Total Earnings
              </p>
              <p className="mt-2 text-2xl font-black text-[#4f3838]">₹0</p>
            </div>
            <div className="rounded-2xl border border-[#ead8c6] bg-[#fff8f0] p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#90735d]">
                This Week
              </p>
              <p className="mt-2 text-2xl font-black text-[#4f3838]">₹0</p>
            </div>
            <div className="rounded-2xl border border-[#ead8c6] bg-[#fff8f0] p-4 shadow-sm sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#90735d]">
                Pending Settlement
              </p>
              <p className="mt-2 text-2xl font-black text-[#4f3838]">₹0</p>
            </div>
          </div>

          <div className="relative mt-6 rounded-2xl border border-dashed border-[#d6bba0] bg-[#fff6eb] px-4 py-14 text-center text-[#8a725e]">
            <p className="text-lg font-semibold">
              Earnings and transaction history will be displayed here
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantEarnings;
