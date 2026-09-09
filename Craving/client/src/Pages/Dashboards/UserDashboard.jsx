import React, { useState, useEffect } from "react";
import UserOverview from "../../Components/userDashboard/UserOverview";
import UserSidebar from "../../Components/userDashboard/UserSidebar";
import UserProfile from "../../Components/userDashboard/UserProfile";
import UserOrder from "../../Components/userDashboard/UserOrder";
import UserPayment from "../../Components/userDashboard/UserPayment";
import UserHelpdesk from "../../Components/userDashboard/UserHelpdesk";
import DashboardLayout from "../../Components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { EmptyState } from "../../Components/ui";
import { FaTriangleExclamation } from "react-icons/fa6";

const UserDashboard = () => {
  const { role, isLogin } = useAuth();
  const ActiveTab = useLocation().state?.tab || "overview";
  const navigate = useNavigate();
  const [active, setActive] = useState(ActiveTab);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  if (role !== "customer") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <EmptyState
          icon={<FaTriangleExclamation />}
          title="Not logged in as a customer"
          description="This dashboard is only available to customer accounts. Please log in again with a customer account."
          actionLabel="Go to Login"
          onAction={() => navigate("/login")}
        />
      </div>
    );
  }
  return (
    <DashboardLayout
      title="User Dashboard"
      isCollapsed={isCollapsed}
      sidebarWidthClass="w-12/60"
      collapsedWidthClass="w-3/60"
      sidebar={({ closeMobile }) => (
        <UserSidebar
          active={active}
          setActive={(key) => {
            setActive(key);
            closeMobile();
          }}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      )}
    >
      {active === "overview" && <UserOverview onNavigateTab={setActive} />}
      {active === "profile" && <UserProfile />}
      {active === "order" && <UserOrder />}
      {active === "payment" && <UserPayment />}
      {active === "helpdesk" && <UserHelpdesk />}
    </DashboardLayout>
  );
};

export default UserDashboard;