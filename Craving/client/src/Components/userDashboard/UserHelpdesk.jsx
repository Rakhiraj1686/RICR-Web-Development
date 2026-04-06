import React from "react";
import {
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaComments,
  FaQuestionCircle,
  FaClock,
  FaBoxOpen,
  FaWallet,
  FaUserShield,
  FaBolt,
  FaTicketAlt,
  FaShieldAlt,
  FaChevronRight,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const UserHelpdesk = () => {
  const supportChannels = [
    {
      title: "Call Support",
      description: "Talk to an expert for urgent delivery or payment concerns.",
      value: "+91 98765 43210",
      icon: <FaPhoneAlt className="text-lg" />,
      accent: "from-emerald-100 to-green-50",
      iconColor: "text-emerald-600",
      action: "Call now",
    },
    {
      title: "Email Support",
      description: "Share full issue details with screenshots for deep investigation.",
      value: "support@craving.com",
      icon: <FaEnvelope className="text-lg" />,
      accent: "from-sky-100 to-blue-50",
      iconColor: "text-blue-600",
      action: "Send email",
    },
    {
      title: "Live Chat",
      description: "Instant help for order updates and account questions.",
      value: "Available 9 AM - 9 PM",
      icon: <FaComments className="text-lg" />,
      accent: "from-amber-100 to-orange-50",
      iconColor: "text-orange-600",
      action: "Start chat",
    },
  ];

  const issueCategories = [
    {
      title: "Order Issues",
      subtitle: "Late delivery, wrong item, cancellation",
      icon: <FaBoxOpen className="text-(--color-secondary)" />,
      priority: "High",
    },
    {
      title: "Payment Issues",
      subtitle: "Failed payment, refund, duplicate charge",
      icon: <FaWallet className="text-(--color-secondary)" />,
      priority: "Medium",
    },
    {
      title: "Account Issues",
      subtitle: "Login, profile update, security concern",
      icon: <FaUserShield className="text-(--color-secondary)" />,
      priority: "Normal",
    },
  ];

  const faqs = [
    {
      question: "How can I track my order in real-time?",
      answer:
        "Open the Orders section, choose your active order, and tap Track Order to see live rider and restaurant updates.",
    },
    {
      question: "How do I request a refund?",
      answer:
        "Go to the specific order, select Report an Issue, and choose Refund Request with your reason and any proof.",
    },
    {
      question: "How can I update my account details?",
      answer:
        "Visit Profile settings and use Edit Profile to update your phone, address, and delivery preferences.",
    },
  ];

  return (
    <div className="h-full overflow-y-auto rounded-2xl p-4 md:p-6 space-y-6 bg-[radial-gradient(circle_at_top_left,#fff7f4_0%,#fff_50%,#f8f6ff_100%)]">
      <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-white/90 p-6 md:p-8 shadow-[0_14px_40px_-24px_rgba(76,29,149,0.28)]">
        <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-(--color-secondary)/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-amber-200/30 blur-2xl" />

        <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-secondary)">
              Help Center
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              One place for every support need
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-600 max-w-2xl">
              Resolve order, payment, and account issues faster with direct channels, guided issue reporting,
              and clear ticket visibility.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <FaBolt /> Fast response
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                <FaShieldAlt /> Secure account support
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                <FaTicketAlt /> Priority ticket routing
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 min-w-full md:min-w-70">
            <div className="rounded-xl border border-rose-100 bg-rose-50/70 px-4 py-3">
              <p className="text-xs text-gray-600">Average Response</p>
              <p className="text-lg font-black text-rose-700">10-15 min</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
              <p className="text-xs text-gray-600">Resolution Rate</p>
              <p className="text-lg font-black text-emerald-700">97%</p>
            </div>
            <div className="col-span-2 rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3">
              <p className="text-xs text-gray-600">Support Hours</p>
              <p className="text-sm font-bold text-indigo-700">Mon - Sun, 9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {supportChannels.map((channel, idx) => (
          <div
            key={idx}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`inline-flex rounded-xl bg-linear-to-br ${channel.accent} p-3`}>
              <span className={channel.iconColor}>{channel.icon}</span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{channel.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{channel.description}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{channel.value}</p>
              </div>
              <FaChevronRight className="mt-1 text-gray-400 transition-transform group-hover:translate-x-1" />
            </div>
            <button className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800">
              {channel.action}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-3 text-xl font-black text-gray-900">
            <FaHeadset className="text-(--color-secondary)" />
            Raise an Issue
          </h3>
          <div className="space-y-3">
            {issueCategories.map((issue, idx) => (
              <button
                key={idx}
                className="w-full rounded-xl border border-gray-200 p-4 text-left transition hover:border-(--color-secondary) hover:bg-rose-50/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1">{issue.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{issue.title}</p>
                      <p className="mt-1 text-sm text-gray-600">{issue.subtitle}</p>
                      <span className="mt-2 inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                        {issue.priority} priority
                      </span>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-400 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-3 text-xl font-black text-gray-900">
            <FaQuestionCircle className="text-(--color-secondary)" />
            Quick Answers
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-gray-200 bg-white p-4 open:border-(--color-secondary) open:bg-rose-50/30"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-semibold text-gray-900">
                  {faq.question}
                  <FaChevronRight className="mt-0.5 shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Support Hours</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
            <FaClock className="text-(--color-secondary)" /> Mon - Sun, 9:00 AM - 9:00 PM
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Open Tickets</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-amber-800">
            <FaExclamationCircle className="text-amber-500" /> 0 active ticket
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Resolved Tickets</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <FaCheckCircle className="text-emerald-500" /> 0 resolved ticket
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-(--color-secondary)/30 bg-linear-to-r from-rose-50 via-white to-amber-50 p-6 shadow-sm">
        <h3 className="text-xl font-black text-gray-900">Need Priority Support?</h3>
        <p className="mt-2 text-sm text-gray-600">
          For urgent delivery or payment concerns, use Call Support for the fastest response.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-lg bg-(--color-secondary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--color-secondary-hover)">
            Call Now
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
            Start Chat
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
            Email Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHelpdesk;
