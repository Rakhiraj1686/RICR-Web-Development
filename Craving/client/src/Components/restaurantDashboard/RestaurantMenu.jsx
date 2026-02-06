import React from "react";
import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import AdditemMenuModal from "./modals/AddMenuItemModal";
import toast from "react-hot-toast";
import { useEffect } from "react";
import api from "../../Config/Api"

const RestaurantMenu = () => {
  const [isAddItem, setIsAddItem] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItem = async () => {
    try {
      const res = await api.get("/restaurant/menuItems");
      toast.success(res.data.message);
      setMenuItems(res.data.data);
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message || "Failed to add menu itme");
    }
  };

  useEffect(() => {
    if (!isAddItem) fetchMenuItem();
  }, [isAddItem]);

  return (
    <>
      <div className="w-full p-6 ">
        <div className="flex justify-between items-center shadow-md border p-5 rounded-3xl border-gray-50">
          <div className="text-2xl font-bold text-gray-800 mb-4">
            <h1>Menu Management</h1>
          </div>
          <div>
            <button
              className=" border-2 border-red-500 p-3 rounded-3xl text-red-600 font-bold text-lg hover:text-white flex items-center gap-2 bg-(--color-secondary) hover:bg-(--color-secondary) "
              onClick={() => setIsAddItem(true)}
            >
              {" "}
              <MdAddCircleOutline />
              <span> Add Items</span>
            </button>
          </div>
          {menuItems && (
            <div>
              {menuItems.map((items, idx) => (
                <div key={idx}>{items.itemName}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAddItem && (<AdditemMenuModal onClose={() => setIsAddItem(false)} />)}
    </>
  );
};

export default RestaurantMenu;
