import React, { useState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../../Config/Api";

const DeleteMenuItemModal = ({ selectedItem, onClose, onDeleted, buildFormData }) => {
  const [loading, setLoading] = useState(false);

  if (!selectedItem) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const form = buildFormData(selectedItem, { availability: "removed" });
      await api.put(`/restaurant/updateMenuItem/${selectedItem._id}`, form);
      toast.success("Dish deleted successfully.");
      onDeleted(selectedItem._id);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unable to delete dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
          <FaTriangleExclamation aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-lg font-black text-(--color-text)">
          Delete this dish?
        </h2>
        <p className="mt-1 text-sm text-(--color-text-secondary)">
          This action cannot be undone.
        </p>
        <p className="mt-3 truncate rounded-xl bg-(--color-background) px-3 py-2 text-sm font-semibold text-(--color-text)">
          {selectedItem.itemName}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-11 flex-1 rounded-xl border border-(--color-border) font-semibold text-(--color-text) transition hover:bg-(--color-background) disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="h-11 flex-1 rounded-xl bg-red-600 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenuItemModal;