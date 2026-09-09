import React from "react";
import { cn } from "../../utils/cn";
import Button from "./Button";

/**
 * Standard empty-list treatment: icon, one-line title, one-line
 * explanation, optional action. Used for empty cart, no orders, no
 * favorites, no search results, no active delivery, etc. — every empty
 * screen in the app should be built from this instead of ad-hoc text.
 */
const EmptyState = ({ icon, title, description, actionLabel, onAction, className = "" }) => (
  <div className={cn("flex flex-col items-center justify-center px-6 py-16 text-center", className)}>
    {icon && (
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-section-light) text-3xl text-(--color-text-muted)">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-bold text-(--color-text)">{title}</h3>
    {description && (
      <p className="mt-1.5 max-w-sm text-sm text-(--color-text-secondary)">{description}</p>
    )}
    {actionLabel && (
      <Button variant="primary" size="md" onClick={onAction} className="mt-5">
        {actionLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;
