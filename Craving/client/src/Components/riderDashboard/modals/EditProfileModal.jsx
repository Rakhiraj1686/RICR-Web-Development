import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../Config/Api";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: user?.address || "",
    pin: user?.pin || "",
    documents: {
      dl: user?.documents?.dl || "",
      uidai: user?.documents?.uidai || "",
    },
    paymentDetails: {
      UPI: user?.paymentDetails?.UPI || "",
      account_number: user?.paymentDetails?.account_number || "",
      IFSC: user?.paymentDetails?.IFSC || "",
    },
    geolocation: {
      lat: user?.geolocation?.lat || "",
      lon: user?.geolocation?.lon || "",
    },
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      newErrors.mobileNumber = "Mobile number must be 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.pin.trim()) {
      newErrors.pin = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pin)) {
      newErrors.pin = "PIN code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: value,
      },
    });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fix the errors above" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await api.put("/rider/update", formData);
      if (res.data?.data) {
        sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
        setUser(res.data.data);
        toast.success("Profile updated successfully!");
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile";
      setMessage({ type: "error", text: errorMsg });
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between px-6 py-4 border-b border-(--color-border) items-center sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-(--color-text)">
            Edit Profile
          </h2>
          <button
            className="text-(--color-text-secondary) hover:text-red-600 text-2xl transition"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mx-6 mt-4 p-3 rounded-md ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-(--color-border)"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                    errors.email ? "border-red-500" : "border-(--color-border)"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                    errors.mobileNumber
                      ? "border-red-500"
                      : "border-(--color-border)"
                  }`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobileNumber && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                    errors.address
                      ? "border-red-500"
                      : "border-(--color-border)"
                  }`}
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <p className="text-red-600 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              {/* PIN */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pin"
                  value={formData.pin}
                  onChange={handleInputChange}
                  className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                    errors.pin ? "border-red-500" : "border-(--color-border)"
                  }`}
                  placeholder="Enter PIN code"
                />
                {errors.pin && (
                  <p className="text-red-600 text-xs mt-1">{errors.pin}</p>
                )}
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div>
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Driver's License */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  Driver's License
                </label>
                <input
                  type="text"
                  value={formData.documents.dl}
                  onChange={(e) =>
                    handleNestedChange("documents", "dl", e.target.value)
                  }
                  className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                  placeholder="Enter DL number"
                />
              </div>

              {/* UIDAI */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  UIDAI / Aadhar
                </label>
                <input
                  type="text"
                  value={formData.documents.uidai}
                  onChange={(e) =>
                    handleNestedChange("documents", "uidai", e.target.value)
                  }
                  className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                  placeholder="Enter UIDAI number"
                />
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Payment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* UPI */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={formData.paymentDetails.UPI}
                  onChange={(e) =>
                    handleNestedChange("paymentDetails", "UPI", e.target.value)
                  }
                  className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                  placeholder="Enter UPI ID"
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.paymentDetails.account_number}
                  onChange={(e) =>
                    handleNestedChange(
                      "paymentDetails",
                      "account_number",
                      e.target.value
                    )
                  }
                  className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                  placeholder="Enter account number"
                />
              </div>

              {/* IFSC */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={formData.paymentDetails.IFSC}
                  onChange={(e) =>
                    handleNestedChange("paymentDetails", "IFSC", e.target.value)
                  }
                  className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                  placeholder="Enter IFSC code"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-(--color-border)">
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
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
