import React from "react";
import { cn } from "../../utils/cn";

const formatINR = (amount) => {
  const value = Number(amount) || 0;
  return `₹${value % 1 === 0 ? value : value.toFixed(2)}`;
};

/**
 * Consistent price formatting everywhere money is shown. Pass
 * `originalPrice` to show a discounted price with the original struck
 * through — every "before/after discount" price in the app should look
 * identical.
 */
const PriceDisplay = ({ amount, originalPrice, size = "md", className = "" }) => {
  const sizeClass = size === "lg" ? "text-xl" : size === "sm" ? "text-sm" : "text-base";

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-extrabold text-(--color-text)", sizeClass)}>
        {formatINR(amount)}
      </span>
      {originalPrice && Number(originalPrice) > Number(amount) && (
        <span className="text-xs font-medium text-(--color-text-muted) line-through">
          {formatINR(originalPrice)}
        </span>
      )}
    </span>
  );
};

export default PriceDisplay;
