import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditRestaurantProfileModal from "./modals/EditRestaurantProfileModal";
import {
  FaCamera,
  FaMapLocationDot,
  FaWallet,
} from "react-icons/fa6";
import {
  FaFileAlt,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaUtensils,
  FaIdCard,
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaStore,
  FaUniversity,
  FaChevronRight,
} from "react-icons/fa";
import { BiSolidBank } from "react-icons/bi";
import api from "../../Config/Api";
import toast from "react-hot-toast";
import ResetPasswordModal from "../userDashboard/modals/ResetPasswordModal";

const RestaurantProfile = () => {
  const { user, setUser } = useAuth();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
    useState(false);

  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const [preview, setPreview] = useState("");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const changePhoto = async (photo) => {
    const form_Data = new FormData();
    form_Data.append("image", photo);

    setIsUploadingPhoto(true);

    try {
      const res = await api.patch("/restaurant/changePhoto", form_Data);

      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem(
        "CravingUser",
        JSON.stringify(res.data.data)
      );

      setPreview("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unknown Error"
      );
    } finally {
      setIsUploadingPhoto(false);
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

  const hasValue = (value) =>
    value && value !== "N/A" && value !== "";

  const renderInfoItem = ({
    icon: Icon,
    label,
    value,
    iconClass = "text-[--color-primary]",
  }) => (
    <div className="group rounded-2xl border border-[#E5E7EB] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[--color-primary]/20 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF8F0]">
          <Icon className={iconClass} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
            {label}
          </p>

          <p
            className={`mt-1 wrap-break-word text-sm font-semibold ${
              hasValue(value)
                ? "text-[#1F2937]"
                : "text-[#9CA3AF]"
            }`}
          >
            {hasValue(value) ? value : "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ icon: Icon, title, subtitle }) => (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1E8] text-[--color-primary]">
        <Icon />
      </div>

      <div>
        <h2 className="text-lg font-extrabold tracking-tight text-[#1F2937]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-0.5 text-xs text-[#6B7280]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-full overflow-y-auto bg-[#FFF8F0]">
        <div className="mx-auto max-w-375 p-4 sm:p-6 lg:p-8">

          {/* =====================================================
              PAGE HEADER
          ====================================================== */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[--color-primary]">
              <FaStore />
              Restaurant Account
            </div>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-[#1F2937] sm:text-3xl">
              Restaurant Profile
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-[#6B7280] sm:text-base">
              Manage your restaurant identity, personal information,
              payment details and business documents.
            </p>
          </div>


          {/* =====================================================
              PROFILE HERO
          ====================================================== */}
          <section className="relative mb-6 overflow-hidden rounded-[28px] bg-[#1F2937] shadow-xl">

            <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#E63946]/25 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#F4A261]/15 blur-3xl" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">

              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                {/* Profile */}
                <div className="flex flex-col items-center gap-6 sm:flex-row">

                  <div className="relative shrink-0">

                    <div className="relative h-32 w-32 overflow-hidden rounded-[30px] border-4 border-white/15 bg-white/10 shadow-2xl sm:h-36 sm:w-36">

                      {preview || user?.photo?.url ? (
                        <img
                          src={preview || user?.photo?.url}
                          alt="Restaurant profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-6xl text-white/60">
                          <FaUserCircle />
                        </div>
                      )}

                      {isUploadingPhoto && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        </div>
                      )}
                    </div>

                    <label
                      htmlFor="imageUpload"
                      title="Change profile photo"
                      className="absolute -bottom-2 -right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border-4 border-[#1F2937] bg-[--color-primary] text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-[--color-primary-hover]"
                    >
                      <FaCamera size={15} />
                    </label>

                    <input
                      type="file"
                      id="imageUpload"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </div>


                  <div className="text-center sm:text-left">

                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

                      <span className="rounded-full bg-[--color-primary] px-3 py-1 text-xs font-bold capitalize text-white">
                        {user?.role || "manager"}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                          user?.isActive === "active"
                            ? "bg-green-400/15 text-green-300"
                            : "bg-red-400/15 text-red-300"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user?.isActive === "active"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        />

                        {user?.isActive || "active"}
                      </span>
                    </div>

                    <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                      {user?.fullName || "Manager Name"}
                    </h2>

                    <p className="mt-2 text-sm text-white/55">
                      {user?.restaurantName || "Your Restaurant"}
                    </p>

                    <p className="mt-3 flex items-center justify-center gap-2 text-xs text-white/45 sm:justify-start">
                      <FaCamera />
                      Click the camera button to update your photo
                    </p>
                  </div>
                </div>


                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">

                  <button
                    onClick={() =>
                      setIsEditProfileModalOpen(true)
                    }
                    className="rounded-xl bg-[--color-primary] px-5 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[--color-primary-hover] hover:shadow-xl"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() =>
                      setIsResetPasswordModalOpen(true)
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition-all duration-200 hover:bg-white/15"
                  >
                    <FaLock className="text-xs" />
                    Reset Password
                  </button>

                </div>

              </div>


              {/* Contact strip */}
              <div className="mt-8 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">

                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70">
                    <FaEnvelope />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                      Email
                    </p>
                    <p className="truncate text-sm font-semibold text-white/85">
                      {user?.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70">
                    <FaPhone />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                      Phone
                    </p>
                    <p className="text-sm font-semibold text-white/85">
                      {user?.mobileNumber || "Not provided"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>


          {/* =====================================================
              RESTAURANT INFORMATION
          ====================================================== */}
          {(hasValue(user?.restaurantName) ||
            hasValue(user?.cuisine)) && (
            <section className="mb-6 rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

              <SectionHeader
                icon={FaUtensils}
                title="Restaurant Information"
                subtitle="Basic information about your restaurant"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {renderInfoItem({
                  icon: FaStore,
                  label: "Restaurant Name",
                  value: user?.restaurantName,
                })}

                {renderInfoItem({
                  icon: FaUtensils,
                  label: "Cuisine Type",
                  value: user?.cuisine,
                })}

              </div>
            </section>
          )}


          {/* =====================================================
              PERSONAL + LOCATION
          ====================================================== */}
          <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

            {/* Personal */}
            <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

              <SectionHeader
                icon={FaUserCircle}
                title="Personal Information"
                subtitle="Your personal account details"
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {renderInfoItem({
                  icon: FaCalendarAlt,
                  label: "Date of Birth",
                  value: user?.dob,
                })}

                {renderInfoItem({
                  icon: FaVenusMars,
                  label: "Gender",
                  value: user?.gender,
                })}

                {renderInfoItem({
                  icon: FaMapMarkerAlt,
                  label: "Address",
                  value: user?.address,
                })}

                {renderInfoItem({
                  icon: FaMapMarkerAlt,
                  label: "City",
                  value: user?.city,
                })}

                {renderInfoItem({
                  icon: FaIdCard,
                  label: "PIN Code",
                  value: user?.pin,
                })}

              </div>
            </section>


            {/* Location */}
            {(user?.geoLocation?.lat !== "N/A" ||
              user?.geoLocation?.lon !== "N/A") && (
              <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

                <SectionHeader
                  icon={FaMapLocationDot}
                  title="Location"
                  subtitle="Registered restaurant coordinates"
                />

                <div className="rounded-2xl bg-[#FFF8F0] p-5">

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {renderInfoItem({
                      icon: FaMapLocationDot,
                      label: "Latitude",
                      value: user?.geoLocation?.lat,
                    })}

                    {renderInfoItem({
                      icon: FaMapLocationDot,
                      label: "Longitude",
                      value: user?.geoLocation?.lon,
                    })}

                  </div>

                </div>

              </section>
            )}

          </div>


          {/* =====================================================
              PAYMENT + BANK
          ====================================================== */}
          <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

            {/* Payment */}
            {user?.paymentDetails?.UPI !== "N/A" && (
              <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

                <SectionHeader
                  icon={FaWallet}
                  title="Payment Details"
                  subtitle="Your UPI payment information"
                />

                <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                      <FaWallet />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-green-700/60">
                        UPI ID
                      </p>

                      <p className="mt-1 break-all text-sm font-bold text-[#1F2937]">
                        {user?.paymentDetails?.UPI}
                      </p>
                    </div>

                  </div>

                </div>
              </section>
            )}


            {/* Bank */}
            {(user?.paymentDetails?.account_number !== "N/A" ||
              user?.paymentDetails?.IFSC !== "N/A") && (
              <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

                <SectionHeader
                  icon={BiSolidBank}
                  title="Bank Account"
                  subtitle="Registered banking information"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {renderInfoItem({
                    icon: BiSolidBank,
                    label: "Account Number",
                    value: user?.paymentDetails?.account_number,
                    iconClass: "text-blue-600",
                  })}

                  {renderInfoItem({
                    icon: FaUniversity,
                    label: "IFSC Code",
                    value: user?.paymentDetails?.IFSC,
                    iconClass: "text-blue-600",
                  })}

                </div>

              </section>
            )}

          </div>


          {/* =====================================================
              BUSINESS DOCUMENTS
          ====================================================== */}
          {Object.values(user?.documents || {}).some(
            (doc) => doc !== "N/A"
          ) && (
            <section className="mb-6 rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <SectionHeader
                  icon={FaFileAlt}
                  title="Business Documents"
                  subtitle="Documents associated with your restaurant"
                />

                <div className="flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                  <FaShieldAlt />
                  Documents
                </div>

              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {[
                  ["GST Certificate", user?.documents?.gst],
                  ["FSSAI License", user?.documents?.fssai],
                  ["RC Registration", user?.documents?.rc],
                  ["Driving License", user?.documents?.dl],
                  ["UIDAI", user?.documents?.uidai],
                  ["PAN", user?.documents?.pan],
                ].map(([label, value]) => (

                  <div
                    key={label}
                    className="group flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-[#FFF8F0] p-4 transition-all duration-200 hover:border-green-200 hover:bg-green-50/40"
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[--color-primary] shadow-sm">
                        <FaFileAlt />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#1F2937]">
                          {label}
                        </p>

                        <p
                          className={`mt-1 truncate text-[11px] ${
                            hasValue(value)
                              ? "text-[#6B7280]"
                              : "text-[#9CA3AF]"
                          }`}
                        >
                          {hasValue(value)
                            ? value
                            : "Not provided"}
                        </p>
                      </div>

                    </div>

                    {hasValue(value) && (
                      <FaCheckCircle className="ml-2 shrink-0 text-sm text-green-500" />
                    )}

                  </div>

                ))}

              </div>
            </section>
          )}


          {/* =====================================================
              ACCOUNT DETAILS
          ====================================================== */}
          <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">

            <SectionHeader
              icon={FaShieldAlt}
              title="Account Details"
              subtitle="Your Craving account information"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-[#FFF8F0] p-4">

                <p className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Account ID
                </p>

                <p className="mt-2 break-all font-mono text-xs font-semibold text-[#374151]">
                  {user?._id || "N/A"}
                </p>

              </div>

              <div className="rounded-2xl bg-[#FFF8F0] p-4">

                <p className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Member Since
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#374151]">
                  <FaCalendarAlt className="text-[--color-primary]" />

                  {user?.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>

              </div>

            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <FaShieldAlt />
              </div>

              <div>
                <p className="text-sm font-bold text-[#1F2937]">
                  Your account is protected
                </p>

                <p className="mt-0.5 text-xs text-[#6B7280]">
                  Keep your account credentials secure and never share
                  your password with anyone.
                </p>
              </div>

            </div>

          </section>

        </div>
      </div>


      {/* =========================================================
          MODALS
      ========================================================== */}

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