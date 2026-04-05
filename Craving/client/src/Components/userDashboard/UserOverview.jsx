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
} from "react-icons/fa";

const UserOverview = () => {
  const overviewStats = [
    {
      title: "Total Orders",
      value: "0",
      icon: <FaClipboardList className="text-xl text-teal-700" />,
      trend: "+0 this week",
    },
    {
      title: "Pending Orders",
      value: "0",
      icon: <FaClock className="text-xl text-amber-700" />,
      trend: "No active order",
    },
    {
      title: "Total Spent",
      value: "₹0",
      icon: <FaRupeeSign className="text-xl text-green-700" />,
      trend: "Budget friendly month",
    },
    {
      title: "Delivered Orders",
      value: "0",
      icon: <FaCheckCircle className="text-xl text-orange-700" />,
      trend: "Keep ordering",
    },
  ];

  const quickActions = [
    {
      title: "Update Profile",
      description: "Manage your personal information",
      icon: <FaUserEdit className="text-[1.05rem] text-orange-700" />,
    },
    {
      title: "View Orders",
      description: "Track your active and past orders",
      icon: <FaShoppingBag className="text-[1.05rem] text-orange-700" />,
    },
    {
      title: "Payment Methods",
      description: "Review saved cards and transactions",
      icon: <FaCreditCard className="text-[1.05rem] text-orange-700" />,
    },
    {
      title: "Need Help",
      description: "Contact support for quick assistance",
      icon: <FaHeadset className="text-[1.05rem] text-orange-700" />,
    },
  ];

  const activityItems = [
    {
      title: "No live order right now",
      detail: "Once you place an order, real-time updates will appear here.",
      meta: "Today",
    },
    {
      title: "Your dashboard is ready",
      detail: "Set up your profile and preferred payment method for faster checkout.",
      meta: "New",
    },
  ];

  return (
    <div className="h-full overflow-y-auto rounded-[22px] bg-[radial-gradient(circle_at_6%_6%,#ffe6c2_0%,transparent_40%),radial-gradient(circle_at_100%_0%,#f8d0c0_0%,transparent_30%),linear-gradient(135deg,#fff8ef,#fbe3d2)] p-4 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-[#3f3228] sm:p-6">
      <div className="grid gap-4 rounded-[20px] border border-[#e9d4be] bg-linear-to-br from-[#fff7ec] to-[#fbe0cd] p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)] md:grid-cols-[1fr_auto] md:items-center md:p-6">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e9d4be] bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.03em] text-[#a6502b]">
            <FaBolt />
            User Command Center
          </p>
          <h1 className="mt-3 text-[clamp(1.55rem,3vw,2.2rem)] font-extrabold leading-tight">Welcome Back</h1>
          <p className="mt-2 max-w-[62ch] text-sm text-[#806958] sm:text-base">
            Track your food journey, manage account settings, and move faster with one glance.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 self-start rounded-xl border border-transparent bg-[#cf6f44] px-4 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#a6502b] md:justify-self-end"
          type="button"
        >
          Order Something Delicious
          <FaArrowRight />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat, idx) => (
          <article
            key={idx}
            className="rounded-2xl border border-[#e9d4be] bg-white/90 p-4 shadow-[0_18px_32px_rgba(125,76,46,0.1)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#806958]">{stat.title}</p>
                <p className="mt-1.5 text-3xl font-extrabold leading-none">{stat.value}</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#e9d4be] bg-white">
                {stat.icon}
              </div>
            </div>
            <p className="mt-4 text-xs text-[#806958] sm:text-sm">{stat.trend}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-[#e9d4be] bg-white/90 p-4 shadow-[0_18px_32px_rgba(125,76,46,0.1)] sm:p-5">
          <div>
            <h2 className="text-xl font-extrabold">Quick Actions</h2>
            <p className="mt-1 text-sm text-[#806958]">Jump to key account controls</p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#edd7c6] bg-linear-to-b from-white to-[#fff8f1] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#ddb89d]"
                type="button"
              >
                <div className="flex items-start gap-3">
                  <div>{action.icon}</div>
                  <div>
                    <h3 className="font-bold">{action.title}</h3>
                    <p className="mt-1 text-sm text-[#806958]">{action.description}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#a6502b]">Open</span>
              </button>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl border border-[#e9d4be] bg-white/90 p-4 shadow-[0_18px_32px_rgba(125,76,46,0.1)] sm:p-5">
          <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(207,111,68,0.22),transparent_70%)]" />
          <div className="relative">
            <h2 className="text-xl font-extrabold">Recent Activity</h2>
            <p className="mt-1 text-sm text-[#806958]">Your latest updates appear here</p>
          </div>
          <div className="relative mt-4 grid gap-3">
            {activityItems.map((item, idx) => (
              <article
                key={idx}
                className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-[#ecd5c4] bg-white p-4"
              >
                <div className="mt-1.5 h-3 w-3 rounded-full bg-[#cf6f44] shadow-[0_0_0_4px_rgba(207,111,68,0.2)]" />
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-bold sm:text-base">{item.title}</h3>
                    <span className="rounded-full border border-[#f0d9c8] bg-[#fff6ee] px-2 py-0.5 text-xs text-[#806958]">
                      {item.meta}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#806958]">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserOverview;