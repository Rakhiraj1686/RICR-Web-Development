import React from "react";
import {
  FaClipboardList,
  FaClock,
  FaRupeeSign,
  FaCheckCircle,
  FaUserEdit,
  FaShoppingBag,
  FaCreditCard,
  FaHeadset,
  FaArrowRight,
  FaBolt,
  FaUtensils,
  FaMapMarkerAlt,
  FaChevronRight,
} from "react-icons/fa";

const UserOverview = () => {
  const overviewStats = [
    {
      title: "Total Orders",
      value: "0",
      icon: <FaClipboardList />,
      description: "Orders placed",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending Orders",
      value: "0",
      icon: <FaClock />,
      description: "Currently processing",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Total Spent",
      value: "₹0",
      icon: <FaRupeeSign />,
      description: "Lifetime spending",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Delivered",
      value: "0",
      icon: <FaCheckCircle />,
      description: "Successfully delivered",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "Update Profile",
      description: "Manage your personal information",
      icon: <FaUserEdit />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "View Orders",
      description: "Track active and previous orders",
      icon: <FaShoppingBag />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Payment Methods",
      description: "Manage payments and transactions",
      icon: <FaCreditCard />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Need Help?",
      description: "Get assistance from our support team",
      icon: <FaHeadset />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const activityItems = [
    {
      title: "No live order right now",
      detail:
        "Once you place an order, real-time delivery updates will appear here.",
      meta: "Today",
      icon: <FaShoppingBag />,
    },
    {
      title: "Your dashboard is ready",
      detail:
        "Complete your profile and add a preferred payment method for faster checkout.",
      meta: "New",
      icon: <FaBolt />,
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#f7f8fa] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[1600px] space-y-5">

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden rounded-3xl bg-(--color-primary) p-6 text-white shadow-lg sm:p-8">
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -left-16 -bottom-24 h-48 w-48 rounded-full bg-black/5" />

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <FaBolt className="text-yellow-300" />
                User Dashboard
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Welcome Back 👋
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                Manage your orders, profile, payments and support — everything
                you need in one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur-sm">
                  <FaUtensils />
                  Delicious food
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur-sm">
                  <FaShoppingBag />
                  Easy ordering
                </div>
              </div>
            </div>

            <button
              type="button"
              className="group inline-flex items-center justify-center gap-3 self-start rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-(--color-primary) shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:self-center"
            >
              Order Something Delicious
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((stat, idx) => (
            <article
              key={idx}
              className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-(--color-text-secondary)">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-tight text-(--color-text)">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${stat.iconBg} ${stat.iconColor} text-xl transition duration-300 group-hover:scale-110`}
                >
                  {stat.icon}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-(--color-border) pt-3">
                <span className={`h-2 w-2 rounded-full ${stat.iconColor.replace("text-", "bg-")}`} />
                <p className="text-xs font-medium text-(--color-text-secondary)">
                  {stat.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">

          {/* ================= QUICK ACTIONS ================= */}
          <section className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-(--color-primary)">
                  Shortcuts
                </p>

                <h2 className="mt-1 text-xl font-black text-(--color-text)">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  Access frequently used account options.
                </p>
              </div>

              <div className="hidden h-10 w-10 place-items-center rounded-xl bg-(--color-section-light) text-(--color-primary) sm:grid">
                <FaBolt />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-(--color-border) bg-[#fafafa] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-(--color-primary)/30 hover:bg-white hover:shadow-md"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${action.iconBg} ${action.iconColor} text-lg transition duration-300 group-hover:scale-105`}
                    >
                      {action.icon}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-(--color-text)">
                        {action.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-(--color-text-secondary)">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <FaChevronRight className="shrink-0 text-xs text-(--color-text-secondary) transition duration-300 group-hover:translate-x-1 group-hover:text-(--color-primary)" />
                </button>
              ))}
            </div>
          </section>

          {/* ================= ACTIVITY ================= */}
          <section className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-(--color-secondary)">
                  Timeline
                </p>

                <h2 className="mt-1 text-xl font-black text-(--color-text)">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  Your latest account updates.
                </p>
              </div>

              <div className="rounded-xl bg-(--color-section-light) px-3 py-2 text-xs font-bold text-(--color-primary)">
                Live
              </div>
            </div>

            <div className="relative mt-6 space-y-5">
              {/* Timeline line */}
              <div className="absolute left-5 top-5 bottom-5 w-px bg-(--color-border)" />

              {activityItems.map((item, idx) => (
                <article
                  key={idx}
                  className="relative flex gap-4 rounded-2xl border border-(--color-border) bg-[#fafafa] p-4 transition duration-300 hover:bg-white hover:shadow-sm"
                >
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-4 border-white bg-(--color-section-light) text-sm text-(--color-primary) shadow-sm">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-(--color-text)">
                        {item.title}
                      </h3>

                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-(--color-text-secondary) shadow-sm">
                        {item.meta}
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm leading-5 text-(--color-text-secondary)">
                      {item.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* ================= BOTTOM INFORMATION ================= */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Order */}
          <div className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-orange-600">
                <FaShoppingBag />
              </div>

              <div>
                <p className="text-xs font-semibold text-(--color-text-secondary)">
                  Orders
                </p>
                <p className="text-base font-black text-(--color-text)">
                  No active orders
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-5 text-(--color-text-secondary)">
              Your active orders and delivery status will appear here.
            </p>
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <FaMapMarkerAlt />
              </div>

              <div>
                <p className="text-xs font-semibold text-(--color-text-secondary)">
                  Delivery Address
                </p>
                <p className="text-base font-black text-(--color-text)">
                  Not Added
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-5 text-(--color-text-secondary)">
              Add your address for a faster and smoother checkout experience.
            </p>
          </div>

          {/* Support */}
          <div className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-purple-50 text-purple-600">
                <FaHeadset />
              </div>

              <div>
                <p className="text-xs font-semibold text-(--color-text-secondary)">
                  Support
                </p>
                <p className="text-base font-black text-(--color-text)">
                  Need Assistance?
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-5 text-(--color-text-secondary)">
              Our support team is available to help with your orders and account.
            </p>
          </div>
        </div>

        {/* ================= FOOTER CTA ================= */}
        <section className="flex flex-col gap-4 rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-black text-(--color-text)">
              Ready for your next meal?
            </h2>

            <p className="mt-1 text-sm text-(--color-text-secondary)">
              Explore restaurants and discover something delicious today.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-5 py-3 text-sm font-bold text-white transition duration-300 hover:bg-(--color-primary-hover)"
          >
            Explore Restaurants
            <FaArrowRight />
          </button>
        </section>
      </div>
    </div>
  );
};

export default UserOverview;