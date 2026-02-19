import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const CheckoutPage = () => {
    
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  console.log("CheckoutPage", cart);



  return (
    <>
      <div>
        
      </div>
    </>
  );
};

export default CheckoutPage;