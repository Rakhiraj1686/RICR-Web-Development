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


const ResturantDashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  if (role !== "manager") {
    return (
      <>
        <div className="p-3">
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-(--color-background)">
            <div className="text-5xl text-red-600">⊗</div>
            <div className="text-xl">
              You are not login as Resturant Manager. Please Login again.
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <DashboardLayout
      title="Restaurant Dashboard"
      isCollapsed={isCollapsed}
      sidebarWidthClass="w-10/60"
      collapsedWidthClass="w-3/60"
      sidebar={
        <RestaurantSidebar
          active={active}
          setActive={setActive}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      }
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