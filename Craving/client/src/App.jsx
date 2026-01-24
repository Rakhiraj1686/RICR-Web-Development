import React from "react";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./Pages/Dashboards/UserDashboard";
import AdminDashboard from "./Pages/Dashboards/AdminDashboard"
import RestaurantDashboard from "./Pages/Dashboards/RestaurantDashboard"
import RiderDashboard from "./Pages/Dashboards/RiderDashboard"

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/restaurantDashboard" element={<RestaurantDashboard />} />
          <Route path="/riderDashboard" element={<RiderDashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
