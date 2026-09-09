import React, { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { cn } from "../../utils/cn";
import IconButton from "./IconButton";
import Button from "./Button";

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

/**
 * Centered dialog with a dimmed overlay. Closes on Escape and on overlay
 * click. Use for confirmations, add-food forms, and any focused task that
 * shouldn't navigate away from the current page.
 */
export const Modal = ({ open, onClose, title, size = "md", children, footer }) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-(--color-overlay)"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-[var(--radius-lg)] bg-(--color-card) shadow-[var(--shadow-lg)]",
          SIZE_CLASSES[size]
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-(--color-border) px-5 py-4">
            <h2 className="text-base font-bold text-(--color-text)">{title}</h2>
            <IconButton icon={<FaXmark />} label="Close" size="sm" onClick={onClose} />
          </div>
        )}
        <div className="p-5">{children}</div>
        {footer && <div className="border-t border-(--color-border) px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
};

/** Modal preset for destructive/important confirmations (cancel order,
 * delete menu item, remove address, logout). */
export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  loading = false,
}) => (
  <Modal open={open} onClose={onClose} title={title} size="sm">
    {description && <p className="text-sm text-(--color-text-secondary)">{description}</p>}
    <div className="mt-6 flex justify-end gap-3">
      <Button variant="ghost" onClick={onClose} disabled={loading}>
        {cancelLabel}
      </Button>
      <Button variant={danger ? "danger" : "primary"} onClick={onConfirm} loading={loading}>
        {confirmLabel}
      </Button>
    </div>
  </Modal>
);

export default Modal;
