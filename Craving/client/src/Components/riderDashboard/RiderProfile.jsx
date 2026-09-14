import React, { useEffect, useState } from "react";
import {
  FaCamera,
  FaPen,
  FaTruckFast,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaCakeCandles,
  FaVenusMars,
  FaIdCard,
  FaTriangleExclamation,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../Config/Api";
import toast from "react-hot-toast";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import EditProfileModal from "./modals/EditProfileModal";

const maskLicense = (dl) => {
  if (!dl || dl === "N/A") return null;
  if (dl.length <= 4) return dl;
  return `${"•".repeat(dl.length - 4)}${dl.slice(-4)}`;
};

const getInitials = (name) => {
  if (!name) return "R";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const RiderProfile = () => {
  const { user, setUser, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchStats = async () => {
    setLoadingStats(true);
    setStatsError(false);
    try {
      const [ongoingRes, completedRes] = await Promise.all([
        api.get("/rider/ongoingOrder"),
        api.get("/rider/completedOrder"),
      ]);
      const ongoing = ongoingRes.data.data || [];
      const completed = completedRes.data.data || [];
      setStats({
        total: ongoing.length + completed.length,
        completed: completed.filter((o) => o.status === "delivered").length,
        pending: ongoing.length,
      });
    } catch (error) {
      console.log(error);
      setStatsError(true);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("CravingUser");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to log out");
    }
  };

  const maskedLicense = maskLicense(user?.document?.dl);

  return (
    <div className="h-full space-y-6 overflow-y-auto rounded-3xl bg-(--color-background) p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-(--color-primary)">
            Rider Account
          </p>
          <h1 className="text-2xl font-black tracking-tight text-(--color-text) sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-(--color-text-secondary)">
            Manage your personal information and rider account details.
          </p>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center gap-2 rounded-full bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
        >
          <FaPen size={13} /> Edit Profile
        </button>
      </div>

      {/* Profile hero card */}
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-(--color-background) bg-(--color-primary) text-2xl font-bold text-white shadow-sm">
            {user?.photo?.url ? (
              <img src={user.photo.url} alt={user.fullName} className="h-full w-full object-cover" />
            ) : (
              getInitials(user?.fullName)
            )}
          </div>
          <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-white text-(--color-primary) shadow">
            <FaCamera size={12} />
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-bold text-(--color-text)">{user?.fullName}</h2>
          <p className="text-sm text-(--color-text-secondary)">Delivery Partner</p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-(--color-text-secondary) sm:justify-start">
            {user?.mobileNumber && (
              <span className="flex items-center gap-1.5">
                <FaPhone size={12} /> {user.mobileNumber}
              </span>
            )}
            {user?.email && (
              <span className="flex items-center gap-1.5">
                <FaEnvelope size={12} /> {user.email}
              </span>
            )}
          </div>
        </div>

        {user?.isActive && (
          <span
            className={`flex shrink-0 items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm font-semibold ${
              user.isActive === "active" ? "text-green-600" : "text-(--color-text-secondary)"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                user.isActive === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            {user.isActive === "active" ? "Online" : user.isActive}
          </span>
        )}
      </div>

      {/* Personal Information */}
      <div className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-(--color-text)">Personal Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoRow icon={<FaEnvelope />} label="Email" value={user?.email} />
          <InfoRow icon={<FaPhone />} label="Phone Number" value={user?.mobileNumber} />
          <InfoRow icon={<FaLocationDot />} label="Address" value={user?.address} />
          <InfoRow icon={<FaCakeCandles />} label="Date of Birth" value={user?.dob} />
          <InfoRow icon={<FaVenusMars />} label="Gender" value={user?.gender} />
        </div>
      </div>

      {/* Performance */}
      <div className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-(--color-text)">My Performance</h2>
        {loadingStats ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-24 animate-pulse rounded-2xl bg-(--color-background)" />
            ))}
          </div>
        ) : statsError ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-(--color-border) py-8 text-center">
            <FaTriangleExclamation className="text-2xl text-(--color-primary)" />
            <p className="mt-2 font-semibold text-(--color-text)">Unable to load profile</p>
            <p className="text-sm text-(--color-text-secondary)">Please try again.</p>
            <button
              onClick={fetchStats}
              className="mt-3 rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={<FaTruckFast />} label="Total Deliveries" value={stats.total} />
            <StatCard icon={<FaCheck />} label="Completed" value={stats.completed} />
            <StatCard icon={<FaTriangleExclamation />} label="Pending" value={stats.pending} />
          </div>
        )}
      </div>

      {/* Delivery Information — only fields that actually exist */}
      {(maskedLicense || user?.isActive) && (
        <div className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-(--color-text)">Delivery Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {maskedLicense && (
              <InfoRow icon={<FaIdCard />} label="Driving License" value={maskedLicense} />
            )}
            {user?.isActive && (
              <InfoRow
                icon={<FaTruckFast />}
                label="Rider Status"
                value={user.isActive === "active" ? "Active" : user.isActive}
              />
            )}
          </div>
        </div>
      )}

      {/* Account & Security */}
      <div className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-(--color-text)">Account &amp; Security</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="rounded-full border border-(--color-primary) px-5 py-2.5 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-(--color-border) px-5 py-2.5 text-sm font-semibold text-(--color-text-secondary) transition hover:border-red-400 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal onClose={() => setShowEditModal(false)} />
      )}
      {showPasswordModal && (
        <ResetPasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-2xl bg-(--color-background) p-4">
    <span className="mt-0.5 text-(--color-primary)">{icon}</span>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
        {label}
      </p>
      <p className="mt-0.5 font-semibold text-(--color-text)">
        {value && value !== "N/A" ? value : "Not provided"}
      </p>
    </div>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-(--color-border) bg-(--color-background) p-5 text-center">
    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--color-primary) shadow-sm">
      {icon}
    </span>
    <p className="mt-3 text-2xl font-black text-(--color-text)">{value}</p>
    <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">
      {label}
    </p>
  </div>
);


export default RiderProfile;