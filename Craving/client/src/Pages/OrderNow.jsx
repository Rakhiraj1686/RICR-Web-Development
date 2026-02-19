import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Components/Loading";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../config/Api";

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
    <div className="px-6 md:px-14 py-10 bg-linear-to-b from-gray-50 to-white min-h-screen">
      
      {/* Heading Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-(--color-secondary) to-purple-500 bg-clip-text text-transparent">
          Explore Restaurants
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Fresh food from top rated restaurants near you 🍽️
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {restaurant &&
          restaurant.map((EachRestaurant, idx) => (
            <div
              key={idx}
              onClick={() => handleRestaurantClick(EachRestaurant)}
              className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group"
            >
              
              {/* Image Section */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={EachRestaurant.photo.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>

                {/* City Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shadow">
                  📍 {EachRestaurant.city}
                </div>

                {/* Restaurant Name Over Image */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-xl font-bold">
                    {EachRestaurant.restaurantName}
                  </h2>
                  <p className="text-sm opacity-90">
                    {EachRestaurant.cuisine}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 space-y-2">
                <p className="text-gray-500 text-sm line-clamp-1">
                  {EachRestaurant.address}
                </p>

                <p className="text-gray-400 text-sm">
                  📞 {EachRestaurant.mobileNumber}
                </p>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                    Open Now
                  </span>

                  <div className="flex items-center gap-2 text-(--color-secondary) font-semibold group-hover:gap-3 transition-all duration-300">
                    View Menu
                    <FaArrowRight className="text-sm" />
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-(--color-secondary) transition-all duration-500"></div>
            </div>
          ))}
      </div>
    </div>
  </>
);

};

export default OrderNow;
