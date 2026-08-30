import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditRestaurantProfileModal from "./modals/EditRestaurantProfileModal";
import {
  FaCamera,
  FaMapLocationDot,
  FaWallet,
} from "react-icons/fa6";
import { FaFileAlt, FaUserCircle } from "react-icons/fa";
import { BiSolidBank } from "react-icons/bi";
import api from "../../Config/Api"
import toast from "react-hot-toast";
import ResetPasswordModal from "../userDashboard/modals/ResetPasswordModal";

const RestaurantProfile = () => {
  const { user, setUser } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_Data = new FormData();
    form_Data.append("image", photo);

    try {
      const res = await api.patch("/restaurant/changePhoto", form_Data);
      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
      setPreview("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoURL = URL.createObjectURL(file);
      setPreview(newPhotoURL);
      setTimeout(() => {
        changePhoto(file);
      }, 1000);
    }
  };

  const renderField = (label, value) => (
    <div className="flex items-start justify-between gap-4 border-b border-(--color-border) px-4 py-3 last:border-b-0">
      <span className="text-sm font-semibold tracking-wide text-(--color-text-secondary)">
        {label}:
      </span>
      <span className="text-right text-sm font-bold text-(--color-text) sm:text-base">
        {value && value !== "N/A" ? (
          value
        ) : (
          <span className="text-(--color-text-secondary)">Not provided</span>
        )}
      </span>
    </div>
  );

  return (
    <>
      <div className="h-full space-y-6 overflow-y-auto rounded-3xl bg-linear-to-br from-(--color-section-light) via-(--color-background) to-(--color-section-light) p-4 sm:p-6">
        {/* Header Section with Photo and Basic Info */}
        <div className="relative overflow-hidden rounded-3xl border border-(--color-border) bg-white/80 p-5 shadow-xl backdrop-blur-sm sm:p-6">
          <div className="pointer-events-none absolute -top-16 -right-8 h-44 w-44 rounded-full bg-(--color-secondary)/25 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-8 h-52 w-52 rounded-full bg-(--color-primary)/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row">
            {/* Photo Section */}
            <div className="flex flex-col items-center lg:min-w-56">
              <div className="relative">
                <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-(--color-border) bg-(--color-section-light) shadow-md">
                  {preview || user?.photo?.url ? (
                    <img
                      src={preview || user?.photo?.url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl text-(--color-primary)">
                      <FaUserCircle />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-2 right-1 cursor-pointer rounded-full bg-(--color-secondary) p-3 text-white shadow-lg transition duration-200 hover:scale-110 hover:bg-(--color-secondary-hover)"
                >
                  <FaCamera size={18} />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-(--color-text-secondary)">
                Click camera to change photo
              </p>
            </div>

            {/* Basic Info Section */}
            <div className="w-full">
              <div>
                <div className="mb-6 border-b border-(--color-border) pb-5">
                  <h1 className="mb-2 text-3xl font-black tracking-tight text-(--color-primary) sm:text-4xl">
                    {user?.fullName || "Manager Name"}
                  </h1>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-(--color-primary) px-3 py-1 text-sm font-semibold capitalize text-white">
                      {user?.role || "manager"}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        user?.isActive === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user?.isActive || "active"}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-(--color-border) bg-(--color-section-light) px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                      Email
                    </span>
                    <p className="mt-1 font-semibold text-(--color-text)">
                      {user?.email || "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-(--color-border) bg-(--color-section-light) px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">
                      Phone
                    </span>
                    <p className="mt-1 font-semibold text-(--color-text)">
                      {user?.mobileNumber || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="rounded-xl bg-(--color-primary) px-6 py-2.5 font-semibold text-white shadow transition duration-200 hover:-translate-y-0.5 hover:bg-(--color-primary-hover)"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setIsResetPasswordModalOpen(true)}
                    className="rounded-xl bg-gray-600 px-6 py-2.5 font-semibold text-white shadow transition duration-200 hover:-translate-y-0.5 hover:bg-gray-700"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 shadow-lg backdrop-blur-sm">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black tracking-tight text-(--color-text)">
            <span className="h-6 w-1 rounded bg-(--color-primary)"></span>
            Personal Information
          </h2>
          <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-section-light)">
            {renderField("Date of Birth", user?.dob)}
            {renderField("Gender", user?.gender)}
            {renderField("Address", user?.address)}
            {renderField("City", user?.city)}
            {renderField("PIN Code", user?.pin)}
          </div>
        </div>

        {/* Location Section */}
        {(user?.geoLocation?.lat !== "N/A" ||
          user?.geoLocation?.lon !== "N/A") && (
          <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black tracking-tight text-(--color-text)">
              <FaMapLocationDot className="text-(--color-primary)" />
              Geo Location
            </h2>
            <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-section-light)">
              {renderField("Latitude", user?.geoLocation?.lat)}
              {renderField("Longitude", user?.geoLocation?.lon)}
            </div>
          </div>
        )}

        {/* Payment Details - UPI Section */}
        {user?.paymentDetails?.upi !== "N/A" && (
          <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black tracking-tight text-(--color-text)">
              <FaWallet className="text-(--color-primary)" />
              Payment Details
            </h2>
            <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-section-light)">
              {renderField("UPI ID", user?.paymentDetails?.upi)}
            </div>
          </div>
        )}

        {/* Bank Account Details Section */}
        {(user?.paymentDetails?.account_number !== "N/A" ||
          user?.paymentDetails?.ifs_Code !== "N/A") && (
          <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black tracking-tight text-(--color-text)">
              <BiSolidBank className="text-(--color-primary)" />
              Bank Account Details
            </h2>
            <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-section-light)">
              {renderField(
                "Account Number",
                user?.paymentDetails?.account_number,
              )}
              {renderField("IFSC Code", user?.paymentDetails?.ifs_Code)}
            </div>
          </div>
        )}

        {/* Restaurant Information Section */}
        {(user?.restaurantName !== "N/A" || user?.cuisine !== "N/A") && (
          <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-black tracking-tight text-(--color-text)">
              Restaurant Information
            </h2>
            <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-section-light)">
              {renderField("Restaurant Name", user?.restaurantName)}
              {renderField("Cuisine Type", user?.cuisine)}
            </div>
          </div>
        )}

        {/* Business Documents Section */}
        {Object.values(user?.documents || {}).some((doc) => doc !== "N/A") && (
          <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black tracking-tight text-(--color-text)">
              <FaFileAlt className="text-(--color-primary)" />
              Business Documents
            </h2>
            <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-section-light)">
              {renderField("GST Certificate", user?.documents?.gst)}
              {renderField("FSSAI License", user?.documents?.fssai)}
              {renderField("RC (Registration)", user?.documents?.rc)}
              {renderField("Driving License", user?.documents?.dl)}
              {renderField("UIDAI", user?.documents?.uidai)}
              {renderField("PAN", user?.documents?.pan)}
            </div>
          </div>
        )}

        {/* Account Metadata */}
        <div className="rounded-3xl border border-(--color-border) bg-white/85 p-6 text-sm shadow-lg backdrop-blur-sm">
          <h2 className="mb-3 text-lg font-black tracking-tight text-(--color-text)">
            Account Details
          </h2>
          <div className="grid gap-4 text-(--color-text-secondary) sm:grid-cols-2">
            <div>
              <span className="font-semibold">Account ID:</span>
              <p className="break-all font-mono text-xs text-(--color-text-secondary)">
                {user?._id}
              </p>
            </div>
            <div>
              <span className="font-semibold">Member Since:</span>
              <p className="text-(--color-text)">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditRestaurantProfileModal
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default RestaurantProfile;