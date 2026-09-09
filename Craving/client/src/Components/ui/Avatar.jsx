import React, { useState } from "react";
import { cn } from "../../utils/cn";

const SIZE_CLASSES = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

/** Circular avatar. Falls back to initials on a brand-tinted background if
 * there's no image or the image fails to load. */
const Avatar = ({ src, name = "", size = "md", className = "" }) => {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        onError={() => setErrored(true)}
        className={cn(
          "shrink-0 rounded-full object-cover ring-2 ring-white",
          SIZE_CLASSES[size],
          className
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-(--color-primary-soft) font-bold text-(--color-primary) ring-2 ring-white",
        SIZE_CLASSES[size],
        className
      )}
    >
      {getInitials(name)}
    </span>
  );
};

export default Avatar;
