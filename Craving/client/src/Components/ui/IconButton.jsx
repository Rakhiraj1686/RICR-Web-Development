import React from "react";
import { cn } from "../../utils/cn";

const VARIANT_CLASSES = {
  solid: "bg-(--color-primary) text-white hover:bg-(--color-primary-hover)",
  subtle: "bg-(--color-section-light) text-(--color-text) hover:bg-(--color-border)",
  outline:
    "border border-(--color-border-strong) bg-(--color-card) text-(--color-text) hover:border-(--color-primary) hover:text-(--color-primary)",
  ghost: "bg-transparent text-(--color-text) hover:bg-black/5",
  "ghost-inverse": "bg-white/10 text-white hover:bg-white/20",
};

const SIZE_CLASSES = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
};

/**
 * Circular icon-only button. `label` is required and becomes the
 * accessible name (aria-label) since there is no visible text.
 */
const IconButton = React.forwardRef(function IconButton(
  { icon, label, variant = "subtle", size = "md", className = "", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "focus-ring inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
});

export default IconButton;
