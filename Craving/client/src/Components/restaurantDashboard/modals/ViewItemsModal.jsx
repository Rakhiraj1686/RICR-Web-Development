import React from "react";
import { FaXmark } from "react-icons/fa6";

const ViewItemModal = ({ onClose, selectedItem }) => {
  if (!selectedItem) return null;

  const images = selectedItem.images || [].slice(0, 5);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 p-4">
        <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="flex justify-between px-6 py-5 border-b border-(--color-border) items-center sticky top-0 bg-white/95 backdrop-blur-sm rounded-t-3xl">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-(--color-primary)">
                Menu
              </p>
              <h2 className="text-xl font-black tracking-tight text-(--color-text)">
                {selectedItem.itemName}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close item details"
              className="flex h-9 w-9 items-center justify-center rounded-full text-(--color-text-secondary) transition hover:bg-(--color-background) hover:text-(--color-primary)"
            >
              <FaXmark size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-(--color-text-secondary)">
                  Images
                </label>
                <div className="flex gap-4 flex-wrap">
                  {images.slice(0, 5).map((image, index) => (
                    <div
                      key={index}
                      className="w-30 h-30 rounded-lg overflow-hidden bg-(--color-background) border border-(--color-border) flex items-center justify-center"
                    >
                      <img
                        src={image.url}
                        alt={`${selectedItem.itemName} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-semibold text-(--color-text-secondary) mb-1">
                  Item Name
                </label>
                <p className="text-(--color-text) font-medium">
                  {selectedItem.itemName}
                </p>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-(--color-text-secondary) mb-1">
                  Price
                </label>
                <p className="text-lg font-bold text-(--color-primary)">
                  ₹{parseFloat(selectedItem.price).toFixed(2)}
                </p>
              </div>

              {/* Cuisine */}
              <div>
                <label className="block text-sm font-semibold text-(--color-text-secondary) mb-1">
                  Cuisine
                </label>
                <p className="text-(--color-text) capitalize">
                  {selectedItem.cuisine}
                </p>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-(--color-text-secondary) mb-1">
                  Type
                </label>
                <p
                  className={`font-medium capitalize ${
                    selectedItem.type === "veg"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedItem.type}
                </p>
              </div>

              {/* Serving Size */}
              <div>
                <label className="block text-sm font-semibold text-(--color-text-secondary) mb-1">
                  Serving Size
                </label>
                <p className="text-(--color-text)">
                  {selectedItem.servingSize} Persons
                </p>
              </div>

              {/* Preparation Time */}
              <div>
                <label className="block text-sm font-semibold text-(--color-text-secondary) mb-1">
                  Preparation Time
                </label>
                <p className="text-(--color-text)">
                  {selectedItem.preparationTime} mins
                </p>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-semibold text-(--color-text-secondary) mb-1">
                  Availability
                </label>
                <p
                  className={`font-medium capitalize ${
                    selectedItem.availability === "available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedItem.availability}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-(--color-text-secondary) mb-2">
                Description
              </label>
              <p className="text-(--color-text-secondary) leading-relaxed bg-(--color-background) p-3 rounded">
                {selectedItem.description}
              </p>
            </div>

            {/* Metadata */}
            <div className="text-xs text-(--color-text-secondary) space-y-1 pt-4 border-t border-(--color-border)">
              {/* <p>Item ID: {selectedItem._id}</p> */}
              <p>
                Created: {new Date(selectedItem.createdAt).toLocaleDateString()}
              </p>
              <p>
                Last Updated:{" "}
                {new Date(selectedItem.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewItemModal;