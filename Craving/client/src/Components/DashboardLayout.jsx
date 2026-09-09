import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import { IconButton } from "./ui";

/**
 * Shell used by every dashboard (user/restaurant/rider/admin). On desktop
 * the sidebar is a fixed column; on mobile it becomes an off-canvas drawer
 * opened from a sticky top bar, since a permanent 20%-width sidebar isn't
 * usable at phone widths. `sidebar` should be a render-prop function so the
 * caller can close the drawer after a nav item is tapped on mobile.
 */
const DashboardLayout = ({
  title = "Dashboard",
  isCollapsed = false,
  sidebarWidthClass = "w-12/60",
  collapsedWidthClass = "w-3/60",
  sidebar,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarWidth = isCollapsed ? collapsedWidthClass : sidebarWidthClass;

  // Close the drawer if the viewport grows past the mobile breakpoint
  // while it's open, so it doesn't linger open behind the desktop layout.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarContent =
    typeof sidebar === "function" ? sidebar({ closeMobile: () => setMobileOpen(false) }) : sidebar;

  return (
    <div className="flex min-h-[calc(100vh-7rem)] w-full flex-col overflow-hidden bg-(--color-background) lg:flex-row">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-(--color-border) bg-(--color-card) px-4 py-3 lg:hidden">
        <IconButton
          icon={<GiHamburgerMenu />}
          label="Open menu"
          variant="subtle"
          onClick={() => setMobileOpen(true)}
        />
        <h1 className="text-sm font-black uppercase tracking-wide text-(--color-text)">{title}</h1>
        <span className="w-10" aria-hidden="true" />
      </div>

      {/* Desktop sidebar */}
      <aside
        className={`hidden shrink-0 overflow-hidden border-r border-(--color-border) bg-(--color-background) transition-all duration-300 lg:block ${sidebarWidth}`}
        aria-label={`${title} navigation`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-(--color-overlay)"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="relative z-10 flex h-full w-72 max-w-[80vw] flex-col bg-(--color-background) shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} navigation`}
          >
            <div className="flex justify-end p-2">
              <IconButton
                icon={<FaXmark />}
                label="Close menu"
                variant="subtle"
                onClick={() => setMobileOpen(false)}
              />
            </div>
            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1 overflow-y-auto bg-(--color-primary)/5">{children}</main>
    </div>
  );
};

export default DashboardLayout;
