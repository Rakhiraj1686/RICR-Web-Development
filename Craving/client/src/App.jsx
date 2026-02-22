import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./Pages/dashboards/UserDashboard";
import RiderDashboard from "./Pages/Dashboards/RiderDashboard";
import RestaurantDashboard from "./Pages/Dashboards/RestaurantDashboard";
import AdminDashboard from "./Pages/dashboards/AdminDashboard";
import OrderNow from "./Pages/OrderNow";
import RestaurantDisplayMenu from "./Pages/RestaurantDisplayMenu";
import NotFound from "./Pages/NotFound";
import CheckoutPage from "./Pages/CheckoutPage";

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
          <Route
            path="/restaurantdashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/order-now" element={<OrderNow />} />
          <Route path="/restaurantMenu" element={<RestaurantDisplayMenu />} />
          <Route path="/checkout-page" element={<CheckoutPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
