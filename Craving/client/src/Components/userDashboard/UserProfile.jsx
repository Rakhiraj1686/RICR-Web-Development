import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";

const UserProfile = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const { user } = useAuth();
  return (
    <>
      <div>
        <div className="flex justify-between p-3">
          <h1 className="font-bold text-2xl">My Profile</h1>
          <button
            className="border px-5 py-2 bg-yellow-400 rounded"
            onClick={() => setIsEditProfileModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>
        <hr className="border-2" />
        <div className="flex flex-row gap-50 mt-2 p-2">
          <div>
            <span className="text-gray-600 font-bold ">Name : </span>
            <span>{user.fullName}</span>
          </div>
          <div>
            <span className="text-gray-600 font-bold">Email : </span>
            <span>{user.email}</span>
          </div>
          <div>
            <span className="text-gray-600 font-bold ">Mobile Number : </span>
            <span>{user.mobileNumber}</span>
          </div>
        </div>
      </div>
      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;
