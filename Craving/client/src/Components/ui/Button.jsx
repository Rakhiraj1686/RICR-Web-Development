import React from "react";
import { FaSpinner } from "react-icons/fa6";
import { cn } from "../../utils/cn";

const VARIANT_CLASSES = {
  primary:
    "bg-(--color-primary) text-white hover:bg-(--color-primary-hover) active:bg-(--color-primary-active) shadow-[var(--shadow-sm)]",
  secondary:
    "bg-(--color-secondary) text-(--color-text) hover:bg-(--color-secondary-hover) hover:text-white",
  outline:
    "border border-(--color-border-strong) bg-transparent text-(--color-text) hover:border-(--color-primary) hover:text-(--color-primary)",
  ghost:
    "bg-transparent text-(--color-text) hover:bg-(--color-section-light)",
  danger:
    "bg-(--color-danger) text-white hover:bg-red-700",
  link:
    "bg-transparent p-0 text-(--color-primary) hover:text-(--color-primary-hover) underline-offset-4 hover:underline",
};

const SIZE_CLASSES = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

/**
 * The one Button every page should use. Keeping a single component (instead
 * of ad-hoc <button className="..."> everywhere) is what keeps radius,
 * padding, hover/active/disabled/loading states consistent app-wide.
 */
const Button = React.forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled = false,
    iconLeft = null,
    iconRight = null,
    className = "",
    children,
    ...props
  },
  ref
) {
  const isLink = variant === "link";

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "focus-ring inline-flex items-center justify-center font-semibold transition-colors duration-150",
        !isLink && "rounded-[var(--radius-pill)]",
        !isLink && SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        fullWidth && "w-full",
        (disabled || loading) && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      {loading ? (
        <FaSpinner className="animate-spin" aria-hidden="true" />
      ) : (
        iconLeft
      )}
      {children}
      {!loading && iconRight}
    </button>
  );
});

export default Button;
