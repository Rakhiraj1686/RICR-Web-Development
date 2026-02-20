import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Components/Loading";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../Config/Api";

const OrderNow = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState();

  const fetctAllRestaurants = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurant(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetctAllRestaurants();
  }, []);

  const handleRestaurantClick = (restaurantinfo) => {
    console.log("Restaurant Clicked");
    navigate("/restaurantMenu", { state: restaurantinfo });
  };

  if (loading) {
    return (
      <div className="h-[80vh]">
        <Loading />
      </div>
    );
  }

 return (
  <>
    <div className="px-6 md:px-16 py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      
 <div className="mb-16 relative text-center py-10 bg-gradient-to-r from-orange-50 via-white to-red-50 rounded-3xl">
  <h1 className="text-4xl md:text-6xl font-extrabold text-(--color-primary)">
    Hungry?
    <span className="block text-(--color-text)/90">
      Let’s Find Something Tasty
    </span>
  </h1>

  <p className="text-(--color-text) mt-4 text-lg max-w-2xl mx-auto">
    Explore top restaurants, trending dishes, and exclusive offers near you.
  </p>
</div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {restaurant &&
          restaurant.map((EachRestaurant, idx) => (
            <div
              key={idx}
              onClick={() => handleRestaurantClick(EachRestaurant)}
              className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={EachRestaurant.photo.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* City Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold shadow-md">
                  📍 {EachRestaurant.city}
                </div>

                {/* Restaurant Name */}
                <div className="absolute bottom-5 left-5 text-white">
                  <h2 className="text-2xl font-bold tracking-wide">
                    {EachRestaurant.restaurantName}
                  </h2>
                  <p className="text-sm opacity-90">
                    {EachRestaurant.cuisine}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-3">
                <p className="text-gray-600 text-sm line-clamp-1">
                  {EachRestaurant.address}
                </p>

                <p className="text-gray-500 text-sm">
                  📞 {EachRestaurant.mobileNumber}
                </p>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-xs bg-green-100 text-green-600 px-4 py-1 rounded-full font-semibold tracking-wide">
                    Open Now
                  </span>

                  <div className="flex items-center gap-2 text-(--color-secondary) font-semibold group-hover:gap-3 transition-all duration-300">
                    View Menu
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-(--color-secondary) group-hover:shadow-[0_0_25px_var(--color-secondary)] transition-all duration-500"></div>
            </div>
          ))}
      </div>
    </div>
  </>
);

};

export default OrderNow;
