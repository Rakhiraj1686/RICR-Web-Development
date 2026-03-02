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
} from "react-icons/fa";

const UserOverview = () => {
  const overviewStats = [
    {
      title: "Total Orders",
      value: "0",
      icon: <FaClipboardList className="text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Orders",
      value: "0",
      icon: <FaClock className="text-yellow-500" />,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Spent",
      value: "₹0",
      icon: <FaRupeeSign className="text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      title: "Delivered Orders",
      value: "0",
      icon: <FaCheckCircle className="text-purple-500" />,
      bgColor: "bg-purple-100",
    },
  ];

  const quickActions = [
    {
      title: "Update Profile",
      description: "Manage your personal information",
      icon: <FaUserEdit className="text-indigo-500 text-xl" />,
    },
    {
      title: "View Orders",
      description: "Track your active and past orders",
      icon: <FaShoppingBag className="text-blue-500 text-xl" />,
    },
    {
      title: "Payment Methods",
      description: "Review saved cards and transactions",
      icon: <FaCreditCard className="text-green-500 text-xl" />,
    },
    {
      title: "Need Help",
      description: "Contact support for quick assistance",
      icon: <FaHeadset className="text-orange-500 text-xl" />,
    },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h1>
        <p className="text-sm text-gray-600">Your account activity at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {overviewStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-4 rounded-lg text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{action.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{action.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="text-center text-gray-500 py-12 border border-dashed border-gray-300 rounded-lg">
            No recent activity to display
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;