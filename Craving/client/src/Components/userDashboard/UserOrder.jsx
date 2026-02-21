import React, { useEffect, useState } from "react";
import api from "../../Config/Api";

const UserOrder = () => {
  const [isLoading, setIsLoading] = useState();
  const [orders, setOrders] = useState();

  const fetchAllPlacedOrder = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/user/placeOrders");
      setOrders(res.data.orders);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlacedOrder();
  }, []);
  return (
    <>
      <div className="w-full h-auto flex flex-col items-center justify-start gap-5 py-5">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <div className="w-full h-auto flex flex-col items-center justify-start gap-5">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : orders?.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={index}
                className="w-[90%] h-auto flex flex-col items-start justify-start gap-3 p-5 border rounded-md"
              >
                <h1 className="text-lg font-semibold">Order ID: {order._id}</h1>
                <h1 className="text-md font-medium">
                  Total Amount: ${order.totalAmount}
                </h1>
                <h1 className="text-md font-medium">
                  Payment Method: {order.paymentMethod}
                </h1>
                <h1 className="text-md font-medium">
                  Order Status: {order.orderStatus}
                </h1>
                <h1 className="text-md font-medium">
                  Ordered At: {new Date(order.createdAt).toLocaleString()}
                </h1>
                <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
                  <h1 className="text-md font-semibold">Products:</h1>
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="w-full h-auto flex items-center justify-start gap-3 p-3 border rounded-md"
                    >
                      <img
                        src={product.productId.images[0]}
                        alt={product.productId.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex flex-col items-start justify-start gap-1">
                        <h1 className="text-md font-medium">
                          {product.productId.name}
                        </h1>
                        <h1 className="text-sm font-normal">
                          Quantity: {product.quantity}
                        </h1>
                        <h1 className="text-sm font-normal">
                          Price: ${product.productId.price}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <h1>No orders placed yet.</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default UserOrder;
