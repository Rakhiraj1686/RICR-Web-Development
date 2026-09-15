import React from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { Modal, PriceDisplay, StatusBadge } from "../ui";

// Mirrors the backend's actual orderModel status enum/order — no step is
// invented that the API doesn't produce.
const HAPPY_PATH = ["pending", "accepted", "preparing", "ready", "pickedUp", "onTheWay", "delivered"];
const TERMINAL_NEGATIVE = ["refused", "damaged", "cancelled"];

const STEP_LABELS = {
  pending: "Order placed",
  accepted: "Accepted by restaurant",
  preparing: "Preparing",
  ready: "Ready for pickup",
  pickedUp: "Picked up",
  onTheWay: "On the way",
  delivered: "Delivered",
};

const formatDateTime = (date) =>
  date
    ? new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const OrderDetailsModal = ({ open, onClose, order }) => {
  if (!order) return null;

  const isNegative = TERMINAL_NEGATIVE.includes(order.status);
  const currentStepIndex = HAPPY_PATH.indexOf(order.status);
  const restaurantName = order?.restaurantId?.restaurantName;

  return (
    <Modal open={open} onClose={onClose} title="Order details" size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-(--color-text)">
              {order.orderNumber || `#${order._id?.slice(-8)}`}
            </p>
            {restaurantName && (
              <p className="text-sm text-(--color-text-secondary)">{restaurantName}</p>
            )}
            <p className="mt-1 text-xs text-(--color-text-muted)">
              Placed {formatDateTime(order.createdAt)}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Timeline */}
        {isNegative ? (
          <div className="flex items-center gap-3 rounded-2xl bg-(--color-danger-soft) p-4">
            <span className="text-2xl text-(--color-danger)">
              <FaCircleXmark />
            </span>
            <div>
              <p className="text-sm font-bold text-(--color-danger)">
                This order was {order.status}.
              </p>
              <p className="text-xs text-(--color-text-secondary)">
                Contact support from the Help Desk if you have questions about this order.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative pl-1">
            {HAPPY_PATH.map((step, i) => {
              const isDone = currentStepIndex >= 0 && i <= currentStepIndex;
              const isLast = i === HAPPY_PATH.length - 1;
              return (
                <div key={step} className="relative flex gap-3 pb-5 last:pb-0">
                  {!isLast && (
                    <span
                      className={`absolute left-2.75 top-6 h-full w-0.5 ${
                        isDone ? "bg-(--color-primary)" : "bg-(--color-border)"
                      }`}
                    />
                  )}
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                      isDone
                        ? "bg-(--color-primary) text-white"
                        : "bg-(--color-section-light) text-(--color-text-muted)"
                    }`}
                  >
                    {isDone ? <FaCircleCheck size={12} /> : ""}
                  </span>
                  <p
                    className={`text-sm font-semibold ${
                      isDone ? "text-(--color-text)" : "text-(--color-text-muted)"
                    }`}
                  >
                    {STEP_LABELS[step]}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Items */}
        <div>
          <h3 className="mb-2 text-sm font-bold text-(--color-text)">
            Items ({order.items?.length || 0})
          </h3>
          <div className="divide-y divide-(--color-border) rounded-xl border border-(--color-border)">
            {(order.items || []).map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <span className="text-(--color-text-secondary)">
                  {item.quantity || 1} × {item.itemName || item.name}
                </span>
                <PriceDisplay
                  amount={(item.price || 0) * (item.quantity || 1)}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bill breakdown */}
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-(--color-text-secondary)">
              <span>Subtotal</span>
              <span>₹{order.orderValue?.subtotal ?? 0}</span>
            </div>
            <div className="flex justify-between text-(--color-text-secondary)">
              <span>Delivery fee</span>
              <span>₹{order.orderValue?.deliveryFee ?? 0}</span>
            </div>
            <div className="flex justify-between text-(--color-text-secondary)">
              <span>Tax</span>
              <span>₹{order.orderValue?.tax ?? 0}</span>
            </div>
            <div className="flex justify-between border-t border-(--color-border) pt-1.5 font-bold text-(--color-text)">
              <span>Total</span>
              <span>₹{order.orderValue?.total ?? 0}</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-(--color-text-muted)">
            Paid via {order.orderValue?.paymentMethod || "—"} ·{" "}
            <span className="capitalize">{order.orderValue?.paymentStatus || "pending"}</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
