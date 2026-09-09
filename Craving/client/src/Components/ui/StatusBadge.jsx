import React from "react";
import Badge from "./Badge";

/**
 * Central status → (label, badge variant) map. Order/rider/restaurant
 * dashboards all show the same status strings coming from the backend
 * (pending, confirmed, preparing, ready, out_for_delivery, completed,
 * cancelled, etc.) — this is the one place that decides what each looks
 * like, so a "Cancelled" badge is never orange in one screen and red in
 * another.
 */
const STATUS_MAP = {
  pending: { label: "Pending", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "info" },
  preparing: { label: "Preparing", variant: "secondary" },
  ready: { label: "Ready", variant: "primary" },
  picked_up: { label: "Picked up", variant: "info" },
  out_for_delivery: { label: "Out for delivery", variant: "primary" },
  delivered: { label: "Delivered", variant: "success" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "danger" },
  rejected: { label: "Rejected", variant: "danger" },
  failed: { label: "Failed", variant: "danger" },
  paid: { label: "Paid", variant: "success" },
  unpaid: { label: "Unpaid", variant: "warning" },
  refunded: { label: "Refunded", variant: "info" },
  online: { label: "Online", variant: "success" },
  offline: { label: "Offline", variant: "neutral" },
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "neutral" },
  approved: { label: "Approved", variant: "success" },
};

const normalize = (status = "") =>
  status.toString().trim().toLowerCase().replace(/[\s-]+/g, "_");

const StatusBadge = ({ status, className = "" }) => {
  const key = normalize(status);
  const entry = STATUS_MAP[key] || { label: status || "Unknown", variant: "neutral" };

  return (
    <Badge variant={entry.variant} className={className}>
      {entry.label}
    </Badge>
  );
};

export default StatusBadge;
