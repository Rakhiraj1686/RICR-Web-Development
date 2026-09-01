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
  FaEdit,
  FaLock,
  FaChevronRight,
} from "react-icons/fa";

import api from "../../Config/Api";
import toast from "react-hot-toast";
import ResetPasswordModal from "./modals/ResetPasswordModal";

const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
    useState(false);

  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_Data = new FormData();
    form_Data.append("photo", photo);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);

      toast.success(res.data.message);

      setUser(res.data.data);

      sessionStorage.setItem(
        "CravingUser",
        JSON.stringify(res.data.data)
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to update profile photo"
      );
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const newPhotoURL = URL.createObjectURL(file);

    setPreview(newPhotoURL);
    changePhoto(file);
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <>
      <div className="h-full overflow-y-auto bg-gradient-to-br from-(--color-section-light) via-(--color-background) to-(--color-section-light) p-4 sm:p-6">

        {/* Main Container */}
        <div className="mx-auto max-w-7xl space-y-6">

          {/* ================= PROFILE HERO ================= */}
          <section className="relative overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-xl">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-(--color-primary)/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-(--color-secondary)/15 blur-3xl" />

            {/* Cover */}
            <div className="relative h-32 sm:h-40 bg-gradient-to-r from-(--color-primary) via-(--color-secondary) to-(--color-primary-hover)">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border-[40px] border-white" />
                <div className="absolute -bottom-28 left-20 h-72 w-72 rounded-full border-[30px] border-white" />
              </div>
            </div>

            {/* Profile Content */}
            <div className="relative px-5 pb-6 sm:px-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                {/* Avatar + User */}
                <div className="-mt-16 flex flex-col items-center gap-4 sm:flex-row sm:items-end">

                  {/* Avatar */}
                  <div className="relative shrink-0">

                    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl sm:h-36 sm:w-36">
                      <img
                        src={preview || user?.photo?.url || UserImage}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Camera */}
                    <label
                      htmlFor="imageUpload"
                      className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-(--color-primary) text-white shadow-lg transition hover:scale-105 hover:bg-(--color-primary-hover)"
                      title="Change profile photo"
                    >
                      <FaCamera size={14} />
                    </label>

                    <input
                      type="file"
                      id="imageUpload"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </div>

                  {/* User Info */}
                  <div className="text-center sm:pb-1 sm:text-left">

                    <h1 className="text-2xl font-black tracking-tight text-(--color-text) sm:text-3xl">
                      {user?.fullName || "User Name"}
                    </h1>

                    <p className="mt-1 text-sm text-(--color-text-secondary) sm:text-base">
                      {user?.email || "user@example.com"}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      <FaCheckCircle />
                      Account Active
                    </div>

                  </div>
                </div>

                {/* Actions */}
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">

                  <button
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-5 py-2.5 text-sm font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-(--color-primary-hover) hover:shadow-lg"
                  >
                    <FaEdit />
                    Edit Profile
                  </button>

                  <button
                    onClick={() => setIsResetPasswordModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-(--color-border) bg-white px-5 py-2.5 text-sm font-bold text-(--color-text) transition duration-200 hover:border-(--color-primary) hover:bg-(--color-section-light)"
                  >
                    <FaLock />
                    Security
                  </button>

                </div>

              </div>
            </div>
          </section>

          {/* ================= QUICK STATS ================= */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Profile */}
            <div className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-primary)/10 text-(--color-primary)">
                  <FaUser />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                    Profile Status
                  </p>
                  <p className="mt-1 font-bold text-(--color-text)">
                    Complete
                  </p>
                </div>

              </div>
            </div>

            {/* Email */}
            <div className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                    Email Status
                  </p>
                  <p className="mt-1 font-bold text-(--color-text)">
                    Verified
                  </p>
                </div>

              </div>
            </div>

            {/* Mobile */}
            <div className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-secondary)/10 text-(--color-secondary)">
                  <FaPhoneAlt />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                    Mobile Number
                  </p>
                  <p className="mt-1 truncate font-bold text-(--color-text)">
                    {user?.mobileNumber || "Not Added"}
                  </p>
                </div>

              </div>
            </div>

            {/* Member */}
            <div className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <FaClock />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                    Member Since
                  </p>
                  <p className="mt-1 font-bold text-(--color-text)">
                    {memberSince}
                  </p>
                </div>

              </div>
            </div>

          </section>

          {/* ================= INFORMATION ================= */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* Personal Information */}
            <div className="xl:col-span-2 rounded-3xl border border-(--color-border) bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-6 flex items-center justify-between border-b border-(--color-border) pb-4">

                <div>
                  <h2 className="text-xl font-black text-(--color-text)">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-(--color-text-secondary)">
                    Your basic account information
                  </p>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-(--color-section-light) text-(--color-primary) sm:flex">
                  <FaUser />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* Full Name */}
                <div className="rounded-2xl border border-(--color-border) bg-(--color-section-light) p-4 transition hover:border-(--color-primary)/40">
                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 text-(--color-primary)">
                      <FaUser />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                        Full Name
                      </p>

                      <p className="mt-1 break-words font-bold text-(--color-text)">
                        {user?.fullName || "Not Provided"}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-(--color-border) bg-(--color-section-light) p-4 transition hover:border-(--color-primary)/40">
                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 text-(--color-primary)">
                      <FaEnvelope />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                        Email Address
                      </p>

                      <p className="mt-1 break-all font-bold text-(--color-text)">
                        {user?.email || "Not Provided"}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-2xl border border-(--color-border) bg-(--color-section-light) p-4 transition hover:border-(--color-primary)/40">
                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 text-(--color-primary)">
                      <FaPhoneAlt />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                        Phone Number
                      </p>

                      <p className="mt-1 font-bold text-(--color-text)">
                        {user?.mobileNumber || "Not Provided"}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Account */}
                <div className="rounded-2xl border border-(--color-border) bg-(--color-section-light) p-4 transition hover:border-(--color-primary)/40">
                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 text-emerald-600">
                      <FaCheckCircle />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                        Account Status
                      </p>

                      <p className="mt-1 font-bold text-emerald-700">
                        Active & Verified
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              <button
                onClick={() => setIsEditProfileModalOpen(true)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-(--color-border) bg-white px-4 py-3 text-sm font-bold text-(--color-text) transition hover:border-(--color-primary) hover:bg-(--color-section-light) hover:text-(--color-primary)"
              >
                <FaEdit />
                Update Personal Information
              </button>

            </div>

            {/* Security */}
            <div className="rounded-3xl border border-(--color-border) bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-6 border-b border-(--color-border) pb-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-primary)/10 text-(--color-primary)">
                    <FaShieldAlt />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-(--color-text)">
                      Security
                    </h2>

                    <p className="text-sm text-(--color-text-secondary)">
                      Protect your account
                    </p>
                  </div>

                </div>

              </div>

              <div className="space-y-3">

                <div className="rounded-2xl border border-(--color-border) p-4">
                  <div className="flex items-start gap-3">

                    <FaShieldAlt className="mt-1 text-emerald-600" />

                    <div>
                      <p className="font-bold text-(--color-text)">
                        Password Security
                      </p>

                      <p className="mt-1 text-xs leading-5 text-(--color-text-secondary)">
                        Keep your account secure by updating your password regularly.
                      </p>
                    </div>

                  </div>
                </div>

                <button
                  onClick={() => setIsResetPasswordModalOpen(true)}
                  className="flex w-full items-center justify-between rounded-2xl border border-(--color-border) p-4 text-left transition hover:border-(--color-primary) hover:bg-(--color-section-light)"
                >
                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-section-light) text-(--color-primary)">
                      <FaLock />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-(--color-text)">
                        Change Password
                      </p>

                      <p className="text-xs text-(--color-text-secondary)">
                        Update your login password
                      </p>
                    </div>

                  </div>

                  <FaChevronRight className="text-(--color-text-secondary)" />
                </button>

              </div>

            </div>

          </section>

          {/* ================= ADDRESS ================= */}
          <section className="rounded-3xl border border-(--color-border) bg-white p-5 shadow-sm sm:p-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--color-secondary)/10 text-(--color-secondary)">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h2 className="text-xl font-black text-(--color-text)">
                    Default Address
                  </h2>

                  <p className="mt-1 text-sm text-(--color-text-secondary)">
                    No default address added yet.
                  </p>
                </div>

              </div>

              <button
                onClick={() => setIsEditProfileModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-5 py-2.5 text-sm font-bold text-white transition hover:bg-(--color-primary-hover)"
              >
                <FaEdit />
                Add Address
              </button>

            </div>

          </section>

          {/* ================= ACCOUNT FOOTER ================= */}
          <section className="rounded-3xl border border-(--color-border) bg-gradient-to-r from-(--color-section-light) via-white to-(--color-section-light) p-5 shadow-sm sm:p-6">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-(--color-primary)">
                  Account Security
                </p>

                <h3 className="mt-1 text-lg font-black text-(--color-text)">
                  Keep your Craving account secure
                </h3>

                <p className="mt-1 text-sm text-(--color-text-secondary)">
                  Never share your password or verification details with anyone.
                </p>
              </div>

              <button
                onClick={() => setIsResetPasswordModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-(--color-border) bg-white px-5 py-2.5 text-sm font-bold text-(--color-text) transition hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                <FaLock />
                Manage Security
              </button>

            </div>

          </section>

        </div>
      </div>

      {/* Modals */}
      {isEditProfileModalOpen && (
        <EditProfileModal
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

export default UserProfile;