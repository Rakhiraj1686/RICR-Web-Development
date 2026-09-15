import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import api from "../Config/Api";
import logo from "../assets/circleLogo.png";

const PromoCode = {
  NEW50: 50,
  SAVE20: 20,
  CRAVE10: 10,
};

const AvailablePaymentMethod = [
  { id: "razorPay", label: "Pay Online" },
  { id: "cod", label: "Cash on Delivery" },
];

const CheckoutPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  // COD is selected by default
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");

  // Tax and charges
  const TAX_RATE = 0.05;
  const DELIVERY_CHARGE = 50;

  useEffect(() => {
    if (!user || !cart || !cart.cartItem || cart.cartItem.length === 0) {
      toast.error("Cart is empty or session expired");
      navigate("/order-now");
    }
  }, [user, cart, navigate]);

  // ================================
  // QUANTITY CHANGE
  // ================================
  const handleQuantityChange = (itemId, change) => {
    setCart((prev) => {
      if (!prev || !prev.cartItem) return prev;

      const updatedItems = prev.cartItem.map((item) => {
        if (item._id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);

          return {
            ...item,
            quantity: newQuantity,
          };
        }

        return item;
      });

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const updatedCart = {
        ...prev,
        cartItem: updatedItems,
        cartValue: newTotal,
      };

      // Keep localStorage updated
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  // ================================
  // REMOVE ITEM
  // ================================
  const handleRemoveItem = (itemId) => {
    setCart((prev) => {
      if (!prev || !prev.cartItem) return prev;

      const itemToRemove = prev.cartItem.find(
        (item) => item._id === itemId
      );

      if (!itemToRemove) return prev;

      const newTotal =
        prev.cartValue -
        itemToRemove.price * itemToRemove.quantity;

      const updatedItems = prev.cartItem.filter(
        (item) => item._id !== itemId
      );

      if (updatedItems.length === 0) {
        toast.error("Cart is now empty!");

        localStorage.removeItem("cart");

        navigate("/order-now");

        return prev;
      }

      const updatedCart = {
        ...prev,
        cartItem: updatedItems,
        cartValue: newTotal,
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  // ================================
  // CALCULATE PRICE
  // ================================
  const calculatePrices = () => {
    const subtotal = cart?.cartValue || 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + DELIVERY_CHARGE;

    return {
      subtotal,
      tax,
      total,
    };
  };

  // ================================
  // APPLY PROMO CODE
  // ================================
  const handlePromoCodeApply = () => {
    const discountPercent = PromoCode[promoCode.toUpperCase()];

    if (discountPercent) {
      const { subtotal } = calculatePrices();

      const discountAmount =
        (subtotal * discountPercent) / 100;

      const newSubTotal = subtotal - discountAmount;

      console.log("Applying promo code:", {
        promoCode,
        discountPercent,
        discountAmount,
        oldSubTotal: subtotal,
        newSubTotal,
      });

      setCart((prev) => {
        const updatedCart = {
          ...prev,
          cartValue: newSubTotal,
        };

        localStorage.setItem(
          "cart",
          JSON.stringify(updatedCart)
        );

        return updatedCart;
      });

      toast.success(
        `Promo code applied! You saved ₹${discountAmount.toFixed(
          2
        )}`
      );

      setAppliedPromo(true);
    } else {
      toast.error("Invalid promo code");
    }
  };

  // ================================
  // GENERATE ORDER PAYLOAD
  // ================================
  const GeneratePayload = (
    RazorpayOrderID = null,
    RazorpayPaymentID = null,
    selectedPaymentMethod = paymentMethod
  ) => {
    const { subtotal, tax, total } = calculatePrices();

    return {
      restaurantId: cart.restaurantID,

      userId: user._id,

      items: [...cart.cartItem],

      orderValue: {
        subtotal,

        tax,

        total,

        promoCode,

        deliveryFee: DELIVERY_CHARGE,

        discountPercentage:
          PromoCode[promoCode.toUpperCase()] || 0,

        // COD or Razorpay
        paymentMethod: selectedPaymentMethod,

        // COD remains pending until delivery
        paymentStatus:
          selectedPaymentMethod === "cod"
            ? "pending"
            : "paid",

        razorpayOrderID: RazorpayOrderID,

        razorpayPaymentID: RazorpayPaymentID,
      },

      status: "pending",

      review: {},
    };
  };

  // ================================
  // RAZORPAY PAYMENT
  // ================================
  const handleRazorpayPayment = async () => {
    const { total } = calculatePrices();

    try {
      const keyRes = await api.get(
        "/payment/getRazorpayKey"
      );

      const key = keyRes.data.key;

      const orderRes = await api.post(
        "/payment/createOrder",
        {
          amount: total,
        }
      );

      const orderdata = orderRes.data.data;

      console.log(orderdata);

      const option = {
        key,

        amount: String(orderdata.amount),

        currency: orderdata.currency,

        name: "Cravings",

        description: "Test Transaction",

        image:
          "https://placehold.co/600x400?text=CR",

        order_id: orderdata.id,

        handler: async (response) => {
          try {
            console.log(response);

            const VerifyPaymentPayload = {
              paymentID:
                response.razorpay_payment_id,

              orderID:
                response.razorpay_order_id,

              signature:
                response.razorpay_signature,
            };

            console.log(VerifyPaymentPayload);

            const res = await api.post(
              "/payment/verifyPayment",
              VerifyPaymentPayload
            );

            console.log(res);

            const payload = GeneratePayload(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              "razorPay"
            );

            const OrderRes = await api.post(
              "/user/placeorder",
              payload
            );

            navigate("/paymentSuccess", {
              state: OrderRes.data.data,
            });
          } catch (error) {
            console.log(error);

            toast.error(
              error?.response?.data?.message ||
                "Unknown Error"
            );
          } finally {
            setIsProcessing(false);
          }
        },

        modal: {
          ondismiss: () => {
            toast.error(
              "Please Complete your Payment to Proceed"
            );

            setIsProcessing(false);
          },
        },

        prefill: {
          name: user.fullName,

          email: user.email,

          contact: user.mobileNumber,
        },

        notes: {
          address: "Razorpay Corporate Office",
        },

        theme: {
          color: "#E63946",
        },
      };

      console.log(option);

      const razorpay = new window.Razorpay(option);

      razorpay.open();

      razorpay.on(
        "payment.failed",
        (response) => {
          console.log(
            "Payment Failed",
            response
          );

          toast.error("Payment Failed");

          setIsProcessing(false);
        }
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Unknown Error"
      );

      setIsProcessing(false);
    }
  };

  // ================================
  // PLACE ORDER
  // ================================
  const handlePlaceOrder = async () => {
    if (!user || !cart) {
      toast.error(
        "Session expired. Please login again."
      );

      navigate("/login");

      return;
    }

    if (
      !cart.cartItem ||
      cart.cartItem.length === 0
    ) {
      toast.error("Your cart is empty.");

      navigate("/order-now");

      return;
    }

    setIsProcessing(true);

    console.log(
      "Selected Payment Method:",
      paymentMethod
    );

    try {
      // ==================================
      // ONLINE PAYMENT DISABLED
      // ==================================
      if (paymentMethod === "razorPay") {
        toast.error(
          "Online payment is currently unavailable. Please select Cash on Delivery."
        );

        setIsProcessing(false);

        return;
      }

      // ==================================
      // CASH ON DELIVERY
      // ==================================
      if (paymentMethod === "cod") {
        console.log(
          "Placing Cash on Delivery order..."
        );

        const payload = GeneratePayload(
          null,
          null,
          "cod"
        );

        console.log(
          "COD Order Payload:",
          payload
        );

        const OrderRes = await api.post(
          "/user/placeorder",
          payload
        );

        console.log(
          "COD Order Response:",
          OrderRes.data
        );

        toast.success(
          "Order placed successfully with Cash on Delivery!"
        );

        // Clear cart after successful order
        localStorage.removeItem("cart");

        navigate("/paymentSuccess", {
          state: OrderRes.data.data,
        });

        return;
      }
    } catch (error) {
      console.log(
        "Place Order Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to place order. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // ================================
  // LOADING
  // ================================
  if (!user || !cart) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-(--color-text-secondary)">
          Loading...
        </div>
      </div>
    );
  }

  const {
    subtotal,
    tax,
    total,
  } = calculatePrices();

  // ================================
  // UI
  // ================================
  return (
    <div className="min-h-screen bg-(--color-background) py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold"
            style={{
              color: "var(--color-primary)",
            }}
          >
            Order Checkout
          </h1>

          <p className="text-(--color-text-secondary) mt-2">
            Review your order and complete the payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= LEFT SECTION ================= */}
          <div className="lg:col-span-2">

            {/* ================= ORDER ITEMS ================= */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">

              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  color: "var(--color-primary)",
                }}
              >
                Order Summary
              </h2>

              <div className="space-y-4">

                {cart.cartItem &&
                cart.cartItem.length > 0 ? (
                  cart.cartItem.map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 border-b border-(--color-border) pb-4 hover:bg-(--color-background) p-3 rounded transition"
                      >

                        {/* ITEM IMAGE */}
                        <div className="shrink-0">
                          <img
                            src={
                              item.images?.[0]?.url ||
                              "🍔"
                            }
                            alt={item.itemName}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>

                        {/* ITEM DETAILS */}
                        <div className="flex-1">

                          <h3
                            className="text-lg font-bold"
                            style={{
                              color:
                                "var(--color-primary)",
                            }}
                          >
                            {item.itemName}
                          </h3>

                          <p className="text-sm text-(--color-text-secondary) mt-1">
                            {item.cuisine} •{" "}
                            {item.type}
                          </p>

                          <div className="flex gap-2 mt-2">

                            <span className="text-xs bg-(--color-background) text-(--color-text-secondary) border border-(--color-border) px-2 py-1 rounded">
                              {item.servingSize}
                            </span>

                            <span className="text-xs bg-(--color-accent)/20 text-(--color-primary-hover) px-2 py-1 rounded">
                              {item.preparationTime}
                            </span>

                          </div>

                          <div className="text-lg font-semibold text-(--color-text) mt-2">
                            ₹{item.price}
                          </div>

                        </div>

                        {/* QUANTITY */}
                        <div className="flex flex-col items-end justify-between">

                          <button
                            onClick={() =>
                              handleRemoveItem(
                                item._id
                              )
                            }
                            className="text-red-500 hover:text-red-600 transition p-2"
                            title="Remove item"
                          >
                            <FaTrash />
                          </button>

                          <div
                            className="flex items-center border rounded-lg overflow-hidden"
                            style={{
                              borderColor:
                                "var(--color-secondary)",
                            }}
                          >

                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  -1
                                )
                              }
                              className="p-2 hover:bg-(--color-background) transition"
                              style={{
                                backgroundColor:
                                  item.quantity === 1
                                    ? "#f3f4f6"
                                    : "white",
                              }}
                              disabled={
                                item.quantity === 1
                              }
                            >
                              <FaMinus size={12} />
                            </button>

                            <span className="px-4 font-bold text-lg w-12 text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  1
                                )
                              }
                              className="p-2 hover:bg-(--color-background) transition"
                            >
                              <FaPlus size={12} />
                            </button>

                          </div>

                          {/* ITEM TOTAL */}
                          <div className="text-right mt-2">

                            <p className="text-sm text-(--color-text-secondary)">
                              Subtotal
                            </p>

                            <p
                              className="text-lg font-bold"
                              style={{
                                color:
                                  "var(--color-secondary)",
                              }}
                            >
                              ₹
                              {(
                                item.price *
                                item.quantity
                              ).toFixed(2)}
                            </p>

                          </div>

                        </div>

                      </div>
                    )
                  )
                ) : (
                  <div className="text-center py-8">
                    <p className="text-(--color-text-secondary) text-lg">
                      Your cart is empty
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* ================= DELIVERY ADDRESS ================= */}
            <div className="bg-white rounded-lg shadow-md p-6">

              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  color: "var(--color-primary)",
                }}
              >
                Delivery Address
              </h2>

              <div className="bg-(--color-section-light) border-l-4 border-(--color-primary) p-4 rounded">

                <p
                  className="font-bold text-lg"
                  style={{
                    color:
                      "var(--color-primary)",
                  }}
                >
                  {user.fullName}
                </p>

                <p className="text-(--color-text-secondary) mt-2">
                  {user.address}
                </p>

                <p className="text-(--color-text-secondary)">
                  {user.city}, {user.pin}
                </p>

                <p className="text-(--color-text-secondary) mt-2">
                  📞 {user.mobileNumber}
                </p>

              </div>

              <button
                onClick={() =>
                  navigate(
                    "/user-dashboard",
                    {
                      state: {
                        tab: "profile",
                      },
                    }
                  )
                }
                className="mt-4 px-4 py-2 text-(--color-primary) hover:text-(--color-primary-hover) font-semibold transition"
              >
                ✎ Edit Address
              </button>

            </div>

          </div>

          {/* ================= RIGHT SECTION ================= */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">

              {/* ================= PRICE DETAILS ================= */}
              <h2
                className="text-xl font-bold mb-6"
                style={{
                  color:
                    "var(--color-primary)",
                }}
              >
                Price Details
              </h2>

              <div className="space-y-4 mb-6">

                <div className="flex justify-between">
                  <span className="text-(--color-text-secondary)">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-(--color-text-secondary)">
                    Tax (5%)
                  </span>

                  <span className="font-semibold">
                    ₹{tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">

                  <span className="text-(--color-text-secondary)">
                    Delivery Charge
                  </span>

                  <span className="font-semibold">
                    ₹
                    {DELIVERY_CHARGE.toFixed(
                      2
                    )}
                  </span>

                </div>

                <div className="border-t pt-4 flex justify-between">

                  <span
                    className="text-lg font-bold"
                    style={{
                      color:
                        "var(--color-primary)",
                    }}
                  >
                    Total Amount
                  </span>

                  <span
                    className="text-2xl font-bold"
                    style={{
                      color:
                        "var(--color-secondary)",
                    }}
                  >
                    ₹{total.toFixed(2)}
                  </span>

                </div>

              </div>

              {/* ================= PROMO CODE ================= */}
              <div className="bg-white rounded-lg shadow-md p-6">

                <h3
                  className="font-bold mb-3"
                  style={{
                    color:
                      "var(--color-primary)",
                  }}
                >
                  Promo Code
                </h3>

                <div className="flex gap-2">

                  <input
                    type="text"
                    placeholder="Enter code"
                    name="promo"
                    value={promoCode}
                    onChange={(e) =>
                      setPromoCode(
                        e.target.value
                      )
                    }
                    className="flex-1 border border-(--color-border) rounded px-3 py-2 focus:outline-none focus:border-(--color-primary) disabled:bg-gray-100"
                    style={{
                      borderColor:
                        "var(--color-secondary)",
                    }}
                    disabled={appliedPromo}
                  />

                  <button
                    style={{
                      backgroundColor:
                        "var(--color-secondary)",
                    }}
                    className="text-white px-4 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
                    onClick={
                      handlePromoCodeApply
                    }
                    disabled={appliedPromo}
                  >
                    Apply
                  </button>

                </div>

              </div>

              {/* ================= PAYMENT METHOD ================= */}
              <div className="mb-6 border-t pt-6 mt-6">

                <h3
                  className="font-bold mb-4"
                  style={{
                    color:
                      "var(--color-primary)",
                  }}
                >
                  Payment Method
                </h3>

                <div className="space-y-3">

                  {/* COD */}
                  <label
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                      paymentMethod === "cod"
                        ? "border-(--color-secondary) bg-(--color-background)"
                        : "border-(--color-border)"
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={
                        paymentMethod === "cod"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                      className="w-4 h-4"
                    />

                    <div className="ml-3">

                      <p className="font-semibold text-(--color-text)">
                        Cash on Delivery
                      </p>

                      <p className="text-xs text-(--color-text-secondary)">
                        Pay when your order is delivered
                      </p>

                    </div>

                  </label>

                  {/* ONLINE PAYMENT */}
                  <label
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                      paymentMethod === "razorPay"
                        ? "border-(--color-secondary) bg-(--color-background)"
                        : "border-(--color-border)"
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="razorPay"
                      checked={
                        paymentMethod ===
                        "razorPay"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                      className="w-4 h-4"
                    />

                    <div className="ml-3">

                      <p className="font-semibold text-(--color-text)">
                        Pay Online
                      </p>

                      <p className="text-xs text-red-500">
                        Currently unavailable
                      </p>

                    </div>

                  </label>

                </div>

              </div>

              {/* ================= PLACE ORDER ================= */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                style={{
                  backgroundColor:
                    "var(--color-secondary)",
                }}
                className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {isProcessing
                  ? "Processing..."
                  : "Place Order"}
              </button>

              {/* ================= CONTINUE SHOPPING ================= */}
              <button
                onClick={() => navigate(-1)}
                className="w-full mt-3 text-(--color-primary) font-semibold py-2 rounded-lg hover:text-(--color-primary-hover) transition"
              >
                ← Continue Shopping
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;