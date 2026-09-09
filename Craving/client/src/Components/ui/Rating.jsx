import React from "react";
import { FaStar } from "react-icons/fa6";
import { cn } from "../../utils/cn";

/**
 * Compact star + score display, e.g. "★ 4.3". Uses a filled star and the
 * numeric score rather than five hollow/filled stars, which reads cleaner
 * at card scale and matches how Swiggy/Zomato-style cards show rating.
 */
const Rating = ({ value, count, size = "sm", className = "" }) => {
  if (value === undefined || value === null) return null;

  const score = Number(value).toFixed(1);
  const tone =
    Number(value) >= 4
      ? "bg-(--color-success-soft) text-(--color-success)"
      : Number(value) >= 3
      ? "bg-(--color-warning-soft) text-(--color-warning)"
      : "bg-(--color-danger-soft) text-(--color-danger)";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-bold",
        size === "sm" ? "text-xs" : "text-sm",
        tone,
        className
      )}
    >
      <FaStar className={size === "sm" ? "text-[10px]" : "text-xs"} />
      {score}
      {count !== undefined && (
        <span className="font-medium opacity-70">({count})</span>
      )}
    </span>
  );
};

export default Rating;
