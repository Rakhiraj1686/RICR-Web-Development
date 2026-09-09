import React from "react";
import { cn } from "../../utils/cn";

const VARIANT_CLASSES = {
  neutral: "bg-(--color-section-light) text-(--color-text-secondary)",
  primary: "bg-(--color-primary-soft) text-(--color-primary)",
  secondary: "bg-(--color-secondary-soft) text-(--color-secondary-hover)",
  success: "bg-(--color-success-soft) text-(--color-success)",
  warning: "bg-(--color-warning-soft) text-(--color-warning)",
  danger: "bg-(--color-danger-soft) text-(--color-danger)",
  info: "bg-(--color-info-soft) text-(--color-info)",
  veg: "bg-(--color-success-soft) text-(--color-veg)",
  nonveg: "bg-(--color-danger-soft) text-(--color-nonveg)",
  dark: "bg-black/70 text-white backdrop-blur-sm",
};

/** Small pill label used for tags, cuisines, discounts, dietary markers. */
const Badge = ({ variant = "neutral", icon = null, className = "", children }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-semibold leading-none",
      VARIANT_CLASSES[variant],
      className
    )}
  >
    {icon}
    {children}
  </span>
);

export default Badge;
