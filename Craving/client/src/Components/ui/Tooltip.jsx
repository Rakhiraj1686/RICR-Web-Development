import React from "react";
import { cn } from "../../utils/cn";

/**
 * Lightweight CSS-only tooltip (no JS positioning library). Wrap any
 * element; the label appears on hover/focus. Good for icon-only buttons
 * and truncated text where the full label needs to be discoverable.
 */
const Tooltip = ({ label, position = "top", children, className = "" }) => {
  const positionClasses = {
    top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
    bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
    left: "right-full top-1/2 mr-2 -translate-y-1/2",
    right: "left-full top-1/2 ml-2 -translate-y-1/2",
  };

  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100",
          positionClasses[position]
        )}
      >
        {label}
      </span>
    </span>
  );
};

export default Tooltip;
