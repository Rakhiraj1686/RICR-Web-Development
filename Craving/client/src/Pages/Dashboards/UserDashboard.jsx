import React, { useState,useEffect } from "react";
import UserOverview from "../../Components/userDashboard/userOverview";
import UserSidebar from "../../Components/userDashboard/UserSidebar";
import UserProfile from "../../Components/userDashboard/UserProfile";
import UserOrder from "../../Components/userDashboard/UserOrder";
import UserPayment from "../../Components/userDashboard/UserPayment";
import UserHelpdesk from "../../Components/userDashboard/UserHelpdesk";
import { useAuth } from "../../context/AuthContext";
import { useNavigate,useLocation } from "react-router-dom";

const UserDashboard = () => {
  const { role, isLogin } = useAuth();
  const ActiveTab = useLocation().state.tab;
  const navigate = useNavigate();
  const [active, setActive] = useState("overView");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  if (role !== "customer") {
    return (
      <>
        <div className="p-3">
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
            <div className="text-5xl text-red-600">⊗</div>
            <div className="text-xl">
              You are not loggedin as customer. Please Login again
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-full h-[92vh] flex">
        <div
          className={`bg-(--color-background) duration-300 ${isCollapsed ? "w-3/60" : "w-12/60"}`}
        >
          <UserSidebar
            active={active}
            setActive={setActive}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <div className={` duration-300 ${isCollapsed ? "w-57/60" : "w-48/60"}`}>
          {active === "overview" && <UserOverview />}
          {active === "profile" && <UserProfile />}
          {active === "order" && <UserOrder />}
          {active === "payment" && <UserPayment />}
          {active === "helpdesk" && <UserHelpdesk />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
