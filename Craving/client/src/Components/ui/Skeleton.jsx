import React from "react";
import { cn } from "../../utils/cn";

/** Base shimmering block. Compose the exported helpers below for common
 * shapes rather than reaching for this directly where possible. */
export const Skeleton = ({ className = "", style }) => (
  <div
    style={style}
    className={cn(
      "relative overflow-hidden rounded-[var(--radius-sm)] bg-(--color-border)",
      className
    )}
  >
    <div
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
      style={{ animation: "skeleton-shimmer 1.4s infinite" }}
    />
  </div>
);

export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={cn("h-3", i === lines - 1 && lines > 1 ? "w-2/3" : "w-full")} />
    ))}
  </div>
);

export const SkeletonAvatar = ({ size = 40, className = "" }) => (
  <Skeleton className={cn("rounded-full", className)} style={{ width: size, height: size }} />
);

/** Skeleton matching a RestaurantCard / FoodCard layout: image + two lines
 * of text. Used while the restaurant list or menu is fetching. */
export const SkeletonCard = ({ className = "" }) => (
  <div className={cn("overflow-hidden rounded-[var(--radius-lg)] border border-(--color-border) bg-(--color-card)", className)}>
    <Skeleton className="h-40 w-full rounded-none" />
    <div className="space-y-2 p-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  </div>
);

/** Grid of card skeletons — pass the count matching how many real cards
 * would typically render, e.g. <SkeletonGrid count={6} />. */
export const SkeletonGrid = ({ count = 6, className = "" }) => (
  <div className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

/** Skeleton row for tables (order management, admin lists). */
export const SkeletonRow = ({ columns = 4, className = "" }) => (
  <div className={cn("grid items-center gap-4 border-b border-(--color-border) px-4 py-3", className)} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
    {Array.from({ length: columns }).map((_, i) => (
      <Skeleton key={i} className="h-4 w-full" />
    ))}
  </div>
);

export default Skeleton;
