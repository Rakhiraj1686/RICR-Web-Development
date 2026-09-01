import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";

/**
 * Responsive dashboard shell.
 *
 * Desktop (md and up): renders `desktopSidebar` in a normal flex column, unchanged.
 * Mobile (below md): hides the desktop sidebar, shows a sticky header with a
 * hamburger button, and slides `mobileSidebar` in from the left as a drawer
 * with an overlay. Open/close state is controlled by the parent so it can
 * also be used to close the drawer on navigation.
 */
const DashboardResponsiveShell = ({
  title = "Craving",
  isMobileOpen,
  onOpenMobile,
  onCloseMobile,
  desktopSidebar,
  mobileSidebar,
  children,
}) => {
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <div className="flex h-[92vh] w-full flex-col md:flex-row">
      {/* Mobile sticky header */}
      <div className="flex h-14 w-full shrink-0 items-center justify-between border-b border-(--color-border) bg-white px-2 md:hidden">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-xl text-(--color-text) transition hover:bg-(--color-background)"
        >
          <GiHamburgerMenu />
        </button>
        <span className="text-lg font-black text-(--color-primary)">
          {title}
        </span>
        {/* spacer so the title stays visually centered */}
        <span className="h-11 w-11" aria-hidden="true" />
      </div>

      {/* Desktop sidebar — unchanged behavior, just hidden below md */}
      <div className="hidden shrink-0 bg-(--color-background) md:block md:h-full">
        {desktopSidebar}
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} navigation`}
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] transform bg-(--color-background) shadow-2xl transition-transform duration-250 ease-in-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-2">
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-xl text-(--color-text) transition hover:bg-white"
          >
            <FaXmark />
          </button>
        </div>
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
          {mobileSidebar}
        </div>
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default DashboardResponsiveShell;