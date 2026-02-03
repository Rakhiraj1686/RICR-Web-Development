import React, { useState, useEffect } from "react";
import RestaurantSidebar from "../../Components/restaurantDashboard/RestaurantSidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RestaurantOverview from "../../Components/restaurantDashboard/RestaurantOverview";
import RestaurantProfile from "../../Components/restaurantDashboard/RestaurantProfile";
import RestaurantMenu from "../../Components/restaurantDashboard/RestaurantMenu";
import RestaurantOrders from "../../Components/restaurantDashboard/RestaurantOrders";
import RestaurantEarnings from "../../Components/restaurantDashboard/RestaurantEarnings";
import RestaurantHelpDesk from "../../components/restaurantDashboard/RestaurantHelpDesk";


const ResturantDashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
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
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
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
    <>
      <div className="w-full flex h-[92.5vh]">
        <div
          className={`bg-(--color-background) duration-300 ${isCollapsed ? "w-3/60" : "w-10/60"}`}
        >
          <RestaurantSidebar
            active={active}
            setActive={setActive}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <div
          className={`bg-(--color-primary)/10 duration-300 ${isCollapsed ? "w-57/60" : " w-50/60"}`}
        >
          {active === "overview" && <RestaurantOverview />}
          {active === "profile" && <RestaurantProfile />}
          {active === "menu" && <RestaurantMenu />}
          {active === "orders" && <RestaurantOrders />}
          {active === "earnings" && <RestaurantEarnings />}
          {active === "helpdesk" && <RestaurantHelpDesk />}
        </div>
      </div>
    </>
  );
};

export default ResturantDashboard;
