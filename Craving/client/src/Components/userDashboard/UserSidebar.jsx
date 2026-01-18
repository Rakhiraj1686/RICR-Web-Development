import React from "react";
import { PiSquaresFourBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { GiShoppingCart } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

const UserSidebar = ({ active, setActive, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { key: "overview", title: "overview", icon: <PiSquaresFourBold /> },
    { key: "profile", title: "Profile", icon: <CgProfile /> },
    { key: "order", title: "Order", icon: <GiShoppingCart /> },
    { key: "payment", title: "Payment", icon: <RiSecurePaymentLine /> },
    { key: "helpdesk", title: "Help Desk", icon: <RiCustomerService2Fill /> },
  ];
  return (
    <>
      <div className="p-3">
        <div className="h-10 text-2xl font-bold flex items-center gap-8 p-1">
          <button
            className="hover:scale-105 px-3"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <GiHamburgerMenu />
          </button>
          {!isCollapsed && (
            <span className="overflow-hidden text-nowrap">USER DASHBOARD</span>
          )}
        </div>
        <hr />

        <div className="grid gap-6 py-6 p-2 text-xl ">
          {menuItems.map((item, idx) => (
            <button
              className={`flex gap-6 items-center rounded-xl h-12 px-3 text-nowrap duration-300 ${
                active === item.key
                  ? "bg-(--color-secondary) text-white"
                  : " hover:bg-gray-100/70"
              }`}
              onClick={() => setActive(item.key)}
              key={idx}
            >
              {" "}
              {item.icon}
              {!isCollapsed && item.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
