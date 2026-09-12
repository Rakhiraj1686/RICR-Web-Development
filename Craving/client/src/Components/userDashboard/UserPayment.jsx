import React, { useEffect, useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCreditCard,
  FaHistory,
  FaMoneyBillWave,
  FaReceipt,
  FaShieldAlt,
  FaWallet,
} from "react-icons/fa";
import { MdAccountBalance, MdPayments } from "react-icons/md";

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

  const formatAmount = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const paymentMethods = useMemo(() => {
    const methods = [];

    if (
      user?.paymentDetails?.upi &&
      user.paymentDetails.upi !== "N/A"
    ) {
      methods.push({
        name: "UPI",
        desc: user.paymentDetails.upi,
        tag: "Primary",
        icon: <MdPayments />,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        tagColor: "bg-emerald-100 text-emerald-700",
      });
    }

    if (
      user?.paymentDetails?.account_number &&
      user.paymentDetails.account_number !== "N/A"
    ) {
      methods.push({
        name: "Bank Account",
        desc: `A/C ending ${String(
          user.paymentDetails.account_number
        ).slice(-4)}`,
        tag: "On file",
        icon: <MdAccountBalance />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        tagColor: "bg-blue-100 text-blue-700",
      });
    }

    if (methods.length === 0) {
      methods.push({
        name: "No Payment Method",
        desc: "Add a UPI ID or bank account from your profile.",
        tag: "Pending",
        icon: <FaCreditCard />,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        tagColor: "bg-amber-100 text-amber-700",
      });
    }

    return methods;
  }, [user]);

  const paymentStats = useMemo(() => {
    const now = new Date();

    const totalSpent = orders.reduce(
      (sum, order) =>
        sum + Number(order?.orderValue?.total || 0),
      0
    );

    const thisMonthSpent = orders.reduce((sum, order) => {
      const orderDate = new Date(order?.createdAt);

      const isCurrentMonth =
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear();

      return isCurrentMonth
        ? sum + Number(order?.orderValue?.total || 0)
        : sum;
    }, 0);

    const paidCount = orders.filter(
      (order) => order?.orderValue?.paymentStatus === "paid"
    ).length;

    return {
      totalSpent,
      thisMonthSpent,
      paidCount,
    };
  }, [orders]);

  const transactions = useMemo(
    () =>
      orders.slice(0, 6).map((order) => ({
        id:
          order?.orderNumber ||
          order?._id?.slice(0, 8) ||
          "N/A",

        date: order?.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A",

        method:
          order?.orderValue?.paymentMethod || "N/A",

        amount: formatAmount(
          order?.orderValue?.total || 0
        ),

        status:
          order?.orderValue?.paymentStatus || "pending",
      })),
    [orders]
  );

  const getStatusStyle = (status) => {
    if (status === "paid") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (status === "failed") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-(--color-background)">

      {/* PAGE CONTAINER */}
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">

        {/* ================= HEADER ================= */}
        <section className="relative overflow-hidden rounded-3xl bg-(--color-text) p-6 text-white shadow-xl sm:p-8">

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-(--color-primary)/30 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-(--color-secondary)/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/70">
                <FaWallet />
                <span>ACCOUNT & BILLING</span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Payments & Billing
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
                Manage your payment methods, monitor spending,
                and review your complete transaction history.
              </p>

            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur-sm">
              <FaMoneyBillWave />
            </div>

          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

          {/* Total */}
          <div className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-semibold text-(--color-text-secondary)">
                  Total Spent
                </p>

                <h3 className="mt-2 text-3xl font-black text-(--color-text)">
                  {formatAmount(paymentStats.totalSpent)}
                </h3>

                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-(--color-text-secondary)">
                  <FaArrowUp className="text-emerald-500" />
                  Lifetime spending
                </p>
              </div>

              <div className="rounded-2xl bg-(--color-section-light) p-3 text-xl text-(--color-primary)">
                <FaMoneyBillWave />
              </div>

            </div>

          </div>

          {/* Month */}
          <div className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-semibold text-(--color-text-secondary)">
                  This Month
                </p>

                <h3 className="mt-2 text-3xl font-black text-(--color-text)">
                  {formatAmount(paymentStats.thisMonthSpent)}
                </h3>

                <p className="mt-2 text-xs font-medium text-(--color-text-secondary)">
                  Current month spending
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-3 text-xl text-blue-600">
                <FaHistory />
              </div>

            </div>

          </div>

          {/* Paid */}
          <div className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 xl:col-span-1">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-semibold text-(--color-text-secondary)">
                  Paid Transactions
                </p>

                <h3 className="mt-2 text-3xl font-black text-(--color-text)">
                  {paymentStats.paidCount}
                </h3>

                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <FaShieldAlt />
                  Successfully completed
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-3 text-xl text-emerald-600">
                <FaReceipt />
              </div>

            </div>

          </div>

        </section>

        {/* ================= PAYMENT METHODS ================= */}
        <section className="rounded-3xl border border-(--color-border) bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-black text-(--color-text)">
                Payment Methods
              </h2>

              <p className="mt-1 text-sm text-(--color-text-secondary)">
                Your available and verified payment options.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <FaShieldAlt />
              Secure Payments
            </div>

          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

            {paymentMethods.map((method, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-background) p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${method.iconBg} ${method.iconColor}`}
                    >
                      {method.icon}
                    </div>

                    <div>
                      <h3 className="font-bold text-(--color-text)">
                        {method.name}
                      </h3>

                      <p className="mt-1 text-sm text-(--color-text-secondary)">
                        {method.desc}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${method.tagColor}`}
                  >
                    {method.tag}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* ================= TRANSACTIONS ================= */}
        <section className="overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-sm">

          <div className="border-b border-(--color-border) p-5 sm:p-6">

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-black text-(--color-text)">
                  Recent Transactions
                </h2>

                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  Your latest payment activity.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-(--color-primary)">
                <FaReceipt />
                {transactions.length} transactions
              </div>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-180">

              <thead>
                <tr className="border-b border-(--color-border) bg-(--color-background)">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                    Transaction
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                    Method
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>

                {transactions.length === 0 ? (

                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-14 text-center"
                    >

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-section-light) text-xl text-(--color-text-secondary)">
                        <FaReceipt />
                      </div>

                      <p className="mt-4 font-semibold text-(--color-text)">
                        No transactions yet
                      </p>

                      <p className="mt-1 text-sm text-(--color-text-secondary)">
                        Your payment history will appear here.
                      </p>

                    </td>
                  </tr>

                ) : (

                  transactions.map((item, index) => (

                    <tr
                      key={index}
                      className="border-b border-(--color-border) last:border-0 transition hover:bg-(--color-background)"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-section-light) text-(--color-primary)">
                            <FaReceipt />
                          </div>

                          <div>
                            <p className="font-bold text-(--color-text)">
                              #{item.id}
                            </p>

                            <p className="text-xs text-(--color-text-secondary)">
                              Payment transaction
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-4 text-sm text-(--color-text-secondary)">
                        {item.date}
                      </td>

                      <td className="px-6 py-4">

                        <span className="inline-flex items-center gap-2 rounded-lg bg-(--color-background) px-3 py-1.5 text-sm font-semibold capitalize text-(--color-text)">
                          <FaCreditCard className="text-(--color-primary)" />
                          {item.method}
                        </span>

                      </td>

                      <td className="px-6 py-4 font-bold text-(--color-text)">
                        {item.amount}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(
                            item.status
                          )}`}
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

        </section>

        {/* ================= SECURITY FOOTER ================= */}
        <section className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:flex-row sm:items-center">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
            <FaShieldAlt />
          </div>

          <div>
            <h3 className="font-bold text-emerald-900">
              Your payments are protected
            </h3>

            <p className="mt-1 text-sm text-emerald-800/70">
              Payment information is handled securely. Never share your
              OTP, PIN, CVV, or banking password with anyone.
            </p>
          </div>

        </section>

      </div>
    </div>
  );
};

export default UserPayment;

