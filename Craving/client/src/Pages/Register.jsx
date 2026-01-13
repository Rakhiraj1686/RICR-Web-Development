import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../Config/Api"

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
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

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian Mobile Number allowed";
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
      console.log(error);
      toast.error(error.response.data.message || "Unknown Error" );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-(--color-background) to-indigo-100 py-6 px-4 ">
        <div className="max-w-xl mx-auto">
          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden mt-10">
            <form
              onSubmit={handleSubmit}
              onReset={handleClearForm}
              className="p-8"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Register Yourself
                </h1>
                <p className="text-lg text-gray-600">
                  You are 1 step away to stop your Cavings
                </p>
              </div>
              {/* Personal Information */}
              <div className="mb-10">
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter Your Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
                    />
                    {validationError.fullName && (
                      <span className="text-xs text-red-500">
                        {validationError.fullName}
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
                  />
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Enter Your Mobile Number"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter Your Create Password"
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter Your Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-8 border-t-2 border-gray-200">
                <button
                  type="reset"
                  disabled={isLoading}
                  className="flex-1 bg-(--color-background)  text-gray-800 font-bold py-4 px-6 rounded-lg hover:bg-(--color-background) transition duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-(--color-background)"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-linear-to-r bg-(--color secondary) font-bold py-4 px-6 rounded-lg bg-(--color-secondary) hover:-text-(--color-text)  transition duration-300 transform hover:scale-105 shadow-lg disabled:scale-100 disabled:bg-(--color secondary) disabled:cursor-not-allowed "
                >
                  {isLoading ? "Submitting" : "Submit"}
                </button>
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-600 mt-8 text-sm">
            All fields marked are mandatory. We respect your privacy.
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
