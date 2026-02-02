import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../Config/Api";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: user?.address || "",
    city: user?.city || "",
    pin: user?.pin || "",
    documents: {
      uidai: user?.documents?.uidai || "",
      pan: user?.documents?.pan || "",
    },
    paymentDetails: {
      upi: user?.paymentDetails?.upi || "",
      account_number: user?.paymentDetails?.account_number || "",
      IFSC: user.paymentDetails?.IFSC || "",
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

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.pin.trim()) {
      newErrors.pin = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pin)) {
      newErrors.pin = "PIN code must be 6 digits";
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
    // Clear error for this field when user starts typing
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
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const fetchLocation = (e) => {
    e.preventDefault();
    console.log("fetchLocation");
    navigator.geolocation.getCurrentPosition((result) => {
      console.log(
        "Location Result:",
        result.coords.latitude,
        result.coords.longitude,
      );
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
      const res = await api.put("/user/update", formData);
      if (res.data?.data) {
        sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
        setUser(res.data.data);
        setIsLogin(true);
        setMessage({ type: "success", text: "Profile updated successfully!" });
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
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 ">
        <div className="bg-white w-5xl max-h-[85vh] overflow-y-auto ">
          <div className="flex justify-between px-5 py-3 border-b border-gray-300 ">
            <div>
              <h2 className="text-shadow-lg">Edit Profile Details</h2>
            </div>
            <button
              onClick={() => onClose()}
              className="text-red-600 hover:text-red-700 text-3xl "
            >
              ⊗
            </button>
          </div>

          {message.text && (
            <div
              className={`mx-6 mt-4 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 cursor-not-allowed "
                    disabled
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number *
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${errors.mobileNumber ? "border-red" : "border-gray-300"}`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="name"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus-ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Address Section  */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Address
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadom-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your Address"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Enter City"
                        />
                        {errors.city && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          name="pin"
                          value={formData.pin}
                          onChange={handleInputChange}
                          className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.pin ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="6-digit PIN"
                          maxLength="6"
                        />
                        {errors.pin && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.pin}
                          </p>
                        )}
                      </div>

                      <div className="flex items-end">
                        <div className="h-fit flex items-center w-full gap-4">
                          <button
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 h-fit"
                            onClick={fetchLocation}
                          >
                            Get Live Location
                          </button>
                          {formData.geolocation.lat !== "N/A" &&
                          formData.geolocation.lon !== "N/A"
                            ? "✅"
                            : "❌"}
                          {console.log(formData)}
                        </div>
                      </div>
                    </div>

                    {/* Documents Section  */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                        Documents
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Aadhaar(UIDAI)
                          </label>
                          <input
                            type="text"
                            value={formData.documents.uidai}
                            onChange={(e) =>
                              handleNestedChange(
                                "documents",
                                "uidai",
                                e.target.value,
                              )
                            }
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="12-digit UIDAI number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            PAN
                          </label>
                          <input
                            type="text"
                            value={formData.documents.pan}
                            onChange={(e) =>
                              handleNestedChange(
                                "documents",
                                "pan",
                                e.target.value,
                              )
                            }
                            className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.pan ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="PAN number"
                            maxLength="10"
                          />
                          {errors.pan && (
                            <p className="text-red-600 text-xs mt-1">
                              {errors.pan}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Payment Details Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                        Payment Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.upi ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="username@bank"
                          />
                          {errors.upi && (
                            <p className="text-red-600 text-xs mt-1">
                              {errors.upi}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Bank account number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            IFS Code
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
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="IFS code"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
                <button
                  type="button"
                  onClick={() => onClose()}
                  disabled={loading}
                  className="px-6 py-2 bg-(--color-background) text-gray-800 rounded-md hover:bg-(--color-background) transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-(--color-secondary) text-white rounded-md hover:bg-(--color-secondary) transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
      </div>
    </>
  );
};

export default EditProfileModal;
