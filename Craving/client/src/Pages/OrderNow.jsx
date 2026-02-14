import React, { useEffect, useState } from "react";
import api from "../Config/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "./Loading";

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

  if (loading) {
    return (
      <div className="h-[80vh]">
        <Loading />
      </div>
    );
  }

  // console.log(restaurants);

  return (
    <>
      <div className="bg-gray-100 p-3">
        <div className="flex flex-col items-center justify-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Order Now</h1>
          <p className="text-gray-600 mt-2 text-lg">
           <u> Browse our menu and place your order now!</u>
          </p>
        </div>

        {/* {restaurants ? (
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
                      >
                        {cuisne.toLowerCase()}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )} */}

        <div className="grid grid-cols-4 gap-4 mt-4 mx-10 mb-5">
        {restaurants &&
          restaurants.map((EachRestaurant, idx) => (
            <div
              className="h-100 border border-gray-100 rounded-xl p-2 bg-white group cursor-pointer hover:scale-103 hover:shadow-xl hover:shadow-amber-100  duration-100"
              key={idx}
              onClick={handleRestaurantClick}
            >
              <img
                src={EachRestaurant.photo.url}
                alt=""
                className="w-full h-[50%] object-cover rounded-t-xl "
              />
              <div className="text-2xl font-semibold text-(--color-secondary)">
                {EachRestaurant.restaurantName}
              </div>
              <div>{EachRestaurant.cuisine}</div>
              <div>{EachRestaurant.address}</div>
              <div>{EachRestaurant.city}</div>
              <div>{EachRestaurant.pin}</div>
              <div>{EachRestaurant.mobileNumber}</div>
              <div className="flex float-end items-center text-(--color-secondary) gap-2 group-hover:border-b-2 w-fit">
                Explore Menu 
              </div>
            </div>
          ))}
      </div>
      </div>
    </>
  );
};

export default OrderNow;
