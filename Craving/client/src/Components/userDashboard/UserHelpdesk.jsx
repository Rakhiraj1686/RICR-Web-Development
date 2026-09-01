
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
      description:
        "Talk directly with our support team for urgent delivery or payment concerns.",
      value: "+91 98765 43210",
      icon: <FaPhoneAlt />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      button: "Call Now",
    },
    {
      title: "Email Support",
      description:
        "Send complete issue details and screenshots for detailed assistance.",
      value: "support@craving.com",
      icon: <FaEnvelope />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      button: "Send Email",
    },
    {
      title: "Live Chat",
      description:
        "Get quick assistance for orders, account questions and general help.",
      value: "Available 9 AM - 9 PM",
      icon: <FaComments />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      button: "Start Chat",
    },
  ];

  const issueCategories = [
    {
      title: "Order Issues",
      subtitle: "Late delivery, wrong item or cancellation",
      icon: <FaBoxOpen />,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      priority: "High",
    },
    {
      title: "Payment Issues",
      subtitle: "Failed payment, refund or duplicate charge",
      icon: <FaWallet />,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      priority: "Medium",
    },
    {
      title: "Account Issues",
      subtitle: "Login, profile update or security concern",
      icon: <FaUserShield />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
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
        "Visit Profile settings and use Edit Profile to update your phone, address and delivery preferences.",
    },
  ];

  return (
    <div
      className="
        h-full
        overflow-y-auto
        bg-[#f7f8fa]
        p-4
        sm:p-5
        lg:p-6
      "
    >
      <div className="mx-auto max-w-[1500px] space-y-5">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-(--color-border)
            bg-white
            shadow-sm
          "
        >
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-(--color-section-light) to-transparent opacity-70" />

          <div
            className="
              relative
              flex
              flex-col
              gap-6
              p-5
              sm:p-6
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:p-7
            "
          >
            {/* Header content */}
            <div className="max-w-2xl">

              <div className="mb-3 flex items-center gap-2">
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-(--color-primary)
                    text-white
                    shadow-sm
                  "
                >
                  <FaHeadset />
                </span>

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary)">
                  Help Center
                </span>
              </div>

              <h1
                className="
                  text-2xl
                  font-black
                  tracking-tight
                  text-(--color-text)
                  sm:text-3xl
                "
              >
                How can we help you?
              </h1>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-(--color-text-secondary)
                "
              >
                Get quick assistance with orders, payments and account
                related questions through our support channels.
              </p>

              {/* Trust badges */}
              <div className="mt-4 flex flex-wrap gap-2">

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-(--color-border)
                    bg-(--color-section-light)
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-(--color-text-secondary)
                  "
                >
                  <FaBolt className="text-(--color-primary)" />
                  Fast response
                </span>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-(--color-border)
                    bg-(--color-section-light)
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-(--color-text-secondary)
                  "
                >
                  <FaShieldAlt className="text-emerald-500" />
                  Secure support
                </span>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-(--color-border)
                    bg-(--color-section-light)
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-(--color-text-secondary)
                  "
                >
                  <FaTicketAlt className="text-blue-500" />
                  Priority tickets
                </span>

              </div>
            </div>

            {/* Support metrics */}
            <div
              className="
                grid
                w-full
                shrink-0
                grid-cols-2
                gap-3
                sm:w-auto
                sm:min-w-[340px]
              "
            >
              <div
                className="
                  rounded-xl
                  border
                  border-(--color-border)
                  bg-[#fafafa]
                  p-4
                "
              >
                <p className="text-[11px] font-medium text-(--color-text-secondary)">
                  Avg. Response
                </p>

                <p className="mt-1 text-xl font-black text-(--color-text)">
                  10–15 min
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-(--color-border)
                  bg-[#fafafa]
                  p-4
                "
              >
                <p className="text-[11px] font-medium text-(--color-text-secondary)">
                  Resolution Rate
                </p>

                <p className="mt-1 text-xl font-black text-emerald-600">
                  97%
                </p>
              </div>

              <div
                className="
                  col-span-2
                  rounded-xl
                  border
                  border-(--color-border)
                  bg-[#fafafa]
                  p-4
                "
              >
                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="text-[11px] font-medium text-(--color-text-secondary)">
                      Support Availability
                    </p>

                    <p className="mt-1 text-sm font-bold text-(--color-text)">
                      Monday – Sunday
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-700">
                      9 AM – 9 PM
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =====================================================
            SUPPORT CHANNELS
        ====================================================== */}
        <section>

          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-black text-(--color-text)">
                Contact Support
              </h2>

              <p className="mt-1 text-xs text-(--color-text-secondary)">
                Choose the support option that works best for you.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {supportChannels.map((channel) => (
              <div
                key={channel.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-(--color-border)
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div className="flex items-start justify-between">

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      ${channel.iconBg}
                      ${channel.iconColor}
                    `}
                  >
                    {channel.icon}
                  </div>

                  <FaChevronRight
                    className="
                      mt-2
                      text-xs
                      text-gray-300
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </div>

                <h3 className="mt-4 text-base font-bold text-(--color-text)">
                  {channel.title}
                </h3>

                <p className="mt-1 min-h-[42px] text-xs leading-5 text-(--color-text-secondary)">
                  {channel.description}
                </p>

                <div className="mt-4 rounded-lg bg-[#f8f8f8] px-3 py-2">
                  <p className="truncate text-xs font-semibold text-(--color-text)">
                    {channel.value}
                  </p>
                </div>

                <button
                  type="button"
                  className="
                    mt-4
                    w-full
                    rounded-lg
                    bg-(--color-text)
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-white
                    transition
                    hover:bg-(--color-primary)
                  "
                >
                  {channel.button}
                </button>
              </div>
            ))}

          </div>
        </section>


        {/* =====================================================
            ISSUE + FAQ
        ====================================================== */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          {/* Issue categories */}
          <section
            className="
              rounded-2xl
              border
              border-(--color-border)
              bg-white
              p-5
              shadow-sm
              sm:p-6
            "
          >

            <div className="mb-5">
              <div className="flex items-center gap-2">
                <FaTicketAlt className="text-(--color-primary)" />

                <h2 className="text-lg font-black text-(--color-text)">
                  Report an Issue
                </h2>
              </div>

              <p className="mt-1 text-xs text-(--color-text-secondary)">
                Select the category that best matches your problem.
              </p>
            </div>

            <div className="space-y-3">

              {issueCategories.map((issue) => (
                <button
                  type="button"
                  key={issue.title}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-(--color-border)
                    bg-white
                    p-3
                    text-left
                    transition-all
                    duration-200
                    hover:border-(--color-primary)
                    hover:bg-(--color-section-light)
                  "
                >
                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${issue.iconBg}
                      ${issue.iconColor}
                    `}
                  >
                    {issue.icon}
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-(--color-text)">
                        {issue.title}
                      </p>

                      <span
                        className="
                          rounded-full
                          bg-gray-100
                          px-2
                          py-0.5
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-gray-500
                        "
                      >
                        {issue.priority}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-(--color-text-secondary)">
                      {issue.subtitle}
                    </p>

                  </div>

                  <FaChevronRight
                    className="
                      shrink-0
                      text-xs
                      text-gray-300
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </button>
              ))}

            </div>
          </section>


          {/* FAQ */}
          <section
            className="
              rounded-2xl
              border
              border-(--color-border)
              bg-white
              p-5
              shadow-sm
              sm:p-6
            "
          >

            <div className="mb-5">
              <div className="flex items-center gap-2">
                <FaQuestionCircle className="text-(--color-primary)" />

                <h2 className="text-lg font-black text-(--color-text)">
                  Frequently Asked Questions
                </h2>
              </div>

              <p className="mt-1 text-xs text-(--color-text-secondary)">
                Find quick answers to common questions.
              </p>
            </div>

            <div className="space-y-2">

              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="
                    group
                    rounded-xl
                    border
                    border-(--color-border)
                    bg-[#fafafa]
                    transition-all
                    open:border-(--color-primary)/30
                    open:bg-(--color-section-light)
                  "
                >
                  <summary
                    className="
                      flex
                      cursor-pointer
                      list-none
                      items-center
                      justify-between
                      gap-4
                      p-4
                      text-sm
                      font-semibold
                      text-(--color-text)
                    "
                  >
                    <span className="flex items-start gap-3">
                      <span className="text-xs font-bold text-(--color-primary)">
                        0{index + 1}
                      </span>

                      {faq.question}
                    </span>

                    <FaChevronRight
                      className="
                        shrink-0
                        text-xs
                        text-gray-400
                        transition-transform
                        duration-200
                        group-open:rotate-90
                      "
                    />
                  </summary>

                  <div className="px-4 pb-4 pl-11">
                    <p className="text-xs leading-5 text-(--color-text-secondary)">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}

            </div>
          </section>

        </div>


        {/* =====================================================
            SUPPORT STATUS
        ====================================================== */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div
            className="
              rounded-xl
              border
              border-(--color-border)
              bg-white
              p-4
              shadow-sm
            "
          >
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FaClock />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-(--color-text-secondary)">
                  Support Hours
                </p>

                <p className="mt-1 text-xs font-bold text-(--color-text)">
                  Mon – Sun, 9 AM – 9 PM
                </p>
              </div>

            </div>
          </div>


          <div
            className="
              rounded-xl
              border
              border-amber-200
              bg-amber-50/50
              p-4
              shadow-sm
            "
          >
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <FaExclamationCircle />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-amber-700">
                  Open Tickets
                </p>

                <p className="mt-1 text-xs font-bold text-amber-900">
                  0 active tickets
                </p>
              </div>

            </div>
          </div>


          <div
            className="
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50/50
              p-4
              shadow-sm
            "
          >
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <FaCheckCircle />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                  Resolved Tickets
                </p>

                <p className="mt-1 text-xs font-bold text-emerald-900">
                  0 resolved tickets
                </p>
              </div>

            </div>
          </div>

        </section>


        {/* =====================================================
            PRIORITY SUPPORT
        ====================================================== */}
        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-(--color-primary)/20
            bg-white
            p-5
            shadow-sm
            sm:p-6
          "
        >
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-(--color-section-light) to-transparent" />

          <div
            className="
              relative
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div className="flex items-start gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-(--color-primary)
                  text-white
                  shadow-sm
                "
              >
                <FaHeadset />
              </div>

              <div>
                <h2 className="text-base font-black text-(--color-text)">
                  Need priority support?
                </h2>

                <p className="mt-1 max-w-xl text-xs leading-5 text-(--color-text-secondary)">
                  For urgent delivery or payment concerns, contact our
                  support team directly for faster assistance.
                </p>
              </div>

            </div>

            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-(--color-primary)
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  transition
                  hover:bg-(--color-primary-hover)
                "
              >
                <FaPhoneAlt />
                Call Now
              </button>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-(--color-border)
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-(--color-text)
                  transition
                  hover:bg-gray-50
                "
              >
                <FaComments />
                Start Chat
              </button>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-(--color-border)
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-(--color-text)
                  transition
                  hover:bg-gray-50
                "
              >
                <FaEnvelope />
                Email Us
              </button>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default UserHelpdesk;