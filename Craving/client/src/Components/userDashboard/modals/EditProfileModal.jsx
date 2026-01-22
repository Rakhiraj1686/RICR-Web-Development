import React from "react";
import { useAuth } from "../../context/AuthContext";

const EditProfileModal = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-100">
        <div className="bg-white w-5xl max-h-85vh overflow-y-auto">
          <div>EditProfileModal</div>
          <button
            className="border px-5 py-2 bg-red-500 mt-3 rounded"
            onClick={() => onClose()}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
