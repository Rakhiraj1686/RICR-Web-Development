import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../Config/Api";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useAuth();
  const [editProfileModal, setEditProfileModal] = useState({
    fullName: "",
    contact: "",
  });

  const handleClear = () => {
    setEditProfileModal({
      fullName: user.fullName,
      contact: user.contact,
    });
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfileModal((prev) => ({ ...prev, [name]: value }));
  };

  const submitEditProfile = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(editProfileModal);

    try {
      const res = await api.put("/user/update", editProfileModal);
      setUser(res.data.data);
      setIsLoading(true);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-100">
        <div className="bg-white w-5xl max-h-85vh overflow-y-auto p-5">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <form
              onSubmit={submitEditProfile}
              onReset={handleClear}
              className="p-8"
            >
              <h1 className="text-2xl font-bold mx-2 ">Edit Profile</h1>
              <div className="flex justify-end">
                <button
                  className=" px-5 py-2 text-2xl text-red-600 font-bold mt-3 rounded"
                  onClick={() => onClose()}
                >
                  <MdOutlineCancel />
                </button>
              </div>

              <div className="space-y-3">
                {/* Contact name */}

                <div>
                  <div className="flex flex-row gap-2">
                    <label
                      htmlFor="fullName"
                      name="fullName"
                      id="fullName"
                      className="w-40"
                    >
                      Full Name :
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full Name"
                      value={editProfileModal.fullName}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                    />
                  </div>
                </div>

                {/* Contact email */}
                <div>
                  <div className="flex flex-row gap-2">
                    <label
                      htmlFor="email"
                      name="email"
                      id="email"
                      className="w-40"
                    >
                      Email :
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={editProfileModal.email}
                      placeholder="Enter your Email"
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <div className="flex flex-row gap-2">
                    <label
                      htmlFor="mobileNumber"
                      name="mobileNumber"
                      id="mobileNumber"
                      className="w-40"
                    >
                      Mobile Number:
                    </label>
                    <input
                      type="number"
                      name="mobileNumber"
                      id="mobileNumber"
                      value={editProfileModal.mobileNumber}
                      placeholder="Enter your mobile number"
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-center gap-5 mt-3">
            <button
              type="submit"
              disabled={isLoading}
              className="border font-bold bg-(--color-secondary) py-3 px-6 rounded-lg hover:bg-(--color-secondary-hover) shadow-lg) disabled:cursor-not-allowed disabled:bg-(--color-secondary)"
            >
              <div className="flex gap-2 items-center justify-center">
                <span>Submit</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
