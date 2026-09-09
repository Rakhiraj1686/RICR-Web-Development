import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Config/Api";
import { useAuth } from "../context/AuthContext";
import ForgetPasswordModal from "../Components/publicModals/ForgetPasswordModal";
import { Input, Button } from "../Components/ui";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUtensils,
  FaPizzaSlice,
  FaBurger,
  FaIceCream,
  FaTriangleExclamation,
} from "react-icons/fa6";

const DASHBOARD_ROUTE_BY_ROLE = {
  manager: "/restaurantdashboard",
  partner: "/riderdashboard",
  customer: "/userdashboard",
  admin: "/admindashboard",
};

const Login = () => {
  const { setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();

  const [isForgetPasswordModalOpen, setIsForgetPasswordOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (loginError) setLoginError("");
  };

  const handleClearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleLoginNow = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      setUser(res.data.data);
      setIsLogin(true);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
      handleClearForm();
      setRole(res.data.data.role);
      const target = DASHBOARD_ROUTE_BY_ROLE[res.data.data.role];
      if (target) navigate(target);
    } catch (error) {
      console.log(error);
      setLoginError("Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
              className="pointer-events-none absolute bottom-16 left-16 text-3xl text-white/20"
              aria-hidden="true"
            />

            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-sm">
              <FaUtensils aria-hidden="true" />
            </span>

            <h2 className="relative mt-8 text-4xl font-extrabold leading-tight">
              Welcome Back to Your Cravings
            </h2>
            <p className="relative mt-4 max-w-sm text-white/85">
              Your favorite meals are just a few clicks away.
            </p>

            <p className="relative mt-10 text-sm font-semibold uppercase tracking-widest text-white/70">
              Satisfy Your Craving.
            </p>
          </div>

          {/* RIGHT — LOGIN FORM */}
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

            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-(--color-text) sm:text-4xl">
                Welcome Back!
              </h1>
              <p className="mt-2 text-(--color-text-secondary)">
                Login to continue your Craving journey.
              </p>
            </div>

            {loginError && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2.5 rounded-xl border border-(--color-primary)/30 bg-(--color-primary)/5 px-4 py-3 text-sm text-(--color-primary)"
              >
                <FaTriangleExclamation className="mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Unable to log in</p>
                  <p className="text-(--color-text-secondary)">{loginError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLoginNow} className="space-y-5" noValidate>
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
                autoComplete="email"
                iconLeft={<FaEnvelope />}
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                autoComplete="current-password"
                iconLeft={<FaLock />}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="pointer-events-auto transition hover:text-(--color-text)"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsForgetPasswordOpen(true)}
                  className="text-sm font-semibold text-(--color-primary) transition hover:text-(--color-primary-hover) hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <Button type="submit" fullWidth size="lg" loading={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <p className="pt-2 text-center text-sm text-(--color-text-secondary)">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="font-bold text-(--color-primary) transition hover:text-(--color-primary-hover) hover:underline"
                >
                  Create Account
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      {isForgetPasswordModalOpen && (
        <ForgetPasswordModal onClose={() => setIsForgetPasswordOpen(false)} />
      )}
    </>
  );
};

export default Login;