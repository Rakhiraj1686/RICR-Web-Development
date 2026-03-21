import React, { useEffect, useMemo, useState } from "react";
import api from "../../Config/Api";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Loading";

const UserPayment = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/user/placedorders");
      setOrders(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (error) {
      setOrders([]);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatAmount = (value) => `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

  const paymentMethods = useMemo(() => {
    const methods = [];

    if (user?.paymentDetails?.upi && user.paymentDetails.upi !== "N/A") {
      methods.push({
        name: "UPI",
        desc: user.paymentDetails.upi,
        tag: "Primary",
        tagColor: "bg-emerald-100 text-emerald-700",
      });
    }

    if (
      user?.paymentDetails?.account_number &&
      user.paymentDetails.account_number !== "N/A"
    ) {
      methods.push({
        name: "Bank Account",
        desc: `A/C ending ${String(user.paymentDetails.account_number).slice(-4)}`,
        tag: "Verified",
        tagColor: "bg-blue-100 text-blue-700",
      });
    }

    if (methods.length === 0) {
      methods.push({
        name: "No Method Added",
        desc: "Add a UPI ID or bank details in your profile",
        tag: "Pending",
        tagColor: "bg-amber-100 text-amber-700",
      });
    }

    return methods;
  }, [user]);

  const paymentStats = useMemo(() => {
    const now = new Date();
    const totalSpent = orders.reduce(
      (sum, order) => sum + Number(order?.orderValue?.total || 0),
      0,
    );
    const thisMonthSpent = orders.reduce((sum, order) => {
      const orderDate = new Date(order?.createdAt);
      const isCurrentMonth =
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear();
      return isCurrentMonth ? sum + Number(order?.orderValue?.total || 0) : sum;
    }, 0);
    const paidCount = orders.filter(
      (order) => order?.orderValue?.paymentStatus === "paid",
    ).length;

    return { totalSpent, thisMonthSpent, paidCount };
  }, [orders]);

  const transactions = useMemo(
    () =>
      orders.slice(0, 6).map((order) => ({
        id: order?.orderNumber || order?._id?.slice(0, 8) || "N/A",
        date: order?.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-IN")
          : "N/A",
        method: order?.orderValue?.paymentMethod || "N/A",
        amount: formatAmount(order?.orderValue?.total || 0),
        status: order?.orderValue?.paymentStatus || "pending",
      })),
    [orders],
  );

  if (isLoading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-linear-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-4 sm:p-6">
      <div className="relative overflow-hidden rounded-3x border border-[#dbe3ec] bg-white/85 p-6 shadow-xl backdrop-blur-sm">
        <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-[#93c5fd]/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-[#a5b4fc]/15 blur-3xl" />

        <div className="relative">
          <h2 className="text-2xl font-black tracking-tight text-[#4f3838] sm:text-3xl">
            Payments & Billing
          </h2>
          <p className="mt-1 text-sm font-medium text-[#7d6666] sm:text-base">
            Manage your payment methods and keep track of transactions.
          </p>
        </div>

        <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#ead8c6] bg-[#fff8f0] p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#90735d]">
              Total Spent
            </p>
            <p className="mt-2 text-2xl font-black text-[#4f3838]">
              {formatAmount(paymentStats.totalSpent)}
            </p>
          </div>
          <div className="rounded-2xl border border-[#ead8c6] bg-[#fff8f0] p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#90735d]">
              This Month
            </p>
            <p className="mt-2 text-2xl font-black text-[#4f3838]">
              {formatAmount(paymentStats.thisMonthSpent)}
            </p>
          </div>
          <div className="rounded-2xl border border-[#ead8c6] bg-[#fff8f0] p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#90735d]">
              Paid Transactions
            </p>
            <p className="mt-2 text-2xl font-black text-[#4f3838]">
              {paymentStats.paidCount}
            </p>
          </div>
        </div>

        <div className="relative mt-7 rounded-2xl border border-[#e3cebc] bg-white/85 p-5 shadow-md">
          <h3 className="text-lg font-black tracking-tight text-[#4f3838] sm:text-xl">
            Payment Methods
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {paymentMethods.map((method, idx) => (
              <button
                key={idx}
                className="rounded-xl border border-[#ead8c6] bg-[#fffaf5] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-[#4f3838]">{method.name}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${method.tagColor}`}
                  >
                    {method.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#7a6152]">{method.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-6 rounded-2xl border border-[#e3cebc] bg-white/85 p-5 shadow-md">
          <h3 className="text-lg font-black tracking-tight text-[#4f3838] sm:text-xl">
            Recent Transactions
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-170">
              <thead>
                <tr className="border-b border-[#ead8c6] text-left text-sm uppercase tracking-wider text-[#8d725d]">
                  <th className="pb-3 font-semibold">Transaction ID</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Method</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td className="py-6 text-center text-sm text-[#7a6152]" colSpan={5}>
                      No transactions found yet.
                    </td>
                  </tr>
                ) : (
                  transactions.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#f2e4d4] text-sm text-[#4f3a3a]"
                    >
                      <td className="py-3 font-semibold">{item.id}</td>
                      <td className="py-3">{item.date}</td>
                      <td className="py-3">{item.method}</td>
                      <td className="py-3 font-semibold">{item.amount}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                            item.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : item.status === "failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPayment