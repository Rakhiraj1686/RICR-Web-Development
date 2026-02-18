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
      <div className="w-full p-6 ">
        <div className="flex justify-between items-center shadow-md border p-5 rounded-3xl border-gray-50">
          <div className="text-2xl font-bold text-gray-800 mb-4">
            <h1>Menu Management</h1>
          </div>
          <div className="">
            <button
              className=" border-2 border-red-500 p-3 rounded-3xl text-white/80 font-bold text-lg hover:text-white flex items-center gap-2 bg-(--color-secondary) hover:bg-(--color-secondary) "
              onClick={() => setIsAddItem(true)}
            >
              {" "}
              <MdAddCircleOutline />
              <span> Add Items</span>
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
        <div className=" mt-3">
          <div>
            <table className="w-full mt-3">
              <thead>
                <tr className="grid grid-cols-8 text-lg bg-(--color-secondary) text-white">
                  <th className="font-semibold">S.no</th>
                  <th className="font-semibold col-span-2">Item Name</th>
                  <th className="font-semibold">Price</th>
                  <th className="font-semibold">Type</th>
                  <th className="font-semibold">Cuisine</th>
                  <th className="font-semibold">Availability</th>
                  <th className="font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItems &&
                  menuItems.map((items, idx) => (
                    <tr
                      className="grid grid-cols-8 text-center py-2 border-b border-gray-300 "
                      key={idx}
                    >
                      <td className="">{idx + 1}</td>
                      <td className="col-span-2">{items.itemName}</td>
                      <td>{items.price}</td>
                      <td>{items.type.toUpperCase()}</td>
                      <td>{items.cuisine}</td>
                      <td className="flex justify-center items-center text-2xl">
                        {items.availability === "available" ? (
                          <FaToggleOn
                            className="text-green-500"
                            title="Available"
                          />
                        ) : items.availability === "unavailable" ? (
                          <FaToggleOff
                            className="text-red-500"
                            title="Unavailable"
                          />
                        ) : (
                          <ImBlocked
                            className="font-bold text-black"
                            title="Removed from Menu"
                          />
                        )}
                      </td>
                      <td className="flex gap-4 justify-center">
                        <button
                          className="text-gray-500 p-2 rounded-lg bg-gray-200 shadow"
                          onClick={() => {
                            setSelectedItem(items);
                            setIsViewItemModalOpen(true);
                          }}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="text-blue-500  p-2 rounded-lg bg-gray-200 shadow"
                          onClick={() => {
                            setSelectedItem(items);
                            setIsEditItemModalOpen(true);
                          }}
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
