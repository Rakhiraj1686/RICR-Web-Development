import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaExclamationTriangle,
  FaFileAlt,
  FaHeadset,
  FaPhoneAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const RestaurantHelpDesk = () => {
  const supportStats = [
    {
      title: "Open Tickets",
      value: "04",
      icon: <FaFileAlt className="text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "In Progress",
      value: "02",
      icon: <FaClock className="text-yellow-500" />,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Resolved",
      value: "18",
      icon: <FaCheckCircle className="text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      title: "High Priority",
      value: "01",
      icon: <FaExclamationTriangle className="text-red-500" />,
      bgColor: "bg-red-100",
    },
  ];

  const quickActions = [
    {
      title: "Raise New Ticket",
      description: "Report menu, order, or payout related issues quickly.",
      icon: <FaFileAlt className="text-xl text-blue-500" />,
      buttonLabel: "Create Ticket",
    },
    {
      title: "Live Support",
      description: "Connect with support executive for urgent requests.",
      icon: <FaHeadset className="text-xl text-purple-500" />,
      buttonLabel: "Start Chat",
    },
    {
      title: "Call Support",
      description: "Reach support directly for critical delivery issues.",
      icon: <FaPhoneAlt className="text-xl text-green-500" />,
      buttonLabel: "Call Now",
    },
  ];

  const recentTickets = [
    {
      id: "#HD-1043",
      subject: "Payment settlement delay",
      category: "Payout",
      status: "In Progress",
      statusColor: "bg-yellow-100 text-yellow-700",
      updated: "2h ago",
    },
    {
      id: "#HD-1038",
      subject: "Menu image upload failed",
      category: "Menu",
      status: "Open",
      statusColor: "bg-blue-100 text-blue-700",
      updated: "5h ago",
    },
    {
      id: "#HD-1027",
      subject: "Order cancellation dispute",
      category: "Orders",
      status: "Resolved",
      statusColor: "bg-green-100 text-green-700",
      updated: "1d ago",
    },
  ];

  const faqs = [
    {
      question: "How long does payout resolution usually take?",
      answer: "Most payout tickets are resolved within 24-48 hours after verification.",
    },
    {
      question: "Can I edit menu details while ticket is open?",
      answer: "Yes, menu updates can continue unless your ticket is about account restrictions.",
    },
    {
      question: "How do I mark an issue as urgent?",
      answer: "Use High Priority while creating ticket and mention impacted order IDs.",
    },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Help Desk & Support</h2>
            <p className="text-gray-600 mt-1">
              Track issues, contact support, and manage restaurant queries in one place.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors w-full md:w-auto">
            Raise Support Ticket
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {supportStats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg text-2xl`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <div
            key={action.title}
            className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gray-100 rounded-lg p-2">{action.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{action.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{action.description}</p>
            <button className="w-full border border-gray-300 hover:border-blue-400 hover:text-blue-600 px-4 py-2 rounded-md font-medium text-sm transition-colors">
              {action.buttonLabel}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Support Tickets</h3>
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{ticket.id}</p>
                    <p className="text-gray-800 font-semibold mt-1">{ticket.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">Category: {ticket.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${ticket.statusColor}`}
                    >
                      {ticket.status}
                    </span>
                    <span className="text-xs text-gray-500">Updated {ticket.updated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Need Immediate Help?</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-700">Support Email</p>
              <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> support@craving.com
              </p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <p className="text-sm font-semibold text-green-700">Support Hotline</p>
              <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                <FaPhoneAlt className="text-green-500" /> +91 98765 43210
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
              <p className="text-sm font-semibold text-purple-700">Availability</p>
              <p className="text-sm text-gray-700 mt-1">24/7 for order-related emergencies</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-800 flex items-start gap-2">
                  <FaQuestionCircle className="text-blue-500 mt-0.5" />
                  <span>{faq.question}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Support</h3>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Issue Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Order Issue</option>
                <option>Menu Management</option>
                <option>Payment & Payout</option>
                <option>Account Access</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
              <input
                type="text"
                placeholder="Briefly describe your issue"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
              <textarea
                rows="4"
                placeholder="Share complete details to help us resolve quickly"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition-colors">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHelpDesk;