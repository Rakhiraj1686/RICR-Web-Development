import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../config/Api";
import toast from "react-hot-toast";

const RestaurantDisplayMenu = () => {
  const { isLogin, role } = useAuth();
  const navigate = useNavigate();
  const data = useLocation().state;
  // console.log("Resturant Menu Page", data);

  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [cartFlag, setCartFlag] = useState([]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/public/restaurant/menu/${data._id}`);
      console.log(res.data);
      setMenuItems(res.data.data);
     
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart();
    setCartFlag([]);
  };

  const handleAddToCart = (NewItem) => {
    if (cart) {
      if (cart.restaurantID === NewItem.restaurantID._id) {
        setCart((prev) => ({
          ...prev,
          cartItem: [...prev.cartItem, { ...NewItem, quantity: 1 }],
          cartValue: Number(prev.cartValue) + Number(NewItem.price),
        }));
        setCartFlag((prev) => [...prev, NewItem._id]);
      } else {
        toast.error("Clear the cart first");
      }
    } else {
      setCart({
        restaurantID: NewItem.restaurantID._id,
        cartItem: [{ ...NewItem, quantity: 1 }],
        cartValue: Number(NewItem.price),
      });
      setCartFlag((prev) => [...prev, NewItem._id]);
    }
  };

  const handleCheckout = () => {
    isLogin && role === "customer"
      ? (localStorage.setItem("cart", JSON.stringify(cart)),
        navigate("/checkout-page"))
      : (toast.error("Please Login as Customer"), navigate("/login"));
  };

  // console.log(cart);

  useEffect(() => {
    cart && localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetchMenuItems();
  }, [data]);

 return (
  <>
    {/* ================= HEADER ================= */}
    <div className="relative w-full h-80 overflow-hidden">
      <img
        src={data.photo.url}
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold">
          {data.restaurantName}
        </h1>
        <p className="mt-2 text-gray-300">{data.city}</p>
      </div>
    </div>

    {/* ================= MENU SECTION ================= */}
    <div className="bg-gray-50 min-h-screen py-14">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-(--color-secondary) mb-10 text-center">
          Our Menu
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {menuItems &&
            menuItems.map((EachItem, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden h-full"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  
                  {/* ===== Image ===== */}
                  <div className="sm:w-56 w-full h-56 sm:h-auto flex-shrink-0">
                    <img
                      src={EachItem.images[0].url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* ===== Content ===== */}
                  <div className="flex flex-col justify-between p-6 flex-1">
                    
                    {/* Top Section: Item Name + Availability */}
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-(--color-primary)">
                          {EachItem.itemName}
                        </h3>

                        <span
                          className={`text-xs px-3 py-1 rounded-full capitalize font-medium ${
                            EachItem.availability === "available"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {EachItem.availability}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {EachItem.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4 text-xs">
                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          {EachItem.cuisine}
                        </span>

                        <span
                          className="px-3 py-1 rounded-full text-white capitalize"
                          style={{
                            backgroundColor:
                              EachItem.type === "veg"
                                ? "#22c55e"
                                : "#ef4444",
                          }}
                        >
                          {EachItem.type}
                        </span>

                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          {EachItem.servingSize}
                        </span>

                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          {EachItem.preparationTime}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-2xl font-bold text-(--color-primary)">
                        ₹{EachItem.price}
                      </div>

                      <button
                        onClick={() => handleAddToCart(EachItem)}
                        disabled={cartFlag.includes(EachItem._id)}
                        className="bg-(--color-primary) text-white px-5 py-2 rounded-xl hover:bg-(--color-primary-hover) transition disabled:bg-gray-300"
                      >
                        {cartFlag.includes(EachItem._id)
                          ? "Added ✓"
                          : "Add to Cart"}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>

    {/* ================= FLOATING CART ================= */}
    {cart && (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] md:w-3xl z-50">
        <div className="bg-(--color-secondary) text-white rounded-3xl shadow-2xl px-8 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <span className="font-semibold">
              🛒 {cart.cartItem.length} Items
            </span>

            <button
              onClick={handleClearCart}
              className="hover:bg-white/20 p-2 rounded-lg transition"
            >
              <FaRegTrashAlt />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-bold text-lg">
              ₹ {cart.cartValue}
            </span>

            <button
              onClick={handleCheckout}
              className="bg-white text-(--color-secondary) font-semibold px-6 py-2 rounded-xl hover:scale-105 transition"
            >
              Checkout →
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);

};

export default RestaurantDisplayMenu;