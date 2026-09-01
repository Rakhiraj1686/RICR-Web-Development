import React, { useState } from "react";
import api from "../../../Config/Api";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const ResetPasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    cfNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.cfNewPassword) {
      newErrors.cfNewPassword = "Please confirm new password";
    }

    if (formData.newPassword !== formData.cfNewPassword) {
      newErrors.cfNewPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await api.patch("/rider/resetPassword", formData);
      toast.success(res.data.message || "Password reset successfully!");
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reset password";
      toast.error(errorMsg);
      setErrors({ submit: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between px-6 py-4 border-b border-(--color-border) items-center sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-(--color-text)">
            Reset Password
          </h2>
          <button
            className="text-(--color-text-secondary) hover:text-red-600 text-2xl transition"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="mx-6 mt-4 p-3 rounded-md bg-red-100 text-red-700">
            {errors.submit}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
              Old Password *
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleInputChange}
              className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                errors.oldPassword
                  ? "border-red-500"
                  : "border-(--color-border)"
              }`}
              placeholder="Enter your old password"
            />
            {errors.oldPassword && (
              <p className="text-red-600 text-xs mt-1">{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
              New Password *
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-(--color-border)"
              }`}
              placeholder="Enter your new password"
            />
            {errors.newPassword && (
              <p className="text-red-600 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
              Confirm New Password *
            </label>
            <input
              type="password"
              name="cfNewPassword"
              value={formData.cfNewPassword}
              onChange={handleInputChange}
              className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                errors.cfNewPassword
                  ? "border-red-500"
                  : "border-(--color-border)"
              }`}
              placeholder="Confirm new password"
            />
            {errors.cfNewPassword && (
              <p className="text-red-600 text-xs mt-1">
                {errors.cfNewPassword}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-(--color-border)">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 bg-(--color-background) text-(--color-text) rounded-md hover:bg-gray-200 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-(--color-primary) text-white rounded-md hover:bg-(--color-primary-dark) transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⟳</span> Saving...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
