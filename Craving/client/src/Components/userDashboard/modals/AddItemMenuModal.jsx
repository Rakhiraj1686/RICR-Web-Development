import React from "react";

const AddItemMenuModal = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100 ">
        <div className="bg-white w-5xl max-h-[85vh] overflow-y-auto rounded">
          <div className="flex justify-between px-5 py-3 border-b border-gray-300 ">
            <div>
              <h1 className="text-shadow-lg text-lg font-bold">Add New Menu Items</h1>
            </div>
            <button
              onClick={() => onClose()}
              className="text-red-600 hover:text-red-700 text-3xl "
            >
              ⊗
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItemMenuModal;
