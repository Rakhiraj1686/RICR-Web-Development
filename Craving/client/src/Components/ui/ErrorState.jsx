import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { cn } from "../../utils/cn";
import Button from "./Button";

/**
 * Friendly failure screen for a failed fetch/action. Never pass a raw
 * Axios/network error message into `description` — translate it to plain
 * language at the call site first (e.g. "Something went wrong. Please
 * check your connection and try again.").
 */
const ErrorState = ({
  title = "Something went wrong",
  description = "Please check your connection and try again.",
  onRetry,
  className = "",
}) => (
  <div className={cn("flex flex-col items-center justify-center px-6 py-16 text-center", className)}>
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-danger-soft) text-2xl text-(--color-danger)">
      <FaTriangleExclamation />
    </div>
    <h3 className="text-lg font-bold text-(--color-text)">{title}</h3>
    <p className="mt-1.5 max-w-sm text-sm text-(--color-text-secondary)">{description}</p>
    {onRetry && (
      <Button variant="outline" size="md" onClick={onRetry} className="mt-5">
        Try again
      </Button>
    )}
  </div>
);

export default ErrorState;
