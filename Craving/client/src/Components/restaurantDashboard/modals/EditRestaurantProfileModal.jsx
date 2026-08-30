import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../Config/Api";
import { FaXmark, FaSpinner } from "react-icons/fa6";

const EditRestaurantProfileModal = ({ onClose }) => {
  const { user, setUser, setIsLogin } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: user?.address || "",
    city: user?.city || "",
    pin: user?.pin || "",
    restaurantName: user?.restaurantName || "",
    cuisine: user?.cuisine || "",
    documents: {
      gst: user?.documents?.gst || "",
      fssai: user?.documents?.fssai || "",
      rc: user?.documents?.rc || "",
      dl: user?.documents?.dl || "",
      uidai: user?.documents?.uidai || "",
      pan: user?.documents?.pan || "",
    },
    paymentDetails: {
      upi: user?.paymentDetails?.UPI || "",
      account_number: user?.paymentDetails?.account_number || "",
      ifs_Code: user?.paymentDetails?.IFSC || "",
    },
    geoLocation: {
      lat: user?.geoLocation?.lat || "",
      lon: user?.geoLocation?.lon || "",
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

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.pin.trim()) {
      newErrors.pin = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pin)) {
      newErrors.pin = "PIN code must be 6 digits";
    }

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "Restaurant name is required";
    }

    if (
      formData.documents.pan &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.documents.pan)
    ) {
      newErrors.pan = "Invalid PAN format";
    }

    if (
      formData.paymentDetails.upi &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(formData.paymentDetails.upi)
    ) {
      newErrors.upi = "Invalid UPI format";
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

  const fetchLocation = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((result) => {
      setFormData({
        ...formData,
        geoLocation: {
          ...formData["geoLocation"],
          lat: result.coords.latitude,
          lon: result.coords.longitude,
        },
      });
    });
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
      const res = await api.put("/restaurant/update", formData);
      if (res.data?.data) {
        sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
        setUser(res.data.data);
        setIsLogin(true);
        setMessage({ type: "success", text: "Profile update successfully!" });
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 p-4">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
          <div className="flex justify-between px-6 py-5 border-b border-(--color-border) items-center sticky top-0 bg-white/95 backdrop-blur-sm rounded-t-3xl">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-(--color-primary)">
                Edit Profile
              </p>
              <h2 className="text-xl font-black tracking-tight text-(--color-text)">
                Edit Restaurant Profile
              </h2>
            </div>
            <button
              onClick={() => onClose()}
              aria-label="Close edit profile form"
              className="flex h-9 w-9 items-center justify-center rounded-full text-(--color-text-secondary) transition hover:bg-(--color-background) hover:text-(--color-primary)"
            >
              <FaXmark size={18} />
            </button>
          </div>

          {message.text && (
            <div
              role="alert"
              className={`mx-6 mt-4 p-4 rounded-xl text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-(--color-primary)/5 text-(--color-primary) border border-(--color-primary)/30"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text-secondary) mb-4 pb-2 border-b border-(--color-border)">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      errors.fullName ? "border-red-500" : "border-(--color-border)"
                    }`}
                    placeholder="Enter manager name"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 bg-(--color-background) text-(--color-text-secondary) cursor-not-allowed"
                  />
                  <p className="text-(--color-text-secondary) text-xs mt-1">
                    Email cannot be changed
                  </p>
                </div>

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
                      errors.mobileNumber ? "border-red-500" : "border-(--color-border)"
                    }`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

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
                    <option value="others">Other</option>
                  </select>
                </div>

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

            {/* Restaurant Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text-secondary) mb-4 pb-2 border-b border-(--color-border)">
                Restaurant Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                      errors.restaurantName
                        ? "border-red-500"
                        : "border-(--color-border)"
                    }`}
                    placeholder="Enter restaurant name"
                  />
                  {errors.restaurantName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.restaurantName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    Cuisine Type
                  </label>
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    placeholder="e.g., Italian, Indian, Chinese"
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text-secondary) mb-4 pb-2 border-b border-(--color-border)">
                Address
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    placeholder="Enter restaurant address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                        errors.city ? "border-red-500" : "border-(--color-border)"
                      }`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

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
                      placeholder="6-digit PIN"
                      maxLength="6"
                    />
                    {errors.pin && (
                      <p className="text-red-600 text-xs mt-1">{errors.pin}</p>
                    )}
                  </div>
                  <div className="flex items-end">
                    <div className="h-fit flex items-center w-full gap-4">
                      <button
                        className="w-full border border-(--color-border) rounded-md shadow-sm p-2 h-fit"
                        onClick={fetchLocation}
                      >
                        Get Live Location
                      </button>
                      {formData.geoLocation.lat && formData.geoLocation.lon
                        ? "✅"
                        : "❌"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Documents Section */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text-secondary) mb-4 pb-2 border-b border-(--color-border)">
                Business Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    GST Certificate
                  </label>
                  <input
                    type="text"
                    value={formData.documents.gst}
                    onChange={(e) =>
                      handleNestedChange("documents", "gst", e.target.value)
                    }
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    placeholder="GST number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    FSSAI License
                  </label>
                  <input
                    type="text"
                    value={formData.documents.fssai}
                    onChange={(e) =>
                      handleNestedChange("documents", "fssai", e.target.value)
                    }
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    placeholder="FSSAI registration number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    RC (Vehicle Registration)
                  </label>
                  <input
                    type="text"
                    value={formData.documents.rc}
                    onChange={(e) =>
                      handleNestedChange("documents", "rc", e.target.value)
                    }
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    placeholder="Registration certificate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    Driving License
                  </label>
                  <input
                    type="text"
                    value={formData.documents.dl}
                    onChange={(e) =>
                      handleNestedChange("documents", "dl", e.target.value)
                    }
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    placeholder="Driving license number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    UIDAI (Aadhaar)
                  </label>
                  <input
                    type="text"
                    value={formData.documents.uidai}
                    onChange={(e) =>
                      handleNestedChange("documents", "uidai", e.target.value)
                    }
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    placeholder="12-digit UIDAI number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    PAN
                  </label>
                  <input
                    type="text"
                    value={formData.documents.pan}
                    onChange={(e) =>
                      handleNestedChange("documents", "pan", e.target.value)
                    }
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                      errors.pan ? "border-red-500" : "border-(--color-border)"
                    }`}
                    placeholder="PAN number"
                    maxLength="10"
                  />
                  {errors.pan && (
                    <p className="text-red-600 text-xs mt-1">{errors.pan}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Details Section */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-text-secondary) mb-4 pb-2 border-b border-(--color-border)">
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetails.upi}
                    onChange={(e) =>
                      handleNestedChange(
                        "paymentDetails",
                        "upi",
                        e.target.value,
                      )
                    }
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                      errors.upi ? "border-red-500" : "border-(--color-border)"
                    }`}
                    placeholder="username@bank"
                  />
                  {errors.upi && (
                    <p className="text-red-600 text-xs mt-1">{errors.upi}</p>
                  )}
                </div>

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
                        e.target.value,
                      )
                    }
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    placeholder="Bank account number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--color-text-secondary) mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetails.ifs_Code}
                    onChange={(e) =>
                      handleNestedChange(
                        "paymentDetails",
                        "ifs_Code",
                        e.target.value,
                      )
                    }
                    className="w-full border border-(--color-border) rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    placeholder="IFSC code"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-(--color-border)">
              <button
                type="button"
                onClick={() => onClose()}
                disabled={loading}
                className="rounded-xl border border-(--color-border) px-6 py-2.5 font-semibold text-(--color-text) transition hover:bg-(--color-background) disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-(--color-primary) px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRestaurantProfileModal;