import React, { useState } from "react";
import UserOverview from "../../Components/userDashboard/userOverview";
import UserSidebar from "../../Components/userDashboard/UserSidebar";
import UserProfile from "../../Components/userDashboard/UserProfile";
import UserOrder from "../../Components/userDashboard/UserOrder";
import UserPayment from "../../Components/userDashboard/UserPayment";
import UserHelpdesk from "../../Components/userDashboard/UserHelpdesk";

const UserDashboard = () => {
  const [active, setActive] = useState("overView");
  const [isCollapsed, setIsCollapsed] = useState(false);
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
