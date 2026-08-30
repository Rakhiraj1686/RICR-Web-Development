import React, { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaExclamationTriangle,
  FaFileAlt,
  FaHeadset,
  FaPhoneAlt,
  FaQuestionCircle,
  FaSearch,
  FaArrowRight,
  FaPlus,
  FaLifeRing,
} from "react-icons/fa";

const RestaurantHelpDesk = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const supportStats = [
    {
      title: "Open Tickets",
      value: "04",
      description: "Awaiting resolution",
      icon: FaFileAlt,
      iconBg: "bg-red-50",
      iconColor: "text-[--color-primary]",
    },
    {
      title: "In Progress",
      value: "02",
      description: "Currently being handled",
      icon: FaClock,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Resolved",
      value: "18",
      description: "Successfully resolved",
      icon: FaCheckCircle,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "High Priority",
      value: "01",
      description: "Needs attention",
      icon: FaExclamationTriangle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  const quickActions = [
    {
      title: "Raise New Ticket",
      description:
        "Report menu, order, payment or account-related issues.",
      icon: FaPlus,
      buttonLabel: "Create Ticket",
      iconBg: "bg-[#FFF0E7]",
      iconColor: "text-[--color-primary]",
    },
    {
      title: "Live Support",
      description:
        "Connect with a support executive for urgent requests.",
      icon: FaHeadset,
      buttonLabel: "Start Chat",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Call Support",
      description:
        "Speak directly with our support team for critical issues.",
      icon: FaPhoneAlt,
      buttonLabel: "Call Now",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  const recentTickets = [
    {
      id: "#HD-1043",
      subject: "Payment settlement delay",
      category: "Payout",
      status: "In Progress",
      statusColor: "bg-orange-50 text-orange-600",
      updated: "2h ago",
    },
    {
      id: "#HD-1038",
      subject: "Menu image upload failed",
      category: "Menu",
      status: "Open",
      statusColor: "bg-blue-50 text-blue-600",
      updated: "5h ago",
    },
    {
      id: "#HD-1027",
      subject: "Order cancellation dispute",
      category: "Orders",
      status: "Resolved",
      statusColor: "bg-green-50 text-green-600",
      updated: "1d ago",
    },
  ];

  const faqs = [
    {
      question: "How long does payout resolution usually take?",
      answer:
        "Most payout tickets are resolved within 24–48 hours after verification.",
    },
    {
      question: "Can I edit menu details while a ticket is open?",
      answer:
        "Yes. Menu updates can continue unless your ticket is related to account restrictions.",
    },
    {
      question: "How do I mark an issue as urgent?",
      answer:
        "Select High Priority while creating your ticket and include any affected order IDs.",
    },
  ];

  const categories = ["All", "Orders", "Menu", "Payout", "Account"];

  return (
    <div className="min-h-full overflow-y-auto bg-[#FFF8F0]">
      <div className="mx-auto max-w-400 space-y-6 p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#1F2937] p-6 shadow-xl sm:p-8">

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[--color-primary]/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-orange-300/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                <FaLifeRing />
                Restaurant Support
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Help Desk & Support
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
                Get help, track support requests and resolve restaurant
                issues quickly from one place.
              </p>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[--color-primary] px-5 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[--color-primary-hover] hover:shadow-xl sm:w-fit"
            >
              <FaPlus className="text-xs" />
              Raise Support Ticket
            </button>

          </div>

          {/* Support availability */}
          <div className="relative z-10 mt-7 flex items-center gap-3 border-t border-white/10 pt-5">

            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>

            <p className="text-xs font-medium text-white/60">
              Support is currently available
            </p>

            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

            <p className="hidden text-xs text-white/40 sm:block">
              24/7 for order-related emergencies
            </p>

          </div>
        </div>


        {/* =====================================================
            SUPPORT STATISTICS
        ====================================================== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {supportStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group relative overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FFF8F0] transition-transform duration-500 group-hover:scale-150" />

                <div className="relative flex items-start justify-between">

                  <div>
                    <p className="text-sm font-semibold text-[#6B7280]">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-black text-[#1F2937]">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-[#9CA3AF]">
                      {stat.description}
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
            QUICK SUPPORT ACTIONS
        ====================================================== */}
        <section>

          <div className="mb-4">
            <h2 className="text-xl font-extrabold tracking-tight text-[#1F2937]">
              How can we help?
            </h2>

            <p className="mt-1 text-sm text-[#6B7280]">
              Choose the support option that best matches your issue.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <div
                  key={action.title}
                  className="group rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${action.iconBg} ${action.iconColor}`}
                    >
                      <Icon />
                    </div>

                    <FaArrowRight className="text-xs text-[#D1D5DB] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[--color-primary]" />

                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-[#1F2937]">
                    {action.title}
                  </h3>

                  <p className="mt-2 min-h-10.5 text-sm leading-5 text-[#6B7280]">
                    {action.description}
                  </p>

                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-sm font-bold text-[#374151] transition-all duration-200 hover:border-[--color-primary]/30 hover:bg-[#FFF8F0] hover:text-[--color-primary]"
                  >
                    {action.buttonLabel}
                  </button>

                </div>
              );
            })}

          </div>
        </section>


        {/* =====================================================
            TICKETS + CONTACT
        ====================================================== */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Tickets */}
          <section className="rounded-[26px] border border-[#E5E7EB] bg-white shadow-sm xl:col-span-2">

            <div className="border-b border-[#E5E7EB] p-5 sm:p-6">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <h2 className="text-xl font-extrabold text-[#1F2937]">
                    Recent Support Tickets
                  </h2>

                  <p className="mt-1 text-xs text-[#6B7280]">
                    Track your latest support requests.
                  </p>
                </div>

                <div className="relative">

                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF]" />

                  <input
                    type="text"
                    placeholder="Search tickets..."
                    className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-[#FFF8F0] pl-9 pr-4 text-xs font-medium outline-none transition focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/10 sm:w-52"
                  />

                </div>

              </div>


              {/* Category filters */}
              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">

                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${
                      activeCategory === category
                        ? "bg-[--color-primary] text-white shadow-sm"
                        : "bg-[#F5F5F4] text-[#6B7280] hover:bg-[#FFF0E7] hover:text-[--color-primary]"
                    }`}
                  >
                    {category}
                  </button>
                ))}

              </div>

            </div>


            <div className="space-y-3 p-5 sm:p-6">

              {recentTickets.map((ticket) => (

                <div
                  key={ticket.id}
                  className="group rounded-2xl border border-[#E5E7EB] p-4 transition-all duration-200 hover:border-[--color-primary]/20 hover:bg-[#FFFDFB] hover:shadow-sm"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex min-w-0 items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF8F0] text-[--color-primary]">
                        <FaFileAlt className="text-sm" />
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="text-[11px] font-bold text-[#9CA3AF]">
                            {ticket.id}
                          </span>

                          <span className="rounded-full bg-[#F5F5F4] px-2 py-0.5 text-[10px] font-semibold text-[#6B7280]">
                            {ticket.category}
                          </span>

                        </div>

                        <p className="mt-1 truncate text-sm font-bold text-[#1F2937]">
                          {ticket.subject}
                        </p>

                        <p className="mt-1 text-[11px] text-[#9CA3AF]">
                          Updated {ticket.updated}
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center justify-between gap-3 sm:justify-end">

                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${ticket.statusColor}`}
                      >
                        {ticket.status}
                      </span>

                      <button
                        type="button"
                        className="text-xs font-bold text-[#9CA3AF] transition hover:text-[--color-primary]"
                      >
                        View
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>


          {/* Immediate Help */}
          <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E7] text-[--color-primary]">
                <FaHeadset />
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-[#1F2937]">
                  Immediate Help
                </h2>

                <p className="text-xs text-[#9CA3AF]">
                  We're here for you
                </p>
              </div>

            </div>


            <div className="mt-6 space-y-3">

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FFF8F0] p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[--color-primary] shadow-sm">
                    <FaEnvelope />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                      Support Email
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-[#374151]">
                      support@craving.com
                    </p>
                  </div>

                </div>

              </div>


              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FFF8F0] p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                    <FaPhoneAlt />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                      Support Hotline
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#374151]">
                      +91 98765 43210
                    </p>
                  </div>

                </div>

              </div>


              <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4">

                <div className="flex items-center gap-3">

                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                  </span>

                  <div>
                    <p className="text-xs font-bold text-green-700">
                      Support Available
                    </p>

                    <p className="mt-0.5 text-[11px] text-green-700/70">
                      24/7 for order emergencies
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>


        {/* =====================================================
            FAQ + CONTACT FORM
        ====================================================== */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* FAQ */}
          <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaQuestionCircle />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1F2937]">
                  Frequently Asked Questions
                </h2>

                <p className="mt-1 text-xs text-[#9CA3AF]">
                  Quick answers to common questions
                </p>
              </div>

            </div>


            <div className="space-y-3">

              {faqs.map((faq, index) => (

                <details
                  key={faq.question}
                  className="group rounded-2xl border border-[#E5E7EB] bg-[#FFF8F0] p-4"
                  open={index === 0}
                >

                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-bold text-[#374151]">
                    <span className="flex items-start gap-2">
                      <FaQuestionCircle className="mt-0.5 shrink-0 text-xs text-[--color-primary]" />
                      {faq.question}
                    </span>

                    <span className="text-[#9CA3AF] transition-transform group-open:rotate-90">
                      <FaArrowRight className="text-[10px]" />
                    </span>
                  </summary>

                  <p className="mt-3 border-t border-[#E5E7EB] pt-3 text-xs leading-5 text-[#6B7280]">
                    {faq.answer}
                  </p>

                </details>

              ))}

            </div>

          </section>


          {/* Contact Form */}
          <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E7] text-[--color-primary]">
                <FaEnvelope />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1F2937]">
                  Contact Support
                </h2>

                <p className="mt-1 text-xs text-[#9CA3AF]">
                  Tell us what you need help with
                </p>
              </div>

            </div>


            <form className="space-y-4">

              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#374151]">
                  Issue Type
                </label>

                <select className="w-full rounded-xl border border-[#E5E7EB] bg-[#FFF8F0] px-4 py-3 text-sm text-[#374151] outline-none transition focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/10">
                  <option>Order Issue</option>
                  <option>Menu Management</option>
                  <option>Payment & Payout</option>
                  <option>Account Access</option>
                </select>
              </div>


              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#374151]">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Briefly describe your issue"
                  className="w-full rounded-xl border border-[#E5E7EB] bg-[#FFF8F0] px-4 py-3 text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF] transition focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/10"
                />
              </div>


              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#374151]">
                  Description
                </label>

                <textarea
                  rows="5"
                  placeholder="Share complete details to help us resolve your issue quickly..."
                  className="w-full resize-none rounded-xl border border-[#E5E7EB] bg-[#FFF8F0] px-4 py-3 text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF] transition focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/10"
                />
              </div>


              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[--color-primary] py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[--color-primary-hover] hover:shadow-lg"
              >
                Submit Support Request
                <FaArrowRight className="text-[10px]" />
              </button>

            </form>

          </section>

        </div>

      </div>
    </div>
  );
};

export default RestaurantHelpDesk;

