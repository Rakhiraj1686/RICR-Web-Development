import React from "react";

const RestaurantOrders = () => {
  return (
    <div className="bg-(--color-background) rounded-lg p-6 h-full overflow-y-auto">
      <div className="bg-white rounded-lg shadow-md p-6 border border-(--color-border)">
        <h2 className="text-2xl font-bold text-(--color-text) mb-4">Orders</h2>
        <div className="text-center text-(--color-text-secondary) py-12">
          <p className="text-lg">Orders will be displayed and managed here</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOrders;