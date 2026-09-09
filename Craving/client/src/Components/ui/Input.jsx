import React, { useId } from "react";
import { cn } from "../../utils/cn";

/**
 * Standard text input used across auth forms, checkout, profile and
 * dashboard forms. Handles the label/error/helper text/icon layout once so
 * every form field looks and behaves the same way.
 */
const Input = React.forwardRef(function Input(
  {
    label,
    error,
    helperText,
    iconLeft = null,
    iconRight = null,
    className = "",
    id,
    ...props
  },
  ref
) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-(--color-text)">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {iconLeft && (
          <span className="pointer-events-none absolute left-3.5 text-(--color-text-muted)">
            {iconLeft}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={cn(
            "focus-ring h-11 w-full rounded-[var(--radius-md)] border bg-(--color-card) px-4 text-sm text-(--color-text) placeholder:text-(--color-text-muted) transition-colors",
            iconLeft && "pl-10",
            iconRight && "pr-10",
            error
              ? "border-(--color-danger)"
              : "border-(--color-border-strong) focus:border-(--color-primary)",
            className
          )}
          {...props}
        />
        {iconRight && <span className="absolute right-3.5 text-(--color-text-muted)">{iconRight}</span>}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-(--color-danger)">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="mt-1.5 text-xs text-(--color-text-secondary)">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
