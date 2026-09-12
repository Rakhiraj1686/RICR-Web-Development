import React from "react";
import { cn } from "../../utils/cn";

/**
 * Base surface for anything card-shaped: restaurant cards, dashboard KPI
 * tiles, list rows. `interactive` adds the hover lift used for clickable
 * cards (restaurant/food cards) — static cards (KPI tiles) should leave it
 * off so the dashboard doesn't feel like it's inviting clicks everywhere.
 */
export const Card = React.forwardRef(function Card(
  { interactive = false, className = "", children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-lg)] border border-(--color-border) bg-(--color-card) shadow-[var(--shadow-sm)]",
        interactive &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardBody = ({ className = "", children }) => (
  <div className={cn("p-4", className)}>{children}</div>
);

export const CardHeader = ({ className = "", children }) => (
  <div className={cn("flex items-center justify-between gap-3 border-b border-(--color-border) px-4 py-3", className)}>
    {children}
  </div>
);

export const CardFooter = ({ className = "", children }) => (
  <div className={cn("border-t border-(--color-border) px-4 py-3", className)}>
    {children}
  </div>
);

export default Card;
