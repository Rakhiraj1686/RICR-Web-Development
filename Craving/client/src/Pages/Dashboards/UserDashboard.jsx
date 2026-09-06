import React, { useState,useEffect } from "react";
import UserOverview from "../../Components/userDashboard/UserOverview";
import UserSidebar from "../../Components/userDashboard/UserSidebar";
import UserProfile from "../../Components/userDashboard/UserProfile";
import UserOrder from "../../Components/userDashboard/UserOrder";
import UserPayment from "../../Components/userDashboard/UserPayment";
import UserHelpdesk from "../../Components/userDashboard/UserHelpdesk";
import DashboardLayout from "../../Components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate,useLocation } from "react-router-dom";

const UserDashboard = () => {
  const { role, isLogin } = useAuth();
  const ActiveTab = useLocation().state?.tab ||"overview";
  const navigate = useNavigate();
  const [active, setActive] = useState(ActiveTab);
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
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-(--color-background)">
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
    <DashboardLayout
      title="User Dashboard"
      isCollapsed={isCollapsed}
      sidebarWidthClass="w-12/60"
      collapsedWidthClass="w-3/60"
      sidebar={
        <UserSidebar
          active={active}
          setActive={setActive}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      }
    >
      {active === "overview" && <UserOverview />}
      {active === "profile" && <UserProfile />}
      {active === "order" && <UserOrder />}
      {active === "payment" && <UserPayment />}
      {active === "helpdesk" && <UserHelpdesk />}
    </DashboardLayout>
  );
};

export default UserDashboard;