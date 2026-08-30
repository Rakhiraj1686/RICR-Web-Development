import React from "react";

const RestaurantEarnings = () => {
  return (
    <>
      <div className="h-full overflow-y-auto rounded-3xl bg-linear-to-br from-(--color-section-light) via-(--color-background) to-(--color-section-light) p-4 sm:p-6">
        <div className="relative overflow-hidden rounded-3xl border border-(--color-border) bg-white/80 p-6 shadow-xl backdrop-blur-sm">
          <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-(--color-secondary)/25 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-(--color-primary)/15 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-black tracking-tight text-(--color-text) sm:text-3xl">
              Earnings & Transactions
            </h2>
            <p className="mt-1 text-sm font-medium text-(--color-text-secondary) sm:text-base">
              Track payouts, order revenue, and settlement timeline.
            </p>
          </div>

          <div className="relative mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-(--color-border) bg-(--color-section-light) p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                Total Earnings
              </p>
              <p className="mt-2 text-2xl font-black text-(--color-text)">₹0</p>
            </div>
            <div className="rounded-2xl border border-(--color-border) bg-(--color-section-light) p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                This Week
              </p>
              <p className="mt-2 text-2xl font-black text-(--color-text)">₹0</p>
            </div>
            <div className="rounded-2xl border border-(--color-border) bg-(--color-section-light) p-4 shadow-sm sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                Pending Settlement
              </p>
              <p className="mt-2 text-2xl font-black text-(--color-text)">₹0</p>
            </div>
          </div>

          <div className="relative mt-6 rounded-2xl border border-dashed border-(--color-border) bg-(--color-section-light) px-4 py-14 text-center text-(--color-text-secondary)">
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
