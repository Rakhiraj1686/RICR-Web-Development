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
      accent: "from-(--color-primary)/15 to-(--color-background)",
      iconColor: "text-(--color-primary)",
      action: "Call now",
    },
    {
      title: "Email Support",
      description: "Share full issue details with screenshots for deep investigation.",
      value: "support@craving.com",
      icon: <FaEnvelope className="text-lg" />,
      accent: "from-(--color-secondary)/25 to-(--color-background)",
      iconColor: "text-(--color-secondary-hover)",
      action: "Send email",
    },
    {
      title: "Live Chat",
      description: "Instant help for order updates and account questions.",
      value: "Available 9 AM - 9 PM",
      icon: <FaComments className="text-lg" />,
      accent: "from-(--color-accent)/30 to-(--color-background)",
      iconColor: "text-(--color-primary-hover)",
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
    <div className="h-full overflow-y-auto rounded-2xl p-4 md:p-6 space-y-6 bg-[radial-gradient(circle_at_top_left,var(--color-section-light)_0%,#fff_50%,var(--color-background)_100%)]">
      <div className="relative overflow-hidden rounded-2xl border border-(--color-border) bg-white/90 p-6 md:p-8 shadow-[0_14px_40px_-24px_rgba(230,57,70,0.25)]">
        <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-(--color-secondary)/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-(--color-accent)/25 blur-2xl" />

        <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-secondary)">
              Help Center
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-black text-(--color-text) leading-tight">
              One place for every support need
            </h2>
            <p className="mt-2 text-sm md:text-base text-(--color-text-secondary) max-w-2xl">
              Resolve order, payment, and account issues faster with direct channels, guided issue reporting,
              and clear ticket visibility.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-(--color-section-light) px-3 py-1 text-xs font-semibold text-(--color-primary)">
                <FaBolt /> Fast response
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-(--color-section-light) px-3 py-1 text-xs font-semibold text-(--color-secondary-hover)">
                <FaShieldAlt /> Secure account support
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-(--color-section-light) px-3 py-1 text-xs font-semibold text-(--color-primary-hover)">
                <FaTicketAlt /> Priority ticket routing
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 min-w-full md:min-w-70">
            <div className="rounded-xl border border-(--color-border) bg-(--color-section-light) px-4 py-3">
              <p className="text-xs text-(--color-text-secondary)">Average Response</p>
              <p className="text-lg font-black text-(--color-primary)">10-15 min</p>
            </div>
            <div className="rounded-xl border border-(--color-border) bg-(--color-section-light) px-4 py-3">
              <p className="text-xs text-(--color-text-secondary)">Resolution Rate</p>
              <p className="text-lg font-black text-(--color-primary-hover)">97%</p>
            </div>
            <div className="col-span-2 rounded-xl border border-(--color-border) bg-(--color-section-light) px-4 py-3">
              <p className="text-xs text-(--color-text-secondary)">Support Hours</p>
              <p className="text-sm font-bold text-(--color-secondary-hover)">Mon - Sun, 9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {supportChannels.map((channel, idx) => (
          <div
            key={idx}
            className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`inline-flex rounded-xl bg-linear-to-br ${channel.accent} p-3`}>
              <span className={channel.iconColor}>{channel.icon}</span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-(--color-text)">{channel.title}</h3>
                <p className="mt-1 text-sm text-(--color-text-secondary)">{channel.description}</p>
                <p className="mt-3 text-sm font-semibold text-(--color-text)">{channel.value}</p>
              </div>
              <FaChevronRight className="mt-1 text-(--color-text-secondary) transition-transform group-hover:translate-x-1" />
            </div>
            <button className="mt-5 rounded-lg bg-(--color-text) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)">
              {channel.action}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-(--color-border) bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 border-b border-(--color-border) pb-3 text-xl font-black text-(--color-text)">
            <FaHeadset className="text-(--color-secondary)" />
            Raise an Issue
          </h3>
          <div className="space-y-3">
            {issueCategories.map((issue, idx) => (
              <button
                key={idx}
                className="w-full rounded-xl border border-(--color-border) p-4 text-left transition hover:border-(--color-secondary) hover:bg-(--color-section-light)"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1">{issue.icon}</span>
                    <div>
                      <p className="font-semibold text-(--color-text)">{issue.title}</p>
                      <p className="mt-1 text-sm text-(--color-text-secondary)">{issue.subtitle}</p>
                      <span className="mt-2 inline-flex rounded-full bg-(--color-background) px-2.5 py-1 text-xs font-semibold text-(--color-text-secondary)">
                        {issue.priority} priority
                      </span>
                    </div>
                  </div>
                  <FaChevronRight className="text-(--color-text-secondary) mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-(--color-border) bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 border-b border-(--color-border) pb-3 text-xl font-black text-(--color-text)">
            <FaQuestionCircle className="text-(--color-secondary)" />
            Quick Answers
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-(--color-border) bg-white p-4 open:border-(--color-secondary) open:bg-(--color-section-light)"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-semibold text-(--color-text)">
                  {faq.question}
                  <FaChevronRight className="mt-0.5 shrink-0 text-(--color-text-secondary) transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-(--color-text-secondary)">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">Support Hours</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-(--color-text)">
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
          <p className="text-xs font-semibold uppercase tracking-wide text-(--color-primary-hover)">Resolved Tickets</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <FaCheckCircle className="text-emerald-500" /> 0 resolved ticket
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-(--color-secondary)/30 bg-linear-to-r from-(--color-section-light) via-white to-(--color-section-light) p-6 shadow-sm">
        <h3 className="text-xl font-black text-(--color-text)">Need Priority Support?</h3>
        <p className="mt-2 text-sm text-(--color-text-secondary)">
          For urgent delivery or payment concerns, use Call Support for the fastest response.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-lg bg-(--color-secondary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--color-secondary-hover)">
            Call Now
          </button>
          <button className="rounded-lg border border-(--color-border) bg-white px-4 py-2 text-sm font-semibold text-(--color-text-secondary) transition hover:bg-(--color-background)">
            Start Chat
          </button>
          <button className="rounded-lg border border-(--color-border) bg-white px-4 py-2 text-sm font-semibold text-(--color-text-secondary) transition hover:bg-(--color-background)">
            Email Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHelpdesk;
