import React from "react";
import {
FaMotorcycle,
FaClipboardList,
FaCheckCircle,
FaClock,
FaRupeeSign,
FaMapMarkerAlt,
FaBolt,
FaArrowRight,
} from "react-icons/fa";

const RiderOverview = () => {
const stats = [
{
title: "Today's Deliveries",
value: "0",
description: "Orders delivered today",
icon: <FaCheckCircle />,
iconClass: "text-green-700",
},
{
title: "Active Orders",
value: "0",
description: "Orders currently assigned",
icon: <FaClipboardList />,
iconClass: "text-blue-700",
},
{
title: "Pending Orders",
value: "0",
description: "Waiting for pickup",
icon: <FaClock />,
iconClass: "text-amber-700",
},
{
title: "Today's Earnings",
value: "₹0",
description: "Total earnings today",
icon: <FaRupeeSign />,
iconClass: "text-emerald-700",
},
];

const quickActions = [
{
title: "Current Orders",
description: "View assigned and available deliveries",
icon: <FaMotorcycle />,
},
{
title: "Refresh Location",
description: "Update your current delivery location",
icon: <FaMapMarkerAlt />,
},
{
title: "Delivery History",
description: "Check your completed deliveries",
icon: <FaClipboardList />,
},
];

return ( <div className="h-full overflow-y-auto rounded-[22px] bg-[radial-gradient(circle_at_5%_5%,rgba(246,189,96,0.3)_0%,transparent_38%),radial-gradient(circle_at_100%_0%,rgba(244,162,97,0.22)_0%,transparent_32%),linear-gradient(135deg,#FFF8F0,#FEF1E6)] p-4 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-(--color-text) sm:p-6">
{/* Header */} <div className="relative overflow-hidden rounded-[20px] border border-(--color-border) bg-linear-to-br from-(--color-section-light) to-(--color-background) p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)] md:p-6"> <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-(--color-primary)/10 blur-3xl" /> <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-(--color-secondary)/15 blur-3xl" />


    <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-(--color-primary)">
          <FaBolt />
          Rider Command Center
        </p>

        <h1 className="mt-3 text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-tight">
          Welcome, Rider
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-(--color-text-secondary) sm:text-base">
          Manage your deliveries, track active orders, and stay updated
          with your rider activity from one place.
        </p>
      </div>

      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-(--color-border) bg-white text-3xl text-(--color-primary) shadow-sm">
        <FaMotorcycle />
      </div>
    </div>
  </div>

  {/* Stats */}
  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat, index) => (
      <article
        key={index}
        className="rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)] transition duration-200 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-(--color-text-secondary)">
              {stat.title}
            </p>

            <p className="mt-2 text-3xl font-extrabold">
              {stat.value}
            </p>
          </div>

          <div
            className={`grid h-12 w-12 place-items-center rounded-xl border border-(--color-border) bg-(--color-section-light) text-xl ${stat.iconClass}`}
          >
            {stat.icon}
          </div>
        </div>

        <p className="mt-4 text-xs text-(--color-text-secondary) sm:text-sm">
          {stat.description}
        </p>
      </article>
    ))}
  </div>

  {/* Main Content */}
  <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
    {/* Quick Actions */}
    <section className="rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)]">
      <div>
        <h2 className="text-xl font-extrabold">Quick Actions</h2>
        <p className="mt-1 text-sm text-(--color-text-secondary)">
          Quickly access your most important rider controls.
        </p>
      </div>

      <div className="mt-4 grid gap-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            type="button"
            className="flex items-center justify-between gap-4 rounded-2xl border border-(--color-border) bg-linear-to-b from-white to-(--color-section-light) p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-(--color-secondary) hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-(--color-background) text-lg text-(--color-primary)">
                {action.icon}
              </div>

              <div>
                <h3 className="font-bold">{action.title}</h3>
                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  {action.description}
                </p>
              </div>
            </div>

            <FaArrowRight className="shrink-0 text-(--color-primary)" />
          </button>
        ))}
      </div>
    </section>

    {/* Rider Status */}
    <section className="relative overflow-hidden rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-(--color-secondary)/10 blur-3xl" />

      <div className="relative">
        <h2 className="text-xl font-extrabold">Rider Status</h2>

        <p className="mt-1 text-sm text-(--color-text-secondary)">
          Your current delivery availability.
        </p>

        <div className="mt-5 rounded-2xl border border-(--color-border) bg-(--color-section-light) p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-green-100 text-xl text-green-700">
              <FaCheckCircle />
            </div>

            <div>
              <p className="font-bold">Ready for Deliverie</p>
              <p className="text-sm text-(--color-text-secondary)">
                You can receive new delivery requests.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-(--color-border) bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
              Distance Today
            </p>
            <p className="mt-2 text-xl font-extrabold">0 km</p>
          </div>

          <div className="rounded-xl border border-(--color-border) bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
              Rating
            </p>
            <p className="mt-2 text-xl font-extrabold">N/A</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  {/* Activity */}
  <section className="mt-4 rounded-2xl border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_32px_rgba(125,76,46,0.1)]">
    <h2 className="text-xl font-extrabold">Recent Activity</h2>

    <p className="mt-1 text-sm text-(--color-text-secondary)">
      Your latest rider activity will appear here.
    </p>

    <div className="mt-4 rounded-2xl border border-dashed border-(--color-border) bg-(--color-section-light) py-10 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-(--color-primary) shadow-sm">
        <FaClipboardList />
      </div>

      <p className="mt-3 font-semibold">No recent activity</p>

      <p className="mt-1 text-sm text-(--color-text-secondary)">
        Start accepting deliveries to see your activity here.
      </p>
    </div>
  </section>
</div>


);
};

export default RiderOverview;
