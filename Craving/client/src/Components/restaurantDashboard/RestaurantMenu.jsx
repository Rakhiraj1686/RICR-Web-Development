import React from "react";
import { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import AdditemMenuModal from "./modals/AddMenuItemModal";
import ViewItemModal from "./modals/ViewItemsModal";
import EditItemsModal from "./modals/EditItemsModal";
import { FaEye, FaEdit } from "react-icons/fa";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import toast from "react-hot-toast";
import api from "../../Config/Api"

const RestaurantMenu = () => {
  const [isAddItem, setIsAddItem] = useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItem = async () => {
    try {
      const res = await api.get("/restaurant/menuItems");
      toast.success(res.data.message);
      setMenuItems(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add menu itme");
    }
  };

  useEffect(() => {
    if (!isAddItem && !isEditItemModalOpen) fetchMenuItem();
  }, [isAddItem, isEditItemModalOpen]);

  return (
    <>
      <div className="w-full min-h-screen overflow-auto bg-linear-to-br from-(--color-section-light) via-(--color-background) to-(--color-section-light) p-4 sm:p-6">
        <div className="relative overflow-hidden rounded-3xl border border-(--color-border) bg-white/70 p-5 shadow-xl backdrop-blur-sm sm:p-6">
          <div className="pointer-events-none absolute -top-14 -right-12 h-44 w-44 rounded-full bg-(--color-secondary)/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-8 h-48 w-48 rounded-full bg-(--color-primary)/15 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-(--color-text) sm:text-3xl">
                Menu Management
              </h1>
              <p className="mt-1 text-sm font-medium text-(--color-text-secondary)">
                Control your restaurant menu, pricing, and availability.
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-(--color-primary) bg-(--color-primary) px-5 py-3 text-base font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-primary-hover) hover:shadow-xl"
              onClick={() => setIsAddItem(true)}
            >
              <MdAddCircleOutline className="text-xl" />
              <span>Add Items</span>
            </button>
          </div>
        </div>
        {/* {menuItems && (
            <div>
              {menuItems.map((items, idx) => (
                <div key={idx}>{items.itemName}</div>
              ))}
            </div>
          )} */}
        <div className="mt-5 rounded-3xl border border-(--color-border) bg-white/80 p-3 shadow-lg backdrop-blur-sm sm:p-4">
          <div className="overflow-x-auto">
            <table className="mt-1 w-full min-w-212.5 overflow-hidden rounded-2xl">
              <thead>
                <tr className="grid grid-cols-8 rounded-2xl bg-(--color-primary) py-3 text-center text-sm uppercase tracking-wider text-white sm:text-base">
                  <th className="font-extrabold">S.no</th>
                  <th className="col-span-2 font-extrabold">Item Name</th>
                  <th className="font-extrabold">Price</th>
                  <th className="font-extrabold">Type</th>
                  <th className="font-extrabold">Cuisine</th>
                  <th className="font-extrabold">Availability</th>
                  <th className="font-extrabold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--color-border) text-(--color-text)">
                {menuItems &&
                  menuItems.map((items, idx) => (
                    <tr
                      className="grid grid-cols-8 items-center py-3 text-center text-sm font-medium transition-colors duration-200 hover:bg-(--color-section-light) sm:text-base"
                      key={idx}
                    >
                      <td className="font-semibold text-(--color-text-secondary)">{idx + 1}</td>
                      <td className="col-span-2 truncate px-2 text-left font-bold text-(--color-text) sm:px-4">
                        {items.itemName}
                      </td>
                      <td className="font-semibold text-(--color-text)">{items.price}</td>
                      <td className="font-semibold">{items.type.toUpperCase()}</td>
                      <td className="font-semibold">{items.cuisine}</td>
                      <td className="flex items-center justify-center text-2xl">
                        {items.availability === "available" ? (
                          <FaToggleOn
                            className="text-green-500 drop-shadow"
                            title="Available"
                          />
                        ) : items.availability === "unavailable" ? (
                          <FaToggleOff
                            className="text-red-500 drop-shadow"
                            title="Unavailable"
                          />
                        ) : (
                          <ImBlocked
                            className="font-bold text-black"
                            title="Removed from Menu"
                          />
                        )}
                      </td>
                      <td className="flex justify-center gap-3">
                        <button
                          className="rounded-xl border border-(--color-border) bg-white p-2.5 text-(--color-text-secondary) shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-background) hover:shadow"
                          onClick={() => {
                            setSelectedItem(items);
                            setIsViewItemModalOpen(true);
                          }}
                          title="View Item"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="rounded-xl border border-(--color-border) bg-white p-2.5 text-(--color-primary) shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-background) hover:shadow"
                          onClick={() => {
                            setSelectedItem(items);
                            setIsEditItemModalOpen(true);
                          }}
                          title="Edit Item"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isAddItem && <AdditemMenuModal onClose={() => setIsAddItem(false)} />}

      {isViewItemModalOpen && (
        <ViewItemModal
          onClose={() => setIsViewItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
      {isEditItemModalOpen && (
        <EditItemsModal
          onClose={() => setIsEditItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
};

export default RestaurantMenu;
