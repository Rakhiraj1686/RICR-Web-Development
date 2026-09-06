import React from "react";

const DashboardLayout = ({
  title = "Dashboard",
  isCollapsed = false,
  sidebarWidthClass = "w-12/60",
  collapsedWidthClass = "w-3/60",
  sidebar,
  children,
}) => {
  const sidebarWidth = isCollapsed ? collapsedWidthClass : sidebarWidthClass;

  return (
    <div className="flex min-h-[calc(100vh-7rem)] w-full overflow-hidden bg-(--color-background)">
      <aside
        className={`shrink-0 overflow-hidden border-r border-(--color-border) bg-(--color-background) transition-all duration-300 ${sidebarWidth}`}
        aria-label={`${title} navigation`}
      >
        {sidebar}
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto bg-(--color-primary)/5">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;