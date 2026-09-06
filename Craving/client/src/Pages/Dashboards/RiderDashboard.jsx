import React, { useEffect, useState } from "react";
import RiderSideBar from "../../Components/riderDashboard/RiderSideBar";
import RiderOverview from "../../Components/riderDashboard/RiderOverview";
import RiderProfile from "../../Components/riderDashboard/RiderProfile";
import RiderCurrentOrder from "../../Components/riderDashboard/RiderCurrentOrder";
import RiderOrderHistory from "../../Components/riderDashboard/RiderOrderHistory";
import DashboardLayout from "../../Components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RiderDashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  if (role !== "partner") {
    return (
      <>
        <div className="p-3">
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-(--color-background)">
            <div className="text-5xl text-red-600">⊗</div>
            <div className="text-xl">
              You are not logged in as Rider. Please login again.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DashboardLayout
      title="Rider Dashboard"
      isCollapsed={isCollapsed}
      sidebarWidthClass="w-12/60"
      collapsedWidthClass="w-2/60"
      sidebar={
        <RiderSideBar
          active={active}
          setActive={setActive}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      }
    >
      {active === "overview" && <RiderOverview setActive={setActive} />}
      {active === "profile" && <RiderProfile />}
      {active === "current-order" && <RiderCurrentOrder />}
      {active === "order-history" && <RiderOrderHistory />}
    </DashboardLayout>
  );
};

export default RiderDashboard;