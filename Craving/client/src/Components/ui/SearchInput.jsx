import React from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { cn } from "../../utils/cn";

/**
 * Search field with a leading search icon and a clear ("x") button that
 * only appears once there's a value. Used on the home hero, restaurant
 * discovery page and restaurant menu search.
 */
const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = "Search for restaurants or dishes",
  className = "",
  size = "md",
  ...props
}) => {
  const sizeClasses = size === "lg" ? "h-14 text-base pl-12 pr-11" : "h-11 text-sm pl-10 pr-9";

  return (
    <div className={cn("relative flex w-full items-center", className)}>
      <FaMagnifyingGlass
        className={cn(
          "pointer-events-none absolute left-4 text-(--color-text-muted)",
          size === "lg" ? "text-lg" : "text-sm"
        )}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          "focus-ring w-full rounded-[var(--radius-pill)] border border-(--color-border-strong) bg-(--color-card) text-(--color-text) placeholder:text-(--color-text-muted) focus:border-(--color-primary)",
          sizeClasses
        )}
        {...props}
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="focus-ring absolute right-3.5 flex h-6 w-6 items-center justify-center rounded-full text-(--color-text-muted) hover:bg-(--color-section-light) hover:text-(--color-text)"
        >
          <FaXmark size={13} />
        </button>
      ) : null}
    </div>
  );
};

export default SearchInput;
