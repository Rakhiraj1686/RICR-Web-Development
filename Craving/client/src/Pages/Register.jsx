import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Config/Api";
import {
  FaEye,
  FaEyeSlash,
  FaUtensils,
  FaPizzaSlice,
  FaBurger,
  FaIceCream,
  FaUser,
  FaStore,
  FaTruckFast,
  FaTriangleExclamation,
  FaCircleCheck,
} from "react-icons/fa6";

const ROLE_OPTIONS = [
  { value: "customer", label: "Customer", icon: <FaUser /> },
  { value: "manager", label: "Restaurant Manager", icon: <FaStore /> },
  { value: "partner", label: "Delivery Partner", icon: <FaTruckFast /> },
];

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "" };

  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { score: 1, label: "Weak" };
  if (score <= 3) return { score: 2, label: "Medium" };
  return { score: 3, label: "Strong" };
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [formError, setFormError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleRoleSelect = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
    setValidationError({});
    setFormError("");
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be More Than 3 Characters";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
        Error.fullName = "Only Contain A-Z , a-z and space";
      }
    }

    if (!/^[\w.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(formData.email)) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian Mobile Number allowed";
    }

    if (formData.password.length < 6) {
      Error.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      Error.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      Error.role = "Please Choose any one";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validate()) {
      toast.error("Fill the Form Correctly");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setFormError(
        error?.response?.data?.message ||
          "Please check your details and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-(--color-background) px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--color-accent)/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-(--color-secondary)/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-2xl md:grid-cols-2">
        {/* LEFT — BRAND / VISUAL PANEL */}
        <div
          className="relative hidden flex-col justify-center overflow-hidden p-12 text-white md:flex"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-14 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <FaPizzaSlice
            className="pointer-events-none absolute left-10 top-16 text-3xl text-white/20"
            aria-hidden="true"
          />
          <FaBurger
            className="pointer-events-none absolute right-14 top-1/3 text-3xl text-white/20"
            aria-hidden="true"
          />
          <FaIceCream
            className="pointer-events-none absolute bottom-32 left-16 text-3xl text-white/20"
            aria-hidden="true"
          />

          <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-sm">
            <FaUtensils aria-hidden="true" />
          </span>

          <h2 className="relative mt-8 text-4xl font-extrabold leading-tight">
            Your Cravings Start Here.
          </h2>
          <p className="relative mt-4 max-w-sm text-white/85">
            Create your account and discover delicious food from restaurants
            around you.
          </p>

          {/* Floating info cards */}
          <div className="relative mt-10 space-y-3">
            <div className="flex w-fit items-center gap-2.5 rounded-2xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
              <FaUtensils aria-hidden="true" />
              <span className="text-sm font-semibold">Fresh & Delicious</span>
            </div>
            <div className="flex w-fit items-center gap-2.5 rounded-2xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
              <FaTruckFast aria-hidden="true" />
              <span className="text-sm font-semibold">Fast Delivery</span>
            </div>
          </div>

          <p className="relative mt-10 text-sm font-semibold uppercase tracking-widest text-white/70">
            Satisfy Your Craving.
          </p>
        </div>

        {/* RIGHT — REGISTER FORM */}
        <div className="p-8 sm:p-10 md:p-12">
          {/* Compact brand banner — mobile only */}
          <div
            className="mb-6 flex items-center gap-3 rounded-2xl p-4 text-white md:hidden"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
              <FaUtensils aria-hidden="true" />
            </span>
            <div>
              <p className="font-bold leading-tight">Craving</p>
              <p className="text-xs text-white/85">Satisfy your craving.</p>
            </div>
          </div>

          {isSuccess ? (
            <div className="flex min-h-104 flex-col items-center justify-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-primary)/10 text-3xl text-(--color-primary)">
                <FaCircleCheck aria-hidden="true" />
              </span>
              <h1 className="mt-5 text-2xl font-extrabold text-(--color-text)">
                Account Created!
              </h1>
              <p className="mt-2 max-w-xs text-(--color-text-secondary)">
                Your Craving account is ready. Log in to start exploring
                restaurants near you.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-7 w-full max-w-xs rounded-xl bg-(--color-primary) px-6 py-3 font-bold text-white shadow-sm transition hover:bg-(--color-primary-hover)"
              >
                Go to Login
              </button>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="mt-3 text-sm font-semibold text-(--color-text-secondary) transition hover:text-(--color-text)"
              >
                Register another account
              </button>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <h1 className="text-3xl font-extrabold text-(--color-text) sm:text-4xl">
                  Create Your Account
                </h1>
                <p className="mt-2 text-(--color-text-secondary)">
                  Join Craving and make every meal more exciting.
                </p>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-2.5 rounded-xl border border-(--color-primary)/30 bg-(--color-primary)/5 px-4 py-3 text-sm text-(--color-primary)"
                >
                  <FaTriangleExclamation className="mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">We couldn't create your account.</p>
                    <p className="text-(--color-text-secondary)">{formError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Role picker */}
                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-(--color-text)">
                    I want to join as
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {ROLE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleRoleSelect(opt.value)}
                        aria-pressed={formData.role === opt.value}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition ${
                          formData.role === opt.value
                            ? "border-(--color-primary) bg-(--color-primary)/5 text-(--color-primary)"
                            : "border-(--color-border) text-(--color-text-secondary) hover:border-(--color-primary)/40"
                        }`}
                      >
                        <span className="text-lg">{opt.icon}</span>
                        <span className="text-xs font-semibold leading-tight">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {validationError.role && (
                    <p className="mt-1.5 text-xs font-medium text-(--color-primary)">
                      {validationError.role}
                    </p>
                  )}
                </div>

                {/* Full name */}
                <div>
                  <label
                    htmlFor="reg-fullName"
                    className="mb-1.5 block text-sm font-semibold text-(--color-text)"
                  >
                    Full Name
                  </label>
                  <input
                    id="reg-fullName"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="name"
                    className="h-12 w-full rounded-xl border border-(--color-border) px-4 text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 disabled:cursor-not-allowed disabled:bg-(--color-background)"
                  />
                  {validationError.fullName && (
                    <p className="mt-1.5 text-xs font-medium text-(--color-primary)">
                      {validationError.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="reg-email"
                    className="mb-1.5 block text-sm font-semibold text-(--color-text)"
                  >
                    Email Address
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-(--color-border) px-4 text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 disabled:cursor-not-allowed disabled:bg-(--color-background)"
                  />
                  {validationError.email && (
                    <p className="mt-1.5 text-xs font-medium text-(--color-primary)">
                      {validationError.email}
                    </p>
                  )}
                </div>

                {/* Mobile number */}
                <div>
                  <label
                    htmlFor="reg-mobile"
                    className="mb-1.5 block text-sm font-semibold text-(--color-text)"
                  >
                    Phone Number
                  </label>
                  <input
                    id="reg-mobile"
                    type="tel"
                    name="mobileNumber"
                    placeholder="Enter your phone number"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="tel"
                    className="h-12 w-full rounded-xl border border-(--color-border) px-4 text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 disabled:cursor-not-allowed disabled:bg-(--color-background)"
                  />
                  {validationError.mobileNumber && (
                    <p className="mt-1.5 text-xs font-medium text-(--color-primary)">
                      {validationError.mobileNumber}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="reg-password"
                    className="mb-1.5 block text-sm font-semibold text-(--color-text)"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      autoComplete="new-password"
                      className="h-12 w-full rounded-xl border border-(--color-border) px-4 pr-12 text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 disabled:cursor-not-allowed disabled:bg-(--color-background)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary) transition hover:text-(--color-text)"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1.5">
                        {[1, 2, 3].map((bar) => (
                          <span
                            key={bar}
                            className={`h-1.5 flex-1 rounded-full ${
                              passwordStrength.score >= bar
                                ? passwordStrength.score === 1
                                  ? "bg-red-400"
                                  : passwordStrength.score === 2
                                    ? "bg-(--color-secondary)"
                                    : "bg-green-500"
                                : "bg-(--color-border)"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-xs font-medium text-(--color-text-secondary)">
                        Password strength: {passwordStrength.label}
                      </p>
                    </div>
                  )}
                  {validationError.password && (
                    <p className="mt-1.5 text-xs font-medium text-(--color-primary)">
                      {validationError.password}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="reg-confirmPassword"
                    className="mb-1.5 block text-sm font-semibold text-(--color-text)"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="reg-confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isLoading}
                      autoComplete="new-password"
                      className="h-12 w-full rounded-xl border border-(--color-border) px-4 pr-12 text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 disabled:cursor-not-allowed disabled:bg-(--color-background)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showConfirmPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary) transition hover:text-(--color-text)"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {validationError.confirmPassword && (
                    <p className="mt-1.5 text-xs font-medium text-(--color-primary)">
                      {validationError.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClearForm}
                    disabled={isLoading}
                    className="h-12 flex-1 rounded-xl border border-(--color-border) font-semibold text-(--color-text) transition hover:bg-(--color-background) disabled:cursor-not-allowed"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex h-12 flex-2 items-center justify-center rounded-xl bg-(--color-primary) font-bold text-white shadow-sm transition hover:bg-(--color-primary-hover) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>

                <p className="pt-2 text-center text-sm text-(--color-text-secondary)">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="font-bold text-(--color-primary) transition hover:text-(--color-primary-hover) hover:underline"
                  >
                    Login
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;