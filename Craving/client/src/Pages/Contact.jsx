import React, { useState } from "react";
import toast from "react-hot-toast";
import Api from "../Config/Api";
import { FiSend } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    query: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactUs((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setContactUs({
      fullName: "",
      email: "",
      subject: "",
      query: "",
    });
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);

    try {
      const res = await Api.post("/public/new-contact", formData);
      toast.success(res.data.message);
      setIsLoading(true);
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Unkown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-(--color-secondary) to-(--color-secondary-hover) px-4 py-16 relative overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute -top-32 -left-32 w-100 h-100 bg-indigo-200 rotate-45 rounded-3xl opacity-30"></div>
      <div className="absolute -bottom-32 -right-32 w-100 h-100 bg-blue-200 rotate-45 rounded-3xl opacity-30"></div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden relative z-10">
        {/* Left Info Panel */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-(--color-primary) text-white">
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Let's Talk.
          </h2>
          <p className="text-lg opacity-90 max-w-sm">
            Have questions or need support? Send us a message and our team will get back to you as soon as possible.
          </p>
        </div>

        {/* Right Form Panel */}
        <div className="bg-white p-10 md:p-14">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-(--color-text)">
              Contact Us
            </h1>
            <div className="w-16 h-1 mt-3 rounded-full bg-(--color-primary)"></div>
          </div>

          <form
            onSubmit={submitContact}
            onReset={handleClear}
            className="space-y-6"
          >
            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  placeholder="Enter Email"
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  placeholder="Request Help"
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full h-14 px-5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="query"
                  value={formData.query}
                  placeholder="Please describe your query in detail.."
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  rows="5"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-(--color-secondary) text-black disabled:cursor-not-allowed disabled:bg-(--color-secondary)"
            >
              <div className="flex gap-2 items-center justify-center text-lg">
                <FiSend /> <span>Send Message</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;