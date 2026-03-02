import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";
import UserImage from "../../assets/images.png";
import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import api from "../../Config/Api";
import toast from "react-hot-toast";
import ResetPasswordModal from "./modals/ResetPasswordModal";

const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_Data = new FormData();
    form_Data.append("photo", photo);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);
      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newPhotoURL = URL.createObjectURL(file);
    setPreview(newPhotoURL);
    changePhoto(file);
  };

  return (
    <>
      <div className="bg-gray-50 rounded-lg shadow-md p-6 md:p-8 h-full overflow-y-auto space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex gap-5 items-center">
              <div className="relative">
                <div className="border rounded-full w-32 h-32 md:w-36 md:h-36 overflow-hidden">
                  <img
                    src={preview || user?.photo?.url || UserImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-0 border border-gray-300 bg-white p-2 rounded-full group">
                  <label
                    htmlFor="imageUpload"
                    className="text-(--color-primary) group-hover:text-(--color-secondary) cursor-pointer"
                  >
                    <FaCamera />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>

              <div>
                <div className="text-3xl text-(--color-primary) font-semibold">
                  {user?.fullName || "User Name"}
                </div>
                <div className="text-gray-600 text-lg font-medium mt-1">
                  {user?.email || "user@example.com"}
                </div>
                <div className="text-gray-600 text-base font-medium mt-1">
                  {user?.mobileNumber || "XXXXXXXXXX"}
                </div>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  <FaCheckCircle />
                  Account Active
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                className="px-4 py-2 rounded bg-(--color-secondary) text-white hover:opacity-90 duration-300"
                onClick={() => setIsEditProfileModalOpen(true)}
              >
                Edit Profile
              </button>
              <button
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 duration-300"
                onClick={() => setIsResetPasswordModalOpen(true)}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
            <p className="text-gray-500 text-sm">Profile Status</p>
            <p className="text-gray-800 text-lg font-semibold mt-2 flex items-center gap-2">
              <FaUser className="text-(--color-secondary)" />
              Complete
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
            <p className="text-gray-500 text-sm">Email Verification</p>
            <p className="text-gray-800 text-lg font-semibold mt-2 flex items-center gap-2">
              <FaEnvelope className="text-(--color-secondary)" />
              Verified
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
            <p className="text-gray-500 text-sm">Mobile Number</p>
            <p className="text-gray-800 text-lg font-semibold mt-2 flex items-center gap-2">
              <FaPhoneAlt className="text-(--color-secondary)" />
              {user?.mobileNumber || "Not Added"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
            <p className="text-gray-500 text-sm">Member Since</p>
            <p className="text-gray-800 text-lg font-semibold mt-2 flex items-center gap-2">
              <FaClock className="text-(--color-secondary)" />
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-800 font-semibold mt-1">
                  {user?.fullName || "Not Provided"}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-gray-800 font-semibold mt-1">
                  {user?.email || "Not Provided"}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-gray-800 font-semibold mt-1">
                  {user?.mobileNumber || "Not Provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Security & Address</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                <FaShieldAlt className="text-(--color-secondary) mt-1" />
                <div>
                  <p className="text-gray-800 font-semibold">Password Security</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Keep your account secure by updating password regularly.
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                <FaMapMarkerAlt className="text-(--color-secondary) mt-1" />
                <div>
                  <p className="text-gray-800 font-semibold">Default Address</p>
                  <p className="text-sm text-gray-600 mt-1">
                    No default address added yet.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  className="w-full px-4 py-2 rounded bg-(--color-secondary) text-white hover:opacity-90 duration-300"
                  onClick={() => setIsEditProfileModalOpen(true)}
                >
                  Update Profile Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserProfile;
