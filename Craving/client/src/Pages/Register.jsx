import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../Config/Api";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (!/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(formData.email)) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian Mobile Number allowed";
    }

    if (!formData.role) {
      Error.role = "Please Choose any one";
    }

    setValidationError(Error);
    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the Form Correctly");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-(--color-background)">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-background) relative overflow-hidden px-4">
      {/* Background Shapes */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-(--color-primary) rotate-45 rounded-3xl opacity-20"></div>
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-(--color-secondary) rotate-45 rounded-3xl opacity-20"></div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden relative z-10">
        {/* Left Panel */}
        <div
          className="hidden md:flex flex-col justify-center p-12 text-white"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
          }}
        >
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Join
            <br />
            With Us.
          </h2>
          <p className="text-lg opacity-90 max-w-sm">
            Create your account and start managing everything seamlessly.
          </p>
        </div>

        {/* Right Form Panel */}
        <div className="bg-white p-10 md:p-14">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Create Account
            </h1>
            <div
              className="w-16 h-1 mt-3 rounded-full"
              style={{ background: "var(--color-primary)" }}
            ></div>
          </div>

          <form onSubmit={handleSubmit} onReset={handleClearForm} className="space-y-5">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-(--color-primary) transition"
              required
            >
              <option value="">Select Role</option>
              <option value="manager">Restaurant Manager</option>
              <option value="partner">Partner</option>
              <option value="customer">Customer</option>
            </select>
            {validationError.role && (
              <span className="text-xs text-red-500">
                {validationError.role}
              </span>
            )}

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-(--color-primary) transition"
            />
            {validationError.fullName && (
              <span className="text-xs text-red-500">
                {validationError.fullName}
              </span>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-(--color-primary) transition"
            />

            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              maxLength="10"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-(--color-primary) transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-(--color-primary) transition"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-(--color-primary) transition"
            />

            <div className="flex gap-4 pt-4">
              <button
                type="reset"
                className="flex-1 h-14 rounded-xl font-semibold bg-(--color-background)"
              >
                Clear
              </button>

              <button
                type="submit"
                className="flex-1 h-14 rounded-xl font-bold text-white shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                }}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;