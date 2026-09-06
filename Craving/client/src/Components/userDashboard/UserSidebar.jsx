import React from "react";
import { PiSquaresFourBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { GiShoppingCart } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
import api from "../../Config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserSidebar = ({ active, setActive, isCollapsed, setIsCollapsed }) => {
  const { setUser, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { key: "overview", title: "Overview", icon: <PiSquaresFourBold /> },
    { key: "profile", title: "Profile", icon: <CgProfile /> },
    { key: "order", title: "Orders", icon: <GiShoppingCart /> },
    { key: "payment", title: "Payments", icon: <RiSecurePaymentLine /> },
    { key: "helpdesk", title: "Help Desk", icon: <RiCustomerService2Fill /> },
  ];

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("CravingUser");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown error");
    }
  };

  return (
    <div className="flex h-full flex-col justify-between bg-linear-to-b from-white via-white to-(--color-background) p-3">
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-(--color-border) bg-(--color-background) p-2 shadow-sm">
          <div className="flex items-center gap-2 overflow-hidden">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-primary)/10 text-lg text-(--color-primary) transition hover:scale-105"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label="Toggle sidebar"
            >
              <GiHamburgerMenu />
            </button>

            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--color-text)/70">
                  User
                </p>
                <p className="truncate text-sm font-black text-(--color-text)">
                  Dashboard
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = active === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-(--color-primary) text-white shadow-md shadow-(--color-primary)/20"
                    : "text-(--color-text) hover:bg-(--color-primary)/5 hover:text-(--color-primary)"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={item.title}
              >
                <span className={`text-lg ${isActive ? "text-white" : "text-(--color-primary)"}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="truncate">{item.title}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
      >
        <LuLogOut className="text-lg" />
        {!isCollapsed && "Logout"}
      </button>
    </div>
  );
};

export default UserSidebar;
