import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./pages/dashboards/UserDashboard";
import RiderDashboard from "./Pages/Dashboards/RiderDashboard";
import RestaurantDashboard from "./Pages/Dashboards/RestaurantDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";


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
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/riderdashboard" element={<RiderDashboard />} />
          <Route path="/restaurantdashboard" element={<RestaurantDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;