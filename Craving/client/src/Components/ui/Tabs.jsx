import React from "react";
import { cn } from "../../utils/cn";

/**
 * Underline-style tab bar. `tabs` is [{ id, label, icon? }]. Used for the
 * sticky restaurant-page nav (Overview/Menu/Reviews/Offers), profile
 * sections, and dashboard sub-navigation.
 */
const Tabs = ({ tabs, activeId, onChange, className = "" }) => (
  <div
    role="tablist"
    className={cn(
      "flex gap-1 overflow-x-auto border-b border-(--color-border) scrollbar-hide",
      className
    )}
  >
    {tabs.map((tab) => {
      const isActive = tab.id === activeId;
      return (
        <button
          key={tab.id}
          role="tab"
          type="button"
          aria-selected={isActive}
          onClick={() => onChange(tab.id)}
          className={cn(
            "focus-ring relative flex shrink-0 items-center gap-1.5 px-4 py-3 text-sm font-semibold transition-colors",
            isActive ? "text-(--color-primary)" : "text-(--color-text-secondary) hover:text-(--color-text)"
          )}
        >
          {tab.icon}
          {tab.label}
          {isActive && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-(--color-primary)" />
          )}
        </button>
      );
    })}
  </div>
);

export default Tabs;
