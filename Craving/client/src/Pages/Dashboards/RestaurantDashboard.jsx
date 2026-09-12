import React, { useState, useEffect } from "react";
import RestaurantSidebar from "../../Components/restaurantDashboard/RestaurantSidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RestaurantOverview from "../../Components/restaurantDashboard/RestaurantOverview";
import RestaurantProfile from "../../Components/restaurantDashboard/RestaurantProfile";
import RestaurantMenu from "../../Components/restaurantDashboard/RestaurantMenu";
import RestaurantOrders from "../../Components/restaurantDashboard/RestaurantOrders";
import RestaurantEarnings from "../../Components/restaurantDashboard/RestaurantEarnings";
import RestaurantHelpDesk from "../../Components/restaurantDashboard/RestaurantHelpDesk";
import DashboardLayout from "../../Components/DashboardLayout";
import { EmptyState } from "../../Components/ui";
import { FaTriangleExclamation } from "react-icons/fa6";

const ResturantDashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  if (role !== "manager") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <EmptyState
          icon={<FaTriangleExclamation />}
          title="Not logged in as a restaurant manager"
          description="This dashboard is only available to restaurant manager accounts. Please log in again with a manager account."
          actionLabel="Go to Login"
          onAction={() => navigate("/login")}
        />
      </div>
    );
  }
  return (
    <DashboardLayout
      title="Restaurant Dashboard"
      isCollapsed={isCollapsed}
      sidebarWidthClass="w-10/60"
      collapsedWidthClass="w-3/60"
      sidebar={({ closeMobile }) => (
        <RestaurantSidebar
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
      <div className="h-full bg-(--color-primary)/10">
        {active === "overview" && <RestaurantOverview setActive={setActive} />}
        {active === "profile" && <RestaurantProfile />}
        {active === "menu" && <RestaurantMenu />}
        {active === "orders" && <RestaurantOrders />}
        {active === "earnings" && <RestaurantEarnings />}
        {active === "helpdesk" && <RestaurantHelpDesk />}
      </div>
    </DashboardLayout>
  );
};

export default ResturantDashboard;