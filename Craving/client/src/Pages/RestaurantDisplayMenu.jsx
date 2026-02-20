import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../Config/Api";
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
      
      {/* ================= HEADER SECTION ================= */}
      <div className="relative w-full h-[680px] overflow-hidden group">
        {/* Background Image with Slow Cinematic Zoom */}
        <img
          src={data.photo.url}
          alt=""
          className="w-full h-full object-cover scale-125 group-hover:scale-140 transition duration-[4000ms] ease-out"
        />

        {/* Multi-Layer Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,140,0,0.25),transparent_60%)]"></div>

        {/* Ambient Glow Effects */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-pink-500/10 blur-[120px] rounded-full"></div>

        {/* Floating Luxury Glass Card */}
        <div className="absolute bottom-24 left-6 md:left-24 text-white max-w-5xl backdrop-blur-2xl bg-white/5 border border-white/10 p-10 md:p-14 rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.6)] transition-all duration-700">
          {/* Restaurant Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {data.restaurantName}
          </h1>

          {/* Info Row */}
          <div className="flex flex-wrap items-center gap-5 mt-8 text-gray-200 text-lg">
            {/* City */}
            <span className="flex items-center gap-2">📍 {data.city}</span>

            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>

            {/* Open Badge */}
            <span className="bg-green-500/90 px-5 py-2 text-sm rounded-full font-semibold shadow-lg hover:scale-105 transition">
              Open Now
            </span>

            {/* Rating */}
            <span className="bg-white/10 px-5 py-2 text-sm rounded-full font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
              ⭐ 4.5 Rating
            </span>

            {/* Delivery */}
            <span className="bg-white/10 px-5 py-2 text-sm rounded-full font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
              ⏱ 30–40 mins
            </span>
          </div>

          {/* Animated Gradient Divider */}
          <div className="w-40 h-1 mt-10 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 animate-pulse"></div>
        </div>

        {/* Smooth Fade to White Section */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* ================= MENU SECTION ================= */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14 text-(--color-primary)">
            Our Menu
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {menuItems &&
              menuItems.map((EachItem, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={EachItem.images[0].url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <span
                      className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold ${
                        EachItem.availability === "available"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {EachItem.availability}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between h-[260px]">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {EachItem.itemName}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-2">
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
                              EachItem.type === "veg" ? "#22c55e" : "#ef4444",
                          }}
                        >
                          {EachItem.type}
                        </span>

                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          {EachItem.servingSize}
                        </span>

                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          ⏱ {EachItem.preparationTime}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-2xl font-extrabold text-(--color-text)">
                        ₹{EachItem.price}
                      </span>

                      <button
                        onClick={() => handleAddToCart(EachItem)}
                        disabled={cartFlag.includes(EachItem._id)}
                        className="bg-(--color-secondary) text-white px-5 py-2 rounded-xl font-medium hover:bg-(--color-primary) transition disabled:bg-(--color-accent) disabled:cursor-not-allowed"
                      >
                        {cartFlag.includes(EachItem._id)
                          ? "Added ✓"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ================= FLOATING CART ================= */}
      {cart && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[650px] z-50">
          <div className="bg-(--color-background) text-(--color-text) rounded-3xl shadow-2xl px-8 py-5 flex justify-between items-center backdrop-blur-lg">
            <div className="flex items-center gap-5">
              <span className="font-semibold text-lg">
                🛒 {cart.cartItem.length} Items
              </span>

              <button
                onClick={handleClearCart}
                className="hover:bg-white/20 p-2 rounded-lg transition"
              >
                <FaRegTrashAlt size={18} />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-bold text-xl">₹ {cart.cartValue}</span>

              <button
                onClick={handleCheckout}
                className="bg-white text-black font-semibold px-6 py-2 rounded-xl hover:scale-105 transition"
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
