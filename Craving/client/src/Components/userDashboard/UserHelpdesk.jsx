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
  FaChevronRight,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const UserHelpdesk = () => {
  const supportChannels = [
    {
      title: "Call Support",
      description: "Speak directly with our support executive.",
      value: "+91 98765 43210",
      icon: <FaPhoneAlt className="text-green-600 text-lg" />,
    },
    {
      title: "Email Support",
      description: "Share complete issue details and screenshots.",
      value: "support@craving.com",
      icon: <FaEnvelope className="text-blue-600 text-lg" />,
    },
    {
      title: "Live Chat",
      description: "Get instant assistance for quick queries.",
      value: "Available 9 AM - 9 PM",
      icon: <FaComments className="text-orange-600 text-lg" />,
    },
  ];

  const issueCategories = [
    {
      title: "Order Issues",
      subtitle: "Late delivery, wrong item, cancellation",
      icon: <FaBoxOpen className="text-(--color-secondary)" />,
    },
    {
      title: "Payment Issues",
      subtitle: "Failed payment, refund, duplicate charge",
      icon: <FaWallet className="text-(--color-secondary)" />,
    },
    {
      title: "Account Issues",
      subtitle: "Login, profile update, security concern",
      icon: <FaUserShield className="text-(--color-secondary)" />,
    },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto space-y-6">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Help Desk & Support</h2>
            <p className="text-sm text-gray-600 mt-1">
              Fast support for orders, payments, and account related queries.
            </p>
          </div>
          <div className="bg-(--color-secondary)/10 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-600">Average Response Time</p>
            <p className="text-lg font-bold text-(--color-secondary)">10 - 15 minutes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {supportChannels.map((channel, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {channel.icon}
                <h3 className="text-lg font-semibold text-gray-800">{channel.title}</h3>
              </div>
              <FaChevronRight className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm">{channel.description}</p>
            <p className="text-gray-800 font-semibold mt-3">{channel.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-200 pb-3">
            <FaHeadset className="text-(--color-secondary)" />
            Raise an Issue
          </h3>
          <div className="space-y-3">
            {issueCategories.map((issue, idx) => (
              <button
                key={idx}
                className="w-full border border-gray-200 rounded-lg p-4 text-left hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1">{issue.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800">{issue.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{issue.subtitle}</p>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-400 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-200 pb-3">
            <FaQuestionCircle className="text-(--color-secondary)" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800">How can I track my order?</p>
              <p className="text-sm text-gray-600 mt-1">
                Go to the Order tab and click on Track Order for real-time updates.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800">How to request a refund?</p>
              <p className="text-sm text-gray-600 mt-1">
                Contact support with your order number and reason for refund.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800">How can I update my profile details?</p>
              <p className="text-sm text-gray-600 mt-1">
                Open Profile tab and use the Edit button to update your information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
          <p className="text-sm text-gray-500">Support Hours</p>
          <p className="font-semibold text-gray-800 mt-1 flex items-center gap-2">
            <FaClock className="text-(--color-secondary)" />
            Mon - Sun, 9:00 AM - 9:00 PM
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
          <p className="text-sm text-gray-500">Open Tickets</p>
          <p className="font-semibold text-gray-800 mt-1 flex items-center gap-2">
            <FaExclamationCircle className="text-yellow-500" />
            0 active ticket
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
          <p className="text-sm text-gray-500">Resolved Tickets</p>
          <p className="font-semibold text-gray-800 mt-1 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            0 resolved ticket
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Need Priority Support?</h3>
        <p className="text-sm text-gray-600">
          For urgent delivery or payment concerns, use Call Support for the fastest response.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-md bg-(--color-secondary) text-white hover:opacity-90 duration-300">
            Call Now
          </button>
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 duration-300">
            Start Chat
          </button>
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 duration-300">
            Email Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHelpdesk;
