import React, { useState, useEffect } from "react";
import RestaurantSidebar from "../../Components/restaurantDashboard/RestaurantSidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RestaurantMenu from "../../Components/restaurantDashboard/RestaurantMenu";
import RestaurantOrders from "../../Components/restaurantDashboard/RestaurantOrders";
import RestaurantTotalSale from "../../Components/restaurantDashboard/RestaurantTotalSale";
import RestaurantStock from "../../components/restaurantDashboard/RestaurantStock";
import RestaurantCustomer from "../../components/restaurantDashboard/RestaurantCustomer";
import RestaurantManager from "../../Components/restaurantDashboard/RestaurantManager";


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
          {active === "menu" && <RestaurantMenu />}
          {active === "orders" && <RestaurantOrders />}
          {active === "sale" && <RestaurantTotalSale />}
          {active === "stock" && <RestaurantStock />}
          {active === "customer" && <RestaurantCustomer />}
          {active === "manager" && <RestaurantManager />}
        </div>
      </div>
    </>
  );
};

export default ResturantDashboard;
