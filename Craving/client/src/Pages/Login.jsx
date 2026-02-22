import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../Config/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ForgetPasswordModal from "../Components/publicModals/ForgetPasswordModal";
import Loading from "../Components/Loading";

const Login = () => {
  const { setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();
  const [isForgetPasswordModalOpen, setIsForgetPasswordOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      setUser(res.data.data);
      setIsLogin(true);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
      handleClearForm();
      switch (res.data.data.role) {
        case "manager": {
          setRole("manager");
          navigate("/restaurantDashboard");
          break;
        }
        case "partner": {
          setRole("partner");
          navigate("/riderDashboard");
          break;
        }
        case "customer": {
          setRole("customer");
          navigate("/userDashboard");
          break;
        }
        case "admin": {
          setRole("admin");
          navigate("/adminDashboard");
          break;
        }
        default:
          break;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-(--color-background)">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-(--color-background) relative overflow-hidden px-4">
        {/* Bold Background Shapes */}
        <div className="absolute -top-32 -left-32 w-100 h-100 bg-(--color-primary) rotate-45 rounded-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -right-32 w-100 h-100 bg-(--color-secondary) rotate-45 rounded-3xl opacity-20"></div>

        <div className="w-full max-w-5xl grid md:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden relative z-10">
          {/* Left Creative Panel */}
          <div
            className="hidden md:flex flex-col justify-center p-12 text-white"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            }}
          >
            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Welcome
              <br />
              Back.
            </h2>
            <p className="text-lg opacity-90 max-w-sm">
              Log in to access your personalized dashboard and manage everything seamlessly.
            </p>
          </div>

          {/* Right Form Panel */}
          <div className="bg-white p-10 md:p-14">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900">
                Login Now
              </h1>
              <div className="w-16 h-1 mt-3 rounded-full"
                style={{ background: "var(--color-primary)" }}
              ></div>
            </div>

            <form onSubmit={handleLoginNow} className="space-y-6">
              <div className="space-y-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-(--color-primary) transition disabled:cursor-not-allowed text-lg"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-(--color-primary) transition disabled:cursor-not-allowed text-lg"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsForgetPasswordOpen(true);
                  }}
                  className="text-sm font-semibold text-(--color-primary) hover:text-(--color-secondary) transition"
                >
                  Forget Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-14 rounded-xl font-bold text-white text-lg shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                }}
              >
                {isLoading ? "Loading..." : "Login Now"}
              </button>

              <div className="flex justify-between items-center text-base text-gray-600 pt-6">
                <p>Didn't Have Account?</p>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="font-bold text-(--color-primary) hover:text-(--color-secondary) transition"
                >
                  Register Now
                </button>
              </div>
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