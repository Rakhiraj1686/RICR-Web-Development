import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { cn } from "../../utils/cn";

/**
 * The [-] qty [+] stepper used on menu item cards and cart lines.
 * Decrementing below `min` (default 1) calls onRemove instead of onChange,
 * so callers can drop the line item — keeps "remove at zero" logic in one
 * place instead of duplicated per page.
 */
const QuantitySelector = ({
  quantity,
  onChange,
  onRemove,
  min = 1,
  max = 99,
  size = "md",
  className = "",
}) => {
  const isCompact = size === "sm";

  const decrement = () => {
    if (quantity <= min) {
      onRemove?.();
    } else {
      onChange(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] border border-(--color-primary) text-(--color-primary)",
        isCompact ? "h-8" : "h-10",
        className
      )}
    >
      <button
        type="button"
        onClick={decrement}
        aria-label="Decrease quantity"
        className={cn(
          "focus-ring flex h-full items-center justify-center rounded-l-[var(--radius-pill)] hover:bg-(--color-primary-soft)",
          isCompact ? "w-8" : "w-10"
        )}
      >
        <FaMinus size={isCompact ? 9 : 11} />
      </button>
      <span className={cn("min-w-[1.5rem] text-center font-bold", isCompact ? "text-xs" : "text-sm")}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={increment}
        aria-label="Increase quantity"
        className={cn(
          "focus-ring flex h-full items-center justify-center rounded-r-[var(--radius-pill)] hover:bg-(--color-primary-soft)",
          isCompact ? "w-8" : "w-10"
        )}
      >
        <FaPlus size={isCompact ? 9 : 11} />
      </button>
    </div>
  );
};

export default QuantitySelector;
