import React, { useEffect, useState } from "react";
import api from "../Config/Api";
import { useNavigate } from "react-router-dom";

const OrderNow = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState();
  const [loading, setLoading] = useState(false);

  const fetchAllRestaurant = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurants(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurant();
  }, []);

  const handleRestaurantClick = (restaurantID) => {
    console.log("restaurant Clicked");
    console.log("Order Now Page", restaurantID);

    navigate(`/restaurant/${restaurantID}`);
  };

  // console.log(restaurants);

  return (
    <>
      <div className="bg-gray-100 p-3">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Order Now</h1>
          <p className="text-gray-600 mt-2">
            Browse our menu and place your order now!
          </p>
        </div>

        {restaurants ? (
          <div className="grid grid-cols-4 gap-3">
            {restaurants.map((restaurant, idx) => (
              <div
                key={idx}
                className="rounded h-100 hover:shadow-lg p-3"
                onClick={() => {
                  handleRestaurantClick(restaurant.id);
                }}
              >
                <div>{restaurant.restaurantName}</div>
                <div className="flex gap-2">
                  {restaurant.cuisine
                    .split(", ")
                    .slice(0, 2)
                    .map((cuisne, idx) => (
                      <span
                        key={idx}
                        className="py-1 px-2 bg-amber-200 rounded-2xl capitalize"
                      >{cuisne.toLowerCase()}</span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default OrderNow;
